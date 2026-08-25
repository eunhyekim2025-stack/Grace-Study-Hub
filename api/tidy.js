// Vercel serverless function: tidy ONE chunk of a long lecture transcript into
// clean study notes, or combine already-tidied section notes into one coherent
// note. This exists because Groq's free tier caps the chat model at ~8000 tokens
// per minute, so a 60–90-minute lecture cannot be summarized in a single
// /api/add request. The browser (see addContent.inline.ts) splits the transcript
// into budget-sized chunks, calls this per chunk — pacing itself off any 429 —
// then calls it once more with mode:"final" to stitch the sections together, and
// finally POSTs the result to /api/add with pretidied:true (no re-tidy).
//
// Required Vercel env vars: ADD_SECRET, GROQ_API_KEY, optional GROQ_MODEL.
// Runtime: Node 18+.

import { DESIGN_SPEC, sanitizeDcView, unfence } from "./_note.js"

const CHAT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"

export const config = { api: { bodyParser: { sizeLimit: "1mb" } }, maxDuration: 60 }

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
  if (!apiKey) return res.status(501).json({ error: "GROQ_API_KEY 미설정." })

  const title = String(body.title || "").slice(0, 200)
  const text = String(body.text || "")
  if (!text.trim()) return res.status(400).json({ error: "text is required." })
  const final = body.mode === "final"

  // "chunk" extracts faithful bullet notes from one slice; "final" organizes the
  // gathered section notes into one house-style note. Both stay small enough for
  // a single request to fit under the per-minute token ceiling.
  const prompt = final
    ? `You are assembling the final study note titled "${title}" for a Quartz markdown wiki. ` +
      `Below are SECTION NOTES extracted from consecutive parts of one lecture. Merge and ` +
      `organize them into a single, coherent, non-repetitive study note in ENGLISH. Keep ALL ` +
      `substantive content; do not invent anything not present.` +
      DESIGN_SPEC +
      `\n\nSECTION NOTES:\n"""\n${text.slice(0, 22000)}\n"""`
    : `You are turning ONE part of a raw lecture transcript into clean, faithful study notes ` +
      `for note "${title}". The transcript is auto speech-to-text (filler, false starts, no ` +
      `punctuation). Output concise Markdown bullet points capturing every substantive point, ` +
      `in ENGLISH (translate if the lecture is in another language). Remove filler. Do NOT ` +
      `invent facts. No preamble, no headings — just the bullets.` +
      `\n\nTRANSCRIPT PART:\n"""\n${text.slice(0, 16000)}\n"""`

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: final ? 4000 : 2200,
        temperature: 0.3,
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      // 429 = per-minute token budget hit; tell the client how long to wait so it
      // can pace the next chunk instead of failing the whole lecture.
      const retryHeader = r.headers.get("retry-after")
      const retryAfterMs = retryHeader ? Math.ceil(parseFloat(retryHeader) * 1000) : r.status === 429 ? 8000 : 0
      return res
        .status(200)
        .json({ ok: false, status: r.status, retryAfterMs, error: data?.error?.message || `groq-${r.status}` })
    }
    let out = data.choices?.[0]?.message?.content || ""
    if (final) out = sanitizeDcView(unfence(out))
    else out = unfence(out)
    return res.status(200).json({ ok: true, body: out })
  } catch (e) {
    return res.status(200).json({ ok: false, status: 0, retryAfterMs: 0, error: "exception: " + e.message })
  }
}
