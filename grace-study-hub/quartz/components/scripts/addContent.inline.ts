// In-page "add content" modal: opens on the site (no GitHub redirect), posts to
// the /api/add serverless function which commits into the wiki. The shared
// password is remembered in localStorage after the first success.

const PW_KEY = "sh-add-secret"

function modal(): HTMLElement | null {
  return document.getElementById("sh-add-modal")
}

// The "추가 비밀번호" field only appears when we DON'T have a remembered secret
// (first use on this browser, or after a wrong-password failure). Once a save
// succeeds the secret is stored and the field stays hidden.
function syncPwField() {
  const field = document.getElementById("sh-pw-field")
  if (!field) return
  field.hidden = !!localStorage.getItem(PW_KEY)
}

function revealPwField() {
  localStorage.removeItem(PW_KEY)
  const field = document.getElementById("sh-pw-field")
  if (field) field.hidden = false
  const pw = document.getElementById("sh-add-pw") as HTMLInputElement | null
  if (pw) {
    pw.value = ""
    pw.focus()
  }
}

function setTab(tab: string) {
  const m = modal()
  if (!m) return
  m.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
    p.hidden = p.dataset.panel !== tab
  })
  m.querySelectorAll<HTMLElement>("[data-add-tab]").forEach((b) => {
    b.classList.toggle("active", b.dataset.addTab === tab)
  })
}

function openModal(tab: string, subject?: string) {
  const m = modal()
  if (!m) return
  const pw = document.getElementById("sh-add-pw") as HTMLInputElement | null
  if (pw && !pw.value) pw.value = localStorage.getItem(PW_KEY) || ""
  syncPwField()
  status("")
  renderDrafts()
  setTab(tab)
  // Preselect the subject in both note + upload pickers when opened for a subject.
  if (subject) {
    ;["sh-note-subject", "sh-file-subject"].forEach((id) => {
      const sel = document.getElementById(id) as HTMLSelectElement | null
      if (sel && [...sel.options].some((o) => o.value === subject)) sel.value = subject
    })
  }
  m.hidden = false
  document.documentElement.style.overflow = "hidden"
}

function closeModal() {
  const m = modal()
  if (!m) return
  m.hidden = true
  document.documentElement.style.overflow = ""
}

function status(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.getElementById("sh-add-status")
  if (!el) return
  el.textContent = msg
  el.className = "sh-modal-status" + (kind ? " " + kind : "")
}

function escHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string)
}

// After an image/audio attach, show the exact embed snippet to paste into a note.
// Quartz resolves links by filename (shortest path), so no folder is needed.
function showUploaded(path: string) {
  const el = document.getElementById("sh-add-status")
  if (!el) return
  const name = path.split("/").pop() || path
  const isImg = /\.(png|jpe?g|gif|webp|svg|avif|bmp)$/i.test(name)
  const snippet = isImg ? `![[${name}]]` : `[[${name}]]`
  el.className = "sh-modal-status ok"
  el.innerHTML =
    `첨부됨 → ${escHtml(name)} · 노트에 넣기: ` +
    `<code class="sh-embed-snip">${escHtml(snippet)}</code> ` +
    `<button type="button" class="sh-btn sh-btn-ghost sh-copy-embed" data-embed="${escHtml(snippet)}">복사</button>` +
    ` · 1–2분 뒤 반영`
}

function val(id: string): string {
  const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  return el ? el.value : ""
}

async function post(payload: Record<string, unknown>, btn: HTMLButtonElement) {
  const password = val("sh-add-pw").trim()
  if (!password) {
    status("비밀번호를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  status("저장 중… (사이트가 1–2분 뒤 재배포됩니다)")
  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) revealPwField()
      status("실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    if (payload.type === "file") {
      // Attach flow: show a ready-to-paste embed snippet for the stored file.
      showUploaded(String(data.path || ""))
    } else {
      status("저장됨 → " + (data.path || "") + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
    }
    // clear the note fields so the next add starts fresh
    ;["sh-note-title", "sh-note-tags", "sh-note-content"].forEach((id) => {
      const el = document.getElementById(id) as HTMLInputElement | null
      if (el) el.value = ""
    })
    const file = document.getElementById("sh-file-input") as HTMLInputElement | null
    if (file) file.value = ""
  } catch (e) {
    status("네트워크 오류. 배포된 사이트(https://grace-study-hub.vercel.app)에서 시도하세요.", "err")
  } finally {
    btn.disabled = false
  }
}

function submitNote(btn: HTMLButtonElement) {
  const title = val("sh-note-title").trim()
  const content = val("sh-note-content").trim()
  if (!title || !content) {
    status("제목과 내용을 입력하세요.", "err")
    return
  }
  post(
    {
      type: "note",
      title,
      subject: val("sh-note-subject"),
      tags: val("sh-note-tags"),
      content,
      homework: checked("sh-note-homework"), // route into the subject's <base>-homework/ folder
      knownTags: knownTags(), // reuse the existing vocabulary for auto-tagging
    },
    btn,
  )
}

// The build-time tag vocabulary embedded by AddContentModal — lets the server's
// auto-tagger reuse existing tags (shared with Obsidian + the wiki graph).
function knownTags(): string[] {
  try {
    return JSON.parse(document.getElementById("sh-known-tags")?.textContent || "[]")
  } catch {
    return []
  }
}

function checked(id: string): boolean {
  const el = document.getElementById(id) as HTMLInputElement | null
  return !!el && el.checked
}

async function postTo(endpoint: string, payload: Record<string, unknown>, btn: HTMLButtonElement) {
  const password = val("sh-add-pw").trim()
  if (!password) {
    status("비밀번호를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  status("생성 중… (AI 생성은 20~40초, 사이트는 1–2분 뒤 재배포됩니다)")
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) revealPwField()
      status("실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    return data
  } catch (e) {
    status("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
    return
  } finally {
    btn.disabled = false
  }
}

async function submitSubject(btn: HTMLButtonElement) {
  const name = val("sh-subject-name").trim()
  if (!name) {
    status("과목 이름을 입력하세요.", "err")
    return
  }
  const term = val("sh-subject-term").trim()
  const data = await postTo(
    "/api/add-subject",
    { name, term, genNotes: checked("sh-subject-notes"), genQuiz: checked("sh-subject-quiz") },
    btn,
  )
  if (data && data.ok) {
    const ai = data.aiSkipped ? " (AI 생성은 건너뜀 — GROQ_API_KEY 필요)" : ""
    const where = data.term ? ` (${data.term})` : ""
    status(`"${name}" 과목 생성됨${where}${ai} · 1–2분 뒤 사이드바에 나타나요.`, "ok")
    const el = document.getElementById("sh-subject-name") as HTMLInputElement | null
    if (el) el.value = ""
  }
}

function submitFile(btn: HTMLButtonElement) {
  const input = document.getElementById("sh-file-input") as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) {
    status("파일을 선택하세요.", "err")
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    const dataBase64 = String(reader.result).split(",")[1] || ""
    post({ type: "file", filename: file.name, subject: val("sh-file-subject"), dataBase64 }, btn)
  }
  reader.onerror = () => status("파일을 읽지 못했습니다.", "err")
  reader.readAsDataURL(file)
}

function onClick(e: MouseEvent) {
  const t = (e.target as HTMLElement)?.closest<HTMLElement>(
    "[data-add-open],[data-add-close],[data-add-tab],[data-add-submit]",
  )
  if (!t) return
  if (t.dataset.addOpen !== undefined) {
    e.preventDefault()
    openModal(t.dataset.addOpen || "note", t.dataset.addSubject || undefined)
  } else if (t.dataset.addClose !== undefined) {
    e.preventDefault()
    closeModal()
  } else if (t.dataset.addTab !== undefined) {
    setTab(t.dataset.addTab || "note")
  } else if (t.dataset.addSubmit !== undefined) {
    e.preventDefault()
    if (t.dataset.addSubmit === "file") submitFile(t as HTMLButtonElement)
    else if (t.dataset.addSubmit === "subject") submitSubject(t as HTMLButtonElement)
    else submitNote(t as HTMLButtonElement)
  }
}

// Deep-link: /page#new opens the note tab, #upload opens the upload tab.
function initFromHash() {
  if (location.hash === "#new") openModal("note")
  else if (location.hash === "#upload") openModal("upload")
  else if (location.hash === "#subject") openModal("subject")
}

// ── In-site recorder: long lecture → chunked transcription → note ──────────
// Record straight in the browser, rotate into ~2-minute segments (each a valid
// file Whisper can read), transcribe each via /api/transcribe as it finishes,
// then stitch the transcript and POST to /api/add with mode:"lecture".
const SEG_MS = 120000 // 2-minute segments
const REC: {
  active: boolean
  rec: MediaRecorder | null
  stream: MediaStream | null
  chunks: Blob[]
  segIndex: number
  jobs: Promise<{ i: number; text: string; failed?: boolean; error?: string }>[]
  // Optional private-audio backup: each segment is also uploaded to /api/archive
  // (private Vercel Blob). archiveOn flips off the moment archiving is
  // unavailable (no Blob store / any failure) so it never blocks the note.
  archiveJobs: Promise<{ i: number; path: string | null }>[]
  archiveOn: boolean
  title: string
  subject: string
  mime: string
  startedAt: number
  rotate: number
  tick: number
  // Live-audio guard: a level meter + silence watchdog so a dead/muted mic is
  // caught within seconds instead of after the whole lecture is lost.
  ac: AudioContext | null
  analyser: AnalyserNode | null // one shared analyser for preflight + live meter
  analyserBuf: Uint8Array | null
  levelRAF: number
  meterRan: boolean // the level meter actually ran (so heardSound is meaningful)
  heardSound: boolean // true once any audio above the noise floor was seen
  lastSoundAt: number
  trackEnded: boolean // the mic track fully ended mid-recording (won't recover)
} = {
  active: false,
  rec: null,
  stream: null,
  chunks: [],
  segIndex: 0,
  jobs: [],
  archiveJobs: [],
  archiveOn: false,
  title: "",
  subject: "",
  mime: "",
  startedAt: 0,
  rotate: 0,
  tick: 0,
  ac: null,
  analyser: null,
  analyserBuf: null,
  levelRAF: 0,
  meterRan: false,
  heardSound: false,
  lastSoundAt: 0,
  trackEnded: false,
}

function recStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.getElementById("sh-rec-status")
  if (el) el.className = "sh-rec-status" + (kind ? " " + kind : "")
  if (el) el.textContent = msg
}

function clock(ms: number): string {
  const s = Math.floor(ms / 1000)
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
}

function pickMime(): string {
  const MR = (window as unknown as { MediaRecorder?: typeof MediaRecorder }).MediaRecorder
  const opts = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"]
  for (const t of opts) if (MR?.isTypeSupported?.(t)) return t
  return ""
}

function toggleRecUI(on: boolean) {
  const start = document.querySelector<HTMLElement>("[data-rec-start]")
  const stop = document.querySelector<HTMLElement>("[data-rec-stop]")
  if (start) start.hidden = on
  if (stop) stop.hidden = !on
  const title = document.getElementById("sh-rec-title") as HTMLInputElement | null
  if (title) title.disabled = on
}

// Resolves { failed: true } rather than an empty string when a segment cannot be
// transcribed. An empty string would be filtered out silently and the finished
// note would look complete with two minutes of the lecture missing.
function transcribeBlob(
  blob: Blob,
  i: number,
  password: string,
): Promise<{ i: number; text: string; failed?: boolean; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const audioBase64 = String(reader.result).split(",")[1] || ""
      try {
        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64, mimeType: blob.type, password }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          const error = String(data.error || res.status)
          recStatus("전사 실패(조각 " + (i + 1) + "): " + error, "err")
          resolve({ i, text: "", failed: true, error })
          return
        }
        const text = (data.text || "").trim()
        // ok with no text = Whisper heard silence in this segment; not an error.
        resolve({ i, text, failed: !text })
      } catch (e) {
        resolve({ i, text: "", failed: true, error: "네트워크 오류: " + (e as Error).message })
      }
    }
    reader.onerror = () => resolve({ i, text: "", failed: true, error: "오디오 읽기 실패" })
    reader.readAsDataURL(blob)
  })
}

