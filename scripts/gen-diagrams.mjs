// Batch-generate an easy-to-read "diagram view" (a dc-view block) for every wiki
// note, in the same design-kit style as the hand-authored Negligence note. Runs
// each note's content through free Groq and inserts the block at the top of the
// markdown (right after the frontmatter). Idempotent: notes that already have a
// dc-view / neg-diagram block are skipped unless --force.
//
// Usage:
//   GROQ_API_KEY=xxx node scripts/gen-diagrams.mjs [--limit N] [--only substr]
//                                                   [--dry-run] [--force]
//
// The GROQ key is the same one set in Vercel (never commit it). Groq is free;
// this throttles + retries on rate limits.

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join, relative, basename } from "path"

const ROOT = new URL("..", import.meta.url).pathname
const WIKI = join(ROOT, "llm-wiki/wiki")
const API_KEY = process.env.GROQ_API_KEY
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => {
  const i = args.indexOf(n)
  return i >= 0 && args[i + 1] ? args[i + 1] : d
}
const LIMIT = parseInt(opt("--limit", "0"), 10) || Infinity
const ONLY = opt("--only", "")
const DRY = flag("--dry-run")
const FORCE = flag("--force")

// Files that are not notes (hubs, system/graph pages, readmes, indexes).
const SKIP_BASENAMES = new Set([
  "index.md",
  "log.md",
  "overview.md",
  "graph-dashboard.md",
  "graph-viz.md",
  "business-law.md",
  "decision-analysis.md",
  "financial-accounting.md",
  "operations-management.md",
  "management-accounting.md",
  "critical-thinking-in-real-world.md",
  "management-of-people-at-work.md",
])

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, acc)
    else if (p.endsWith(".md") && !/README/i.test(e)) acc.push(p)
  }
  return acc
}

function splitFrontmatter(md) {
  const m = md.match(/^---\n[\s\S]*?\n---\n/)
  if (!m) return { fm: "", body: md }
  return { fm: m[0], body: md.slice(m[0].length) }
}

function titleOf(fm, file) {
  const m = fm.match(/^title:\s*(.+)$/m)
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : basename(file, ".md")
}

// Strip any existing dc-view / neg-diagram block (+ leftover toolbar) so we can
// regenerate cleanly.
function stripDiagram(body) {
  return body
    .replace(/<div class="neg-toolbar">[\s\S]*?<\/div>\s*/g, "")
    .replace(/<div class="(?:dc-view|neg-diagram)">[\s\S]*?<\/div>\s*(?=\n|$)/g, (block) => {
      // remove up to the matching close by div-depth
      return ""
    })
    .replace(/^\s+/, "")
}

// Collapse a generated dc-view block so Markdown renders it as raw HTML
// (flush-left, no blank lines inside), then guarantee a blank line after it.
function sanitizeDcView(md) {
  const start = md.indexOf('<div class="dc-view"')
  if (start === -1) return md
  const before = md.slice(0, start)
  const lines = md.slice(start).split("\n")
  const kept = []
  let depth = 0
  let end = lines.length
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    const opens = (t.match(/<div\b/g) || []).length
    const closes = (t.match(/<\/div>/g) || []).length
    if (t !== "") kept.push(t)
    depth += opens - closes
    if (depth <= 0 && (opens > 0 || closes > 0)) {
      end = i + 1
      break
    }
  }
  // The model sometimes emits a stray opening tag where the wrapper's closing
  // </div> belongs, so depth never reaches 0 and an unbalanced block would be
  // written straight into the note (swallowing the markdown that follows).
  // Repair it here rather than trusting the model's last line.
  if (depth > 0) {
    if (/^<div class="dc-view"?>$/.test(kept[kept.length - 1] || "")) {
      kept[kept.length - 1] = "</div>"
      depth -= 2
    }
    while (depth-- > 0) kept.push("</div>")
  }
  const after = lines.slice(end).join("\n").replace(/^\n+/, "")
  return `${before}${kept.join("\n")}\n\n${after}`
}

