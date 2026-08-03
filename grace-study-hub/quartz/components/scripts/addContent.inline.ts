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

async function post(payload: Record<string, unknown>, btn: HTMLButtonElement, polish = false) {
  const password = val("sh-add-pw").trim()
  if (!password) {
    status("비밀번호를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  status(
    polish
      ? "AI가 정리하는 중… (10~30초, 사이트는 1–2분 뒤 재배포됩니다)"
      : "저장 중… (사이트가 1–2분 뒤 재배포됩니다)",
  )
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
  const polish = checked("sh-note-polish")
  post(
    {
      type: "note",
      title,
      subject: val("sh-note-subject"),
      tags: val("sh-note-tags"),
      content,
      polish,
      knownTags: knownTags(), // reuse the existing vocabulary for auto-tagging
    },
    btn,
    polish,
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
  jobs: Promise<{ i: number; text: string }>[]
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

function transcribeBlob(blob: Blob, i: number, password: string): Promise<{ i: number; text: string }> {
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
          recStatus("전사 실패: " + (data.error || res.status), "err")
          resolve({ i, text: "" })
          return
        }
        resolve({ i, text: data.text || "" })
      } catch {
        resolve({ i, text: "" })
      }
    }
    reader.onerror = () => resolve({ i, text: "" })
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
          REC.archiveOn = false // no store, wrong store type, or transient error
          resolve({ i, path: null })
          return
        }
        const data = await res.json().catch(() => ({}))
        resolve({ i, path: data.archived ? data.path : null })
      } catch {
        resolve({ i, path: null })
      }
    }
    reader.onerror = () => resolve({ i, path: null })
    reader.readAsDataURL(blob)
  })
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
  startSegment(password)
  REC.rotate = window.setInterval(() => {
    if (REC.rec && REC.rec.state !== "inactive") REC.rec.stop()
    startSegment(password)
  }, SEG_MS)
  REC.tick = window.setInterval(() => {
    recStatus(`🔴 녹음 중 ${clock(Date.now() - REC.startedAt)} · 전사 대기 ${REC.jobs.length}조각`)
  }, 1000)
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
  const transcript = results
    .sort((a, b) => a.i - b.i)
    .map((r) => r.text)
    .filter(Boolean)
    .join(" ")
    .trim()
  if (!transcript) {
    recStatus("전사 결과가 비었습니다. Vercel의 GROQ_API_KEY를 확인하세요.", "err")
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

  recStatus("정리 중… 강의 노트를 만들고 있어요 (10~40초)")
  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title: val("sh-rec-title").trim(),
        subject: val("sh-file-subject"),
        tags: "lecture, recording",
        content: transcript,
        mode: "lecture",
        ...(audio.length ? { audio } : {}),
        password,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      recStatus("저장 실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    const backup = audio.length ? ` · 🎙 녹음본 ${audio.length}조각 비공개 백업됨` : ""
    recStatus("저장됨 → " + (data.path || "") + backup + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
    const t = document.getElementById("sh-rec-title") as HTMLInputElement | null
    if (t) t.value = ""
  } catch {
    recStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  }
}

// ── Video link → captions → lecture note ──────────────────────────────────
// Paste a YouTube link; /api/video pulls its caption track and returns the
// transcript, which we hand to /api/add exactly like a stitched recording
// (mode:"lecture"). No audio download — captions are just text.
function videoStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.getElementById("sh-video-status")
  if (el) {
    el.textContent = msg
    el.className = "sh-rec-status" + (kind ? " " + kind : "")
  }
}

