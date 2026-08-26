// Tiny diagnostic: reports WHICH server env vars are configured — booleans only,
// never the values. Lets you (or the assistant) verify at a glance that the
// recording / AI features have what they need, without exposing any secret.
//   GET /api/health            →  { ok, env: {...}, features: {...} }
//   GET /api/health?check=groq →  same, plus `groq: {...}` — a LIVE check that
//     the GROQ_API_KEY is not just present but actually valid (Groq accepts it)
//     and that the Whisper model the recorder uses still exists. Presence alone
//     (env.GROQ_API_KEY:true) does NOT mean the key works — it can be expired,
//     revoked, or mistyped, which is the real cause behind an "empty transcript".
const WHISPER_MODEL = process.env.GROQ_WHISPER_MODEL || "whisper-large-v3"
const CHAT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"

async function checkGroq() {
  const key = process.env.GROQ_API_KEY
  if (!(typeof key === "string" && key.trim())) {
    return { keyPresent: false, keyValid: false, reason: "GROQ_API_KEY 미설정" }
  }
  try {
    const r = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { authorization: `Bearer ${key.trim()}` },
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      // 401 = bad/expired key, 429 = rate/quota exhausted, etc.
      return {
        keyPresent: true,
        keyValid: false,
        status: r.status,
        reason: data?.error?.message || `Groq ${r.status}`,
      }
    }
    const ids = Array.isArray(data.data) ? data.data.map((m) => m.id) : []
    const out = {
      keyPresent: true,
      keyValid: true,
      whisperModel: WHISPER_MODEL,
      whisperModelAvailable: ids.includes(WHISPER_MODEL),
      chatModel: CHAT_MODEL,
      chatModelAvailable: ids.includes(CHAT_MODEL),
    }
    // Probe just the configured chat model with a 1-token completion — proves the
    // account can actually use it (a 404 here silently sends every /api/add tidy
    // call to the raw-text fallback) and reads back the per-minute token ceiling.
    try {
      const c = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key.trim()}` },
        body: JSON.stringify({ model: CHAT_MODEL, messages: [{ role: "user", content: "ping" }], max_tokens: 1 }),
      })
      const cd = await c.json().catch(() => ({}))
      out.chat = {
        ok: c.ok,
        status: c.status,
        error: c.ok ? undefined : cd?.error?.message || `Groq ${c.status}`,
        limitTokensPerMin: c.headers.get("x-ratelimit-limit-tokens") || null,
      }
    } catch (e) {
      out.chat = { ok: false, error: "chat probe 실패: " + e.message }
    }
    return out
  } catch (e) {
    return { keyPresent: true, keyValid: false, reason: "Groq 연결 오류: " + e.message }
  }
}

export default async function handler(req, res) {
  const present = (v) => typeof v === "string" && v.trim().length > 0
  const out = {
    ok: true,
    env: {
      GITHUB_TOKEN: present(process.env.GITHUB_TOKEN),
      ADD_SECRET: present(process.env.ADD_SECRET),
      GROQ_API_KEY: present(process.env.GROQ_API_KEY),
      BLOB_READ_WRITE_TOKEN: present(process.env.BLOB_READ_WRITE_TOKEN),
      BLOB_STORE_ID: present(process.env.BLOB_STORE_ID),
    },
    // what each feature needs
    features: {
      addNote: present(process.env.GITHUB_TOKEN) && present(process.env.ADD_SECRET),
      aiTidyAndLectureNotes: present(process.env.GROQ_API_KEY),
      transcription: present(process.env.GROQ_API_KEY),
      // static token OR OIDC store id — either connects the private Blob store
      recordingBackup:
        present(process.env.BLOB_READ_WRITE_TOKEN) || present(process.env.BLOB_STORE_ID),
    },
  }
  // Opt-in live key validation (one extra outbound request to Groq).
  if (String(req.query?.check || "").includes("groq")) {
    out.groq = await checkGroq()
  }
  res.status(200).json(out)
}
