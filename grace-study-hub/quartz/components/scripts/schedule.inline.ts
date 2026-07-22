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

const HOUR_PX = 40 // vertical pixels per hour in the time grid
const DEFAULT_START = 8 // grid always spans at least 8:00…
const DEFAULT_END = 20 // …to 20:00, expanding to fit earlier/later events

function fmtHour(h: number): string {
  const ampm = h < 12 ? "AM" : "PM"
  const hr = h % 12 === 0 ? 12 : h % 12
  return `${hr} ${ampm}`
}

type Timed = { ev: SchedEvent; startMin: number; endMin: number }

// Weekly calendar grid: days (Mon–Sun) as columns, hours as rows, events as
// blocks placed at their real start/duration. All-day events sit in a strip on
// top; today's column is highlighted.
function renderEvents(body: HTMLElement, events: SchedEvent[]) {
  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string))

  const monday = startOfWeekMonday(new Date())
  const todayKey = dayKey(new Date())

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return { date: d, key: dayKey(d), timed: [] as Timed[], allday: [] as SchedEvent[] }
  })
  const byKey: Record<string, (typeof days)[number]> = {}
  days.forEach((d) => (byKey[d.key] = d))

  let minH = DEFAULT_START
  let maxH = DEFAULT_END
  for (const ev of events) {
    const s = new Date(ev.start)
    const bucket = byKey[dayKey(s)]
    if (!bucket) continue
    if (ev.allDay) {
      bucket.allday.push(ev)
      continue
    }
    const e = new Date(ev.end)
    const startMin = s.getHours() * 60 + s.getMinutes()
    let endMin = e.getHours() * 60 + e.getMinutes()
    if (endMin <= startMin) endMin = startMin + 60
    bucket.timed.push({ ev, startMin, endMin })
    minH = Math.min(minH, Math.floor(startMin / 60))
    maxH = Math.max(maxH, Math.ceil(endMin / 60))
  }
  minH = Math.max(0, minH)
  maxH = Math.min(24, maxH)
  const dayStartMin = minH * 60
  const gridHeight = (maxH - minH) * HOUR_PX
  const hasAllday = days.some((d) => d.allday.length)

  const heads = days
    .map((d) => {
      const wd = d.date.toLocaleDateString([], { weekday: "short" })
      return `<div class="sh-cal-dhead${d.key === todayKey ? " today" : ""}">${wd}<span class="sh-cal-dnum">${d.date.getDate()}</span></div>`
    })
    .join("")

  let alldayRow = ""
  if (hasAllday) {
    const cells = days
      .map(
        (d) =>
          `<div class="sh-cal-allcell${d.key === todayKey ? " today" : ""}">${d.allday
            .map((ev) => `<span class="sh-cal-chip">${esc(ev.title)}</span>`)
            .join("")}</div>`,
      )
      .join("")
    alldayRow = `<div class="sh-cal-allday"><div class="sh-cal-gut">All-day</div><div class="sh-cal-allcells">${cells}</div></div>`
  }

  let gutter = ""
  for (let h = minH; h < maxH; h++) {
    gutter += `<div class="sh-cal-hour" style="height:${HOUR_PX}px"><span>${fmtHour(h)}</span></div>`
  }

  const cols = days
    .map((d) => {
      const blocks = d.timed
        .sort((a, b) => a.startMin - b.startMin)
        .map((t) => {
          const top = ((t.startMin - dayStartMin) / 60) * HOUR_PX
          const height = Math.max(((t.endMin - t.startMin) / 60) * HOUR_PX, 16)
          const loc = t.ev.location ? `<span class="sh-cal-evloc">${esc(t.ev.location)}</span>` : ""
          return `<div class="sh-cal-ev" style="top:${top}px;height:${height}px"><span class="sh-cal-evtime">${fmtTime(
            new Date(t.ev.start),
          )}</span><span class="sh-cal-evtitle">${esc(t.ev.title)}</span>${loc}</div>`
        })
        .join("")
      return `<div class="sh-cal-col${d.key === todayKey ? " today" : ""}" style="height:${gridHeight}px;background-size:100% ${HOUR_PX}px">${blocks}</div>`
    })
    .join("")

  const range =
    monday.toLocaleDateString([], { month: "short", day: "numeric" }) +
    " – " +
    days[6].date.toLocaleDateString([], { month: "short", day: "numeric" })

  body.innerHTML =
    `<div class="sh-sched-week">${range}</div>` +
    `<div class="sh-cal">` +
    `<div class="sh-cal-headrow"><div class="sh-cal-gut"></div><div class="sh-cal-dheads">${heads}</div></div>` +
    alldayRow +
    `<div class="sh-cal-body"><div class="sh-cal-gutter">${gutter}</div><div class="sh-cal-cols">${cols}</div></div>` +
    `</div>`
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
