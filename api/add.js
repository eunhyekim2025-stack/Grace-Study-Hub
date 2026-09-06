// Vercel serverless function: add a note or upload a file to the wiki straight
// from the site. Commits into llm-wiki/wiki/ via the GitHub Contents API, which
// triggers Vercel to redeploy (~1–2 min). The GitHub token never touches the
// browser — it lives in the ADD_* env vars configured in the Vercel project.
//
// Required Vercel env vars:
//   GITHUB_TOKEN  — fine-grained PAT with "Contents: Read and write" on the repo
//   ADD_SECRET    — a shared password; the modal must send the same value
//
// Runtime: Node (native fetch + Buffer, no npm dependencies).

import { DESIGN_SPEC, homeworkPath, normTag, notePath, sanitizeDcView, subjectDir, unfence } from "./_note.js"
import {
  cleanLabel,
  enrichTitle,
  extractDcMeta,
  hubCandidates,
  insertSeminarRow,
  pageId,
} from "./_seminars.js"

const REPO = "eunhyekim2025-stack/Grace-Study-Hub"
const BRANCH = "main"
const WIKI = "llm-wiki/wiki"

const gh = (path, token, init = {}) =>
  fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "grace-study-hub-add",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  })

async function getFile(path, token) {
  const res = await gh(`/repos/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`, token)
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  if (!data || typeof data.content !== "string") return null
  return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha }
}

// Commit several files at once (Git Trees API), so a note and the hub row that
// lists it land together and trigger ONE redeploy instead of two.
async function commitFiles(files, message, token) {
  const ref = await (await gh(`/repos/${REPO}/git/ref/heads/${BRANCH}`, token)).json()
  const baseSha = ref?.object?.sha
  if (!baseSha) throw new Error("could not read branch head")
  const baseCommit = await (await gh(`/repos/${REPO}/git/commits/${baseSha}`, token)).json()
  const treeRes = await gh(`/repos/${REPO}/git/trees`, token, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: files.map((f) => ({ path: f.path, mode: "100644", type: "blob", content: f.content })),
    }),
  })
  const tree = await treeRes.json()
  if (!treeRes.ok) throw new Error(tree.message || "tree error")
  const commitRes = await gh(`/repos/${REPO}/git/commits`, token, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [baseSha] }),
  })
  const commit = await commitRes.json()
  if (!commitRes.ok) throw new Error(commit.message || "commit error")
  const updateRes = await gh(`/repos/${REPO}/git/refs/heads/${BRANCH}`, token, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  })
  if (!updateRes.ok) throw new Error((await updateRes.json())?.message || "ref update error")
  return commit
}

// The subject's hub page ("operations-management.md" or a folder index), or
// null if the subject has none. Everything hub-related is best-effort: a hub we
// cannot read costs the note its listing, never the note itself.
async function resolveHub(token, subject) {
  if (!subject) return null
  for (const path of hubCandidates(WIKI, subject)) {
    const file = await getFile(path, token)
    if (file) return { path, text: file.text, id: pageId(WIKI, path) }
  }
  return null
}

// AI note generation. Returns a Markdown BODY (no frontmatter, no top-level "#"
// title) and falls back to the raw text if GROQ_API_KEY is missing or the call
// fails, so a note is never lost:
//   "lecture" — 🔴 in-site recording: turn a rough speech transcript into
//               well-structured study notes (summarize + organize).
// The chat model. NOTE: this Groq account can only use the openai/gpt-oss-*
// models — the llama-* ids return 404 "do not have access", which silently sent
// every tidy call to the raw fallback. gpt-oss-120b is capped at ~8000 tokens
// per minute, so one request must stay well under that (input + output).
const CHAT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"
// Largest transcript we try to tidy in a single request and still fit the TPM
// ceiling (~3.5k input tokens + ~3.5k output < 8k). A longer lecture cannot be
// summarized server-side on this tier, so it is kept as raw text and flagged.
const TIDY_BUDGET_CHARS = 14000

