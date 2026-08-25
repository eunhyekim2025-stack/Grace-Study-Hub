// Vercel serverless function: return the owner's upcoming schedule from a
// PRIVATE Google Calendar feed. Password-gated (same ADD_SECRET as the rest of
// the site) so only Grace sees it — the calendar's secret .ics URL lives ONLY
// in a Vercel env var and is never exposed to the browser or the public repo.
//
// Flow:
//   POST { password }  →  { ok, events: [{ start, end, title, location, allDay }] }
// Wrong password → 401. No calendar configured → 501 (client shows a setup hint).
//
// Required Vercel env vars:
//   ADD_SECRET    — shared password (same one the add-content modal sends)
//   GCAL_ICS_URL  — Google Calendar "Secret address in iCal format" URL
//                   (Calendar settings → Integrate calendar → Secret address).
//
// Recurring class times (weekly RRULE), timezones and EXDATE/overrides are
// handled by node-ical. Singapore has no DST, so no offset correction is needed.
import ical from "node-ical"

const WINDOW_DAYS = 14 // how far ahead to show
// Safety cap on the payload only. It must be high enough to cover EVERY event in
// the [now-7d, now+14d] window — otherwise, because events are sorted ascending
// before slicing, the cap silently drops the LATEST days (a busy week with a few
// daily-recurring events easily passes 40, which cut Thu–Sun off the view).
const MAX_EVENTS = 500

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

  const url = process.env.GCAL_ICS_URL
  if (!url) return res.status(501).json({ error: "no-calendar", configured: false })

  let data
  try {
    data = await ical.async.fromURL(url)
  } catch (e) {
    return res.status(502).json({ error: "Could not fetch calendar: " + e.message })
  }

  const now = new Date()
  // Go back a week so the client can lay out the *current* Mon–Sun week even when
  // today is late in the week; go forward two weeks for the agenda tail.
  const rangeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const rangeEnd = new Date(now.getTime() + WINDOW_DAYS * 24 * 60 * 60 * 1000)
  const out = []

  const emit = (start, end, title, location, allDay) => {
    if (start < rangeStart || start > rangeEnd) return
    out.push({
      start: start.toISOString(),
      end: (end || start).toISOString(),
      title: title || "(untitled)",
      location: location || "",
      allDay: !!allDay,
    })
  }

  for (const k in data) {
    const ev = data[k]
    if (!ev || ev.type !== "VEVENT" || !ev.start) continue
    const durationMs = ev.end ? ev.end.getTime() - ev.start.getTime() : 0
    const isAllDay = ev.datetype === "date"

    if (ev.rrule) {
      const occurrences = ev.rrule.between(rangeStart, rangeEnd, true)
      for (const occ of occurrences) {
        const dayKey = occ.toISOString().slice(0, 10)
        // Skip cancelled instances
        if (ev.exdate && ev.exdate[dayKey]) continue
        // Use a moved/edited instance if one exists
        if (ev.recurrences && ev.recurrences[dayKey]) {
          const r = ev.recurrences[dayKey]
          emit(r.start, r.end, r.summary || ev.summary, r.location || ev.location, r.datetype === "date")
          continue
        }
        emit(occ, new Date(occ.getTime() + durationMs), ev.summary, ev.location, isAllDay)
      }
    } else {
      emit(ev.start, ev.end, ev.summary, ev.location, isAllDay)
    }
  }

  out.sort((a, b) => a.start.localeCompare(b.start))
  return res.status(200).json({ ok: true, events: out.slice(0, MAX_EVENTS) })
}