async function generateFromVideo(btn: HTMLButtonElement) {
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    revealPwField()
    videoStatus("먼저 추가 비밀번호를 입력하세요.", "err")
    return
  }
  const url = val("sh-video-url").trim()
  if (!url) {
    videoStatus("YouTube 링크를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  try {
    videoStatus("영상 자막을 가져오는 중…")
    const vres = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, password }),
    })
    const vdata = await vres.json().catch(() => ({}))
    if (!vres.ok) {
      if (vres.status === 401) revealPwField()
      videoStatus("실패: " + (vdata.error || vres.status), "err")
      return
    }
    const transcript = String(vdata.transcript || "")
    const title = val("sh-video-title").trim() || String(vdata.title || "Video note")
    const kind = vdata.autoGenerated ? "자동 생성 자막" : "자막"
    videoStatus(`${kind} 확보 (${transcript.length.toLocaleString()}자) · 강의 노트를 만드는 중… (10~40초)`)

    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title,
        subject: val("sh-file-subject"),
        tags: "lecture, video",
        content: transcript,
        mode: "lecture",
        knownTags: knownTags(),
        password,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      videoStatus("노트 생성 실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
    syncPwField()
    videoStatus("저장됨 → " + (data.path || "") + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
    ;["sh-video-url", "sh-video-title"].forEach((id) => {
      const el = document.getElementById(id) as HTMLInputElement | null
      if (el) el.value = ""
    })
  } catch {
    videoStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  } finally {
    btn.disabled = false
  }
}

// Long video → one note per chapter. Fetches the chapter split from /api/video
// (mode:"chapters"), then generates notes one at a time so we stay under Groq's
// rate limits. Completed chapters are remembered per video in localStorage, so
// if a run stops (rate limit, closed tab) clicking again RESUMES where it left
// off — already-made chapters are skipped, no wasted Groq calls.
function chapDoneKey(videoId: string): string {
  return "sh-vidchap-" + videoId
}
function readChapDone(videoId: string): number[] {
  try {
    const a = JSON.parse(localStorage.getItem(chapDoneKey(videoId)) || "[]")
    return Array.isArray(a) ? a.filter((n) => typeof n === "number") : []
  } catch {
    return []
  }
}
function markChapDone(videoId: string, idx: number) {
  const set = new Set(readChapDone(videoId))
  set.add(idx)
  localStorage.setItem(chapDoneKey(videoId), JSON.stringify([...set]))
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function generateChaptersFromVideo(btn: HTMLButtonElement) {
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    revealPwField()
    videoStatus("먼저 추가 비밀번호를 입력하세요.", "err")
    return
  }
  const url = val("sh-video-url").trim()
  if (!url) {
    videoStatus("YouTube 링크를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  try {
    videoStatus("영상 챕터를 분석하는 중…")
    const vres = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, password, mode: "chapters" }),
    })
    const vdata = await vres.json().catch(() => ({}))
    if (!vres.ok) {
      if (vres.status === 401) revealPwField()
      videoStatus("실패: " + (vdata.error || vres.status), "err")
      return
    }
    const videoId = String(vdata.videoId || "")
    const chapters = Array.isArray(vdata.chapters) ? vdata.chapters : []
    if (!chapters.length) {
      videoStatus("챕터를 만들 자막이 없습니다.", "err")
      return
    }
    const base = val("sh-video-title").trim() || String(vdata.title || "Video note")
    const done = new Set(readChapDone(videoId))
    const total = chapters.length
    const todo = chapters.filter((c: { index: number }) => !done.has(c.index))
    if (!todo.length) {
      videoStatus(`이미 ${total}개 챕터 노트가 모두 생성돼 있어요.`, "ok")
      return
    }

    let made = 0
    const already = total - todo.length
    for (let n = 0; n < todo.length; n++) {
      const ch = todo[n]
      const label = String(ch.title || `Part ${ch.index + 1}`)
      videoStatus(`강의 노트 생성 중… ${already + made + 1}/${total} · ${label}`)
      const title = `${base} — ${label}`
      let data: { error?: string; path?: string } = {}
      try {
        const res = await fetch("/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "note",
            title,
            subject: val("sh-file-subject"),
            tags: "lecture, video, chapter",
            content: String(ch.transcript || ""),
            mode: "lecture",
            knownTags: knownTags(),
            password,
          }),
        })
        data = await res.json().catch(() => ({}))
        if (res.ok) {
          markChapDone(videoId, ch.index)
          made++
        } else if (res.status === 422 && /exist/i.test(data.error || "")) {
          // A note with this title already exists — treat as done and continue.
          markChapDone(videoId, ch.index)
        } else {
          // Likely a Groq rate/day limit — stop and let the user resume later.
          videoStatus(
            `${already + made}/${total} 생성 후 중단: ${data.error || res.status}. ` +
              `잠시 뒤 다시 "챕터별 노트 생성"을 누르면 이어서 만들어요.`,
            "err",
          )
          return
        }
      } catch {
        videoStatus(
          `${already + made}/${total} 생성 후 네트워크 오류. 다시 누르면 이어서 만들어요.`,
          "err",
        )
        return
      }
      localStorage.setItem(PW_KEY, password)
      syncPwField()
      if (n < todo.length - 1) await sleep(1500) // ease off Groq between chapters
    }
    videoStatus(`완료 · ${total}개 챕터 노트 생성됨 · 1–2분 뒤 사이트에 반영됩니다.`, "ok")
  } catch {
    videoStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  } finally {
    btn.disabled = false
  }
}