// Returns { body, tidied, reason }. `tidied:false` means the caller should mark
// the note as raw (needs manual tidying) instead of passing it off as finished.
async function noteFromText(title, raw, apiKey) {
  if (!apiKey) return { body: raw, tidied: false, reason: "no-groq-key" }
  const text = String(raw)
  if (text.length > TIDY_BUDGET_CHARS) {
    // Too long for one budget-sized request; don't produce a misleading
    // half-note. Keep the full transcript and let the caller flag it.
    return { body: raw, tidied: false, reason: "too-long" }
  }

  const prompt =
    `You are turning a raw lecture transcript into clean study notes for a Quartz ` +
    `markdown wiki. The note is titled "${title}". The transcript is auto-generated ` +
    `speech-to-text, so it has filler words, false starts, and no punctuation ` +
    `structure. Produce faithful, well-organized STUDY NOTES in ENGLISH. If the ` +
    `lecture is spoken in another language (e.g., Korean), translate the content ` +
    `into natural English — the entire note (including the diagram block, callout ` +
    `titles, and glossary) must be in English. Remove filler ("um", "you know", ` +
    `repetitions) but keep ALL substantive content. Do NOT invent facts that are ` +
    `not present in the transcript.` +
    DESIGN_SPEC +
    `\n\nTRANSCRIPT:\n"""\n${text}\n"""`

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 3500,
        // Low temperature = more faithful, less rambling → tighter notes.
        temperature: 0.3,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { body: raw, tidied: false, reason: data?.error?.message || `groq-${res.status}` }
    }
    let out = data.choices?.[0]?.message?.content || ""
    out = sanitizeDcView(unfence(out))
    return out ? { body: out, tidied: true } : { body: raw, tidied: false, reason: "empty-output" }
  } catch (e) {
    return { body: raw, tidied: false, reason: "exception: " + e.message }
  }
}

