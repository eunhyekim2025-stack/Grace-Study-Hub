// Note shaping, shared by /api/add (browser paths, Groq) and scripts/ingest.mjs
// (local paths, Claude). Underscore prefix keeps Vercel from routing this file
// as a function.
//
// Everything here is pure — prompt text, slugging, tag normalization, output
// repair, path resolution. Keeping it in one place is what stops locally
// generated notes from drifting away from the ones the site produces.

// Which folder each subject's notes land in. Subjects created via the site use
// their slug as the folder, so unknown slugs fall through to the slug itself.
export const SUBJECT_DIR = {
  "business-law": "law-concepts",
  "decision-analysis": "da-concepts",
  "financial-accounting": "fa-concepts",
  "operations-management": "ops-concepts",
  "cross-domain": "cross-domain",
  "ai-foresight": "concepts",
  "": "", // uncategorized → wiki root
}

export const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "note"

// Canonical tag form — one shared vocabulary for Quartz, Obsidian, and the
// llm-wiki graph. All three read frontmatter `tags:`, so normalizing every tag
// to lowercase kebab-case (keeping Unicode letters, e.g. Korean) keeps the same
// tag a single node everywhere and prevents near-duplicate fragmentation.
export function normTag(t) {
  return String(t || "")
    .toLowerCase()
    .trim()
    .replace(/^#/, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

// Resolve a subject to its folder name, forced to a single safe path segment.
// The subject reaches us from a request body or a CLI flag, so a value like
// "../../.github/workflows" must not be able to walk out of the wiki. Real
// subject slugs are already kebab-case, so this is a no-op for every valid one.
export function subjectDir(subject) {
  const raw = SUBJECT_DIR[subject] ?? subject ?? ""
  return String(raw)
    .split("/")
    .map((seg) => seg.toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, ""))
    .filter((seg) => seg && seg !== "." && seg !== "..")
    .join("/")
}

// The wiki-relative path a note with this subject and title gets written to.
// Always inside WIKI (see callers) — the components are slugged, never joined raw.
export function notePath(wikiRoot, subject, title) {
  return [wikiRoot, subjectDir(subject), slugify(title) + ".md"].filter(Boolean).join("/")
}

// Shared "quality bar" appended to both prompts: it makes the model produce
// notes that are readable AT A GLANCE — an optional visual "Diagram view" block,
// a key-takeaways callout, tight sections, tables for comparisons, and a
// glossary. The dc-view block enables the site's automatic Text/Diagram toggle
// (see NOTE-DESIGN-KIT.md); sanitizeDcView() below repairs its formatting so it
// always renders even if the model is sloppy.
export const DESIGN_SPEC =
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

// Repair a generated <div class="dc-view"> … </div> block so Markdown renders it
// as raw HTML (the toggle needs it as a real element). Markdown turns HTML into a
// code block if the block is indented (≥4 spaces) or has blank lines inside, so
// we collapse the block to flush-left, one line per source line, no blanks — then
// guarantee a blank line after it so the markdown body resumes cleanly.
export function sanitizeDcView(md) {
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

// Strip a stray ```markdown fence if the model wrapped its whole answer.
export const unfence = (s) =>
  String(s).replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim()

// Build the full note file. WE construct the frontmatter — never the model — so
// generated text can't inject frontmatter keys (a `tags:` line or a stray `---`
// in the body stays inside the body, where it is inert).
export function buildNote({ title, tags = [], body, created, extra = "" }) {
  const tagList = [...new Set(tags.map(normTag).filter(Boolean))].slice(0, 8)
  const fm =
    `---\n` +
    `title: ${JSON.stringify(String(title))}\n` +
    (tagList.length ? `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]\n` : "") +
    `created: ${created || new Date().toISOString().slice(0, 10)}\n` +
    `---\n\n`
  return fm + extra + sanitizeDcView(unfence(body)) + "\n"
}
