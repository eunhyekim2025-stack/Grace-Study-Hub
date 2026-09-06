// Vercel serverless function: VIEW + EDIT the owner's Google Calendar straight
// from the site (the in-recording calendar panel). Unlike /api/schedule (which
// only READS a secret .ics feed and cannot edit), this talks to the Google
// Calendar API v3 with OAuth so events carry real IDs that can be patched or
// deleted. Password-gated with the same ADD_SECRET as the rest of the site.
//
// Actions (POST body { action, password, ... }):
//   { action: "list" }                                   → { ok, events:[{id,title,start,end,allDay,location}] }
//   { action: "insert", title, start, end, location }    → { ok, event }
//   { action: "patch",  id, title?, start?, end?, location? } → { ok, event }
//   { action: "delete", id }                             → { ok }
// `start`/`end` are ISO datetime strings (e.g. "2026-09-10T14:00").
//
// OAuth (single-user, refresh-token model): on EACH request we POST the stored
// refresh token to Google's token endpoint to mint a short-lived access token,
// then call the Calendar API with it. No token is ever stored client-side.
//
// Required Vercel env vars:
//   ADD_SECRET            — shared password (same one the modal sends)
//   GOOGLE_CLIENT_ID      — OAuth 2.0 client ID (Google Cloud console)
//   GOOGLE_CLIENT_SECRET  — OAuth 2.0 client secret
//   GOOGLE_REFRESH_TOKEN  — a refresh token minted once for this user with the
//                           https://www.googleapis.com/auth/calendar scope
//   GOOGLE_CALENDAR_ID    — optional; defaults to "primary"
//
// If the Google env vars are ABSENT (e.g. local dev, not yet connected) the
// endpoint returns 503 { error: "calendar-not-connected" } so the UI can show a
// friendly "Google Calendar 연동 필요" hint instead of crashing.
//
// Runtime: Node (native fetch, no npm dependencies).

const TOKEN_URL = "https://oauth2.googleapis.com/token"
const API_BASE = "https://www.googleapis.com/calendar/v3"
const WINDOW_DAYS = 21 // how far ahead "list" looks
const MAX_EVENTS = 50

// Exchange the long-lived refresh token for a short-lived access token. Returns
// { token } on success or { error, status } on failure.
async function getAccessToken(clientId, clientSecret, refreshToken) {
  let res
  try {
    res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })
  } catch (e) {
    return { error: "Could not reach Google token endpoint: " + e.message, status: 502 }
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    // A revoked/expired refresh token surfaces here (invalid_grant); make it
    // legible rather than a raw 400.
    const msg = data.error_description || data.error || `token exchange failed (${res.status})`
    return { error: "Google auth failed: " + msg, status: 502 }
  }
  return { token: data.access_token }
}

// One authenticated Calendar API call. Returns { ok, status, data }.
async function cal(token, path, init = {}) {
  const res = await fetch(API_BASE + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  })
  // DELETE returns 204 with no body.
  if (res.status === 204) return { ok: true, status: 204, data: {} }
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

// Normalize a Google event into the shape the client renders. Google uses
// { dateTime } for timed events and { date } for all-day ones.
function shape(ev) {
  const s = ev.start || {}
  const e = ev.end || {}
  const allDay = !!s.date && !s.dateTime
  return {
    id: ev.id,
    title: ev.summary || "(untitled)",
    start: s.dateTime || s.date || "",
    end: e.dateTime || e.date || "",
    allDay,
    location: ev.location || "",
  }
}

// Build the { start, end } payload Google expects from ISO datetime strings.
// The client sends full RFC3339 timestamps WITH a UTC offset (…Z) — a bare
// wall-clock string with no offset/timeZone is rejected by the Calendar API — so
// we pass them straight through as start.dateTime / end.dateTime.
function whenPayload(start, end) {
  const out = {}
  if (start) out.start = { dateTime: start }
  if (end) out.end = { dateTime: end }
  return out
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

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  const calId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || "primary")
  // Not connected yet → a clear 503 so the UI shows a friendly hint, not a crash.
  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(503).json({
      error: "calendar-not-connected",
      message:
        "Google Calendar not connected — set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN in Vercel.",
    })
  }

  const auth = await getAccessToken(clientId, clientSecret, refreshToken)
  if (auth.error) return res.status(auth.status).json({ error: auth.error })
  const token = auth.token

  const action = body.action || "list"

  try {
    if (action === "list") {
      const now = new Date()
      const timeMax = new Date(now.getTime() + WINDOW_DAYS * 24 * 60 * 60 * 1000)
      const qs = new URLSearchParams({
        timeMin: now.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: "true",
        orderBy: "startTime",
        maxResults: String(MAX_EVENTS),
      })
      const r = await cal(token, `/calendars/${calId}/events?${qs}`)
      if (!r.ok) return res.status(r.status).json({ error: r.data?.error?.message || "Calendar list failed" })
      const events = (r.data.items || []).map(shape)
      return res.status(200).json({ ok: true, events })
    }

    if (action === "insert") {
      const title = String(body.title || "").trim()
      const { start, end } = body
      if (!title || !start || !end) {
        return res.status(400).json({ error: "title, start and end are required." })
      }
      const payload = { summary: title, ...whenPayload(start, end) }
      if (body.location) payload.location = String(body.location)
      const r = await cal(token, `/calendars/${calId}/events`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (!r.ok) return res.status(r.status).json({ error: r.data?.error?.message || "Calendar insert failed" })
      return res.status(200).json({ ok: true, event: shape(r.data) })
    }

    if (action === "patch") {
      const id = String(body.id || "").trim()
      if (!id) return res.status(400).json({ error: "Event id is required." })
      const payload = {}
      if (typeof body.title === "string" && body.title.trim()) payload.summary = body.title.trim()
      if (typeof body.location === "string") payload.location = body.location
      Object.assign(payload, whenPayload(body.start, body.end))
      if (!Object.keys(payload).length) {
        return res.status(400).json({ error: "Nothing to update." })
      }
      const r = await cal(token, `/calendars/${calId}/events/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      })
      if (!r.ok) return res.status(r.status).json({ error: r.data?.error?.message || "Calendar update failed" })
      return res.status(200).json({ ok: true, event: shape(r.data) })
    }

    if (action === "delete") {
      const id = String(body.id || "").trim()
      if (!id) return res.status(400).json({ error: "Event id is required." })
      const r = await cal(token, `/calendars/${calId}/events/${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
      // 410 Gone = already deleted; treat as success (idempotent).
      if (!r.ok && r.status !== 410) {
        return res.status(r.status).json({ error: r.data?.error?.message || "Calendar delete failed" })
      }
      return res.status(200).json({ ok: true })
    }

    return res.status(400).json({ error: "Unknown action." })
  } catch (e) {
    return res.status(502).json({ error: "Calendar request failed: " + e.message })
  }
}