// Auto-tagging (free, via Groq): propose a few topical tags for a note, STRONGLY
// biased to reuse the existing vocabulary passed from the client (derived at
// build time from every note's frontmatter — the same tags Obsidian and the
// wiki graph use). Returns [] on any failure so tagging never blocks a save.
async function suggestTags(title, body, knownTags, apiKey) {
  if (!apiKey) return []
  const vocab = (Array.isArray(knownTags) ? knownTags : [])
    .map(normTag)
    .filter(Boolean)
    .slice(0, 250)
  const prompt =
    `You assign tags to a study note for a wiki shared by Quartz, Obsidian, and a ` +
    `knowledge graph. Choose 3–6 short topical tags.\n` +
    `Rules:\n` +
    `- STRONGLY prefer reusing tags from this existing vocabulary; only invent a new ` +
    `tag when nothing fits (at most 2 new):\n${vocab.join(", ") || "(none yet)"}\n` +
    `- lowercase kebab-case, no "#". Prefer subject/topic tags over generic words.\n` +
    `- Output ONLY a JSON array of strings, e.g. ["contract","singapore"].\n\n` +
    `TITLE: ${title}\nNOTE:\n"""\n${String(body).slice(0, 6000)}\n"""`
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.2,
      }),
    })
    const data = await res.json()
    if (!res.ok) return []
    const out = data.choices?.[0]?.message?.content || ""
    const m = out.match(/\[[\s\S]*\]/)
    if (!m) return []
    const arr = JSON.parse(m[0])
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" })
  }

  const token = process.env.GITHUB_TOKEN
  const secret = process.env.ADD_SECRET
  if (!token || !secret) {
    return res
      .status(500)
      .json({ error: "Server not configured — set GITHUB_TOKEN and ADD_SECRET in Vercel." })
  }

  let body = req.body
  if (typeof body === "string") {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  body = body || {}

  if (body.password !== secret) {
    return res.status(401).json({ error: "Wrong password." })
  }

  let path, contentBase64, commitMsg
  let tidied = true // whether an AI-tidy actually produced the note body
  let tidyReason
  // Known subjects map to their legacy folder; subjects created via the site
  // use their slug as the folder. subjectDir() also forces the value to safe
  // path segments, so a crafted subject can't walk out of the wiki.
  const dir = subjectDir(body.subject)

  let extraFiles = []
  let listedIn
  let hubError

  if (body.type === "note") {
    const { title, tags, content } = body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." })
    }
    const userTags = String(tags || "")
      .split(",")
      .map(normTag)
      .filter(Boolean)
    // AI pass: "lecture" summarizes a recording transcript into study notes.
    // Otherwise save as-is.
    // pretidied = the client already ran the (chunked) tidy for a long lecture,
    // so accept the content as the finished note and skip the server tidy.
    const wantAI = body.mode === "lecture" && !body.pretidied
    const ai = body.pretidied
      ? { body: content, tidied: true }
      : wantAI
        ? await noteFromText(title, content, process.env.GROQ_API_KEY)
        : { body: content, tidied: false }
    const finalContent = ai.body
    // If we WANTED an AI tidy but it didn't happen, say so in the note instead of
    // passing raw transcript off as a finished note. `too-long` is the free-tier
    // token ceiling; other reasons are surfaced verbatim for debugging.
    const rawFallback = wantAI && !ai.tidied
    tidied = !rawFallback
    tidyReason = rawFallback ? ai.reason : undefined
    const tidyNote = rawFallback
      ? `> [!warning] ⚠️ Auto-tidy did not run — this is the raw lecture transcript, ` +
        `not a finished note.${
          ai.reason === "too-long"
            ? " The recording was too long to summarize automatically on the current plan; tidy it manually or record shorter segments."
            : ai.reason
              ? ` (reason: ${ai.reason})`
              : ""
        }\n\n`
      : ""
    // Auto-tags (free, Groq): reuse the client-supplied vocabulary. User-typed
    // tags are authoritative and come first; suggestions fill in, deduped & capped.
    const autoTags =
      body.autoTags === false
        ? []
        : (await suggestTags(title, finalContent, body.knownTags, process.env.GROQ_API_KEY))
            .map(normTag)
            .filter(Boolean)
    // Homework notes are routed into the subject's <base>-homework/ folder and
    // always carry the "homework" tag (so /tags/homework lists them) plus a
    // status so the binder reads as a to-do list.
    const isHw = !!body.homework
    const tagList = [...new Set([...(isHw ? ["homework"] : []), ...userTags, ...autoTags])].slice(
      0,
      8,
    )
    // Private audio backup: /api/archive uploaded each recording segment to the
    // private Blob store and the client passes back their pathnames. We record
    // them in frontmatter (a private-store path is useless without the token, so
    // this is safe on a public note) plus a callout so you know a backup exists.
    const recordings = Array.isArray(body.audio)
      ? body.audio.filter((x) => typeof x === "string" && x)
      : []
    const recNote = recordings.length
      ? `> [!note] 🎙️ Original recording archived privately (${recordings.length} segment${
          recordings.length > 1 ? "s" : ""
        }) in your Vercel Blob store — not published here.\n\n`
      : ""
    // Segments whose transcription failed. The client reports them so the gap is
    // visible in the note itself — otherwise the note reads as complete while a
    // two-minute stretch of the lecture is silently missing. The audio is still
    // archived, so the gap is recoverable via /api/recordings.
    const gaps = Array.isArray(body.gaps)
      ? body.gaps.map((n) => parseInt(n, 10)).filter((n) => Number.isFinite(n))
      : []
    const gapNote = gaps.length
      ? `> [!warning] \u26a0\ufe0f ${gaps.length} segment${gaps.length > 1 ? "s" : ""} failed to ` +
        `transcribe (#${gaps.join(", #")}) \u2014 about ${gaps.length * 2} minutes of this lecture ` +
        `are missing below. The audio is archived, so re-transcribe from the private Blob ` +
        `store to fill the gap.\n\n`
      : ""
    // A recording is saved under the label you typed ("MPW #3-1"), which says
    // nothing about the class. The generated diagram block opens with the topic
    // and a one-line gist — lift them into the title and the hub row, so the note
    // is named for what it is about and the label survives as its prefix.
    const isLecture = body.mode === "lecture" && !isHw
    const { dcTitle, dcSub } = isLecture ? extractDcMeta(finalContent) : {}
    const noteTitle = isLecture ? enrichTitle(title, dcTitle) : title
    const today = new Date().toISOString().slice(0, 10)
    // The hub both supplies the `part-of` target (what connects the note to its
    // subject in the graph) and receives the Seminars row.
    const hub = isLecture ? await resolveHub(token, body.subject) : null

    const fm =
      `---\n` +
      `title: ${JSON.stringify(noteTitle)}\n` +
      (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
      (isHw ? `type: homework\nstatus: to-read\n` : "") +
      (rawFallback ? `needs_tidy: true\n` : "") +
      // A lecture note is a record of one class session; `kind` and `sources`
      // are what /lint and the citation check look for, and `part-of` is the
      // edge that puts it inside its subject in the graph instead of orphaned.
      (isLecture
        ? `sources: ${JSON.stringify([
            `In-class recording — ${cleanLabel(title)} (${today}, in-site recorder / Groq transcript)`,
          ])}\n` + `kind: 개념\n`
        : "") +
      (hub ? `relations:\n  part-of: [${hub.id}]\n` : "") +
      `created: ${today}\n` +
      (recordings.length
        ? `recording:\n${recordings.map((p) => `  - ${JSON.stringify(p)}`).join("\n")}\n`
        : "") +
      `---\n\n`
    const md = fm + recNote + gapNote + tidyNote + finalContent + "\n"
    // The filename stays derived from the label you typed, so the URL is short
    // and a re-save of the same session lands on the same path.
    path = isHw ? homeworkPath(WIKI, body.subject, title) : notePath(WIKI, body.subject, title)
    contentBase64 = Buffer.from(md, "utf8").toString("base64")
    commitMsg = `${isHw ? "Add homework note" : "Add note"}: ${noteTitle} (via site)`

    if (hub) {
      const target = pageId(WIKI, path)
      const link = `[[${target}\\|${String(noteTitle).replace(/\|/g, "\\|")}]]`
      const num = (String(title).match(/\d+/) || [""])[0]
      const covers = dcSub || dcTitle || ""
      const nextHub = insertSeminarRow(hub.text, { link, date: today, covers, num, target })
      // null = the note is already listed (a retry), so leave the hub alone.
      if (nextHub) {
        extraFiles.push({ path: hub.path, content: nextHub })
        listedIn = hub.id
      }
    }
  } else if (body.type === "file") {
    const { filename, dataBase64 } = body
    if (!filename || !dataBase64) {
      return res.status(400).json({ error: "filename and data are required." })
    }
    const safe = String(filename).replace(/[^\p{L}\p{N}._-]+/gu, "_")
    path = [WIKI, dir, safe].filter(Boolean).join("/")
    // strip any "data:...;base64," prefix the browser may have added
    contentBase64 = String(dataBase64).replace(/^data:[^;]*;base64,/, "")
    commitMsg = `Upload file: ${safe} (via site)`
  } else {
    return res.status(400).json({ error: "Unknown request type." })
  }

  // A note that also updates its subject hub goes in as ONE commit (Git Trees),
  // so the page and the row that links to it are never briefly out of step and
  // Vercel redeploys once. A plain note keeps the single-file Contents PUT,
  // whose 422 is what stops you silently overwriting a note of the same name.
  if (extraFiles.length) {
    const existing = await getFile(path, token)
    if (existing) {
      return res.status(422).json({
        error: "A note with that name already exists — rename it.",
        path,
      })
    }
    try {
      const commit = await commitFiles(
        [{ path, content: Buffer.from(contentBase64, "base64").toString("utf8") }, ...extraFiles],
        commitMsg,
        token,
      )
      return res
        .status(200)
        .json({ ok: true, path, listedIn, commit: commit.sha, tidied, tidyReason })
    } catch (e) {
      // Fall through to the single-file save: the note matters, the hub row is
      // a convenience that /lint can add later.
      extraFiles = []
      listedIn = undefined
      hubError = e.message
    }
  }

  const url = `https://api.github.com/repos/${REPO}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`

  const put = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "grace-study-hub-add",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: commitMsg, content: contentBase64, branch: BRANCH }),
  })

  const data = await put.json().catch(() => ({}))
  if (!put.ok) {
    const hint =
      put.status === 422
        ? " (a file with that name may already exist — rename it)"
        : ""
    return res.status(put.status).json({ error: (data.message || "GitHub error") + hint, path })
  }

  return res.status(200).json({
    ok: true,
    path,
    commit: data.commit && data.commit.html_url,
    tidied,
    tidyReason,
    hubError,
  })
}
