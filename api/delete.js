// Vercel serverless function: delete a note from the wiki straight from the
// site. Password-protected (same ADD_SECRET as /api/add) since it's destructive.
// Removes the file via the GitHub Contents API (which needs the file's current
// SHA), triggering a redeploy (~1–2 min).
//
// Required Vercel env vars:
//   GITHUB_TOKEN  — fine-grained PAT with "Contents: Read and write" on the repo
//   ADD_SECRET    — shared password (same one the modal sends)

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

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })

  const token = process.env.GITHUB_TOKEN
  const secret = process.env.ADD_SECRET
  if (!token || !secret) {
    return res.status(500).json({ error: "Server not configured — set GITHUB_TOKEN and ADD_SECRET." })
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
  if (body.password !== secret) return res.status(401).json({ error: "Wrong password." })

  // `path` is the note's path relative to the wiki root (fileData.relativePath),
  // e.g. "law-concepts/negligence.md". Validate hard — this deletes files.
  const rel = String(body.path || "").trim()
  if (
    !rel ||
    !rel.toLowerCase().endsWith(".md") ||
    rel.includes("..") ||
    rel.startsWith("/") ||
    rel.includes("\\")
  ) {
    return res.status(400).json({ error: "Invalid note path." })
  }
  const full = `${WIKI}/${rel}`
  const apiPath = full.split("/").map(encodeURIComponent).join("/")

  // Need the current SHA to delete.
  const getRes = await gh(`/repos/${REPO}/contents/${apiPath}?ref=${BRANCH}`, token)
  if (getRes.status === 404) {
    return res.status(404).json({ error: "이미 삭제되었거나 존재하지 않는 노트입니다.", path: full })
  }
  const meta = await getRes.json().catch(() => ({}))
  if (!getRes.ok || !meta.sha) {
    return res.status(getRes.status || 502).json({ error: meta.message || "Could not read the note.", path: full })
  }

  const delRes = await gh(`/repos/${REPO}/contents/${apiPath}`, token, {
    method: "DELETE",
    body: JSON.stringify({
      message: `Delete note: ${rel} (via site)`,
      sha: meta.sha,
      branch: BRANCH,
    }),
  })
  const data = await delRes.json().catch(() => ({}))
  if (!delRes.ok) {
    return res.status(delRes.status).json({ error: data.message || "GitHub delete failed", path: full })
  }
  return res.status(200).json({ ok: true, path: full, commit: data.commit && data.commit.html_url })
}
