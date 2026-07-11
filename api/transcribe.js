// Vercel serverless function: transcribe one audio segment recorded in the
// browser. The in-site recorder (see addContent.inline.ts) rotates a long
// lecture into ~2-minute segments and POSTs each here as base64; we forward it
// to Groq's Whisper (whisper-large-v3) and return the text. The client stitches
// the segments back together in order and sends the full transcript to /api/add
// with mode:"lecture" to become a study note.
//
// Required Vercel env vars:
//   ADD_SECRET     — shared password (same one the modal sends)
//   GROQ_API_KEY   — free key from console.groq.com (also used by /api/add-subject)
//   GROQ_WHISPER_MODEL — optional; defaults to whisper-large-v3
//
// Runtime: Node (global fetch / FormData / Blob / Buffer — Node 18+).

export const config = {
  api: { bodyParser: { sizeLimit: "6mb" } },
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

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res
      .status(501)
      .json({ error: "GROQ_API_KEY 미설정 — 녹음 전사에는 Groq 키가 필요합니다 (Vercel 환경변수)." })
  }

  const { audioBase64, mimeType } = body
  if (!audioBase64) return res.status(400).json({ error: "audio is required." })

  const bytes = Buffer.from(String(audioBase64).replace(/^data:[^;]*;base64,/, ""), "base64")
  if (!bytes.length) return res.status(400).json({ error: "empty audio." })

  const type = mimeType || "audio/webm"
  const ext = type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : "webm"

  try {
    const form = new FormData()
    form.append("file", new Blob([bytes], { type }), `segment.${ext}`)
    form.append("model", process.env.GROQ_WHISPER_MODEL || "whisper-large-v3")
    form.append("response_format", "json")
    form.append("temperature", "0")

    const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}` },
      body: form,
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      return res
        .status(502)
        .json({ error: "Groq 전사 실패: " + (data?.error?.message || r.status) })
    }
    return res.status(200).json({ text: (data.text || "").trim() })
  } catch (e) {
    return res.status(502).json({ error: "전사 중 오류: " + e.message })
  }
}