// Upload one segment to the private Blob store as a backup. Best-effort: any
// failure (or no store configured → 501) turns archiving off for the rest of
// the session and resolves to null, so the recording→note flow is never blocked.
function archiveBlob(
  blob: Blob,
  i: number,
  password: string,
  attempt = 0,
): Promise<{ i: number; path: string | null }> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const audioBase64 = String(reader.result).split(",")[1] || ""
      try {
        const res = await fetch("/api/archive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audioBase64,
            mimeType: blob.type,
            password,
            title: REC.title,
            subject: REC.subject,
            segment: i,
          }),
        })
        if (!res.ok) {
          // 501 means no Blob store is configured — nothing will ever work, so
          // stop trying. Anything else is transient (network blip, cold start,
          // rate limit); giving up on it used to disable the backup for the
          // WHOLE remaining lecture off a single hiccup.
          if (res.status === 501) {
            REC.archiveOn = false
            resolve({ i, path: null })
          } else {
            resolve(retryArchive(blob, i, password, attempt))
          }
          return
        }
        const data = await res.json().catch(() => ({}))
        resolve({ i, path: data.archived ? data.path : null })
      } catch {
        resolve(retryArchive(blob, i, password, attempt))
      }
    }
    reader.onerror = () => resolve({ i, path: null })
    reader.readAsDataURL(blob)
  })
}

// One delayed retry per segment. Recording keeps running while this waits, so
// the pause costs nothing; without it a single blip lost the rest of the backup.
function retryArchive(
  blob: Blob,
  i: number,
  password: string,
  attempt: number,
): Promise<{ i: number; path: string | null }> {
  if (attempt >= 1) return Promise.resolve({ i, path: null })
  return new Promise((resolve) =>
    setTimeout(() => resolve(archiveBlob(blob, i, password, attempt + 1)), 3000),
  )
}

// Live input-level meter + silence watchdog. Best-effort and self-contained: any
// failure here must never block the recording itself. Runs off a Web Audio
// AnalyserNode on the same MediaStream the recorder captures, so the bar reflects
// exactly what is (or isn't) being recorded.
// Tuned for LECTURE capture: the user is silent and the speaker is across a
// room, so real audio is quiet. A dead/muted track still reads a flat ~0, so a
// low floor separates "live but quiet" from "dead" without false alarms.
const NOISE_FLOOR = 0.004 // RMS below this = effectively silence
const START_GRACE_MS = 6000 // no sound at all this long after start → warn
const DROPOUT_MS = 30000 // heard sound before, but silent this long → warn

