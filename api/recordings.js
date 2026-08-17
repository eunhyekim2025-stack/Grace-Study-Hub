// Vercel serverless function: recover a recording that was archived to the
// private Blob store but never became a note — e.g. when /api/add failed (bad
// GitHub token) and the browser threw the transcript away.
//
// The in-site recorder uploads every ~2-minute segment to the private Blob
// store via /api/archive, under
//   recordings/<subject>/<date>-<title>/seg-000.webm   (+ random suffix)
// so the raw audio survives even when the note save fails. This endpoint lists
// those archives and re-transcribes them back into a transcript.
//
//   POST { password, action: "list" }
//     → { folders: [{ folder, subject, label, segments, bytes, uploadedAt }] }
//
//   POST { password, action: "transcribe", folder, offset?, limit? }
//     → { transcript, segments, done, nextOffset, failed: [pathname] }
//
// "transcribe" works in batches so a long lecture can't hit the function time
// limit: pass the returned nextOffset back until done is true, then join the
// transcript pieces in order. The resulting text can be POSTed to /api/add as a
// normal note (type:"note", mode:"lecture").
//
// Required Vercel env vars:
//   ADD_SECRET   — shared password (same one the modal sends)
//   GROQ_API_KEY — for Whisper transcription
//   plus a connected Blob store: BLOB_READ_WRITE_TOKEN, or the OIDC setup
//   (BLOB_STORE_ID + Vercel's automatic VERCEL_OIDC_TOKEN).
//
// Runtime: Node 18+. Depends on @vercel/blob (see root package.json).

import { get, list } from "@vercel/blob"

// Whisper calls run in parallel; 60s is plenty for one batch of 6 segments
// (~12 minutes of audio) and stays inside the Hobby-plan ceiling.
export const config = { maxDuration: 60 }

const BATCH = 6
const PREFIX = "recordings/"

// "recordings/mgmt/2026-08-17-week-3-lecture/seg-002-Ab3xQ.webm" → 2
function segIndex(pathname) {
  const m = /\/seg-(\d+)/.exec(pathname)
  return m ? parseInt(m[1], 10) : 0
}

function folderOf(pathname) {
  const i = pathname.lastIndexOf("/")
  return i === -1 ? pathname : pathname.slice(0, i)
}

// Blob auth mirrors /api/archive: a static read-write token if one is set,
// otherwise the SDK picks up BLOB_STORE_ID + VERCEL_OIDC_TOKEN by itself.
function blobOpts(extra = {}) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  return token ? { ...extra, token } : extra
}

// Every blob under PREFIX, following the pagination cursor to the end.
async function allBlobs() {
  const out = []
  let cursor
  do {
    const page = await list(blobOpts({ prefix: PREFIX, limit: 1000, cursor }))
    out.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return out
}

async function transcribeSegment(blob, apiKey) {
  const hit = await get(blob.pathname, blobOpts({ access: "private", useCache: false }))
  if (!hit || !hit.stream) return { pathname: blob.pathname, text: "", error: "not found" }

  const bytes = Buffer.from(await new Response(hit.stream).arrayBuffer())
  if (!bytes.length) return { pathname: blob.pathname, text: "", error: "empty" }

  const type = hit.blob?.contentType || "audio/webm"
  const ext =
    type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : "webm"

  const form = new FormData()
  form.append("file", new Blob([bytes], { type }), `segment.${ext}`)
  form.append("model", process.env.GROQ_WHISPER_MODEL || "whisper-large-v3")
  form.append("response_format", "json")
  form.append("temperature", "0")

  const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}` },
    body: form,
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) {
    return { pathname: blob.pathname, text: "", error: data?.error?.message || `HTTP ${r.status}` }
  }
  return { pathname: blob.pathname, text: (data.text || "").trim(), error: null }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })

  const secret = process.env.ADD_SECRET
  if (!secret) return res.status(500).json({ error: "Server not configured — set ADD_SECRET." })

  let body = req.body
  if (typeof body === "string") {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  body = body || {}
  if (body.password !== secret) return res.status(401).json({ error: "Wrong password." })

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return res.status(501).json({ error: "no-blob-store" })
  }

  const action = body.action || "list"

  try {
    if (action === "list") {
      // One row per recording folder: how many segments survived, and when.
      const groups = new Map()
      for (const b of await allBlobs()) {
        const folder = folderOf(b.pathname)
        const g = groups.get(folder) || { folder, segments: 0, bytes: 0, uploadedAt: null }
        g.segments += 1
        g.bytes += b.size
        const at = new Date(b.uploadedAt).toISOString()
        if (!g.uploadedAt || at > g.uploadedAt) g.uploadedAt = at
        groups.set(folder, g)
      }

      const folders = [...groups.values()]
        .map((g) => {
          // recordings/<subject>/<date>-<title>
          const parts = g.folder.split("/")
          return { ...g, subject: parts[1] || "", label: parts[2] || g.folder }
        })
        .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1))

      return res.status(200).json({ folders })
    }

    if (action === "transcribe") {
      const apiKey = process.env.GROQ_API_KEY
      if (!apiKey) return res.status(501).json({ error: "GROQ_API_KEY 미설정." })

      const folder = String(body.folder || "").replace(/\/+$/, "")
      if (!folder.startsWith(PREFIX)) {
        return res.status(400).json({ error: "folder must start with " + PREFIX })
      }

      const segments = (await allBlobs())
        .filter((b) => folderOf(b.pathname) === folder)
        .sort((a, b) => segIndex(a.pathname) - segIndex(b.pathname))
      if (!segments.length) return res.status(404).json({ error: "그 폴더에 녹음 조각이 없습니다." })

      const offset = Math.max(0, parseInt(body.offset, 10) || 0)
      const limit = Math.min(BATCH, Math.max(1, parseInt(body.limit, 10) || BATCH))
      const batch = segments.slice(offset, offset + limit)

      const results = await Promise.all(batch.map((b) => transcribeSegment(b, apiKey)))
      const nextOffset = offset + batch.length

      return res.status(200).json({
        transcript: results
          .map((r) => r.text)
          .filter(Boolean)
          .join("\n\n"),
        segments: segments.length,
        done: nextOffset >= segments.length,
        nextOffset,
        failed: results.filter((r) => r.error).map((r) => ({ path: r.pathname, error: r.error })),
      })
    }

    return res.status(400).json({ error: "Unknown action." })
  } catch (e) {
    return res.status(502).json({ error: "복구 중 오류: " + e.message })
  }
}
