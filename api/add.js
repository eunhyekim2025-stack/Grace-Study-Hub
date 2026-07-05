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
  const dir = SUBJECT_DIR[body.subject] ?? ""

  if (body.type === "note") {
    const { title, tags, content } = body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." })
    }
    const tagList = String(tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    const fm =
      `---\n` +
      `title: ${JSON.stringify(title)}\n` +
      (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
      `created: ${new Date().toISOString().slice(0, 10)}\n` +
      `---\n\n`
    const md = fm + content + "\n"
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
