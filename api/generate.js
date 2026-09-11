// Vercel serverless function: generate a QUIZ or a revision SUMMARY for a
// subject straight from the site — built from that subject's OWN wiki notes
// (not from professor problem PDFs). Both results are committed as a NEW note
// in the subject's folder, so they show up on the site after the ~1–2 min
// redeploy. One endpoint, switched by `kind` ("quiz" | "summary").
//
// Flow:
//   1. Resolve the subject → its note folders (subjects.json prefixes, with a
//      fallback to the api/_note.js SUBJECT_DIR mapping).
//   2. List the markdown notes in those folders (GitHub Contents API) and fetch
//      them, CONCATENATING with a hard char cap (~12k) so the Groq free-tier
//      TPM ceiling (~8000 tokens/min on gpt-oss-120b) is respected. When over
//      budget, later notes contribute only their title (an outline) so breadth
//      is kept without blowing the token budget.
//   3. Ask Groq for N questions at a difficulty (quiz) or a concise revision
//      summary (summary), then commit the result as a note.
//
// Required Vercel env vars: GITHUB_TOKEN, ADD_SECRET, GROQ_API_KEY.
// Runtime: Node (global fetch + Buffer, no npm dependencies).

import { DESIGN_SPEC, slugify, subjectDir } from "./_note.js"
import { hubCandidates } from "./_seminars.js"

const REPO = "eunhyekim2025-stack/Grace-Study-Hub"
const BRANCH = "main"
const WIKI = "llm-wiki/wiki"
const SUBJECTS_JSON = "grace-study-hub/subjects.json"
const CHAT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"

// Total characters of note text fed to the model. ~12k chars ≈ ~3k input
// tokens; leaving ~3–4k for output keeps a single request under the ~8k TPM
// ceiling of gpt-oss-120b on the free tier.
const MAX_INPUT_CHARS = 12000
const MAX_FILES = 40 // don't fan out to hundreds of tiny requests
const MIN_Q = 1
const MAX_Q = 20

// Concrete guidance per difficulty so the level actually changes the questions.
const DIFFICULTY = {
  easy: "EASY — recall and definitions. One concept per question. Answers are a single fact or a short definition a student can recall directly from the notes.",
  medium:
    "MEDIUM — applied understanding. Each question connects two ideas or asks the student to apply a concept to a short situation, or a one-step calculation. Answers are 1–3 sentences with brief reasoning.",
  hard: "HARD — exam-level, multi-step. Scenario-based questions that require synthesising several concepts, multi-step reasoning, or a worked calculation. Answers explain the full reasoning chain in a few sentences.",
}

const gh = (path, token, init = {}) =>
  fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "grace-study-hub-generate",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  })

async function getFile(path, token) {
  const res = await gh(`/repos/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`, token)
  if (!res.ok) return null
  const data = await res.json()
  if (!data || typeof data.content !== "string") return null
  return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha }
}

// Commit several files in ONE commit (Git Trees) — so a quiz note and the hub
// row that lists it land together and trigger a single redeploy.
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

// Add a bullet under the hub's "## <heading>" section (creating the section at
// the end if it's missing). Idempotent. Because the section tab bar is built
// from the hub's H2 headings, adding "## Quizzes" also gives the subject a
// Quizzes tab.
function linkInHubSection(hubText, heading, bullet) {
  if (hubText.includes(bullet)) return hubText
  const lines = hubText.split("\n")
  const hIdx = lines.findIndex((l) => new RegExp(`^##\\s+${heading}\\b`, "i").test(l))
  if (hIdx === -1) {
    const sep = hubText.endsWith("\n") ? "" : "\n"
    return (
      hubText +
      `${sep}\n## ${heading}\n> Auto-generated quizzes built from this subject's notes. New ones are added here automatically.\n\n${bullet}\n`
    )
  }
  let end = lines.length
  for (let i = hIdx + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      end = i
      break
    }
  }
  let insertAt = end
  while (insertAt > hIdx + 1 && lines[insertAt - 1].trim() === "") insertAt--
  lines.splice(insertAt, 0, bullet)
  return lines.join("\n")
}