const PROMPT_SPEC =
  `You create a compact, at-a-glance "diagram view" that summarizes a study note ` +
  `using a fixed design kit. Output ONLY one raw-HTML block — no markdown, no ` +
  `commentary, no code fences.\n` +
  `STRICT formatting or it breaks: the block is flush-left (zero indentation), ` +
  `EXACTLY one tag-group per line, and NO blank lines anywhere inside it.\n` +
  `Use ONLY these classes:\n` +
  `<div class="dc-view">  … </div>   (wrapper — REQUIRED first & last line)\n` +
  `<div class="dc-title">TITLE</div><div class="dc-sub">one-line gist</div>\n` +
  `Flow (for a process/sequence): <div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Name</div><div class="dc-step-d">detail</div></div><div class="dc-arrow">→</div>…</div>\n` +
  `Section header: <div class="dc-section"><span class="dc-num">1</span><h2>Heading</h2><span class="dc-hint">hint</span></div>\n` +
  `Card: <div class="dc-card"><b>Point</b> short text <span class="dc-chip">tag/citation</span></div>\n` +
  `Columns: <div class="dc-cols-3">…three cards…</div> (or dc-cols for two)\n` +
  `Callout: <div class="dc-callout">key rule</div> (add class "warn" for amber, "ok" for green)\n` +
  `Guidance: open with dc-title + dc-sub; add a dc-flow if there is a clear ` +
  `process or list of elements; then 1–4 numbered dc-section headers, each with ` +
  `a few tight dc-card points; put the single most important rule in a dc-callout. ` +
  `Keep it to the key ideas — it is a MAP, not the whole note. Faithful to the ` +
  `note; invent nothing. Keep the note's language.`

async function genDiagram(title, body) {
  // Groq free tier is ~12k tokens/minute. Keep each request small (trimmed
  // input + modest output) so a ~25s base pace stays comfortably under budget.
  const prompt =
    PROMPT_SPEC +
    `\n\nNOTE TITLE: ${title}\nNOTE CONTENT:\n"""\n${body.slice(0, 5000)}\n"""`
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1300,
        temperature: 0.3,
      }),
    })
    if (res.status === 429) {
      // Groq tells us exactly how long until the limit resets — respect it
      // (capped so a bogus header can't hang us), else exponential backoff.
      const ra = parseFloat(res.headers.get("retry-after") || "")
      const wait = Number.isFinite(ra) ? Math.min(ra * 1000 + 500, 65000) : 3000 * (attempt + 1)
      console.log(`  rate-limited, waiting ${Math.round(wait / 1000)}s…`)
      await new Promise((r) => setTimeout(r, wait))
      continue
    }
    const data = await res.json()
    if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`)
    let out = data.choices?.[0]?.message?.content || ""
    out = out.replace(/^```(?:html|markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim()
    const i = out.indexOf('<div class="dc-view"')
    if (i < 0) throw new Error("model returned no dc-view block")
    return sanitizeDcView(out.slice(i))
  }
  throw new Error("gave up after rate-limit retries")
}

async function main() {
  if (!API_KEY || /[^\x20-\x7e]/.test(API_KEY) || API_KEY.length < 20) {
    console.error(
      "GROQ_API_KEY is missing or a placeholder. Paste your REAL Groq key " +
        "(it starts with 'gsk_' and is ASCII), e.g.:\n" +
        "  GROQ_API_KEY=gsk_xxx node scripts/gen-diagrams.mjs --limit 3",
    )
    process.exit(1)
  }
  let files = walk(WIKI).filter((f) => !SKIP_BASENAMES.has(basename(f)))
  if (ONLY) files = files.filter((f) => f.includes(ONLY))

  let done = 0,
    skipped = 0,
    failed = 0,
    attempted = 0
  for (const file of files) {
    if (attempted >= LIMIT) break
    const md = readFileSync(file, "utf8")
    const rel = relative(ROOT, file)
    if (!FORCE && /class="(?:dc-view|neg-diagram)"/.test(md)) {
      skipped++
      continue
    }
    attempted++
    const { fm, body } = splitFrontmatter(md)
    const title = titleOf(fm, file)
    const cleanBody = stripDiagram(body)
    process.stdout.write(`• ${rel} … `)
    try {
      const block = await genDiagram(title, cleanBody)
      const next = `${fm}\n${block}\n${cleanBody.replace(/^\n+/, "")}`
      if (!DRY) writeFileSync(file, next)
      done++
      console.log(DRY ? "OK (dry-run)" : "written")
    } catch (e) {
      failed++
      console.log(`FAILED: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 25000)) // ~25s pace keeps us < 12k TPM
  }
  console.log(`\nDone. written=${done} skipped(existing)=${skipped} failed=${failed}`)
}

main()
