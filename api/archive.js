// Vercel serverless function: archive ONE audio segment from the in-site
// recorder into a PRIVATE Vercel Blob store — a "just in case" backup of the
// original recording. The note itself is generated from the transcript (see
// /api/add); this keeps the raw audio private and off GitHub.
//
// The client (addContent.inline.ts) POSTs each ~2-minute segment here in
// parallel with /api/transcribe. Segments stay small (well under the function
// body limit), so no client-upload token dance is needed. If no Blob store is
// configured yet, we return 501 so the client stops trying and the
// recording→note flow keeps working without an audio backup.
//
// Required Vercel env vars (set automatically when you connect a Blob store):
//   ADD_SECRET  — shared password (same one the modal sends)
//   plus EITHER a static token (BLOB_READ_WRITE_TOKEN) OR the modern OIDC setup
//   (BLOB_STORE_ID, with Vercel's auto VERCEL_OIDC_TOKEN). The @vercel/blob SDK
//   picks whichever is available, so both connection styles work.
//
// Runtime: Node 18+. Depends on @vercel/blob (see root package.json).

import { put } from "@vercel/blob"

export const config = {
  api: { bodyParser: { sizeLimit: "8mb" } },
}

const slug = (s) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)

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

  // Auth: a static read-write token, OR the OIDC setup (BLOB_STORE_ID + Vercel's
  // auto OIDC token). If neither exists, no store is connected → tell the client
  // to stop trying (archiving is optional; notes still work without it).
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  const hasStore = blobToken || process.env.BLOB_STORE_ID
  if (!hasStore) {
    return res.status(501).json({ error: "no-blob-store", archived: false })
  }

  const { audioBase64, mimeType, title, subject, segment } = body
  if (!audioBase64) return res.status(400).json({ error: "audio is required." })

  const bytes = Buffer.from(String(audioBase64).replace(/^data:[^;]*;base64,/, ""), "base64")
  if (!bytes.length) return res.status(400).json({ error: "empty audio." })

  const type = mimeType || "audio/webm"
  const ext =
    type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : "webm"
  const date = new Date().toISOString().slice(0, 10)
  const seg = String(segment ?? 0).padStart(3, "0")
  // recordings/<subject>/<date>-<title>/seg-000.webm  (addRandomSuffix keeps it unique)
  const pathname = `recordings/${slug(subject) || "unsorted"}/${date}-${
    slug(title) || "recording"
  }/seg-${seg}.${ext}`

  try {
    const opts = { access: "private", addRandomSuffix: true, contentType: type }
    // Pass the static token if we have one; otherwise the SDK authenticates via
    // OIDC using BLOB_STORE_ID + VERCEL_OIDC_TOKEN automatically.
    if (blobToken) opts.token = blobToken
    const blob = await put(pathname, bytes, opts)
    return res.status(200).json({ archived: true, path: blob.pathname, url: blob.url })
  } catch (e) {
    return res.status(502).json({ error: "archive failed: " + e.message, archived: false })
  }
}
