// Dashboard "📅 My schedule" panel — private, owner-only.
// Posts the remembered add-password to /api/schedule, which reads a SECRET
// Google Calendar .ics feed server-side and returns upcoming events. Visitors
// without the password just see a lock box; the schedule data never reaches the
// browser unless the password checks out. Reuses the same PW_KEY the add-content
// modal stores, so if you've added a note before, the schedule unlocks itself.
const PW_KEY = "sh-add-secret"

type SchedEvent = {
  start: string
  end: string
  title: string
  location: string
  allDay: boolean
}

function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

function dayLabel(d: Date): string {
  const today = new Date()
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const diff = Math.round((d0.getTime() - t0.getTime()) / 86400000)
  if (diff === 0) return "Today"
  if (diff === 1) return "Tomorrow"
  return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })
}

function renderEvents(body: HTMLElement, events: SchedEvent[]) {
  if (!events.length) {
    body.innerHTML = `<p class="sh-sched-empty">Nothing scheduled in the next two weeks 🎉</p>`
    return
  }
  // Group by local calendar day
  const groups: Record<string, { label: string; sortKey: number; items: SchedEvent[] }> = {}
  for (const ev of events) {
    const start = new Date(ev.start)
    const key =
      start.getFullYear() + "-" + start.getMonth() + "-" + start.getDate()
    if (!groups[key]) {
      const d0 = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      groups[key] = { label: dayLabel(start), sortKey: d0.getTime(), items: [] }
    }
    groups[key].items.push(ev)
  }
  const ordered = Object.values(groups).sort((a, b) => a.sortKey - b.sortKey)

  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string))

  body.innerHTML = ordered
    .map((g) => {
      const rows = g.items
        .map((ev) => {
          const start = new Date(ev.start)
          const when = ev.allDay ? "All day" : fmtTime(start)
          const loc = ev.location ? `<span class="sh-sched-loc">· ${esc(ev.location)}</span>` : ""
          return `<li class="sh-sched-item"><span class="sh-sched-time">${when}</span><span class="sh-sched-title">${esc(
            ev.title,
          )}${loc}</span></li>`
        })
        .join("")
      return `<div class="sh-sched-day"><div class="sh-sched-daylabel">${g.label}</div><ul class="sh-sched-list">${rows}</ul></div>`
    })
    .join("")
}

async function loadSchedule(password: string, opts: { silent?: boolean } = {}) {
  const body = el("sh-sched-body")
  const refresh = el("sh-sched-refresh")
  if (!body) return
  if (!opts.silent) body.innerHTML = `<p class="sh-sched-loading">Loading your schedule…</p>`

  let res: Response
  try {
    res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    })
  } catch {
    body.innerHTML = `<p class="sh-sched-err">Network error — try again.</p>`
    return
  }

  if (res.status === 401) {
    localStorage.removeItem(PW_KEY)
    showLock("Wrong password — try again.")
    return
  }
  if (res.status === 501) {
    body.innerHTML = `<p class="sh-sched-empty">No calendar connected yet. Add <code>GCAL_ICS_URL</code> (your Google Calendar “Secret address in iCal format”) in Vercel to turn this on.</p>`
    if (refresh) refresh.hidden = true
    return
  }
  if (!res.ok) {
    let msg = "Could not load schedule."
    try {
      msg = (await res.json()).error || msg
    } catch {}
    body.innerHTML = `<p class="sh-sched-err">${msg}</p>`
    return
  }

  const data = await res.json()
  localStorage.setItem(PW_KEY, password)
  if (refresh) refresh.hidden = false
  renderEvents(body, (data.events || []) as SchedEvent[])
}

function showLock(message = "") {
  const body = el("sh-sched-body")
  if (!body) return
  body.innerHTML = `
    <div class="sh-sched-lock">
      <p class="sh-sched-lockmsg">🔒 Private — enter your password to see your schedule.</p>
      ${message ? `<p class="sh-sched-err">${message}</p>` : ""}
      <input id="sh-sched-pw" class="sh-input" type="password" placeholder="추가 비밀번호" />
      <button class="sh-btn sh-btn-new sh-block" id="sh-sched-unlock">Unlock schedule</button>
    </div>`
  const btn = el("sh-sched-unlock")
  const input = el<HTMLInputElement>("sh-sched-pw")
  const submit = () => {
    const pw = (input?.value || "").trim()
    if (pw) loadSchedule(pw)
  }
  btn?.addEventListener("click", submit)
  input?.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Enter") submit()
  })
}

function initSchedule() {
  const panel = el("sh-schedule")
  if (!panel) return // not on the dashboard
  const refresh = el("sh-sched-refresh")
  refresh?.addEventListener("click", () => {
    const pw = (localStorage.getItem(PW_KEY) || "").trim()
    if (pw) loadSchedule(pw, { silent: true })
  })
  const saved = (localStorage.getItem(PW_KEY) || "").trim()
  if (saved) loadSchedule(saved, { silent: false })
  else showLock()
}

document.addEventListener("nav", initSchedule)
initSchedule()
