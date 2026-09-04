// Vercel serverless function: EDIT an existing note straight from the site.
// Password-protected (same ADD_SECRET as /api/add) since it overwrites a file.
// Two modes:
//   { mode: "get",  path, password }                  → { title, content, path }
//   { mode: "save", path, title, content, password }  → { ok, path, commit }
//
// Unlike /api/add (create-only: PUT without a sha → 422 on an existing path),
// this fetches the file's CURRENT sha and PUTs WITH it to overwrite. The note's
// existing frontmatter (tags, created, type, status, recording, …) is preserved
// verbatim — only the `title:` line and the markdown body are replaced — so an
// edit never silently drops metadata. Triggers a redeploy (~1–2 min).
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

// Split a note into its raw frontmatter block and the markdown body after it.
// Returns { fm: string | null, body }. `fm` is the text BETWEEN the --- fences
// (null when the file has no frontmatter).
function splitFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text)
  if (!m) return { fm: null, body: text }
  return { fm: m[1], body: text.slice(m[0].length) }
}

// Read the `title:` value out of a frontmatter block. Frontmatter is written by
// us as a JSON string (title: "…"), so try JSON first, then fall back to the
// raw text with surrounding quotes stripped.
function titleFromFm(fm) {
  if (!fm) return ""
  const line = fm.split("\n").find((l) => /^title:\s*/.test(l))
  if (!line) return ""
  const raw = line.replace(/^title:\s*/, "").trim()
  try {
    const v = JSON.parse(raw)
    if (typeof v === "string") return v
  } catch {
    /* not JSON — fall through */
  }
  return raw.replace(/^["']|["']$/g, "")
}

// Set (or insert) the `title:` line in a frontmatter block, leaving every other
// key untouched.
function setTitleInFm(fm, title) {
  const titleLine = `title: ${JSON.stringify(String(title))}`
  const lines = (fm || "").split("\n").filter((l) => l.length > 0)
  const idx = lines.findIndex((l) => /^title:\s*/.test(l))
  if (idx >= 0) lines[idx] = titleLine
  else lines.unshift(titleLine)
  return lines.join("\n")
}

async function getFile(apiPath, token) {
  const res = await gh(`/repos/${REPO}/contents/${apiPath}?ref=${BRANCH}`, token)
  if (res.status === 404) return { notFound: true }
  const meta = await res.json().catch(() => ({}))
  if (!res.ok || typeof meta.content !== "string" || !meta.sha) {
    return { error: meta.message || "Could not read the note.", status: res.status || 502 }
  }
  return { text: Buffer.from(meta.content, "base64").toString("utf8"), sha: meta.sha }
}

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
  // e.g. "law-concepts/negligence.md". Validate hard — this overwrites files.
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

  const mode = body.mode === "save" ? "save" : "get"

  // ── GET: return the current title + markdown body to prefill the editor ──
  if (mode === "get") {
    const cur = await getFile(apiPath, token)
    if (cur.notFound) {
      return res.status(404).json({ error: "이미 삭제되었거나 존재하지 않는 노트입니다.", path: full })
    }
    if (cur.error) return res.status(cur.status).json({ error: cur.error, path: full })
    const { fm, body: md } = splitFrontmatter(cur.text)
    return res.status(200).json({
      ok: true,
      path: full,
      title: titleFromFm(fm),
      content: md.replace(/^\n+/, ""), // drop the blank line(s) after frontmatter
    })
  }

  // ── SAVE: overwrite the note with a new title + body, preserving metadata ──
  const title = String(body.title || "").trim()
  const content = String(body.content ?? "")
  if (!title || !content.trim()) {
    return res.status(400).json({ error: "Title and content are required." })
  }

  const cur = await getFile(apiPath, token)
  if (cur.notFound) {
    return res.status(404).json({ error: "이미 삭제되었거나 존재하지 않는 노트입니다.", path: full })
  }
  if (cur.error) return res.status(cur.status).json({ error: cur.error, path: full })

  const { fm } = splitFrontmatter(cur.text)
  const newFm =
    fm === null
      ? `title: ${JSON.stringify(title)}\ncreated: ${new Date().toISOString().slice(0, 10)}`
      : setTitleInFm(fm, title)
  const md = `---\n${newFm}\n---\n\n${content.trim()}\n`
  const contentBase64 = Buffer.from(md, "utf8").toString("base64")

  const putRes = await gh(`/repos/${REPO}/contents/${apiPath}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: `Edit note: ${rel} (via site)`,
      content: contentBase64,
      sha: cur.sha,
      branch: BRANCH,
    }),
  })
  const data = await putRes.json().catch(() => ({}))
  if (!putRes.ok) {
    return res.status(putRes.status).json({ error: data.message || "GitHub edit failed", path: full })
  }
  return res.status(200).json({ ok: true, path: full, title, commit: data.commit && data.commit.html_url })
}
