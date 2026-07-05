// In-page "add content" modal: opens on the site (no GitHub redirect), posts to
// the /api/add serverless function which commits into the wiki. The shared
// password is remembered in localStorage after the first success.

const PW_KEY = "sh-add-secret"

function modal(): HTMLElement | null {
  return document.getElementById("sh-add-modal")
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

function openModal(tab: string) {
  const m = modal()
  if (!m) return
  const pw = document.getElementById("sh-add-pw") as HTMLInputElement | null
  if (pw && !pw.value) pw.value = localStorage.getItem(PW_KEY) || ""
  status("")
  setTab(tab)
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
      status("실패: " + (data.error || res.status), "err")
      return
    }
    localStorage.setItem(PW_KEY, password)
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
  post(
    { type: "note", title, subject: val("sh-note-subject"), tags: val("sh-note-tags"), content },
    btn,
  )
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
    openModal(t.dataset.addOpen || "note")
  } else if (t.dataset.addClose !== undefined) {
    e.preventDefault()
    closeModal()
  } else if (t.dataset.addTab !== undefined) {
    setTab(t.dataset.addTab || "note")
  } else if (t.dataset.addSubmit !== undefined) {
    e.preventDefault()
    if (t.dataset.addSubmit === "file") submitFile(t as HTMLButtonElement)
    else submitNote(t as HTMLButtonElement)
  }
}

// Deep-link: /page#new opens the note tab, #upload opens the upload tab.
function initFromHash() {
  if (location.hash === "#new") openModal("note")
  else if (location.hash === "#upload") openModal("upload")
}

const w = window as unknown as { __shAddInit?: boolean }
if (!w.__shAddInit) {
  w.__shAddInit = true
  document.addEventListener("click", onClick)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal()
  })
  window.addEventListener("hashchange", initFromHash)
}
document.addEventListener("nav", initFromHash)
initFromHash()
