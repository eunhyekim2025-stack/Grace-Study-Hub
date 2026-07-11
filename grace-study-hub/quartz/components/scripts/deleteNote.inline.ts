// Delete the current note. Confirms, uses the remembered "추가 비밀번호"
// (prompts once if none is stored), posts to /api/delete, then returns home
// since the page itself is being removed.
const PW_KEY = "sh-add-secret"

async function delNote(btn: HTMLButtonElement) {
  const path = btn.dataset.delPath
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
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem(PW_KEY)
      alert("삭제 실패: " + (data.error || res.status))
      btn.disabled = false
      btn.textContent = original
      return
    }
    localStorage.setItem(PW_KEY, password)
    btn.textContent = "삭제됨 · 이동 중…"
    // The page no longer exists; go home (site rebuilds in ~1–2 min).
    setTimeout(() => {
      location.href = "/"
    }, 900)
  } catch {
    alert("네트워크 오류. 배포된 사이트에서 시도하세요.")
    btn.disabled = false
    btn.textContent = original
  }
}

const w = window as unknown as { __shDelInit?: boolean }
if (!w.__shDelInit) {
  w.__shDelInit = true
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>(".sh-delnote-btn")
    if (!btn) return
    e.preventDefault()
    delNote(btn)
  })
}
