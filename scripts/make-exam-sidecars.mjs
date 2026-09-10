#!/usr/bin/env node
// Turn exam/exercise PDFs in the wiki into text sidecars the quiz generator can
// read for its FORMAT (question types, MCQ options, phrasing). The serverless
// /api/generate is dependency-free and cannot parse PDFs, so this local step
// (poppler `pdftotext`, with a `pymupdf` fallback) writes "<name>.pdf.txt" next
// to each exam PDF. Commit + push the sidecars; then quiz generation for that
// subject automatically mirrors the exam's formats.
//
//   node scripts/make-exam-sidecars.mjs [--force]
//
// Detected purely by filename — the same pattern /api/generate uses — so files
// named Exercise / Quiz / Midterm / Final / Exam / Tutorial / Practice / etc.
// are picked up with no extra flags.

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const WIKI = path.resolve("llm-wiki/wiki")
const FORCE = process.argv.includes("--force")
const EXEMPLAR_RE =
  /(exercise|quiz|midterm|final|exam|tutorial|practice|problem[\s_-]*set|worksheet|past[\s_-]*paper)/i

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function have(cmd) {
  try {
    execFileSync("which", [cmd], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function extract(pdf) {
  // 1) poppler pdftotext -layout (keeps columns/options readable)
  if (have("pdftotext")) {
    try {
      const t = execFileSync("pdftotext", ["-layout", pdf, "-"], {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
      })
      if ((t.match(/[A-Za-z]/g) || []).length >= 100) return t
    } catch {
      /* fall through */
    }
  }
  // 2) pymupdf (python) fallback
  try {
    const t = execFileSync(
      "python3",
      ["-c", "import sys,pymupdf;d=pymupdf.open(sys.argv[1]);print('\\n'.join(p.get_text() for p in d))", pdf],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    )
    if ((t.match(/[A-Za-z]/g) || []).length >= 100) return t
  } catch {
    /* fall through */
  }
  return "" // likely a scanned/image PDF → needs OCR (scripts/ingest.mjs)
}

if (!fs.existsSync(WIKI)) {
  console.error(`Wiki folder not found: ${WIKI} (run from the repo root)`)
  process.exit(1)
}

const pdfs = walk(WIKI).filter((p) => /\.pdf$/i.test(p) && EXEMPLAR_RE.test(path.basename(p)))
if (!pdfs.length) {
  console.log("No exam/exercise PDFs found under llm-wiki/wiki.")
  process.exit(0)
}

let made = 0
let skipped = 0
let failed = 0
for (const pdf of pdfs) {
  const sidecar = pdf + ".txt"
  if (!FORCE && fs.existsSync(sidecar) && fs.statSync(sidecar).mtimeMs >= fs.statSync(pdf).mtimeMs) {
    skipped++
    continue
  }
  const text = extract(pdf).trim()
  const rel = path.relative(process.cwd(), pdf)
  if (!text) {
    failed++
    console.warn(`⚠  no text layer: ${rel} — likely scanned; OCR it via scripts/ingest.mjs`)
    continue
  }
  fs.writeFileSync(sidecar, text + "\n")
  made++
  console.log(`✓  ${path.relative(process.cwd(), sidecar)}  (${text.length} chars)`)
}

console.log(`\nDone — ${made} written, ${skipped} up-to-date, ${failed} unreadable.`)
if (made) console.log("Commit + push the .pdf.txt sidecars so /api/generate can read them.")
