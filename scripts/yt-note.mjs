#!/usr/bin/env node
// Turn a YouTube link into wiki notes FROM YOUR OWN MACHINE.
//
// Why this exists: the site's "영상 링크 → 강의 노트" button calls /api/video on
// Vercel, and YouTube bot-gates datacenter IPs ("Sign in to confirm you're not
// a bot"), so it fails for most videos. The caption fetch has to happen on a
// residential connection. This script reuses the exact same extraction code
// (api/_youtube.js) locally, then posts the transcript to the deployed /api/add
// — so the note lands in the wiki identically to one made from the browser.
//
// Usage:
//   node scripts/yt-note.mjs <youtube-url> [options]
//
//   --chapters            one note per chapter (long lectures); resumable
//   --title "..."         note title (default: the video's title)
//   --subject <slug>      wiki subject folder, e.g. business-law
//   --tags "a, b"         extra tags (default: "lecture, video")
//   --save <file>         write the raw transcript to a file
//   --dry-run             fetch + report only; create no notes
//   --site <url>          target site (default $SITE_URL or the live site)
//   --password <pw>       add-password (default: $ADD_SECRET, then ADD_SECRET
//                         in the repo's .env, else prompted)
//
// Examples:
//   node scripts/yt-note.mjs https://youtu.be/7gwFmNAO4Vo
//   node scripts/yt-note.mjs <url> --chapters --subject business-law
//   node scripts/yt-note.mjs <url> --dry-run --save lecture.txt   # for NotebookLM

import { createInterface } from "node:readline"
import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { buildChapters, cuesToText, getCaptions, videoId } from "../api/_youtube.js"

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const WIKI_DIR = join(REPO_ROOT, "llm-wiki", "wiki")

// Pick up ADD_SECRET from the repo's .env so you set the add-password once
// instead of exporting it every shell. A value already in the environment wins,
// and .env* is gitignored, so the secret never leaves this machine.
//
// process.loadEnvFile needs Node ≥20.12. We check for it explicitly rather than
// catching: a blanket try/catch would make an old Node look exactly like "no
// .env file" and drop you at the password prompt with no idea why.
const ENV_FILE = join(REPO_ROOT, ".env")
if (!process.env.ADD_SECRET && existsSync(ENV_FILE)) {
  if (typeof process.loadEnvFile !== "function") {
    console.error(
      `! ${ENV_FILE} 를 읽으려면 Node 20.12 이상이 필요합니다 (현재 ${process.version}). ` +
        "비밀번호를 직접 입력하거나 --password 를 쓰세요.",
    )
  } else {
    try {
      process.loadEnvFile(ENV_FILE)
    } catch (e) {
      console.error(`! .env 를 읽지 못했습니다: ${e?.message || e}`)
    }
  }
}

const DEFAULT_SITE = "https://grace-study-hub.vercel.app"
// Chapter progress lives outside the repo so it never gets committed. Mirrors
// the browser's localStorage resume: rerun after a rate limit and it continues.
const STATE_DIR = join(homedir(), ".cache", "grace-yt-note")

const FLAGS_WITH_VALUE = ["title", "subject", "tags", "save", "site", "password"]

function parseArgs(argv) {
  const opts = { chapters: false, dryRun: false }
  const rest = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--chapters") opts.chapters = true
    else if (a === "--dry-run") opts.dryRun = true
    else if (a === "--help" || a === "-h") opts.help = true
    else if (a.startsWith("--")) {
      const name = a.slice(2)
      if (!FLAGS_WITH_VALUE.includes(name)) fail(`알 수 없는 옵션: ${a}`)
      const v = argv[++i]
      if (v === undefined) fail(`${a} 뒤에 값이 필요합니다.`)
      opts[name] = v
    } else rest.push(a)
  }
  opts.url = rest[0]
  return opts
}

function fail(msg) {
  console.error("✖ " + msg)
  process.exit(1)
}

