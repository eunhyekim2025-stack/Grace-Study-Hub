// Vercel serverless function: create a new subject straight from the site.
// - scaffolds llm-wiki/wiki/<slug>/ (hub + optional AI overview/summary + quiz)
// - appends the subject to grace-study-hub/subjects.json (drives the sidebar)
// - inserts a card into the index page
// - commits everything in ONE commit via the GitHub Git Trees API → one redeploy
//
// AI generation uses the Groq API (OpenAI-compatible) over raw fetch (no SDK),
// JSON mode. English-only per the wiki's convention. Groq has a generous free
// tier (no credit card, not tied to Google), so this costs $0.
//
// Required Vercel env vars:
//   GITHUB_TOKEN   — fine-grained PAT, Contents: Read and write on the repo
//   ADD_SECRET     — shared password (same one the modal sends)
//   GROQ_API_KEY   — optional; free key from console.groq.com. If absent, the
//                    subject is created without AI.
//   GROQ_MODEL     — optional; defaults to llama-3.3-70b-versatile
//
// Runtime: Node (global fetch + Buffer, no npm dependencies).

const REPO = "eunhyekim2025-stack/Grace-Study-Hub"
const BRANCH = "main"
const WIKI = "llm-wiki/wiki"
const SUBJECTS_JSON = "grace-study-hub/subjects.json"
const INDEX_MD = `${WIKI}/index.md`
const HUE_PALETTE = [200, 300, 340, 60, 180, 20, 120, 280, 40, 320]

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)

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
  if (!res.ok) return null // 404 (missing) or 401/403 (bad token) — caller surfaces a friendly error
  const data = await res.json()
  if (!data || typeof data.content !== "string") return null
  return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha }
}

