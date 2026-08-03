// Vercel serverless function: turn a WEB PAGE into study note(s). Fetches the
// URL server-side (public pages only — no bot-gate like YouTube) and returns
// cleaned text the client hands to /api/add (AI-structured note).
//
// Two behaviours:
//  • SQLBolt (sqlbolt.com): the whole interactive SQL course. A bare/index link
//    returns ALL ~18 lessons as `pages[]` (one note each); a /lesson/<slug> link
//    returns just that lesson. Content is server-rendered in <div class="text">.
//  • Any other URL: a generic reader — strips chrome and returns the main text
//    as a single note.
//
// Required Vercel env vars: ADD_SECRET (same password the add-content modal sends).
// Runtime: Node (global fetch — Node 18+).

export const config = { maxDuration: 60 }

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#39;|&#039;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

async function getHtml(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.text()
}

// Turn <hN> into "## heading" then strip remaining tags → readable text.
function htmlToText(fragment) {
  const withHeads = fragment.replace(
    /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi,
    (_, __, inner) => "\n\n## " + inner.replace(/<[^>]+>/g, "").trim() + "\n",
  )
  return decodeEntities(withHeads.replace(/<[^>]+>/g, " "))
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

// ── SQLBolt ────────────────────────────────────────────────────────────────
function sqlboltTitle(html, fallback) {
  const m = html.match(/<title>([^<]*)<\/title>/i)
  if (!m) return fallback
  const parts = decodeEntities(m[1]).split(" - ")
  return parts[parts.length - 1].trim() || fallback
}

// Lesson prose starts at the first <h1> and ends before the footer. The leading
// nav menu (before the first <h1>) and trailing footer/ads are dropped.
function extractSqlboltLesson(html, fallbackTitle) {
  let s = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  const h1 = s.search(/<h1[ >]/i)
  if (h1 >= 0) s = s.slice(h1)
  s = s.split(/<footer/i)[0]
  return { title: sqlboltTitle(html, fallbackTitle), text: htmlToText(s) }
}

// Parse the lesson list (slug + title) from the course index nav.
function parseSqlboltLessons(indexHtml) {
  const out = []
  const seen = new Set()
  const re = /<a[^>]+href="\/lesson\/([a-z_]+)"[^>]*>([\s\S]*?)<\/a>/gi
  let m
  while ((m = re.exec(indexHtml))) {
    const slug = m[1]
    if (seen.has(slug) || slug === "introduction") continue // index page itself
    seen.add(slug)
    const title = decodeEntities(m[2].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
    out.push({ slug, title: title || slug })
  }
  return out
}

async function sqlboltAllLessons() {
  const index = await getHtml("https://sqlbolt.com/")
  const lessons = parseSqlboltLessons(index)
  const pages = []
  let i = 0
  for (const l of lessons) {
    try {
      const html = await getHtml(`https://sqlbolt.com/lesson/${l.slug}`)
      const { title, text } = extractSqlboltLesson(html, l.title)
      if (text && text.length > 200) {
        pages.push({ index: i++, slug: l.slug, title: l.title || title, text })
      }
    } catch {
      // one lesson failing (e.g. a transient 500) shouldn't sink the batch
    }
  }
  return pages
}

// ── Generic reader ───────────────────────────────────────────────────────────
function extractGeneric(html) {
  const tm = html.match(/<title>([^<]*)<\/title>/i)
  const title = tm ? decodeEntities(tm[1]).trim() : "Web note"
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
  const main = s.match(/<article[\s\S]*?<\/article>/i) || s.match(/<main[\s\S]*?<\/main>/i)
  if (main) s = main[0]
  return { title, text: htmlToText(s).slice(0, 55000) }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })

  const secret = process.env.ADD_SECRET
  if (!secret) return res.status(500).json({ error: "Server not configured — set ADD_SECRET." })

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

  let u
  try {
    u = new URL(String(body.url).trim())
    if (!/^https?:$/.test(u.protocol)) throw new Error("scheme")
  } catch {
    return res.status(400).json({ error: "유효한 웹 링크(http/https)가 아닙니다." })
  }
  const host = u.hostname.replace(/^www\./, "")

  try {
    if (host === "sqlbolt.com") {
      const lessonM = u.pathname.match(/^\/lesson\/([a-z_]+)/)
      if (lessonM && lessonM[1] !== "introduction") {
        const html = await getHtml(`https://sqlbolt.com/lesson/${lessonM[1]}`)
        const { title, text } = extractSqlboltLesson(html, "SQLBolt lesson")
        if (!text || text.length < 100) {
          return res.status(422).json({ error: "이 SQLBolt 페이지에서 본문을 찾지 못했습니다." })
        }
        return res.status(200).json({ ok: true, source: "sqlbolt", title, text })
      }
      const pages = await sqlboltAllLessons()
      if (!pages.length) {
        return res.status(502).json({ error: "SQLBolt 레슨을 가져오지 못했습니다. 잠시 후 다시 시도하세요." })
      }
      return res.status(200).json({ ok: true, source: "sqlbolt", title: "SQLBolt", pages })
    }

    const html = await getHtml(u.href)
    const { title, text } = extractGeneric(html)
    if (!text || text.length < 100) {
      return res.status(422).json({
        error: "이 페이지에서 본문 텍스트를 찾지 못했습니다 (JS로 렌더되는 사이트일 수 있어요).",
      })
    }
    return res.status(200).json({ ok: true, source: "web", title, text })
  } catch (e) {
    return res.status(502).json({ error: "페이지를 가져오지 못했습니다: " + (e?.message || "unknown") })
  }
}