// One shared Web Audio monitor for the whole recording: the preflight AND the
// live meter both read this analyser, so we never open two AudioContexts on the
// same stream. Resumed explicitly — a suspended context reads flat silence and
// would make a perfectly good mic look dead.
function setupAudioMonitor(stream: MediaStream): boolean {
  try {
    const AC =
      (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return false
    const ac = new AC()
    void ac.resume?.().catch(() => {})
    const src = ac.createMediaStreamSource(stream)
    const an = ac.createAnalyser()
    an.fftSize = 1024
    src.connect(an)
    REC.ac = ac
    REC.analyser = an
    REC.analyserBuf = new Uint8Array(an.fftSize)
    return true
  } catch {
    return false
  }
}

// Current RMS (0..~1) of the shared analyser, or -1 if it isn't set up.
function readRms(): number {
  const an = REC.analyser
  const buf = REC.analyserBuf
  if (!an || !buf) return -1
  an.getByteTimeDomainData(buf)
  let sum = 0
  for (let i = 0; i < buf.length; i++) {
    const v = (buf[i] - 128) / 128
    sum += v * v
  }
  return Math.sqrt(sum / buf.length)
}

function startMeter() {
  if (!REC.analyser) return // no monitor (unsupported) → skip; meterRan stays false
  REC.meterRan = true
  REC.heardSound = false
  REC.lastSoundAt = Date.now()
  REC.trackEnded = false

  const meter = document.getElementById("sh-rec-meter")
  const fill = document.getElementById("sh-rec-level")
  const label = document.getElementById("sh-rec-meter-label")
  if (meter) meter.hidden = false

  const loop = () => {
    const rms = readRms()
    const now = Date.now()
    if (rms > NOISE_FLOOR) {
      REC.lastSoundAt = now
      REC.heardSound = true
    }
    if (fill) fill.style.width = Math.min(100, Math.round(Math.max(0, rms) * 320)) + "%"

    // The level meter is the ground truth: recent sound = it's genuinely being
    // captured, and any warning clears itself the instant sound returns.
    const recentSound = REC.heardSound && now - REC.lastSoundAt < DROPOUT_MS
    let warn = false
    let msg = "마이크 확인 중…"
    if (REC.trackEnded) {
      warn = true
      msg = "⚠️ 마이크 연결이 종료됐어요 — 정지 후 재시작하세요"
    } else if (!recentSound && now - REC.startedAt > START_GRACE_MS) {
      warn = true
      msg = REC.heardSound
        ? "⚠️ 지금 소리가 안 잡혀요 — 마이크 확인 (돌아오면 자동 해제)"
        : "⚠️ 소리가 안 잡혀요 — 마이크를 확인하고 정지→재시작하세요"
    } else if (recentSound) {
      msg = "🎙 소리 감지 중 — 정상 녹음"
    }
    if (meter) meter.classList.toggle("warn", warn)
    if (label) label.textContent = msg

    REC.levelRAF = requestAnimationFrame(loop)
  }
  REC.levelRAF = requestAnimationFrame(loop)
}

// Preflight: sample the shared analyser for up to `ms` and report whether ANY
// audio above the noise floor arrived. A dead/muted track (the recurring "empty
// recording" cause) stays flat ~0; a live mic — even a distant lecturer — clears
// the low floor. Fail-open (resolve true) if the monitor isn't set up.
function micHasSignal(ms: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (!REC.analyser) return resolve(true)
    const start = Date.now()
    let peak = 0
    const tick = () => {
      const rms = readRms()
      if (rms >= 0) peak = Math.max(peak, rms)
      // Any clearly-audible frame passes immediately; otherwise accept a live but
      // faint mic (a dead/muted track stays flat at ~0 and fails).
      if (peak > NOISE_FLOOR * 1.5) return resolve(true)
      if (Date.now() - start > ms) return resolve(peak > NOISE_FLOOR * 0.6)
      requestAnimationFrame(tick)
    }
    tick()
  })
}

function stopMeter() {
  if (REC.levelRAF) cancelAnimationFrame(REC.levelRAF)
  REC.levelRAF = 0
  try {
    REC.ac?.close()
  } catch {
    /* ignore */
  }
  REC.ac = null
  REC.analyser = null
  REC.analyserBuf = null
  const meter = document.getElementById("sh-rec-meter")
  if (meter) {
    meter.hidden = true
    meter.classList.remove("warn")
  }
  const fill = document.getElementById("sh-rec-level")
  if (fill) fill.style.width = "0%"
}

function startSegment(password: string) {
  const opts: MediaRecorderOptions = { audioBitsPerSecond: 32000 }
  if (REC.mime) opts.mimeType = REC.mime
  const rec = new MediaRecorder(REC.stream as MediaStream, opts)
  REC.chunks = []
  rec.ondataavailable = (e) => {
    if (e.data && e.data.size) REC.chunks.push(e.data)
  }
  rec.onstop = () => {
    const blob = new Blob(REC.chunks, { type: REC.mime || "audio/webm" })
    if (blob.size > 0) {
      const i = REC.segIndex++
      REC.jobs.push(transcribeBlob(blob, i, password))
      if (REC.archiveOn) REC.archiveJobs.push(archiveBlob(blob, i, password))
    }
  }
  rec.start()
  REC.rec = rec
}

async function startRecording() {
  if (REC.active) return
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    const field = document.getElementById("sh-pw-field")
    if (field) field.hidden = false
    recStatus("먼저 추가 비밀번호를 입력하세요.", "err")
    return
  }
  if (!val("sh-rec-title").trim()) {
    recStatus("노트 제목을 입력하세요.", "err")
    return
  }
  const md = navigator.mediaDevices
  if (!md || !md.getUserMedia || typeof MediaRecorder === "undefined") {
    recStatus("이 브라우저는 녹음을 지원하지 않아요.", "err")
    return
  }
  // Requesting the mic triggers the browser's permission dialog on first use.
  recStatus("🎙 마이크 권한을 허용해 주세요… (브라우저의 “허용”을 클릭)")
  try {
    REC.stream = await md.getUserMedia({ audio: true })
  } catch (err) {
    const name = (err as DOMException)?.name
    if (name === "NotAllowedError" || name === "SecurityError") {
      recStatus(
        "마이크 권한이 차단돼 있어요. 주소창의 🔒(사이트 정보) → 마이크 → “허용”으로 바꾼 뒤 다시 시도하세요.",
        "err",
      )
    } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      recStatus("마이크를 찾을 수 없어요. 입력 장치를 확인하세요.", "err")
    } else {
      recStatus("마이크를 열 수 없어요. 브라우저 권한을 확인하세요.", "err")
    }
    return
  }
  // Track health: an empty recording almost always starts as a dead track. Abort
  // on a track that is already ended/absent; a live-but-muted track is left to
  // the meter watchdog (muted can be a transient state before audio flows).
  const track = REC.stream.getAudioTracks()[0]
  if (!track || track.readyState !== "live") {
    recStatus("마이크 트랙을 열 수 없어요. 입력 장치를 확인하고 다시 시도하세요.", "err")
    REC.stream.getTracks().forEach((t) => t.stop())
    return
  }
  // A mic that drops mid-lecture (another app grabs it, device unplugged) fires
  // these — the meter turns red so it's noticed while there's still time to fix.
  // A dropped/muted mic just shows up as silence in the level meter below, which
  // self-heals the moment audio returns — so we DON'T latch on the noisy `mute`
  // event (it often fires transiently at startup and never gets a matching
  // `unmute`). Only a fully ENDED track is hard-flagged, since it won't recover.
  track.addEventListener("ended", () => {
    REC.trackEnded = true
  })

  // Set up the shared audio monitor now (preflight + live meter both use it), and
  // preflight the mic BEFORE committing: a dead/muted track (the recurring "empty
  // recording → could not process file" failure) delivers no audio. Catch it now
  // instead of after a whole lecture is lost.
  setupAudioMonitor(REC.stream)
  recStatus("🎙 마이크 확인 중… (4초) — 강의 소리가 들리면 통과합니다")
  const live = await micHasSignal(4000)
  if (!live) {
    recStatus(
      "⚠️ 마이크에서 소리가 전혀 안 잡혀요 — 녹음을 시작하지 않았어요. 입력 장치(다른 앱이 마이크를 쓰면 종료·아이폰 마이크면 MacBook Pro로 변경)를 확인하고 다시 [녹음 시작]을 눌러주세요.",
      "err",
    )
    stopMeter() // close the shared AudioContext we opened for the preflight
    REC.stream.getTracks().forEach((t) => t.stop())
    return
  }

  REC.mime = pickMime()
  REC.active = true
  REC.segIndex = 0
  REC.jobs = []
  REC.archiveJobs = []
  REC.archiveOn = true // attempt private-audio backup; disables itself if unavailable
  REC.title = val("sh-rec-title").trim()
  REC.subject = val("sh-file-subject")
  REC.startedAt = Date.now()
  toggleRecUI(true)
  startMeter()
  startSegment(password)
  REC.rotate = window.setInterval(() => {
    if (REC.rec && REC.rec.state !== "inactive") REC.rec.stop()
    startSegment(password)
  }, SEG_MS)
  REC.tick = window.setInterval(() => {
    recStatus(`🔴 녹음 중 ${clock(Date.now() - REC.startedAt)} · 전사 대기 ${REC.jobs.length}조각`)
  }, 1000)
}

// ── Draft rescue: a transcript must outlive a failed save ─────────────────
// The stitched transcript used to exist only as a local in stopRecording(), so
// any /api/add failure (expired GitHub token, network drop, closed tab) threw
// away the whole lecture. Now it is written to localStorage the moment it
// exists and cleared only once the note is actually committed. Whatever is left
// over is offered back in the modal with a one-click retry.
const DRAFT_KEY = "sh-rec-drafts"
const DRAFT_MAX = 5

