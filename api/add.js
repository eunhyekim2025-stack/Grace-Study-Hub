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
      `structure. Produce faithful, well-organized STUDY NOTES in the SAME LANGUAGE ` +
      `as the transcript.\n\n` +
      `Rules:\n` +
      `- Start with a one-paragraph "## Summary" (2-4 sentences).\n` +
      `- Then "## " / "### " sections following the lecture's flow, with concise ` +
      `bullet points capturing the key ideas.\n` +
      `- Put important definitions, formulas, or warnings in "> " blockquote callouts.\n` +
      `- Use a Markdown table when the lecture compares things or lists key/value pairs.\n` +
      `- Remove filler ("um", "you know", repetitions); keep all substantive content.\n` +
      `- Do NOT invent facts not present in the transcript.\n` +
      `- Output ONLY the Markdown body — no frontmatter, no "# title", no code fences.\n\n` +
      `TRANSCRIPT:\n"""\n${String(raw).slice(0, 60000)}\n"""`
    : `You are formatting a study note for a Quartz markdown wiki. The note is titled ` +
      `"${title}". Below is raw text pasted from NotebookLM (a summary/notes). ` +
      `Your job is to RESTRUCTURE and CLEAN UP the formatting ONLY — do not add, ` +
      `remove, or invent any facts, and keep the SAME LANGUAGE as the input.\n\n` +
      `Rules:\n` +
      `- Output GitHub-flavored Markdown for the note BODY only. Do NOT include ` +
      `frontmatter or a top-level "# title" (those are added separately).\n` +
      `- Organize with "##"/"###" headings, tidy bullet/numbered lists.\n` +
      `- Turn key definitions or warnings into "> " blockquote callouts.\n` +
      `- Use a Markdown table when the text compares items or lists key/value pairs.\n` +
      `- Keep it faithful and concise; fix obvious spacing/OCR artifacts only.\n` +
      `- Respond with ONLY the Markdown body, no commentary or code fences.\n\n` +
      `RAW TEXT:\n"""\n${String(raw).slice(0, 12000)}\n"""`

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: lecture ? 8000 : 4000,
        temperature: lecture ? 0.4 : 0.3,
      }),
    })
    const data = await res.json()
    if (!res.ok) return raw
    let out = data.choices?.[0]?.message?.content || ""
    // strip a stray ```markdown fence if the model wrapped the whole answer
    out = out.replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim()
    return out || raw
  } catch {
    return raw
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
    const fm =
      `---\n` +
      `title: ${JSON.stringify(title)}\n` +
      (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
      `created: ${new Date().toISOString().slice(0, 10)}\n` +
      `---\n\n`
    const md = fm + finalContent + "\n"
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