const usage = () =>
  console.log(
    [
      "사용법: node scripts/yt-note.mjs <youtube-url> [옵션]",
      "",
      "  --chapters         챕터별로 노트 1개씩 (긴 강의). 중단돼도 다시 실행하면 이어서 생성",
      "  --title <제목>     노트 제목 (기본: 영상 제목)",
      "  --subject <slug>   과목 폴더 (예: business-law)",
      '  --tags "a, b"      태그 추가 (기본: "lecture, video")',
      "  --save <파일>      자막 원문을 파일로 저장 (NotebookLM에 넣을 때)",
      "  --dry-run          자막만 확인하고 노트는 만들지 않음",
      "  --site <url>       대상 사이트 (기본: $SITE_URL 또는 " + DEFAULT_SITE + ")",
      "  --password <pw>    추가 비밀번호 (기본: $ADD_SECRET → .env의 ADD_SECRET → 직접 입력)",
    ].join("\n"),
  )

// Prompt without echoing. Node has no built-in hidden input, so we mute the
// output stream while the user types.
function askHidden(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    process.stdout.write(question)
    rl.output.write = () => {} // swallow the echo, keep the prompt above
    rl.question("", (answer) => {
      rl.close()
      process.stdout.write("\n")
      resolve(answer.trim())
    })
  })
}

// Resume state is keyed by the video AND by everything that changes which notes
// a run produces — target site, subject folder, title. Keying on the video alone
// would make a second run under a different --subject/--title/--site report
// "already complete" and silently create nothing.
function resumeKey(id, { site, subject, baseTitle }) {
  const h = createHash("sha1")
    .update([site, subject || "", baseTitle].join("\n"))
    .digest("hex")
    .slice(0, 10)
  return `${id}-${h}`
}

const stateFile = (key) => join(STATE_DIR, key + ".json")

async function readDone(key) {
  try {
    const a = JSON.parse(await readFile(stateFile(key), "utf8"))
    return new Set(Array.isArray(a) ? a.filter((n) => typeof n === "number") : [])
  } catch {
    return new Set()
  }
}

async function markDone(key, done, idx) {
  done.add(idx)
  await mkdir(STATE_DIR, { recursive: true })
  await writeFile(stateFile(key), JSON.stringify([...done]))
}