type RecDraft = {
  id: string
  title: string
  subject: string
  transcript: string
  audio: string[]
  gaps: number[]
  savedAt: number
}

function readDrafts(): RecDraft[] {
  try {
    const list = JSON.parse(localStorage.getItem(DRAFT_KEY) || "[]")
    return Array.isArray(list) ? (list as RecDraft[]) : []
  } catch {
    return []
  }
}

// Keep only the newest DRAFT_MAX. On a quota error, retry with just this one
// draft — losing older rescues beats losing the recording that just failed.
function writeDrafts(list: RecDraft[]) {
  const trimmed = list.slice(-DRAFT_MAX)
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(trimmed))
  } catch {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(trimmed.slice(-1)))
    } catch {
      /* nothing else we can do; the in-page copy is still shown */
    }
  }
}

function saveDraft(d: RecDraft) {
  writeDrafts([...readDrafts().filter((x) => x.id !== d.id), d])
}

function dropDraft(id: string) {
  writeDrafts(readDrafts().filter((x) => x.id !== id))
}

function escDraft(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  )
}

function renderDrafts() {
  const box = document.getElementById("sh-rec-drafts")
  if (!box) return
  const drafts = readDrafts().sort((a, b) => b.savedAt - a.savedAt)
  box.hidden = !drafts.length
  if (!drafts.length) {
    box.innerHTML = ""
    return
  }
  box.innerHTML =
    `<div class="sh-draft-head">💾 저장하지 못한 녹음 ${drafts.length}건 — 전사 내용이 이 브라우저에 남아 있어요</div>` +
    drafts
      .map((d) => {
        const when = new Date(d.savedAt).toLocaleString("ko-KR", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
        return `<div class="sh-draft" data-draft-id="${escDraft(d.id)}">
  <div class="sh-draft-meta"><b>${escDraft(d.title || "제목 없음")}</b><span>${escDraft(when)} · ${d.transcript.length.toLocaleString()}자</span></div>
  <div class="sh-draft-actions">
    <button class="sh-btn sh-btn-new" data-draft-retry>저장 재시도</button>
    <button class="sh-btn sh-btn-ghost" data-draft-copy>텍스트 복사</button>
    <button class="sh-btn sh-btn-ghost" data-draft-drop>버리기</button>
  </div>
</div>`
      })
      .join("")
}

// Re-send a rescued transcript to /api/add. Identical payload to the original
// save, so a draft made before the token broke goes through untouched once it
// is fixed. The draft is only dropped after GitHub confirms the commit.
async function retryDraft(id: string, btn: HTMLButtonElement) {
  const draft = readDrafts().find((d) => d.id === id)
  if (!draft) return renderDrafts()
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    revealPwField()
    recStatus("추가 비밀번호를 입력한 뒤 다시 눌러주세요.", "err")
    return
  }
  const original = btn.textContent
  btn.disabled = true
  btn.textContent = "저장 중…"
  try {
    // Same tidy decision as the first save (short → server, long → browser).
    const { content, pretidied } = await buildLectureBody(draft.title, draft.transcript, password)
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title: draft.title,
        subject: draft.subject,
        tags: "lecture, recording",
        content,
        mode: "lecture",
        ...(pretidied ? { pretidied: true, autoTags: false } : {}),
        ...(draft.audio?.length ? { audio: draft.audio } : {}),
        ...(draft.gaps?.length ? { gaps: draft.gaps } : {}),
        password,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      recStatus("재시도 실패: " + (data.error || res.status) + " · 전사 내용은 그대로 보관됩니다.", "err")
      btn.disabled = false
      btn.textContent = original
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    dropDraft(id)
    renderDrafts()
    recStatus(
      "저장됨 → " +
        (data.path || "") +
        (data.listedIn ? ` · 📑 ${data.listedIn} Seminars에 등록됨` : "") +
        " · 1–2분 뒤 사이트에 반영됩니다.",
      "ok",
    )
  } catch {
    recStatus("네트워크 오류 · 전사 내용은 그대로 보관됩니다.", "err")
    btn.disabled = false
    btn.textContent = original
  }
}

// A lecture too long for the server to tidy in one request (Groq free-tier token
// ceiling) is tidied HERE in the browser, which has no 60s function limit:
// split into budget-sized chunks, tidy each via /api/tidy — pacing off any 429 —
// then combine into one note. Returns tidied Markdown, or null if it couldn't
// (caller then saves the raw transcript, honestly flagged).
const TIDY_MAX_CHARS = 14000
async function tidyLongTranscript(
  title: string,
  transcript: string,
  password: string,
): Promise<string | null> {
  const CHUNK = 12000
  const chunks: string[] = []
  for (let i = 0; i < transcript.length; i += CHUNK) chunks.push(transcript.slice(i, i + CHUNK))

  const callTidy = async (text: string, mode: "chunk" | "final"): Promise<string | null> => {
    for (let attempt = 0; attempt < 4; attempt++) {
      let data: { ok?: boolean; body?: string; retryAfterMs?: number } = {}
      try {
        const res = await fetch("/api/tidy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, title, text, mode }),
        })
        if (!res.ok) return null
        data = await res.json().catch(() => ({}))
      } catch {
        return null
      }
      if (data.ok) return String(data.body || "")
      // Rate-limited: wait the server-advised delay, then retry the same chunk.
      await new Promise((r) => setTimeout(r, Math.min(30000, Math.max(3000, data.retryAfterMs || 8000))))
    }
    return null
  }

  const sections: string[] = []
  for (let i = 0; i < chunks.length; i++) {
    recStatus(`긴 강의 정리 중… (${i + 1}/${chunks.length} 조각) — 몇 분 걸릴 수 있어요`)
    const s = await callTidy(chunks[i], "chunk")
    if (s === null) return null // give up → caller saves the raw transcript
    sections.push(s)
  }
  const combined = sections.join("\n\n")
  if (combined.length <= 20000) {
    recStatus("긴 강의 정리 마무리 중…")
    const finalNote = await callTidy(combined, "final")
    if (finalNote) return finalNote
  }
  return sections.map((s, i) => `## Part ${i + 1}\n\n${s}`).join("\n\n")
}

// Single place that decides how a lecture transcript becomes the note body, so
// the first save and the draft-retry behave identically: short → let the server
// tidy it; long → tidy in the browser and mark it pretidied.
async function buildLectureBody(
  title: string,
  transcript: string,
  password: string,
): Promise<{ content: string; pretidied: boolean }> {
  if (transcript.length > TIDY_MAX_CHARS) {
    const tidied = await tidyLongTranscript(title, transcript, password)
    if (tidied) return { content: tidied, pretidied: true }
  }
  return { content: transcript, pretidied: false }
}

