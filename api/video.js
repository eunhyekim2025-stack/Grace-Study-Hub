// Vercel serverless function: take a video link (YouTube) and return its
// transcript so the client can turn it into a study note via /api/add
// (mode:"lecture") — the exact same pipeline the in-site recorder uses after
// stitching its audio segments. No audio download or Whisper needed: we read
// the video's caption track (manual or auto-generated) straight from YouTube.
//
// Why captions instead of downloading+transcribing: Vercel serverless can't run
// yt-dlp and a 1-hour lecture won't fit a single function invocation. Captions
// are just text, so this stays fast and free. Videos with NO captions can't be
// handled here — we return a clear 422 so the UI can explain that.
//
// Required Vercel env vars:
//   ADD_SECRET  — shared password (same one the add-content modal sends)
//
// Runtime: Node (global fetch — Node 18+).

export const config = { maxDuration: 30 }

// Public InnerTube key (the constant every YouTube web client ships with) and
// the mobile client contexts. We ask InnerTube's /player endpoint as the ANDROID
// or IOS app because, since 2024, the caption URLs from the *web* watch page
// return an empty body without a BotGuard "pot" token — the mobile clients still
// serve caption text directly.
const INNERTUBE_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
const CLIENTS = [
  {
    name: "IOS",
    ua: "com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3 like Mac OS X)",
    context: { clientName: "IOS", clientVersion: "20.10.4", hl: "en" },
  },
  {
    name: "ANDROID",
    ua: "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip",
    context: { clientName: "ANDROID", clientVersion: "20.10.38", androidSdkVersion: 30, hl: "en" },
  },
]

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

// Pull the 11-char video id out of any common YouTube URL shape.
function videoId(url) {
  try {
    const u = new URL(String(url).trim())
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null
    if (host.endsWith("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v")
      const m = u.pathname.match(/\/(?:shorts|embed|live|v)\/([^/?#]+)/)
      if (m) return m[1]
    }
  } catch {
    /* not a URL — fall through to a loose match */
  }
  const m = String(url).match(/[a-zA-Z0-9_-]{11}/)
  return m ? m[0] : null
}

// Ask InnerTube's /player as each mobile client until one returns a playable
// response. Returns the parsed player response (has videoDetails + captions).
async function getPlayerResponse(id) {
  let last = null
  for (const c of CLIENTS) {
    try {
      const r = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "User-Agent": c.ua },
        body: JSON.stringify({ context: { client: c.context }, videoId: id }),
      })
      if (!r.ok) continue
      const data = await r.json()
      last = data
      const status = data?.playabilityStatus?.status
      const hasCaptions =
        (data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || []).length > 0
      if (status === "OK" && hasCaptions) return data
    } catch {
      /* try next client */
    }
  }
  return last
}

// Prefer a human (non-ASR) track; within that, prefer Korean/English; else take
// whatever exists (the note step translates to English anyway).
function pickTrack(tracks) {
  const score = (t) => {
    let s = 0
    if (t.kind !== "asr") s += 4 // manual captions beat auto-generated
    const lang = (t.languageCode || "").toLowerCase()
    if (lang.startsWith("ko")) s += 2
    else if (lang.startsWith("en")) s += 1
    return s
  }
  return [...tracks].sort((a, b) => score(b) - score(a))[0]
}

function decodeEntities(s) {
  return s
    .replace(/&#39;|&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
}

// The mobile clients return either json3 ({events:[{segs:[{utf8}]}]}) or a
// timedtext XML (<p>…<s>word</s></p>). Handle both: prefer json3, detect by the
// first non-space char, and strip tags for the XML case.
async function fetchCaptionText(baseUrl) {
  const url = baseUrl + (baseUrl.includes("?") ? "&" : "?") + "fmt=json3"
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en" } })
  if (!r.ok) return ""
  const raw = (await r.text()).trim()
  if (!raw) return ""

  if (raw[0] === "{") {
    try {
      const data = JSON.parse(raw)
      // Concatenate word-pieces within a cue, but put a space between cues so
      // sentences don't run together (e.g. "…했습니다. 그래서…").
      return (data.events || [])
        .map((e) => (e.segs || []).map((s) => s.utf8 || "").join(""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    } catch {
      /* fall through to tag-strip */
    }
  }
  // XML timedtext (any format) — drop tags, decode entities, collapse space.
  return decodeEntities(raw.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
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

  const id = videoId(body.url)
  if (!id) {
    return res.status(400).json({ error: "유효한 YouTube 링크가 아닙니다." })
  }

  try {
    const pr = await getPlayerResponse(id)
    if (!pr) {
      return res
        .status(502)
        .json({ error: "영상 정보를 읽지 못했습니다 (YouTube가 요청을 막았을 수 있어요). 잠시 후 다시 시도하세요." })
    }

    const status = pr.playabilityStatus?.status
    if (status && status !== "OK") {
      const reason = pr.playabilityStatus?.reason || status
      return res.status(422).json({ error: `재생할 수 없는 영상입니다: ${reason}` })
    }

    const title = pr.videoDetails?.title || `YouTube ${id}`
    const tracks = pr.captions?.playerCaptionsTracklistRenderer?.captionTracks || []
    if (!tracks.length) {
      return res.status(422).json({
        error: "이 영상에는 자막이 없어 노트를 만들 수 없습니다. 자막(자동 생성 포함)이 있는 영상을 사용하세요.",
      })
    }

    const track = pickTrack(tracks)
    const transcript = await fetchCaptionText(track.baseUrl)
    if (!transcript) {
      return res
        .status(422)
        .json({ error: "자막을 가져왔지만 내용이 비어 있습니다. 다른 영상으로 시도해 보세요." })
    }

    return res.status(200).json({
      ok: true,
      videoId: id,
      title,
      language: track.languageCode || "",
      autoGenerated: track.kind === "asr",
      length: transcript.length,
      transcript,
    })
  } catch (e) {
    return res.status(500).json({ error: "자막 추출 중 오류: " + (e?.message || "unknown") })
  }
}