async function generate(name, apiKey) {
  // Groq JSON mode doesn't take a schema, so the shape is described in the prompt.
  const prompt =
    `You are creating starter study material for a new subject titled "${name}" in a personal study wiki. ` +
    `Write everything in ENGLISH. Respond with ONLY a JSON object with exactly these keys:\n\n` +
    `- "overview": a string of ~300-400 words of Markdown — what the subject is, why it matters, and the main topics a student should learn (use a few "##" subheadings).\n` +
    `- "summary": a string containing a Markdown bullet list of 5-8 key takeaways.\n` +
    `- "quiz": an array of exactly 5 objects, each {"q": "<short concept-check question>", "a": "<brief 1-2 sentence answer>"}.\n\n` +
    `Keep it accurate, student-friendly, and specific to "${name}". Output valid JSON only — no prose outside the object.`

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 4000,
      temperature: 0.6,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Groq ${res.status}: ${data?.error?.message || "error"}`)
  const text = data.choices?.[0]?.message?.content || "{}"
  return JSON.parse(text)
}

const fm = (title, tags, extra = "") =>
  `---\ntitle: ${JSON.stringify(title)}\ntags: [${tags.join(", ")}]\ncreated: ${new Date()
    .toISOString()
    .slice(0, 10)}\n---\n\n${extra}`

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

  const name = String(body.name || "").trim()
  if (!name) return res.status(400).json({ error: "Subject name is required." })
  const slug = slugify(name)
  if (!slug) return res.status(400).json({ error: "Could not derive a slug from that name." })

  const genNotes = body.genNotes !== false
  const genQuiz = body.genQuiz !== false

  // Current subjects.json + index.md (need contents to append/insert + base tree)
  const subjectsFile = await getFile(SUBJECTS_JSON, token)
  const indexFile = await getFile(INDEX_MD, token)
  if (!subjectsFile || !indexFile) {
    return res.status(500).json({ error: "Could not read subjects.json / index.md — check GITHUB_TOKEN permissions." })
  }
  let subjects
  try {
    subjects = JSON.parse(subjectsFile.text)
  } catch {
    return res.status(500).json({ error: "subjects.json is not valid JSON." })
  }
  if (subjects.some((s) => s.slug === slug)) {
    return res.status(409).json({ error: `A subject "${slug}" already exists.` })
  }

  const emoji = "📓"
  const hue = HUE_PALETTE[subjects.length % HUE_PALETTE.length]

  // Optional AI generation
  const wantAI = genNotes || genQuiz
  const apiKey = process.env.GROQ_API_KEY
  let gen = null
  let aiSkipped = false
  if (wantAI && apiKey) {
    try {
      gen = await generate(name, apiKey)
    } catch (e) {
      return res.status(502).json({ error: "AI generation failed: " + e.message })
    }
  } else if (wantAI) {
    aiSkipped = true
  }

  // Build files for the tree
  const files = []
  const hubLinks = []
  if (gen && genNotes) {
    const overviewMd = fm(`${name} — Overview`, ["overview", "auto-generated"], `${gen.overview}\n\n## Key summary\n\n${gen.summary}\n`)
    files.push({ path: `${WIKI}/${slug}/overview.md`, content: overviewMd })
    hubLinks.push(`- [[${slug}/overview|📄 Overview & summary]]`)
  }
  if (gen && genQuiz) {
    const quizBody = (gen.quiz || [])
      .map((qa, i) => `**Q${i + 1}. ${qa.q}**\n\n> ${qa.a}\n`)
      .join("\n")
    const quizMd = fm(`${name} — Concept quiz`, ["quiz", "auto-generated"], `${quizBody}\n`)
    files.push({ path: `${WIKI}/${slug}/quiz.md`, content: quizMd })
    hubLinks.push(`- [[${slug}/quiz|🧠 Concept quiz]]`)
  }

  const hubBody =
    `# ${emoji} ${name}\n\n> [[index|← Subjects]]\n\n` +
    (hubLinks.length ? `Start here:\n\n${hubLinks.join("\n")}\n` : `New subject — add notes with **+ 새 노트**.\n`)
  files.push({ path: `${WIKI}/${slug}/index.md`, content: fm(`${emoji} ${name}`, ["moc"], hubBody) })

  // Update subjects.json (append). New subjects join the newest existing term
  // (the current semester) so they group correctly on the dashboard/sidebar.
  const latestTerm =
    subjects
      .map((s) => s.term)
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0] || "2025 Semester 2"
  subjects.push({ slug, emoji, label: name, hue, term: latestTerm, prefixes: [`${slug}/`] })
  files.push({ path: SUBJECTS_JSON, content: JSON.stringify(subjects, null, 2) + "\n" })

  // Insert a card into index.md before the marker
  const card = `<a class="sh-card" href="./${slug}"><span class="sh-card-dot" style="--sh-dot: oklch(0.62 0.15 ${hue})"></span><span class="sh-card-title">${emoji} ${name}</span><span class="sh-card-desc">${hubLinks.length ? "Overview · Quiz" : "New subject"}</span></a>`
  const marker = "<!-- add-subject-cards -->"
  const newIndex = indexFile.text.includes(marker)
    ? indexFile.text.replace(marker, `${card}\n${marker}`)
    : indexFile.text
  if (newIndex !== indexFile.text) files.push({ path: INDEX_MD, content: newIndex })

  // ── One atomic commit via the Git Trees API ──
  try {
    const refRes = await gh(`/repos/${REPO}/git/ref/heads/${BRANCH}`, token)
    const ref = await refRes.json()
    const baseSha = ref.object.sha
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
      body: JSON.stringify({
        message: `Add subject: ${name} (via site)`,
        tree: tree.sha,
        parents: [baseSha],
      }),
    })
    const commit = await commitRes.json()
    if (!commitRes.ok) throw new Error(commit.message || "commit error")

    const updateRes = await gh(`/repos/${REPO}/git/refs/heads/${BRANCH}`, token, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha }),
    })
    if (!updateRes.ok) {
      const u = await updateRes.json()
      throw new Error(u.message || "ref update error")
    }

    return res.status(200).json({ ok: true, slug, aiSkipped, commit: commit.sha })
  } catch (e) {
    return res.status(502).json({ error: "GitHub commit failed: " + e.message })
  }
}