async function stopRecording() {
  if (!REC.active) return
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  REC.active = false
  clearInterval(REC.rotate)
  clearInterval(REC.tick)
  if (REC.rec && REC.rec.state !== "inactive") {
    await new Promise<void>((r) => {
      REC.rec!.addEventListener("stop", () => r(), { once: true })
      REC.rec!.stop()
    })
  }
  REC.stream?.getTracks().forEach((t) => t.stop())
  stopMeter()
  toggleRecUI(false)

  const total = REC.jobs.length
  if (!total) {
    recStatus("녹음된 내용이 없습니다.", "err")
    return
  }
  let done = 0
  recStatus(`전사 중… (0/${total})`)
  const results = await Promise.all(
    REC.jobs.map((p) =>
      p.then((r) => {
        done++
        recStatus(`전사 중… (${done}/${total})`)
        return r
      }),
    ),
  )
  const ordered = results.sort((a, b) => a.i - b.i)
  // Segment numbers we could not transcribe. They are reported to /api/add so
  // the finished note carries a visible warning — a silently shortened note is
  // worse than an obviously incomplete one, and the audio is still archived.
  const gaps = ordered.filter((r) => r.failed).map((r) => r.i + 1)
  const transcript = ordered
    .map((r) => r.text)
    .filter(Boolean)
    .join(" ")
    .trim()
  if (!transcript) {
    // Distinguish the real failure modes instead of always blaming the key.
    // A segment that returned an error (bad key, decommissioned model, Groq
    // rejecting the audio) carries `error`; a segment that came back ok-but-empty
    // was just silence. Surface whichever actually happened.
    const errs = Array.from(new Set(ordered.map((r) => r.error).filter(Boolean)))
    if (errs.length) {
      recStatus("전사 실패 — 서버 응답: " + errs.join(" · "), "err")
    } else if (REC.meterRan && !REC.heardSound) {
      // The live meter ran the whole session and never saw audio: the mic was
      // dead/muted. (Only trust this when the meter actually ran — otherwise a
      // working recording would be mislabeled as silent.)
      recStatus("녹음 내내 소리가 잡히지 않았습니다 — 마이크가 꺼졌거나 다른 앱이 점유했을 수 있어요. 마이크 확인 후 다시 녹음하세요.", "err")
    } else {
      recStatus("전사 결과가 비었습니다 — 녹음에서 음성이 감지되지 않았습니다 (마이크·볼륨 확인).", "err")
    }
    return
  }
  // Collect the private-audio backup refs (if archiving was available).
  let audio: string[] = []
  if (REC.archiveJobs.length) {
    const arch = await Promise.all(REC.archiveJobs)
    audio = arch
      .filter((a) => a.path)
      .sort((a, b) => a.i - b.i)
      .map((a) => a.path as string)
  }

  // Stash the transcript BEFORE trying to save it: from here on the lecture
  // survives a failed commit, a network drop, or the tab being closed.
  const draft: RecDraft = {
    id: String(Date.now()),
    title: val("sh-rec-title").trim(),
    subject: val("sh-file-subject"),
    transcript,
    audio,
    gaps,
    savedAt: Date.now(),
  }
  saveDraft(draft)
  renderDrafts()

  recStatus("정리 중… 강의 노트를 만들고 있어요 (10~40초)")
  const { content: noteContent, pretidied } = await buildLectureBody(
    draft.title,
    transcript,
    password,
  )
  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title: draft.title,
        subject: draft.subject,
        tags: "lecture, recording",
        content: noteContent,
        mode: "lecture",
        ...(pretidied ? { pretidied: true, autoTags: false } : {}),
        ...(audio.length ? { audio } : {}),
        ...(gaps.length ? { gaps } : {}),
        password,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      recStatus(
        "저장 실패: " + (data.error || res.status) + " · 전사 내용은 아래에 임시 보관했어요.",
        "err",
      )
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    dropDraft(draft.id)
    renderDrafts()
    const backup = audio.length ? ` · 🎙 녹음본 ${audio.length}조각 비공개 백업됨` : ""
    const gapWarn = gaps.length ? ` · ⚠️ ${gaps.length}조각 전사 실패 (노트에 표시됨)` : ""
    // The server tidies the transcript into a study note; on a long recording it
    // can't (token limit) and saves raw. Say so rather than implying it's done.
    const tidyWarn =
      data.tidied === false
        ? data.tidyReason === "too-long"
          ? " · ⚠️ 녹음이 길어 자동 정리 생략 — 원본 전사로 저장됨"
          : " · ⚠️ 자동 정리 실패 — 원본 전사로 저장됨"
        : ""
    // The server also files the note under the subject hub's Seminars table, so
    // it is linked from somewhere instead of being reachable only by search.
    const listed = data.listedIn ? ` · 📑 ${data.listedIn} Seminars에 등록됨` : ""
    recStatus(
      "저장됨 → " + (data.path || "") + backup + gapWarn + tidyWarn + listed + " · 1–2분 뒤 사이트에 반영됩니다.",
      gaps.length || data.tidied === false ? "err" : "ok",
    )
    const t = document.getElementById("sh-rec-title") as HTMLInputElement | null
    if (t) t.value = ""
  } catch {
    recStatus("네트워크 오류 · 전사 내용은 아래에 임시 보관했어요.", "err")
  }
}

// ── Note deletion + local "tombstones" ────────────────────────────────────
// Deleting commits to GitHub and the site rebuilds in ~1–2 min; until then (and
// past any browser/CDN cache) the note would still appear in listings. So on
// delete we record the note's slug locally and hide it everywhere immediately.
// Tombstones auto-expire after a day (by then the rebuild has removed it).
const DELETED_KEY = "sh-deleted"

function readTombstones(): { slug: string; t: number }[] {
  try {
    const list = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]")
    const fresh = (Array.isArray(list) ? list : []).filter(
      (d) => d && typeof d.slug === "string" && Date.now() - (d.t || 0) < 86400000,
    )
    localStorage.setItem(DELETED_KEY, JSON.stringify(fresh))
    return fresh
  } catch {
    return []
  }
}

function hideDeleted() {
  const slugs = new Set(readTombstones().map((d) => d.slug))
  if (!slugs.size) return
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
    let target = ""
    try {
      target = decodeURIComponent(new URL(a.href, location.href).pathname)
        .replace(/^\/+|\/+$/g, "")
        .replace(/\.html$/, "")
        .replace(/\/index$/, "")
    } catch {
      return
    }
    if (slugs.has(target)) {
      const item = a.closest("li, tr, .sh-recent-item") as HTMLElement | null
      ;(item || a).style.display = "none"
    }
  })
}

async function deleteNote(btn: HTMLButtonElement) {
  const path = btn.dataset.delPath
  const slug = btn.dataset.delSlug || ""
  const title = btn.dataset.delTitle || path || "이 노트"
  if (!path) return
  if (!confirm(`"${title}" 노트를 삭제할까요?\n되돌릴 수 없습니다.`)) return

  let password = (localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    password = (window.prompt("추가 비밀번호를 입력하세요") || "").trim()
    if (!password) return
  }

  const original = btn.textContent
  btn.disabled = true
  btn.textContent = "삭제 중…"
  try {
    const res = await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok && res.status !== 404) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      alert("삭제 실패: " + (data.error || res.status))
      btn.disabled = false
      btn.textContent = original
      return
    }
    localStorage.setItem(PW_KEY, password)
    // Tombstone: hide this note everywhere until the rebuild catches up.
    if (slug) {
      const list = readTombstones()
      list.push({ slug, t: Date.now() })
      localStorage.setItem(DELETED_KEY, JSON.stringify(list))
    }
    btn.textContent = "삭제됨 · 이동 중…"
    setTimeout(() => {
      location.href = "/"
    }, 700)
  } catch {
    alert("네트워크 오류. 배포된 사이트에서 시도하세요.")
    btn.disabled = false
    btn.textContent = original
  }
}

// ── Inline note editing ───────────────────────────────────────────────────
// A ✏️ button on each note card (RecentNotes) and on the note page opens an
// in-place editor WITHOUT navigating away: it fetches the note's current title +
// markdown from /api/edit (mode:"get"), shows them in a title input + textarea,
// and on Save posts back (mode:"save") which overwrites the file via GitHub
// (getFile→sha→PUT). Cancel restores the original view untouched. Reuses the
// same ADD_SECRET the rest of the modal caches in localStorage.

function editStatus(el: HTMLElement, msg: string, kind: "" | "ok" | "err" = "") {
  el.textContent = msg
  el.className = "sh-edit-status" + (kind ? " " + kind : "")
}

