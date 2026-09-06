// Wiring a class recording into its subject hub, shared by /api/add and any
// future ingest path. Two jobs, both of which used to be manual:
//
//   1. NAMING   — the recorder only knows the label you typed ("MPW #3-1"), so
//                 every saved note was called that. The AI note body already
//                 opens with a <div class="dc-title"> naming the actual topic;
//                 we lift it into the frontmatter title.
//   2. LISTING  — a note nobody links to is reachable only by search. Every
//                 subject hub has a "## Seminars" section; we insert a row into
//                 its table so the note appears the moment it is saved.
//
// Everything here is pure string work (no network, no fs) so it can be unit
// tested and reused; the caller does the GitHub reads/writes.

import { slugify, subjectDir } from "./_note.js"

// A title the recorder produced rather than one you wrote: a short course code
// plus a session number — "MPW #3-1", "ops 2-1b", "#3-2", "MA 3". These carry no
// topic, so they are the ones worth enriching. Anything longer is left alone.
const BARE_LABEL = /^[\p{L}]{0,12}[\p{L} ]*#?\s*\d+(?:[-–.]\d+)*[a-z]?$/u

export function isBareSessionLabel(title) {
  const t = String(title || "").trim()
  return !!t && t.length <= 24 && BARE_LABEL.test(t)
}

// "MPW #3-1" → "MPW 3-1" — drop the "#" and collapse spacing, so the enriched
// title reads as prose. Keeps the label itself intact: it is how you refer to
// the session, and the note's filename slug is derived from it.
export function cleanLabel(title) {
  return String(title || "")
    .replace(/#/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

// Pull the topic line and one-line gist out of the generated diagram block.
// Returns {} when the model skipped the block (allowed by DESIGN_SPEC).
export function extractDcMeta(body) {
  const text = String(body || "")
  const strip = (s) =>
    s
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim()
  const t = text.match(/<div class="dc-title">([\s\S]*?)<\/div>/)
  const s = text.match(/<div class="dc-sub">([\s\S]*?)<\/div>/)
  return { dcTitle: t ? strip(t[1]) : "", dcSub: s ? strip(s[1]) : "" }
}

// The frontmatter title for a saved recording. A typed-out title wins; a bare
// session label is expanded with the topic the note is actually about, and the
// label is kept as the prefix so the session is still findable by number.
export function enrichTitle(typedTitle, dcTitle) {
  const label = cleanLabel(typedTitle)
  if (!dcTitle || !isBareSessionLabel(typedTitle)) return label || String(typedTitle || "")
  // The model sometimes echoes the label back as its dc-title; nothing to add.
  if (dcTitle.replace(/#/g, "").trim().toLowerCase() === label.toLowerCase()) return label
  return `${label} — ${dcTitle}`
}

// Candidate hub paths for a subject, most likely first. Two shapes exist:
// a folder-index hub ("management-accounting/index.md") and a top-level one
// ("operations-management.md"). Rather than hard-code which subject uses which,
// the caller probes these in order and takes the first that exists.
export function hubCandidates(wikiRoot, subject) {
  const slug = slugify(subject)
  if (!slug) return []
  const dir = subjectDir(subject)
  const folderFirst = !dir || dir === slug
  const paths = folderFirst
    ? [`${wikiRoot}/${slug}/index.md`, `${wikiRoot}/${slug}.md`]
    : [`${wikiRoot}/${slug}.md`, `${wikiRoot}/${slug}/index.md`]
  return [...new Set(paths)]
}

// The wiki-relative page id of a hub path — what `relations: part-of:` and
// `[[wikilinks]]` use: "llm-wiki/wiki/operations-management.md" →
// "operations-management".
export function pageId(wikiRoot, path) {
  return String(path).replace(new RegExp(`^${wikiRoot}/`), "").replace(/\.md$/, "")
}

const escapeCell = (s) => String(s || "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim()

// Build a row that matches the table already in the hub. Seminar tables were
// written by hand and do not all have the same columns ("| # | Note | Core |"
// vs "| Note | Date | Covers |"), so the row is assembled from whatever the
// header says rather than assuming a fixed shape.
export function rowForHeader(headerCells, { link, date, covers, num }) {
  return (
    "| " +
    headerCells
      .map((h) => {
        const k = h.toLowerCase().trim()
        if (k === "#" || k.includes("session")) return escapeCell(num)
        if (k.includes("note") || k.includes("page")) return link
        if (k.includes("date")) return escapeCell(date)
        if (k.includes("cover") || k.includes("core") || k.includes("what") || k.includes("desc"))
          return escapeCell(covers)
        return ""
      })
      .join(" | ") +
    " |"
  )
}

const isTableLine = (l) => l.trim().startsWith("|")
const cellsOf = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim())

const DEFAULT_SECTION = [
  "## Seminars",
  "",
  "> Notes reconstructed from the in-class recordings.",
  "",
  "| Note | Date | Covers |",
  "| --- | --- | --- |",
]

// Insert a row for `link` into the hub's "## Seminars" table, creating the
// section when the subject has never had one. Returns the new text, or null
// when nothing changed — the note is already listed, so a re-save (the retry
// path) does not duplicate the row.
export function insertSeminarRow(hubText, { link, date, covers, num, target }) {
  const text = String(hubText)
  if (target && text.includes(`[[${target}`)) return null

  const lines = text.split("\n")
  const start = lines.findIndex((l) => /^##\s+Seminars\b/i.test(l.trim()))

  if (start === -1) {
    const row = rowForHeader(["Note", "Date", "Covers"], { link, date, covers, num })
    const body = text.replace(/\s*$/, "")
    return `${body}\n\n${DEFAULT_SECTION.join("\n")}\n${row}\n`
  }

  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      end = i
      break
    }
  }

  let header = -1
  let last = -1
  for (let i = start + 1; i < end; i++) {
    if (!isTableLine(lines[i])) continue
    if (header === -1) header = i
    last = i
  }

  if (header === -1) {
    // A Seminars section that is prose only — give it a table.
    const row = rowForHeader(["Note", "Date", "Covers"], { link, date, covers, num })
    const insertAt = end
    const block = ["", "| Note | Date | Covers |", "| --- | --- | --- |", row]
    lines.splice(insertAt, 0, ...block)
    return lines.join("\n")
  }

  const row = rowForHeader(cellsOf(lines[header]), { link, date, covers, num })
  lines.splice(last + 1, 0, row)
  return lines.join("\n")
}
