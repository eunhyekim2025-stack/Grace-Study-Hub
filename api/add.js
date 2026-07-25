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

const REPO = "eunhyekim2025-stack/Grace-Study-Hub"
const BRANCH = "main"
const WIKI = "llm-wiki/wiki"

// Which folder each subject's notes land in.
const SUBJECT_DIR = {
  "business-law": "law-concepts",
  "decision-analysis": "da-concepts",
  "financial-accounting": "fa-concepts",
  "operations-management": "ops-concepts",
  "cross-domain": "cross-domain",
  "ai-foresight": "concepts",
  "": "", // uncategorized → wiki root
}

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "note"

// Shared "quality bar" appended to both prompts: it makes the model produce
// notes that are readable AT A GLANCE — an optional visual "Diagram view" block,
// a key-takeaways callout, tight sections, tables for comparisons, and a
// glossary. The dc-view block enables the site's automatic Text/Diagram toggle
// (see NOTE-DESIGN-KIT.md); sanitizeDcView() below repairs its formatting so it
// always renders even if the model is sloppy.
const DESIGN_SPEC =
  `\n\nFORMAT THE NOTE FOR MAXIMUM SCANNABILITY — a reader must grasp it at a glance.\n` +
  `1. DIAGRAM VIEW (preferred when the content has clear structure — a process, a ` +
  `set of elements, a comparison, or a few key sections): make the VERY FIRST thing ` +
  `in your output one raw-HTML block that summarizes the note visually. It powers an ` +
  `automatic "Diagram view" toggle. Follow these rules EXACTLY or it will break:\n` +
  `   • The block comes first, flush to the left margin (zero indentation).\n` +
  `   • EXACTLY one HTML tag-group per line. NO blank lines anywhere inside the block. ` +
  `NO markdown syntax inside it (use plain text or <b>…</b>).\n` +
  `   • Use ONLY these classes:\n` +
  `<div class="dc-view">  … </div>   (the wrapper — REQUIRED first & last)\n` +
  `<div class="dc-title">TITLE</div><div class="dc-sub">one-line gist</div>\n` +
  `Flow: <div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Name</div><div class="dc-step-d">detail</div></div><div class="dc-arrow">→</div>…</div>\n` +
  `Section header: <div class="dc-section"><span class="dc-num">1</span><h2>Heading</h2><span class="dc-hint">hint</span></div>\n` +
  `Card: <div class="dc-card"><b>Point</b> short text <span class="dc-chip">tag</span></div>\n` +
  `Columns: <div class="dc-cols">…cards…</div>  (or dc-cols-3 for three)\n` +
  `Key rule: <div class="dc-callout">the single most important rule</div>  (add class "warn" for amber, "ok" for green)\n` +
  `   • Keep it to the 3–6 most important ideas — it is a MAP, not the whole note.\n` +
  `   • If the content does not suit a diagram, SKIP this block entirely.\n` +
  `2. Next, a "> [!summary] Key takeaways" callout: 3–5 one-line bullets — the whole note at a glance.\n` +
  `3. Then the body: "##"/"###" sections, each with TIGHT bullets (≤ 2 lines each). ` +
  `No paragraph longer than 3 sentences. Prefer bullets and tables over prose.\n` +
  `4. Put every definition/key rule in a "> [!info]" callout, every caution in "> [!warning]", ` +
  `and worked examples in "> [!example]".\n` +
  `5. Whenever you compare things or list attribute→value pairs, use a Markdown TABLE.\n` +
  `6. End with a "## Key terms" table (| Term | Meaning |) of the 3–8 most important terms.\n` +
  `7. Be ruthless about brevity: cut filler, merge redundancy, keep only what aids recall.\n` +
  `8. Output ONLY the note body (the optional dc-view block, then markdown). No frontmatter, ` +
  `no top-level "# title", no code fences, no commentary.`

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
    // strip a stray ```markdown fence if the model wrapped the whole answer
    out = out.replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim()
    out = sanitizeDcView(out)
    return out || raw
  } catch {
    return raw
  }
}

// Repair a generated <div class="dc-view"> … </div> block so Markdown renders it
// as raw HTML (the toggle needs it as a real element). Markdown turns HTML into a
// code block if the block is indented (≥4 spaces) or has blank lines inside, so
// we collapse the block to flush-left, one line per source line, no blanks — then
// guarantee a blank line after it so the markdown body resumes cleanly.
function sanitizeDcView(md) {
  const start = md.indexOf('<div class="dc-view"')
  if (start === -1) return md
  const before = md.slice(0, start)
  const lines = md.slice(start).split("\n")
  const kept = []
  let depth = 0
  let end = lines.length
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    const opens = (trimmed.match(/<div\b/g) || []).length
    const closes = (trimmed.match(/<\/div>/g) || []).length
    if (trimmed !== "") kept.push(trimmed) // drop blank lines + leading indentation
    depth += opens - closes
    if (depth <= 0 && (opens > 0 || closes > 0)) {
      end = i + 1
      break
    }
  }
  const after = lines.slice(end).join("\n").replace(/^\n+/, "")
  return `${before}${kept.join("\n")}\n\n${after}`
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
  // use their slug as the folder, so fall back to the slug itself.
  const dir = SUBJECT_DIR[body.subject] ?? body.subject ?? ""

  if (body.type === "note") {
    const { title, tags, content } = body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." })
    }
    const tagList = String(tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    // AI pass: "lecture" summarizes a recording transcript into study notes;
    // "polish" tidies a pasted NotebookLM summary. Otherwise save as-is.
    const aiMode = body.mode === "lecture" ? "lecture" : "tidy"
    const wantAI = body.mode === "lecture" || body.polish
    const finalContent = wantAI
      ? await noteFromText(title, content, process.env.GROQ_API_KEY, aiMode)
      : content
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
    const fm =
      `---\n` +
      `title: ${JSON.stringify(title)}\n` +
      (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
      `created: ${new Date().toISOString().slice(0, 10)}\n` +
      (recordings.length
        ? `recording:\n${recordings.map((p) => `  - ${JSON.stringify(p)}`).join("\n")}\n`
        : "") +
      `---\n\n`
    const md = fm + recNote + finalContent + "\n"
    path = [WIKI, dir, slugify(title) + ".md"].filter(Boolean).join("/")
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