// Build the inline editor DOM for one note. `li` is the RecentNotes card whose
// `.section` we hide while editing (null on a note page). Uses createElement +
// .value (never innerHTML) so note content can never inject markup.
function buildEditor(
  path: string,
  title: string,
  content: string,
  li: HTMLElement | null,
  onTitleSaved: (t: string) => void,
): HTMLElement {
  const wrap = document.createElement("div")
  wrap.className = "sh-edit"

  const titleWrap = document.createElement("div")
  titleWrap.className = "sh-edit-field"
  const titleLabel = document.createElement("label")
  titleLabel.textContent = "제목"
  const titleInput = document.createElement("input")
  titleInput.className = "sh-input sh-edit-title"
  titleInput.value = title
  titleWrap.append(titleLabel, titleInput)

  const bodyWrap = document.createElement("div")
  bodyWrap.className = "sh-edit-field"
  const bodyLabel = document.createElement("label")
  bodyLabel.textContent = "내용 (Markdown)"
  const bodyInput = document.createElement("textarea")
  bodyInput.className = "sh-input sh-edit-body"
  bodyInput.rows = li ? 10 : 18
  bodyInput.value = content
  bodyWrap.append(bodyLabel, bodyInput)

  const statusEl = document.createElement("div")
  statusEl.className = "sh-edit-status"

  const actions = document.createElement("div")
  actions.className = "sh-edit-actions"
  const saveBtn = document.createElement("button")
  saveBtn.className = "sh-btn sh-btn-new"
  saveBtn.textContent = "저장"
  const cancelBtn = document.createElement("button")
  cancelBtn.className = "sh-btn sh-btn-ghost"
  cancelBtn.textContent = "취소"
  actions.append(saveBtn, cancelBtn)

  wrap.append(titleWrap, bodyWrap, statusEl, actions)

  const closeEditor = () => {
    wrap.remove()
    if (li) {
      const sec = li.querySelector<HTMLElement>(".section")
      if (sec) sec.hidden = false
    }
  }
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault()
    closeEditor()
  })
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault()
    saveEdit(path, titleInput, bodyInput, statusEl, saveBtn, onTitleSaved)
  })
  return wrap
}

async function saveEdit(
  path: string,
  titleInput: HTMLInputElement,
  bodyInput: HTMLTextAreaElement,
  statusEl: HTMLElement,
  saveBtn: HTMLButtonElement,
  onTitleSaved: (t: string) => void,
) {
  const title = titleInput.value.trim()
  const content = bodyInput.value
  if (!title || !content.trim()) {
    editStatus(statusEl, "제목과 내용을 입력하세요.", "err")
    return
  }
  let password = (localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    password = (window.prompt("추가 비밀번호를 입력하세요") || "").trim()
    if (!password) return
  }
  saveBtn.disabled = true
  editStatus(statusEl, "저장 중… (사이트가 1–2분 뒤 재배포됩니다)")
  try {
    const res = await fetch("/api/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "save", path, title, content, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      editStatus(statusEl, "저장 실패: " + (data.error || res.status), "err")
      saveBtn.disabled = false
      return
    }
    localStorage.setItem(PW_KEY, password)
    onTitleSaved(title)
    editStatus(statusEl, "저장됨 → " + (data.path || path) + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
  } catch {
    editStatus(statusEl, "네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
    saveBtn.disabled = false
  }
}

async function openEditor(btn: HTMLButtonElement) {
  const path = btn.dataset.editPath
  if (!path || btn.dataset.editBusy) return
  // Already open for this note? Toggle it closed (find the sibling editor).
  const li = btn.closest<HTMLElement>(".recent-li")
  const host = li || btn.closest<HTMLElement>(".sh-note-actions")?.parentElement || document.body
  const existing = (li || host).querySelector<HTMLElement>(".sh-edit")
  if (existing) {
    existing.querySelector<HTMLButtonElement>(".sh-btn-ghost")?.click()
    return
  }

  let password = (localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    password = (window.prompt("추가 비밀번호를 입력하세요") || "").trim()
    if (!password) return
  }

  const original = btn.textContent
  btn.dataset.editBusy = "1"
  btn.disabled = true
  btn.textContent = "…"
  try {
    const res = await fetch("/api/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "get", path, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      alert("불러오기 실패: " + (data.error || res.status))
      return
    }
    localStorage.setItem(PW_KEY, password)
    const curTitle = typeof data.title === "string" && data.title ? data.title : btn.dataset.editTitle || ""
    const onTitleSaved = (t: string) => {
      // Reflect the new title in the DOM right away (the rebuild lags 1–2 min).
      if (li) {
        const link = li.querySelector<HTMLElement>(".desc h3 a")
        if (link) link.textContent = t
        const editBtn = li.querySelector<HTMLElement>(".sh-edit-btn")
        if (editBtn) editBtn.setAttribute("data-edit-title", t)
      } else {
        const h1 = document.querySelector<HTMLElement>("article h1, .page-title, h1")
        if (h1) h1.textContent = t
      }
    }
    const editor = buildEditor(path, curTitle, String(data.content || ""), li, onTitleSaved)
    if (li) {
      const sec = li.querySelector<HTMLElement>(".section")
      if (sec) sec.hidden = true
      li.appendChild(editor)
    } else {
      const actions = btn.closest<HTMLElement>(".sh-note-actions")
      if (actions) actions.after(editor)
      else btn.after(editor)
    }
    editor.querySelector<HTMLElement>(".sh-edit-title")?.focus()
  } catch {
    alert("네트워크 오류. 배포된 사이트에서 시도하세요.")
  } finally {
    delete btn.dataset.editBusy
    btn.disabled = false
    btn.textContent = original
  }
}

// ── Subject Auto-Generate: quiz + revision summary ────────────────────────
// The two buttons in SubjectAutoBar build a note from the subject's OWN wiki
// notes via /api/generate. "Build quiz →" opens a compact count/difficulty
// panel (no note-modal reuse); "Summarize subject" fires directly after a
// confirm. Both reuse the cached ADD_SECRET (prompt if missing).

function genSecret(): string {
  let pw = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!pw) pw = (window.prompt("추가 비밀번호를 입력하세요") || "").trim()
  return pw
}

function genStatusEl(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-sh-gen-status]")
}

function genStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = genStatusEl()
  if (!el) return
  el.hidden = !msg
  el.textContent = msg
  el.className = "sh-gen-status" + (kind ? " " + kind : "")
}

async function runGenerate(
  kind: "quiz" | "summary",
  subject: string,
  btn: HTMLButtonElement,
  opts: Record<string, unknown>,
) {
  if (!subject) return
  const password = genSecret()
  if (!password) {
    genStatus("추가 비밀번호가 필요합니다.", "err")
    return
  }
  btn.disabled = true
  genStatus(kind === "quiz" ? "퀴즈 생성 중… (20~40초)" : "요약 생성 중… (20~40초)")
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, subject, ...opts, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      genStatus("실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    const el = genStatusEl()
    if (el) {
      const href = "/" + String(data.noteSlug || "")
      el.hidden = false
      el.className = "sh-gen-status ok"
      el.innerHTML =
        `생성됨 → <a href="${escHtml(href)}">${escHtml(String(data.title || "노트"))}</a>` +
        ` · 1–2분 뒤 사이트에 반영됩니다.`
    }
  } catch {
    genStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  } finally {
    btn.disabled = false
  }
}

// ── In-recording panels: calendar (view+edit) + note review ───────────────
// Both live INSIDE the .sh-rec container and are driven only by the listeners
// below. They never touch REC, the MediaRecorder, or its intervals, and they
// never navigate the page (the note reader uses an <iframe>), so a recording in
// progress keeps running the entire time either panel is open.

// Shared secret for the write endpoints (same ADD_SECRET the rest of the modal
// caches). Prompts once if we don't have it yet.
function panelSecret(): string {
  let pw = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!pw) pw = (window.prompt("추가 비밀번호를 입력하세요") || "").trim()
  return pw
}

type CalEvent = {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  location: string
}
type NoteItem = { slug: string; title: string }

// The last list we rendered, so the editor can prefill start/end without a
// fetch; and the cached note index so reopening the browser is instant.
let calCache: CalEvent[] = []
let notesCache: NoteItem[] = []

function calStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.querySelector<HTMLElement>("[data-sh-cal-status]")
  if (!el) return
  el.hidden = !msg
  el.textContent = msg
  el.className = "sh-cal-panel-status" + (kind ? " " + kind : "")
}

// ISO string → value a <input type="datetime-local"> accepts ("YYYY-MM-DDTHH:MM"),
// in the viewer's local time. Empty string if unparseable.
function toLocalInput(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ""
  const p = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

// A <input type="datetime-local"> gives a bare wall-clock string ("2026-09-10T14:00")
// with NO zone. Google Calendar rejects start.dateTime without an offset (or a
// timeZone field), so convert it to a full RFC3339 timestamp WITH the browser's
// offset — new Date() parses the bare value as local time, and toISOString()
// preserves that instant as UTC ("…Z"), which Google accepts. Empty → "".
function toApiDateTime(localValue: string): string {
  if (!localValue) return ""
  const d = new Date(localValue)
  return isNaN(d.getTime()) ? "" : d.toISOString()
}

function fmtCalWhen(ev: CalEvent): string {
  const s = new Date(ev.start)
  if (isNaN(s.getTime())) return ""
  if (ev.allDay) {
    return s.toLocaleDateString("ko-KR", { month: "short", day: "numeric", weekday: "short" }) + " · 종일"
  }
  const date = s.toLocaleDateString("ko-KR", { month: "short", day: "numeric", weekday: "short" })
  const time = s.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })
  return `${date} ${time}`
}