// The tag vocabulary /api/add's auto-tagger reuses. In the browser this comes
// from the page (#sh-known-tags); here we harvest it from the vault's own
// frontmatter — this repo IS the one /api/add commits into. Without it the
// model invents fresh tags instead of reusing the ones already in the wiki.
async function knownTags() {
  const tags = new Set()
  async function walk(dir) {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return // no local vault checkout — send nothing, same as a cold browser
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) await walk(p)
      else if (e.name.endsWith(".md")) {
        const head = (await readFile(p, "utf8").catch(() => "")).slice(0, 800)
        const fm = head.match(/^---\n([\s\S]*?)\n---/)
        const line = fm && fm[1].match(/^tags:\s*\[(.*)\]\s*$/m)
        if (line) {
          for (const t of line[1].split(",")) {
            const v = t.trim().replace(/^["']|["']$/g, "")
            if (v) tags.add(v)
          }
        }
      }
    }
  }
  await walk(WIKI_DIR)
  return [...tags].slice(0, 250)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const mmss = (ms) => {
  const s = Math.round(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

// POST one note to /api/add. Returns { ok, path } or { ok:false, status, error }.
async function addNote(site, password, { title, subject, tags, content, vocab }) {
  const res = await fetch(site + "/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "note",
      title,
      subject: subject || "",
      tags,
      content,
      mode: "lecture", // same AI pass the recorder and the site's video button use
      knownTags: vocab,
      password,
    }),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, path: data.path, error: data.error }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help || !opts.url) {
    usage()
    process.exit(opts.help ? 0 : 1) // no URL is a usage error; --help is not
  }

  const id = videoId(opts.url)
  if (!id) fail("유효한 YouTube 링크가 아닙니다: " + opts.url)

  const site = (opts.site || process.env.SITE_URL || DEFAULT_SITE).replace(/\/+$/, "")
  // Never auto-send the stored secret to a host typed on the command line: one
  // mistyped --site would hand the wiki's add-password to a stranger. $SITE_URL
  // counts as trusted — you set it deliberately, in your own environment.
  const untrustedSite = !!opts.site && site !== DEFAULT_SITE
  let password = opts.password || (untrustedSite ? "" : process.env.ADD_SECRET) || ""
  if (!password && !opts.dryRun) {
    if (untrustedSite) {
      console.log(
        `▸ ${site} 는 기본 사이트가 아닙니다 — 저장된 비밀번호를 자동으로 보내지 않습니다.`,
      )
    }
    password = await askHidden("추가 비밀번호: ")
    if (!password) fail("비밀번호가 필요합니다. (또는 `.env`의 ADD_SECRET)")
  }

  console.log(`▸ 자막을 가져오는 중… (${id})`)
  const result = await getCaptions(id)
  if (result.error) fail(result.error)

  const { title: videoTitle, cues, description, durationMs, language, autoGenerated } = result
  const transcript = cuesToText(cues)
  console.log(`  제목: ${videoTitle}`)
  console.log(
    `  ${autoGenerated ? "자동 생성 자막" : "자막"} · ${language || "?"} · ` +
      `${transcript.length.toLocaleString()}자` +
      (durationMs ? ` · ${mmss(durationMs)}` : ""),
  )

  if (opts.save) {
    await writeFile(opts.save, transcript, "utf8")
    console.log(`  자막 저장 → ${opts.save}`)
  }

  const baseTitle = opts.title || videoTitle || "Video note"
  const tags = opts.tags || "lecture, video"
  const vocab = opts.dryRun ? [] : await knownTags()

  if (!opts.chapters) {
    if (opts.dryRun) return console.log("▸ --dry-run: 노트는 만들지 않았습니다.")
    console.log("▸ 강의 노트를 만드는 중… (10~40초)")
    const r = await addNote(site, password, {
      title: baseTitle,
      subject: opts.subject,
      tags,
      content: transcript,
      vocab,
    })
    if (!r.ok) fail(`노트 생성 실패 (${r.status}): ${r.error || "unknown"}`)
    console.log(`✔ 저장됨 → ${r.path} · 1–2분 뒤 사이트에 반영됩니다.`)
    return
  }

  // ── Chapter mode ────────────────────────────────────────────────────────
  const chapters = buildChapters(cues, description, durationMs)
  if (!chapters.length) fail("챕터를 만들 자막이 없습니다.")
  console.log(`▸ ${chapters.length}개 챕터로 분할됨`)
  chapters.forEach((ch, i) =>
    console.log(`   ${String(i + 1).padStart(2)}. [${mmss(ch.startMs)}] ${ch.title} (${ch.chars.toLocaleString()}자)`),
  )
  if (opts.dryRun) return console.log("▸ --dry-run: 노트는 만들지 않았습니다.")

  const key = resumeKey(id, { site, subject: opts.subject, baseTitle })
  const done = await readDone(key)
  const todo = chapters.map((ch, i) => ({ ...ch, index: i })).filter((ch) => !done.has(ch.index))
  if (!todo.length) return console.log(`✔ 이미 ${chapters.length}개 챕터 노트가 모두 생성돼 있습니다.`)

  let made = chapters.length - todo.length
  for (let n = 0; n < todo.length; n++) {
    const ch = todo[n]
    console.log(`▸ ${made + 1}/${chapters.length} · ${ch.title}`)
    const r = await addNote(site, password, {
      title: `${baseTitle} — ${ch.title}`,
      subject: opts.subject,
      tags: tags + ", chapter",
      content: ch.transcript,
      vocab,
    })
    if (r.ok) {
      await markDone(key, done, ch.index)
      made++
      console.log(`  ✔ ${r.path}`)
    } else if (r.status === 422 && /exist/i.test(r.error || "")) {
      // A note with this title already exists — treat as done and continue.
      await markDone(key, done, ch.index)
      made++
      console.log("  · 이미 존재함 — 건너뜀")
    } else {
      // Likely a Groq rate/day limit — stop so a rerun can resume from here.
      fail(
        `${made}/${chapters.length} 생성 후 중단 (${r.status}): ${r.error || "unknown"}\n` +
          "  잠시 뒤 같은 명령을 다시 실행하면 이어서 만듭니다.",
      )
    }
    if (n < todo.length - 1) await sleep(1500) // ease off Groq between chapters
  }
  console.log(`✔ 완료 · ${chapters.length}개 챕터 노트 · 1–2분 뒤 사이트에 반영됩니다.`)
}

main().catch((e) => fail(e?.message || String(e)))
