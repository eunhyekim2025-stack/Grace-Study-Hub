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

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

// Monday 00:00 (local) of the week containing d.
function startOfWeekMonday(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const dow = (x.getDay() + 6) % 7 // Mon=0 … Sun=6
  x.setDate(x.getDate() - dow)
  return x
}

// Weekly (Mon–Sun) planner view: always shows all 7 days of the current week,
// today highlighted, empty days shown muted so the whole week reads at a glance.
function renderEvents(body: HTMLElement, events: SchedEvent[]) {
  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string))

  const monday = startOfWeekMonday(new Date())
  const todayKey = dayKey(new Date())

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return { date: d, key: dayKey(d), items: [] as SchedEvent[] }
  })
  const byKey: Record<string, (typeof days)[number]> = {}
  days.forEach((d) => (byKey[d.key] = d))

  for (const ev of events) {
    const bucket = byKey[dayKey(new Date(ev.start))]
    if (bucket) bucket.items.push(ev)
  }
  days.forEach((d) =>
    d.items.sort((a, b) => (a.allDay === b.allDay ? a.start.localeCompare(b.start) : a.allDay ? -1 : 1)),
  )

  const range =
    monday.toLocaleDateString([], { month: "short", day: "numeric" }) +
    " – " +
    days[6].date.toLocaleDateString([], { month: "short", day: "numeric" })

  const html = days
    .map((d) => {
      const isToday = d.key === todayKey
      const wd = d.date.toLocaleDateString([], { weekday: "short" })
      const rows = d.items.length
        ? d.items
            .map((ev) => {
              const when = ev.allDay ? "All day" : fmtTime(new Date(ev.start))
              const loc = ev.location ? `<span class="sh-sched-loc">· ${esc(ev.location)}</span>` : ""
              return `<li class="sh-sched-item"><span class="sh-sched-time">${when}</span><span class="sh-sched-title">${esc(
                ev.title,
              )}${loc}</span></li>`
            })
            .join("")
        : `<li class="sh-sched-none">—</li>`
      return `<div class="sh-sched-day${isToday ? " today" : ""}"><div class="sh-sched-daylabel">${wd} <span class="sh-sched-daynum">${d.date.getDate()}</span></div><ul class="sh-sched-list">${rows}</ul></div>`
    })
    .join("")

  body.innerHTML = `<div class="sh-sched-week">${range}</div>${html}`
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