function renderCalEvents(events: CalEvent[]) {
  const list = document.querySelector<HTMLElement>("[data-sh-cal-list]")
  if (!list) return
  calCache = events
  if (!events.length) {
    list.innerHTML = `<p class="sh-modal-hint">앞으로 3주간 일정이 없어요.</p>`
    return
  }
  list.innerHTML = events
    .map((ev) => {
      const loc = ev.location ? ` · ${escHtml(ev.location)}` : ""
      return `<div class="sh-cal-item" data-sh-cal-id="${escHtml(ev.id)}">
  <div class="sh-cal-item-main">
    <b>${escHtml(ev.title)}</b>
    <span>${escHtml(fmtCalWhen(ev))}${loc}</span>
  </div>
  <div class="sh-cal-item-actions">
    <button type="button" class="sh-btn sh-btn-ghost" data-sh-cal-edit>✏️</button>
    <button type="button" class="sh-btn sh-btn-ghost" data-sh-cal-del>🗑</button>
  </div>
</div>`
    })
    .join("")
}

async function loadCalendar() {
  const password = panelSecret()
  if (!password) {
    calStatus("추가 비밀번호가 필요합니다.", "err")
    return
  }
  calStatus("일정 불러오는 중…")
  try {
    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "list", password }),
    })
    if (res.status === 503) {
      calStatus("📅 Google Calendar 연동 필요 — Vercel에 GOOGLE_* 환경변수를 설정하세요.", "err")
      const list = document.querySelector<HTMLElement>("[data-sh-cal-list]")
      if (list) list.innerHTML = ""
      return
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      calStatus("실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    calStatus("")
    renderCalEvents((data.events || []) as CalEvent[])
  } catch {
    calStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  }
}

// One write call to /api/calendar (insert/patch/delete). Refreshes the list on
// success. Recording is untouched throughout.
async function calWrite(payload: Record<string, unknown>, okMsg: string): Promise<boolean> {
  const password = panelSecret()
  if (!password) {
    calStatus("추가 비밀번호가 필요합니다.", "err")
    return false
  }
  calStatus("저장 중…")
  try {
    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, password }),
    })
    if (res.status === 503) {
      calStatus("📅 Google Calendar 연동 필요 — Vercel에 GOOGLE_* 환경변수를 설정하세요.", "err")
      return false
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      calStatus("실패: " + (data.error || res.status), "err")
      return false
    }
    localStorage.setItem(PW_KEY, password)
    calStatus(okMsg, "ok")
    await loadCalendar()
    return true
  } catch {
    calStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
    return false
  }
}

async function createCalEvent() {
  const titleEl = document.querySelector<HTMLInputElement>("[data-sh-cal-title]")
  const startEl = document.querySelector<HTMLInputElement>("[data-sh-cal-start]")
  const endEl = document.querySelector<HTMLInputElement>("[data-sh-cal-end]")
  const title = (titleEl?.value || "").trim()
  const start = toApiDateTime(startEl?.value || "")
  const end = toApiDateTime(endEl?.value || "")
  if (!title || !start || !end) {
    calStatus("제목·시작·종료를 모두 입력하세요.", "err")
    return
  }
  const ok = await calWrite({ action: "insert", title, start, end }, "일정 추가됨")
  if (ok) {
    if (titleEl) titleEl.value = ""
    if (startEl) startEl.value = ""
    if (endEl) endEl.value = ""
  }
}

// Replace the row's display with an inline editor (title + start/end).
function openCalEditor(row: HTMLElement, id: string) {
  if (row.querySelector(".sh-cal-edit")) return
  const titleEl = row.querySelector<HTMLElement>(".sh-cal-item-main b")
  const curTitle = titleEl?.textContent || ""
  const editor = document.createElement("div")
  editor.className = "sh-cal-edit"
  editor.innerHTML =
    `<input class="sh-input sh-cal-edit-title" value="${escHtml(curTitle)}" />` +
    `<div class="sh-cal-add-row">` +
    `<label><span>시작</span><input class="sh-input sh-cal-edit-start" type="datetime-local" /></label>` +
    `<label><span>종료</span><input class="sh-input sh-cal-edit-end" type="datetime-local" /></label>` +
    `</div>` +
    `<div class="sh-cal-edit-actions">` +
    `<button type="button" class="sh-btn sh-btn-new" data-sh-cal-save>저장</button>` +
    `<button type="button" class="sh-btn sh-btn-ghost" data-sh-cal-cancel>취소</button>` +
    `</div>`
  row.appendChild(editor)
  // Prefill the start/end from the row's known event (re-fetch is overkill).
  const ev = calCache.find((e) => e.id === id)
  if (ev) {
    const s = editor.querySelector<HTMLInputElement>(".sh-cal-edit-start")
    const en = editor.querySelector<HTMLInputElement>(".sh-cal-edit-end")
    if (s) s.value = toLocalInput(ev.start)
    if (en) en.value = toLocalInput(ev.end)
  }
  editor.querySelector<HTMLInputElement>(".sh-cal-edit-title")?.focus()
}

async function loadNotes() {
  const list = document.querySelector<HTMLElement>("[data-sh-notes-list]")
  if (!list) return
  if (notesCache.length) {
    renderNoteList(notesCache, (document.querySelector<HTMLInputElement>("[data-sh-notes-search]")?.value || ""))
    return
  }
  list.innerHTML = `<p class="sh-modal-hint">불러오는 중…</p>`
  try {
    const res = await fetch("/static/contentIndex.json")
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as Record<string, { title?: string; slug?: string }>
    notesCache = Object.entries(data)
      .map(([slug, v]) => ({ slug: v.slug || slug, title: v.title || slug }))
      .filter((n) => n.slug && !n.slug.startsWith("tags/"))
      .sort((a, b) => a.title.localeCompare(b.title))
    renderNoteList(notesCache, "")
  } catch {
    list.innerHTML = `<p class="sh-modal-hint">노트 목록을 불러오지 못했어요.</p>`
  }
}

function renderNoteList(notes: NoteItem[], query: string) {
  const list = document.querySelector<HTMLElement>("[data-sh-notes-list]")
  if (!list) return
  const q = query.trim().toLowerCase()
  const filtered = q ? notes.filter((n) => n.title.toLowerCase().includes(q)) : notes
  if (!filtered.length) {
    list.innerHTML = `<p class="sh-modal-hint">일치하는 노트가 없어요.</p>`
    return
  }
  list.innerHTML = filtered
    .slice(0, 300)
    .map(
      (n) =>
        `<button type="button" class="sh-note-row" data-sh-note-slug="${escHtml(n.slug)}" data-sh-note-title="${escHtml(n.title)}">${escHtml(n.title)}</button>`,
    )
    .join("")
}

// Open a note for READING inside the panel via <iframe> (no host navigation, so
// the recording keeps running).
function openNote(slug: string, title: string) {
  const browse = document.querySelector<HTMLElement>("[data-sh-notes-browse]")
  const reader = document.querySelector<HTMLElement>("[data-sh-notes-reader]")
  const frame = document.querySelector<HTMLIFrameElement>("[data-sh-notes-frame]")
  const titleEl = document.querySelector<HTMLElement>("[data-sh-notes-reader-title]")
  if (!browse || !reader || !frame) return
  frame.src = "/" + slug.replace(/^\/+/, "")
  if (titleEl) titleEl.textContent = title
  browse.hidden = true
  reader.hidden = false
}

function closeNote() {
  const browse = document.querySelector<HTMLElement>("[data-sh-notes-browse]")
  const reader = document.querySelector<HTMLElement>("[data-sh-notes-reader]")
  const frame = document.querySelector<HTMLIFrameElement>("[data-sh-notes-frame]")
  if (!browse || !reader) return
  reader.hidden = true
  browse.hidden = false
  if (frame) frame.src = "about:blank" // stop the note from running in the background
}