// The repo's full file list (recursive), fetched once via the Git Trees API and
// cached by commit sha (so a note added between quizzes is still picked up).
// Subject notes live under llm-wiki/wiki/<prefix>/… — often in per-chapter
// SUBFOLDERS (law-concepts, da-concepts, fa-concepts) — so we filter this flat,
// full-path list by prefix. This also fixes the earlier bug of listing the
// un-prefixed path (`contents/<prefix>` 404s; the real path is `WIKI/<prefix>`).
let _treeCache = { sha: null, paths: [] }
async function repoTreePaths(token) {
  const ref = await (await gh(`/repos/${REPO}/git/ref/heads/${BRANCH}`, token)).json().catch(() => null)
  const commitSha = ref?.object?.sha
  if (!commitSha) return _treeCache.paths
  if (_treeCache.sha === commitSha) return _treeCache.paths
  const commit = await (await gh(`/repos/${REPO}/git/commits/${commitSha}`, token)).json().catch(() => null)
  const treeSha = commit?.tree?.sha
  if (!treeSha) return _treeCache.paths
  const t = await (await gh(`/repos/${REPO}/git/trees/${treeSha}?recursive=1`, token)).json().catch(() => null)
  const paths = Array.isArray(t?.tree) ? t.tree.filter((e) => e.type === "blob").map((e) => e.path) : []
  _treeCache = { sha: commitSha, paths }
  return paths
}

// Full repo paths of files under a subject prefix (recursive).
async function filesUnder(prefix, token) {
  const base = `${WIKI}/${String(prefix).replace(/\/+$/, "")}/`
  return (await repoTreePaths(token)).filter((p) => p.startsWith(base))
}

// The subject's markdown notes (recursive; skips any index.md at any level).
async function listMarkdown(prefix, token) {
  return (await filesUnder(prefix, token)).filter(
    (p) => /\.md$/i.test(p) && !/\/index\.md$/i.test(p),
  )
}

// ── Format exemplars: past exercises/exams the quiz should imitate ─────────
// Detected purely by FILENAME so the student never points at them — they just
// upload files named like these. The quiz then mirrors their question formats.
const EXEMPLAR_RE =
  /(exercise|quiz|midterm|final|exam|tutorial|practice|problem[\s_-]*set|worksheet|past[\s_-]*paper)/i
const MAX_EXEMPLARS = 2
const EXEMPLAR_BUDGET = 2500 // total chars of exemplar text fed to the model

// Every file under a subject prefix (recursive) — {name, path} — so exam files
// in per-chapter subfolders are found too.
async function listFiles(prefix, token) {
  return (await filesUnder(prefix, token)).map((p) => ({ name: p.split("/").pop(), path: p }))
}

// Up to MAX_EXEMPLARS past exercises/exams across the subject's folders, as
// TEXT, capped to EXEMPLAR_BUDGET. We only read text formats (.md / .txt): a
// scanned or font-subset PDF cannot be parsed reliably in a dep-free serverless
// function, so exam PDFs are turned into a "<name>.pdf.txt" sidecar by the local
// scripts/make-exam-sidecars.mjs (poppler pdftotext, with OCR fallback), which
// this then reads. A PDF without a sidecar is simply skipped (quiz falls back to
// the plain format). The sidecar's own name still matches EXEMPLAR_RE, so it is
// picked up here directly.
async function gatherExemplars(prefixes, token) {
  const found = []
  for (const p of prefixes) {
    for (const f of await listFiles(p, token)) {
      const ext = (f.name.split(".").pop() || "").toLowerCase()
      if ((ext === "md" || ext === "txt") && EXEMPLAR_RE.test(f.name)) found.push(f)
    }
  }
  if (!found.length) return { text: "", names: [] }
  const parts = []
  const names = []
  let budget = EXEMPLAR_BUDGET
  for (const f of found) {
    if (names.length >= MAX_EXEMPLARS || budget <= 0) break
    const file = await getFile(f.path, token)
    if (!file) continue
    const text = stripFrontmatter(file.text).trim()
    if (!text) continue
    const slice = text.slice(0, budget)
    budget -= slice.length
    names.push(f.name)
    parts.push(`### ${f.name}\n${slice}`)
  }
  return { text: parts.join("\n\n"), names }
}

