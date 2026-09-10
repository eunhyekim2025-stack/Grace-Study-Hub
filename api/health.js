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

// Live Google Calendar OAuth diagnostic. Reproduces exactly what api/calendar.js
// does — a refresh_token → access_token exchange with the RAW env values — and
// returns Google's own error verbatim, so "The OAuth client was not found"
// (bad/deleted client_id), "invalid_client: Unauthorized" (bad secret) and
// "invalid_grant" (revoked/expired refresh token) are told apart. Only the
// non-secret SHAPE of each value is reported (length, expected prefix/suffix,
// stray-whitespace flag, format booleans) — never any part of the values
// themselves, since a wrong value may be some other real secret.
async function checkCalendar() {
  const clientId = process.env.GOOGLE_CLIENT_ID || ""
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || ""
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN || ""
  const shape = {
    clientId: {
      present: !!clientId.trim(),
      length: clientId.length,
      trimmedLength: clientId.trim().length, // ≠ length ⇒ stray spaces/newline
      endsWithGoogleusercontent: clientId.trim().endsWith(".apps.googleusercontent.com"),
      looksLikeGoogleClientId: /^[0-9]+-[a-z0-9-]+\.apps\.googleusercontent\.com$/.test(
        clientId.trim(),
      ),
    },
    clientSecret: {
      present: !!clientSecret.trim(),
      length: clientSecret.length,
      trimmedLength: clientSecret.trim().length,
      looksLikeGoogleSecret: clientSecret.trim().startsWith("GOCSPX-"),
    },
    refreshToken: {
      present: !!refreshToken.trim(),
      length: refreshToken.length,
      trimmedLength: refreshToken.trim().length,
      startsWith1Slash: refreshToken.trim().startsWith("1//"),
    },
  }
  if (!clientId || !clientSecret || !refreshToken) {
    return { ...shape, tokenExchange: { skipped: "one of the three is missing" } }
  }
  try {
    // RAW values (no trim) — same as api/calendar.js, so the error matches prod.
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })
    const d = await r.json().catch(() => ({}))
    return {
      ...shape,
      tokenExchange: {
        ok: r.ok && !!d.access_token,
        status: r.status,
        error: d.error || null,
        errorDescription: d.error_description || null,
      },
    }
  } catch (e) {
    return { ...shape, tokenExchange: { ok: false, error: "connect-failed", errorDescription: e.message } }
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
      // Google Calendar OAuth (booleans only — never the values). CALENDAR_ID is
      // optional (defaults to "primary"), so it does not gate the feature.
      GOOGLE_CLIENT_ID: present(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_SECRET: present(process.env.GOOGLE_CLIENT_SECRET),
      GOOGLE_REFRESH_TOKEN: present(process.env.GOOGLE_REFRESH_TOKEN),
      GOOGLE_CALENDAR_ID: present(process.env.GOOGLE_CALENDAR_ID),
    },
    // what each feature needs
    features: {
      addNote: present(process.env.GITHUB_TOKEN) && present(process.env.ADD_SECRET),
      aiTidyAndLectureNotes: present(process.env.GROQ_API_KEY),
      transcription: present(process.env.GROQ_API_KEY),
      // static token OR OIDC store id — either connects the private Blob store
      recordingBackup:
        present(process.env.BLOB_READ_WRITE_TOKEN) || present(process.env.BLOB_STORE_ID),
      // in-site calendar view/edit needs the three OAuth secrets (id defaults)
      calendar:
        present(process.env.GOOGLE_CLIENT_ID) &&
        present(process.env.GOOGLE_CLIENT_SECRET) &&
        present(process.env.GOOGLE_REFRESH_TOKEN),
    },
  }
  // Opt-in live key validation (one extra outbound request to Groq).
  if (String(req.query?.check || "").includes("groq")) {
    out.groq = await checkGroq()
  }
  // Opt-in live Google Calendar OAuth diagnostic (?check=calendar).
  if (String(req.query?.check || "").includes("calendar")) {
    out.calendar = await checkCalendar()
  }
  res.status(200).json(out)
}