const w = window as unknown as { __shAddInit?: boolean }
if (!w.__shAddInit) {
  w.__shAddInit = true
  document.addEventListener("click", onClick)
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>(".sh-edit-btn")
    if (!btn) return
    e.preventDefault()
    openEditor(btn)
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest("[data-rec-start],[data-rec-stop]")
    if (!el) return
    e.preventDefault()
    if (el.hasAttribute("data-rec-start")) startRecording()
    else stopRecording()
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLButtonElement>(".sh-copy-embed")
    if (!el) return
    e.preventDefault()
    const snippet = el.dataset.embed || ""
    navigator.clipboard?.writeText(snippet).then(
      () => {
        el.textContent = "복사됨 ✓"
        setTimeout(() => (el.textContent = "복사"), 1500)
      },
      () => {},
    )
  })
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>(".sh-delnote-btn")
    if (!btn) return
    e.preventDefault()
    deleteNote(btn)
  })
  // Rescued-transcript rows: retry the save, copy the text out, or discard.
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>(
      "[data-draft-retry],[data-draft-copy],[data-draft-drop]",
    )
    if (!btn) return
    e.preventDefault()
    const id = btn.closest<HTMLElement>(".sh-draft")?.dataset.draftId
    if (!id) return
    if (btn.hasAttribute("data-draft-retry")) {
      retryDraft(id, btn)
    } else if (btn.hasAttribute("data-draft-copy")) {
      const d = readDrafts().find((x) => x.id === id)
      navigator.clipboard?.writeText(d?.transcript || "").then(() => {
        btn.textContent = "복사됨 ✓"
        setTimeout(() => (btn.textContent = "텍스트 복사"), 1500)
      }, () => {})
    } else if (confirm("이 전사 내용을 지울까요? 되돌릴 수 없습니다.")) {
      dropDraft(id)
      renderDrafts()
    }
  })
  // Subject Auto-Generate buttons (SubjectAutoBar): quiz panel toggle, quiz
  // generate, and one-click summarize.
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    const toggle = target?.closest<HTMLElement>("[data-sh-quiz-toggle]")
    if (toggle) {
      e.preventDefault()
      const panel = document.querySelector<HTMLElement>("[data-sh-quiz-panel]")
      if (panel) {
        panel.hidden = !panel.hidden
        toggle.setAttribute("aria-expanded", String(!panel.hidden))
      }
      return
    }
    const gen = target?.closest<HTMLButtonElement>("[data-sh-quiz-generate]")
    if (gen) {
      e.preventDefault()
      const countRaw = document.querySelector<HTMLInputElement>("[data-sh-quiz-count]")?.value || "5"
      let count = parseInt(countRaw, 10)
      if (!Number.isFinite(count)) count = 5
      count = Math.max(1, Math.min(20, count))
      const difficulty =
        document.querySelector<HTMLSelectElement>("[data-sh-quiz-difficulty]")?.value || "medium"
      runGenerate("quiz", gen.dataset.shSubject || "", gen, { count, difficulty })
      return
    }
    const sum = target?.closest<HTMLButtonElement>("[data-sh-summarize]")
    if (sum) {
      e.preventDefault()
      if (!confirm("이 과목의 노트로 복습 요약 노트를 생성할까요? (20~40초)")) return
      runGenerate("summary", sum.dataset.shSubject || "", sum, {})
    }
  })
  // ── In-recording panels: calendar + note review (never touch REC) ────────
  // Panel toggles + calendar create/edit/delete + note open/back. All click
  // handling is delegated so it works on the once-rendered modal.
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement

    // Toggle the calendar panel (and load on first open).
    const calToggle = target?.closest<HTMLElement>("[data-sh-cal-toggle]")
    if (calToggle) {
      e.preventDefault()
      const panel = document.querySelector<HTMLElement>("[data-sh-cal-panel]")
      if (panel) {
        panel.hidden = !panel.hidden
        calToggle.setAttribute("aria-expanded", String(!panel.hidden))
        if (!panel.hidden) loadCalendar()
      }
      return
    }
    // Toggle the note-review panel (and load the index on first open).
    const notesToggle = target?.closest<HTMLElement>("[data-sh-notes-toggle]")
    if (notesToggle) {
      e.preventDefault()
      const panel = document.querySelector<HTMLElement>("[data-sh-notes-panel]")
      if (panel) {
        panel.hidden = !panel.hidden
        notesToggle.setAttribute("aria-expanded", String(!panel.hidden))
        if (!panel.hidden) loadNotes()
      }
      return
    }

    // Calendar: create.
    if (target?.closest("[data-sh-cal-create]")) {
      e.preventDefault()
      createCalEvent()
      return
    }
    // Calendar: open inline editor / delete on a row.
    const row = target?.closest<HTMLElement>("[data-sh-cal-id]")
    if (row) {
      const id = row.dataset.shCalId || ""
      if (target.closest("[data-sh-cal-edit]")) {
        e.preventDefault()
        openCalEditor(row, id)
        return
      }
      if (target.closest("[data-sh-cal-del]")) {
        e.preventDefault()
        if (confirm("이 일정을 삭제할까요?")) calWrite({ action: "delete", id }, "일정 삭제됨")
        return
      }
      if (target.closest("[data-sh-cal-cancel]")) {
        e.preventDefault()
        row.querySelector(".sh-cal-edit")?.remove()
        return
      }
      if (target.closest("[data-sh-cal-save]")) {
        e.preventDefault()
        const ed = row.querySelector<HTMLElement>(".sh-cal-edit")
        if (!ed) return
        const title = (ed.querySelector<HTMLInputElement>(".sh-cal-edit-title")?.value || "").trim()
        const start = toApiDateTime(ed.querySelector<HTMLInputElement>(".sh-cal-edit-start")?.value || "")
        const end = toApiDateTime(ed.querySelector<HTMLInputElement>(".sh-cal-edit-end")?.value || "")
        calWrite({ action: "patch", id, title, start, end }, "일정 수정됨")
        return
      }
    }

    // Notes: open one for reading, or go back to the list.
    const noteRow = target?.closest<HTMLElement>("[data-sh-note-slug]")
    if (noteRow) {
      e.preventDefault()
      openNote(noteRow.dataset.shNoteSlug || "", noteRow.dataset.shNoteTitle || "")
      return
    }
    if (target?.closest("[data-sh-notes-back]")) {
      e.preventDefault()
      closeNote()
      return
    }
  })
  // Notes: live search filter.
  document.addEventListener("input", (e) => {
    const search = (e.target as HTMLElement)?.closest<HTMLInputElement>("[data-sh-notes-search]")
    if (!search) return
    renderNoteList(notesCache, search.value)
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal()
  })
  window.addEventListener("hashchange", initFromHash)
}
// Auto note-count for the home Subject cards. The left "과목" sidebar (SubjectNav)
// already renders a per-subject count computed from the build's file list, so we
// just copy that live number into any card's <span class="sh-card-count"> — no
// hardcoded totals to go stale. Both are keyed by the subject slug in the href.
function fillSubjectCardCounts() {
  const slots = document.querySelectorAll<HTMLElement>(".sh-card-count")
  if (!slots.length) return
  const slugOf = (href: string | null) => (href || "").replace(/^\.?\//, "").replace(/\/+$/, "")
  const counts = new Map<string, string>()
  document.querySelectorAll<HTMLAnchorElement>("a.sh-subject[href]").forEach((a) => {
    const c = a.querySelector(".sh-count")?.textContent?.trim()
    if (c) counts.set(slugOf(a.getAttribute("href")), c)
  })
  slots.forEach((el) => {
    const n = counts.get(slugOf(el.closest<HTMLAnchorElement>("a.sh-card[href]")?.getAttribute("href") ?? ""))
    if (n) el.textContent = n
  })
}

document.addEventListener("nav", initFromHash)
document.addEventListener("nav", hideDeleted)
document.addEventListener("nav", fillSubjectCardCounts)
initFromHash()
hideDeleted()
fillSubjectCardCounts()