// ── PDF → notes ────────────────────────────────────────────────────────────
// Extract the PDF's text IN THE BROWSER (pdf.js), so we send text — not the
// multi-MB file — to /api/add (which is capped at ~1MB body + 60k lecture
// chars). Long documents split into ≤40k-char parts, one note each, with the
// same resumable progress the video-chapter flow uses.
function pdfStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.getElementById("sh-pdf-status")
  if (el) {
    el.textContent = msg
    el.className = "sh-rec-status" + (kind ? " " + kind : "")
  }
}

function loadPdfJs(): Promise<any> {
  const w = window as any
  if (w.pdfjsLib) return Promise.resolve(w.pdfjsLib)
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js"
    s.onload = () => {
      const lib = w.pdfjsLib
      if (!lib) return reject(new Error("pdf.js 로드 실패"))
      lib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js"
      resolve(lib)
    }
    s.onerror = () => reject(new Error("PDF 라이브러리를 불러오지 못했습니다."))
    document.head.appendChild(s)
  })
}

async function extractPdfText(
  file: File,
  onProgress?: (page: number, pages: number) => void,
): Promise<string> {
  const pdfjs = await loadPdfJs()
  const buf = await file.arrayBuffer()
  const doc = await pdfjs.getDocument({ data: buf }).promise
  const pages: string[] = []
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    pages.push(content.items.map((i: any) => (typeof i.str === "string" ? i.str : "")).join(" "))
    onProgress?.(p, doc.numPages)
  }
  return pages.join("\n").replace(/[ \t]+/g, " ").trim()
}

// Even-sized ≤max pieces, split on whitespace (mirrors the server's splitText).
function chunkText(text: string, max: number): string[] {
  if (text.length <= max) return [text]
  const n = Math.ceil(text.length / max)
  const target = Math.ceil(text.length / n)
  const parts: string[] = []
  let i = 0
  for (let k = 0; k < n && i < text.length; k++) {
    let end = k === n - 1 ? text.length : Math.min(i + target, text.length)
    if (end < text.length) {
      const sp = text.lastIndexOf(" ", end)
      if (sp > i) end = sp
    }
    parts.push(text.slice(i, end).trim())
    i = end
  }
  if (i < text.length) parts.push(text.slice(i).trim())
  return parts.filter(Boolean)
}

function readPdfDone(docId: string): number[] {
  try {
    const a = JSON.parse(localStorage.getItem("sh-pdfdoc-" + docId) || "[]")
    return Array.isArray(a) ? a.filter((n) => typeof n === "number") : []
  } catch {
    return []
  }
}
function markPdfDone(docId: string, idx: number) {
  const set = new Set(readPdfDone(docId))
  set.add(idx)
  localStorage.setItem("sh-pdfdoc-" + docId, JSON.stringify([...set]))
}