// Resolve a subject slug → { prefixes, label }. Authoritative source is the
// repo's subjects.json (has multi-folder subjects like Business Law); falls back
// to the api/_note.js SUBJECT_DIR mapping so it still works if that read fails.
async function resolveSubject(subject, token) {
  const fallbackDir = subjectDir(subject)
  const fallback = { prefixes: fallbackDir ? [fallbackDir + "/"] : [], label: subject }
  const file = await getFile(SUBJECTS_JSON, token)
  if (!file) return fallback
  try {
    const subjects = JSON.parse(file.text)
    const s = subjects.find((x) => x.slug === subject)
    if (s && Array.isArray(s.prefixes) && s.prefixes.length) {
      return { prefixes: s.prefixes, label: s.label || subject }
    }
  } catch {
    /* fall through */
  }
  return fallback
}

// Strip YAML frontmatter and a leading "# title" so the model sees clean prose.
function stripFrontmatter(md) {
  let s = String(md)
  if (s.startsWith("---")) {
    const end = s.indexOf("\n---", 3)
    if (end !== -1) s = s.slice(s.indexOf("\n", end + 1) + 1)
  }
  return s.replace(/^\s*#\s+.*\n/, "").trim()
}

// Best-effort title from frontmatter `title:` or the filename.
function titleOf(md, path) {
  const m = String(md).match(/^title:\s*(.+)$/m)
  if (m) return m[1].trim().replace(/^["']|["']$/g, "")
  const base = path.split("/").pop().replace(/\.md$/i, "")
  return base.replace(/[-_]/g, " ")
}

// Concatenate the subject's notes under a hard char budget. Fully includes notes
// while budget remains; once spent, later notes contribute only their title, so
// the model still knows the full scope of the subject.
async function gatherNotes(prefixes, token, maxChars = MAX_INPUT_CHARS) {
  const paths = []
  for (const p of prefixes) {
    for (const fp of await listMarkdown(p, token)) {
      if (!paths.includes(fp)) paths.push(fp)
      if (paths.length >= MAX_FILES) break
    }
    if (paths.length >= MAX_FILES) break
  }
  if (!paths.length) return { text: "", count: 0 }

  let budget = maxChars
  const parts = []
  for (const fp of paths) {
    const file = await getFile(fp, token)
    if (!file) continue
    const title = titleOf(file.text, fp)
    const bodyFull = stripFrontmatter(file.text)
    if (budget <= 0) {
      parts.push(`## ${title}`) // outline only — out of budget
      continue
    }
    const body = bodyFull.length > budget ? bodyFull.slice(0, budget) : bodyFull
    budget -= body.length
    parts.push(`## ${title}\n\n${body}`)
  }
  return { text: parts.join("\n\n---\n\n"), count: paths.length }
}

async function groqChat(payload, apiKey) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: CHAT_MODEL, ...payload }),
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 429) {
    const retryAfter = parseFloat(res.headers.get("retry-after") || "0")
    const err = new Error(data?.error?.message || "Rate limited — try again in a moment.")
    err.status = 429
    err.retryAfterMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 20000
    throw err
  }
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Groq ${res.status}`)
    err.status = 502
    throw err
  }
  return data.choices?.[0]?.message?.content || ""
}

const fm = (title, tags, extra = "") =>
  `---\ntitle: ${JSON.stringify(title)}\ntags: [${tags.join(", ")}]\ncreated: ${new Date()
    .toISOString()
    .slice(0, 10)}\n---\n\n${extra}`

async function genQuiz(label, notes, count, difficulty, apiKey, exemplars) {
  const guide = DIFFICULTY[difficulty] || DIFFICULTY.medium
  const hasEx = !!(exemplars && exemplars.text)
  // When we have the student's past exercises/exams, teach the model to imitate
  // their formats (question types, phrasing, options) with NEW, notes-based
  // content. Otherwise keep the plain short-answer Q&A.
  const formatBlock = hasEx
    ? `\n\nThe student's OWN past exercises/exams for this subject are below. Infer their ` +
      `QUESTION FORMATS and STYLE — the mix of question types (multiple-choice, ` +
      `true/false, fill-in-the-blank, short-answer, calculation, case/scenario), how ` +
      `prompts are phrased, whether options are lettered, whether working is expected — ` +
      `and write your NEW questions in the SAME formats and rough proportions. Do NOT ` +
      `copy their questions; mirror only the format. Every fact must still come from the ` +
      `NOTES.\n\nPAST EXERCISES/EXAMS:\n"""\n${exemplars.text}\n"""`
    : ""
  const schema = hasEx
    ? `{"questions": [{"type": "<mcq|truefalse|fill|short|calc|scenario>", "q": "<question>", "options": ["A. …", "B. …"], "a": "<concise answer — for choice questions name the correct option and give a brief why>"}, ...]}`
    : `{"questions": [{"q": "<question>", "a": "<concise answer>"}, ...]}`
  const prompt =
    `You are writing a revision quiz for a student studying "${label}", based ONLY on ` +
    `their own study notes below. Write everything in ENGLISH.\n\n` +
    `Produce EXACTLY ${count} questions at this difficulty: ${guide}\n\n` +
    `Base every question on the notes — do not invent facts that are not supported by them. ` +
    `Cover a spread of topics rather than clustering on one.` +
    formatBlock +
    `\n\nRespond with ONLY a JSON object: ${schema} with exactly ${count} items. ` +
    (hasEx ? `"options" is only for multiple-choice/true-false questions; omit it otherwise. ` : "") +
    `No prose outside the JSON.\n\n` +
    `NOTES:\n"""\n${notes}\n"""`
  const raw = await groqChat(
    {
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: Math.min(4000, 500 + count * 170),
      temperature: 0.5,
    },
    apiKey,
  )
  let items = []
  try {
    const parsed = JSON.parse(raw)
    items = Array.isArray(parsed) ? parsed : parsed.questions || parsed.quiz || []
  } catch {
    items = []
  }
  if (!items.length) throw Object.assign(new Error("The model returned no questions — try again."), { status: 502 })
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  const exNote = hasEx
    ? ` · formatted after your ${exemplars.names
        .map((n) => n.replace(/\.pdf\.txt$|\.txt$|\.md$/i, ""))
        .join(", ")}`
    : ""
  const body =
    `> [!info] Auto-generated ${diffLabel} quiz · ${items.length} questions · built from this subject's notes${exNote}.\n\n` +
    items
      .map((qa, i) => {
        const opts =
          Array.isArray(qa.options) && qa.options.length
            ? "\n" + qa.options.map((o) => `- ${o}`).join("\n")
            : ""
        return `**Q${i + 1}. ${qa.q}**${opts}\n\n> ${qa.a}\n`
      })
      .join("\n")
  const title = `${label} — Quiz (${diffLabel}, ${items.length} Q)`
  return { title, tags: ["quiz", "auto-generated"], body }
}

