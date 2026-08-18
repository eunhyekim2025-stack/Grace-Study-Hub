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

import { DESIGN_SPEC, normTag, notePath, sanitizeDcView, subjectDir, unfence } from "./_note.js"

const REPO = "eunhyekim2025-stack/Grace-Study-Hub"
const BRANCH = "main"
const WIKI = "llm-wiki/wiki"

// AI note generation. Two modes, both returning a Markdown BODY (no frontmatter,
// no top-level "#" title) and both falling back to the raw text if GROQ_API_KEY
// is missing or the call fails, so a note is never lost:
//   "tidy"    — ① NotebookLM paste: reformat only, invent nothing.
//   "lecture" — 🔴 in-site recording: turn a rough speech transcript into
//               well-structured study notes (summarize + organize).
async function noteFromText(title, raw, apiKey, mode = "tidy") {
  if (!apiKey) return raw
  const lecture = mode === "lecture"

  const prompt = lecture
    ? `You are turning a raw lecture transcript into clean study notes for a Quartz ` +
      `markdown wiki. The note is titled "${title}". The transcript is auto-generated ` +
      `speech-to-text, so it has filler words, false starts, and no punctuation ` +
      `structure. Produce faithful, well-organized STUDY NOTES in ENGLISH. If the ` +
      `lecture is spoken in another language (e.g., Korean), translate the content ` +
      `into natural English — the entire note (including the diagram block, callout ` +
      `titles, and glossary) must be in English. Remove filler ("um", "you know", ` +
      `repetitions) but keep ALL substantive content. Do NOT invent facts that are ` +
      `not present in the transcript.` +
      DESIGN_SPEC +
      `\n\nTRANSCRIPT:\n"""\n${String(raw).slice(0, 60000)}\n"""`
    : `You are reformatting a study note for a Quartz markdown wiki. The note is ` +
      `titled "${title}". Below is raw text pasted from NotebookLM (a summary/notes). ` +
      `RESTRUCTURE and CLEAN UP the formatting — do NOT add, remove, or invent any ` +
      `facts, and keep the SAME LANGUAGE as the input (write the diagram block, ` +
      `callout titles, and glossary in that language too). Fix obvious spacing/OCR ` +
      `artifacts only.` +
      DESIGN_SPEC +
      `\n\nRAW TEXT:\n"""\n${String(raw).slice(0, 12000)}\n"""`

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: lecture ? 8000 : 4000,
        // Low temperature = more faithful, less rambling → tighter notes.
        temperature: lecture ? 0.3 : 0.2,
      }),
    })
    const data = await res.json()
    if (!res.ok) return raw
    let out = data.choices?.[0]?.message?.content || ""
    out = sanitizeDcView(unfence(out))
    return out || raw
  } catch {
    return raw
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
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
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
  // Known subjects map to their legacy folder; subjects created via the site
  // use their slug as the folder. subjectDir() also forces the value to safe
  // path segments, so a crafted subject can't walk out of the wiki.
  const dir = subjectDir(body.subject)

  if (body.type === "note") {
    const { title, tags, content } = body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." })
    }
    const userTags = String(tags || "")
      .split(",")
      .map(normTag)
      .filter(Boolean)
    // AI pass: "lecture" summarizes a recording transcript into study notes;
    // "polish" tidies a pasted NotebookLM summary. Otherwise save as-is.
    const aiMode = body.mode === "lecture" ? "lecture" : "tidy"
    const wantAI = body.mode === "lecture" || body.polish
    const finalContent = wantAI
      ? await noteFromText(title, content, process.env.GROQ_API_KEY, aiMode)
      : content
    // Auto-tags (free, Groq): reuse the client-supplied vocabulary. User-typed
    // tags are authoritative and come first; suggestions fill in, deduped & capped.
    const autoTags =
      body.autoTags === false
        ? []
        : (await suggestTags(title, finalContent, body.knownTags, process.env.GROQ_API_KEY))
            .map(normTag)
            .filter(Boolean)
    const tagList = [...new Set([...userTags, ...autoTags])].slice(0, 8)
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
    const fm =
      `---\n` +
      `title: ${JSON.stringify(title)}\n` +
      (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
      `created: ${new Date().toISOString().slice(0, 10)}\n` +
      (recordings.length
        ? `recording:\n${recordings.map((p) => `  - ${JSON.stringify(p)}`).join("\n")}\n`
        : "") +
      `---\n\n`
    const md = fm + recNote + gapNote + finalContent + "\n"
    path = notePath(WIKI, body.subject, title)
    contentBase64 = Buffer.from(md, "utf8").toString("base64")
    commitMsg = `Add note: ${title} (via site)`
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

  const url = `https://api.github.com/repos/${REPO}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`

  const gh = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "grace-study-hub-add",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: commitMsg, content: contentBase64, branch: BRANCH }),
  })

  const data = await gh.json().catch(() => ({}))
  if (!gh.ok) {
    const hint =
      gh.status === 422
        ? " (a file with that name may already exist — rename it)"
        : ""
    return res.status(gh.status).json({ error: (data.message || "GitHub error") + hint, path })
  }

  return res.status(200).json({ ok: true, path, commit: data.commit && data.commit.html_url })
}