async function generateNotesFromPdf(btn: HTMLButtonElement) {
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    revealPwField()
    pdfStatus("먼저 추가 비밀번호를 입력하세요.", "err")
    return
  }
  const input = document.getElementById("sh-file-input") as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) {
    pdfStatus("PDF 파일을 선택하세요.", "err")
    return
  }
  if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
    pdfStatus("PDF 파일만 지원해요.", "err")
    return
  }
  btn.disabled = true
  try {
    pdfStatus("PDF 텍스트 추출 중…")
    let text = ""
    try {
      text = await extractPdfText(file, (p, n) => pdfStatus(`PDF 텍스트 추출 중… ${p}/${n}쪽`))
    } catch (e) {
      pdfStatus("PDF를 읽지 못했습니다: " + ((e as Error)?.message || ""), "err")
      return
    }
    if (text.length < 50) {
      pdfStatus("PDF에서 글자를 찾지 못했어요 — 스캔 이미지 PDF는 지원하지 않아요.", "err")
      return
    }

    const base = file.name.replace(/\.pdf$/i, "").replace(/_+/g, " ").trim() || "PDF note"
    const docId = file.name + ":" + file.size
    const chunks = chunkText(text, 40000)
    const total = chunks.length
    const done = new Set(readPdfDone(docId))
    const todo = chunks.map((_, i) => i).filter((i) => !done.has(i))
    if (!todo.length) {
      pdfStatus(`이미 ${total}개 노트가 모두 생성돼 있어요.`, "ok")
      return
    }

    let made = 0
    const already = total - todo.length
    for (let n = 0; n < todo.length; n++) {
      const idx = todo[n]
      pdfStatus(`노트 생성 중… ${already + made + 1}/${total}${total > 1 ? ` · Part ${idx + 1}` : ""}`)
      const title = total > 1 ? `${base} — Part ${idx + 1}/${total}` : base
      let data: { error?: string; path?: string } = {}
      try {
        const res = await fetch("/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "note",
            title,
            subject: val("sh-file-subject"),
            tags: "pdf, notes",
            content: chunks[idx],
            mode: "lecture",
            knownTags: knownTags(),
            password,
          }),
        })
        data = await res.json().catch(() => ({}))
        if (res.ok) {
          markPdfDone(docId, idx)
          made++
        } else if (res.status === 422 && /exist/i.test(data.error || "")) {
          markPdfDone(docId, idx)
        } else {
          pdfStatus(
            `${already + made}/${total} 생성 후 중단: ${data.error || res.status}. ` +
              `잠시 뒤 같은 PDF로 다시 누르면 이어서 만들어요.`,
            "err",
          )
          return
        }
      } catch {
        pdfStatus(`${already + made}/${total} 생성 후 네트워크 오류. 다시 누르면 이어서 만들어요.`, "err")
        return
      }
      localStorage.setItem(PW_KEY, password)
      syncPwField()
      if (n < todo.length - 1) await sleep(1500)
    }
    pdfStatus(`완료 · ${total}개 노트 생성됨 · 1–2분 뒤 사이트에 반영됩니다.`, "ok")
  } catch {
    pdfStatus("오류가 발생했습니다. 다시 시도하세요.", "err")
  } finally {
    btn.disabled = false
  }
}

// ── Web page / SQLBolt → notes ─────────────────────────────────────────────
// Fetch a URL via /api/web (server-side, no bot-gate) and turn it into notes.
// SQLBolt returns all ~17 lessons as pages[] → one note each with the same
// resumable progress as the video-chapter / PDF flows; any other URL → 1 note.
function webStatus(msg: string, kind: "" | "ok" | "err" = "") {
  const el = document.getElementById("sh-web-status")
  if (el) {
    el.textContent = msg
    el.className = "sh-rec-status" + (kind ? " " + kind : "")
  }
}
function readWebDone(docId: string): number[] {
  try {
    const a = JSON.parse(localStorage.getItem("sh-webdoc-" + docId) || "[]")
    return Array.isArray(a) ? a.filter((n) => typeof n === "number") : []
  } catch {
    return []
  }
}
function markWebDone(docId: string, idx: number) {
  const set = new Set(readWebDone(docId))
  set.add(idx)
  localStorage.setItem("sh-webdoc-" + docId, JSON.stringify([...set]))
}

// Generate one note from a title + text via /api/add (lecture mode). Returns
// "ok" | "exists" | "<error message to stop on>".
async function addLectureNote(
  title: string,
  text: string,
  tags: string,
  password: string,
): Promise<"ok" | "exists" | string> {
  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title,
        subject: val("sh-file-subject"),
        tags,
        content: text,
        mode: "lecture",
        knownTags: knownTags(),
        password,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) return "ok"
    if (res.status === 422 && /exist/i.test(data.error || "")) return "exists"
    return data.error || String(res.status)
  } catch {
    return "network"
  }
}