async function genSummary(label, notes, apiKey) {
  const prompt =
    `You are writing a concise REVISION SUMMARY of the subject "${label}" for a student, ` +
    `based ONLY on their own study notes below. Write everything in ENGLISH. Distil the ` +
    `whole subject into a compact, high-yield summary a student can revise from quickly — ` +
    `the core concepts, the key rules/formulas, and how the topics fit together. Do not ` +
    `invent facts that are not present in the notes.` +
    DESIGN_SPEC +
    `\n\nNOTES:\n"""\n${notes}\n"""`
  const body = await groqChat(
    { messages: [{ role: "user", content: prompt }], max_tokens: 3500, temperature: 0.4 },
    apiKey,
  )
  if (!body.trim()) throw Object.assign(new Error("The model returned an empty summary — try again."), { status: 502 })
  const title = `${label} — Revision summary`
  return { title, tags: ["summary", "auto-generated"], body }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })

  const token = process.env.GITHUB_TOKEN
  const secret = process.env.ADD_SECRET
  const apiKey = process.env.GROQ_API_KEY
  if (!token || !secret) {
    return res.status(500).json({ error: "Server not configured — set GITHUB_TOKEN and ADD_SECRET." })
  }
  if (!apiKey) {
    return res.status(500).json({ error: "AI generation needs GROQ_API_KEY set in Vercel." })
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

  const kind = body.kind === "summary" ? "summary" : "quiz"
  const subject = String(body.subject || "").trim()
  if (!subject) return res.status(400).json({ error: "Subject is required." })

  let count = parseInt(body.count, 10)
  if (!Number.isFinite(count)) count = 5
  count = Math.max(MIN_Q, Math.min(MAX_Q, count))
  const difficulty = ["easy", "medium", "hard"].includes(String(body.difficulty)) ? body.difficulty : "medium"

  // Resolve folders. For a quiz, first look for the student's past
  // exercises/exams (detected by filename) so we can mirror their formats — and
  // trim the notes budget when we do, to stay under the Groq per-minute cap.
  const { prefixes, label } = await resolveSubject(subject, token)
  if (!prefixes.length) return res.status(400).json({ error: "Unknown subject — no note folder found." })
  let exemplars = { text: "", names: [] }
  if (kind === "quiz") exemplars = await gatherExemplars(prefixes, token)
  const noteBudget = exemplars.text ? 9000 : MAX_INPUT_CHARS
  const { text: notes, count: noteCount } = await gatherNotes(prefixes, token, noteBudget)
  if (!notes.trim() || noteCount === 0) {
    return res.status(400).json({ error: "This subject has no notes yet — add some notes first." })
  }

  // Generate.
  let out
  try {
    out =
      kind === "summary"
        ? await genSummary(label, notes, apiKey)
        : await genQuiz(label, notes, count, difficulty, apiKey, exemplars)
  } catch (e) {
    if (e.status === 429) {
      return res.status(429).json({ error: "AI is rate-limited right now — wait a few seconds and try again.", retryAfterMs: e.retryAfterMs })
    }
    return res.status(e.status || 502).json({ error: "AI generation failed: " + e.message })
  }

  // Commit as a new note in the subject's primary folder. A timestamp in the
  // slug keeps repeated generations from colliding (GitHub 422 on same path).
  const primaryDir = String(prefixes[0]).replace(/\/+$/, "") || subjectDir(subject)
  const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "").slice(2) // yymmddHHMM
  const slug = slugify(`${label} ${kind} ${stamp}`)
  const path = [WIKI, primaryDir, slug + ".md"].filter(Boolean).join("/")
  const md = fm(out.title, out.tags, out.body + "\n")
  // noteSlug is the site path (wiki-root-relative), for the client's link.
  const noteSlug = [primaryDir, slug].filter(Boolean).join("/")

  // A quiz is also linked into the subject hub's "## Quizzes" section (created
  // if absent), so it's easy to find later — and the hub then shows a Quizzes
  // tab. Note + hub go in as ONE commit. Best-effort: if the hub can't be read
  // or updated, the quiz still saves on its own below.
  let hubFile = null
  if (kind === "quiz") {
    try {
      for (const hp of hubCandidates(WIKI, subject)) {
        const hf = await getFile(hp, token)
        if (hf) {
          hubFile = {
            path: hp,
            content: linkInHubSection(hf.text, "Quizzes", `- [[${noteSlug}|${out.title}]]`),
          }
          break
        }
      }
    } catch {
      hubFile = null
    }
  }

  if (hubFile) {
    try {
      const commit = await commitFiles(
        [
          { path, content: md },
          { path: hubFile.path, content: hubFile.content },
        ],
        `Add ${kind}: ${out.title} (via site)`,
        token,
      )
      return res.status(200).json({
        ok: true, kind, path, noteSlug, title: out.title,
        notesUsed: noteCount, exemplarsUsed: exemplars.names,
        commit: commit.sha, linkedInHub: hubFile.path,
      })
    } catch {
      // fall through to the plain single-file save (never lose the quiz)
    }
  }

  const ghPath = `/repos/${REPO}/contents/${path.split("/").map(encodeURIComponent).join("/")}`
  const put = await gh(ghPath, token, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add ${kind}: ${out.title} (via site)`,
      content: Buffer.from(md, "utf8").toString("base64"),
      branch: BRANCH,
    }),
  })
  const data = await put.json().catch(() => ({}))
  if (!put.ok) {
    return res.status(put.status).json({ error: (data.message || "GitHub commit failed"), path })
  }
  return res.status(200).json({
    ok: true, kind, path, noteSlug, title: out.title, notesUsed: noteCount, exemplarsUsed: exemplars.names,
  })
}
