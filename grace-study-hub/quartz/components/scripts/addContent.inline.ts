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
    status("저장됨 → " + (data.path || "") + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
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
    { type: "note", title, subject: val("sh-note-subject"), tags: val("sh-note-tags"), content, polish },
    btn,
    polish,
  )
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
  const data = await postTo(
    "/api/add-subject",
    { name, genNotes: checked("sh-subject-notes"), genQuiz: checked("sh-subject-quiz") },
    btn,
  )
  if (data && data.ok) {
    const ai = data.aiSkipped ? " (AI 생성은 건너뜀 — GROQ_API_KEY 필요)" : ""
    status(`"${name}" 과목 생성됨${ai} · 1–2분 뒤 사이드바에 나타나요.`, "ok")
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
  recStatus("정리 중… 강의 노트를 만들고 있어요 (10~40초)")
  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "note",
        title: val("sh-rec-title").trim(),
        subject: val("sh-file-subject"),
        tags: "lecture, 녹음",
        content: transcript,
        mode: "lecture",
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
    recStatus("저장됨 → " + (data.path || "") + " · 1–2분 뒤 사이트에 반영됩니다.", "ok")
    const t = document.getElementById("sh-rec-title") as HTMLInputElement | null
    if (t) t.value = ""
  } catch {
    recStatus("네트워크 오류. 배포된 사이트에서 시도하세요.", "err")
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
document.addEventListener("nav", initFromHash)
document.addEventListener("nav", hideDeleted)
initFromHash()
hideDeleted()