async function generateFromWeb(btn: HTMLButtonElement) {
  const password = (val("sh-add-pw") || localStorage.getItem(PW_KEY) || "").trim()
  if (!password) {
    revealPwField()
    webStatus("먼저 추가 비밀번호를 입력하세요.", "err")
    return
  }
  const url = val("sh-web-url").trim()
  if (!url) {
    webStatus("웹 링크를 입력하세요.", "err")
    return
  }
  btn.disabled = true
  try {
    webStatus("페이지를 분석하는 중…")
    const wres = await fetch("/api/web", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, password }),
    })
    const wdata = await wres.json().catch(() => ({}))
    if (!wres.ok) {
      if (wres.status === 401) revealPwField()
      webStatus("실패: " + (wdata.error || wres.status), "err")
      return
    }
    const isSqlbolt = wdata.source === "sqlbolt"
    const tags = isSqlbolt ? "sql, sqlbolt" : "web, notes"

    // Multi-page (SQLBolt course): one note per lesson, resumable.
    if (Array.isArray(wdata.pages) && wdata.pages.length) {
      const pages = wdata.pages as { index: number; title: string; text: string }[]
      const docId = url
      const total = pages.length
      const done = new Set(readWebDone(docId))
      const todo = pages.filter((p) => !done.has(p.index))
      if (!todo.length) {
        webStatus(`이미 ${total}개 레슨 노트가 모두 생성돼 있어요.`, "ok")
        return
      }
      let made = 0
      const already = total - todo.length
      for (let n = 0; n < todo.length; n++) {
        const p = todo[n]
        webStatus(`노트 생성 중… ${already + made + 1}/${total} · ${p.title}`)
        const r = await addLectureNote(`SQLBolt: ${p.title}`, p.text, tags, password)
        if (r === "ok" || r === "exists") {
          markWebDone(docId, p.index)
          if (r === "ok") made++
        } else if (r === "network") {
          webStatus(`${already + made}/${total} 생성 후 네트워크 오류. 다시 누르면 이어서 만들어요.`, "err")
          return
        } else {
          webStatus(
            `${already + made}/${total} 생성 후 중단: ${r}. 잠시 뒤 다시 누르면 이어서 만들어요.`,
            "err",
          )
          return
        }
        localStorage.setItem(PW_KEY, password)
        syncPwField()
        if (n < todo.length - 1) await sleep(1500)
      }
      webStatus(`완료 · ${total}개 레슨 노트 생성됨 · 1–2분 뒤 사이트에 반영됩니다.`, "ok")
      return
    }

    // Single page → one note.
    const title = String(wdata.title || "Web note")
    webStatus("강의 노트를 만드는 중… (10~40초)")
    const r = await addLectureNote(isSqlbolt ? `SQLBolt: ${title}` : title, String(wdata.text || ""), tags, password)
    if (r === "ok" || r === "exists") {
      localStorage.setItem(PW_KEY, password)
      syncPwField()
      webStatus(
        r === "exists" ? "이미 같은 제목의 노트가 있어요." : "저장됨 · 1–2분 뒤 사이트에 반영됩니다.",
        "ok",
      )
      const el = document.getElementById("sh-web-url") as HTMLInputElement | null
      if (el) el.value = ""
    } else {
      webStatus("실패: " + (r === "network" ? "네트워크 오류" : r), "err")
    }
  } catch {
    webStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
  } finally {
    btn.disabled = false
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

const w = window as unknown as { __shAddInit?: boolean }
if (!w.__shAddInit) {
  w.__shAddInit = true
  document.addEventListener("click", onClick)
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest("[data-rec-start],[data-rec-stop]")
    if (!el) return
    e.preventDefault()
    if (el.hasAttribute("data-rec-start")) startRecording()
    else stopRecording()
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLButtonElement>("[data-video-generate]")
    if (!el) return
    e.preventDefault()
    generateFromVideo(el)
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLButtonElement>("[data-video-chapters]")
    if (!el) return
    e.preventDefault()
    generateChaptersFromVideo(el)
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLButtonElement>("[data-pdf-generate]")
    if (!el) return
    e.preventDefault()
    generateNotesFromPdf(el)
  })
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLButtonElement>("[data-web-generate]")
    if (!el) return
    e.preventDefault()
    generateFromWeb(el)
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
