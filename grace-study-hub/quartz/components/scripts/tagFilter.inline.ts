// Site-wide in-place multi-tag filter. Clicking any [data-mtag] chip (home /
// sidebar / note tags) toggles a shared selection kept on window (so it survives
// SPA nav), and a floating panel lists notes carrying ALL selected tags. Pure
// client-side, no cost. A single delegated click listener handles chips on any
// page; each page refreshes the panel via a stored render fn.

type TfNote = { title: string; href: string; tags: string[] }

declare global {
  interface Window {
    __mtagSel?: Set<string>
    __mtagBound?: boolean
    __mtagRender?: () => void
  }
}

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  )
}

function initTagFilter() {
  const panel = document.getElementById("sh-tagfilter")
  const results = document.getElementById("tf-results")
  const countEl = document.getElementById("tf-count")
  const selEl = document.getElementById("tf-sel")
  if (!panel || !results || !countEl || !selEl) return

  let notes: TfNote[] = []
  try {
    notes = JSON.parse(document.getElementById("sh-tagfilter-data")?.textContent || "[]")
  } catch {
    notes = []
  }

  const selected = (window.__mtagSel ??= new Set<string>())

  const markChips = () => {
    document.querySelectorAll<HTMLElement>("[data-mtag]").forEach((el) => {
      el.classList.toggle("mtag-on", selected.has(el.dataset.mtag as string))
    })
  }

  const render = () => {
    const sel = [...selected]
    markChips()
    if (!sel.length) {
      panel.hidden = true
      return
    }
    const matched = notes.filter((n) => sel.every((t) => n.tags.includes(t)))
    countEl.textContent = `${matched.length} note${matched.length !== 1 ? "s" : ""}`
    selEl.textContent = sel.map((t) => `#${t}`).join(" ")
    results.innerHTML =
      matched
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((n) => `<li><a href="${n.href}">${esc(n.title)}</a></li>`)
        .join("") || `<li class="tf-empty">이 태그들을 모두 가진 노트가 없습니다</li>`
    panel.hidden = false
  }

  // Store this page's render so the global click handler always drives the
  // current DOM (panel + data are re-rendered on every SPA nav).
  window.__mtagRender = render

  document.getElementById("tf-clear")?.addEventListener("click", () => {
    selected.clear()
    render()
  })
  document.getElementById("tf-x")?.addEventListener("click", () => {
    selected.clear()
    render()
  })

  // One delegated listener for the whole document, bound once.
  if (!window.__mtagBound) {
    window.__mtagBound = true
    document.addEventListener("click", (e) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-mtag]") as HTMLElement | null
      if (!el) return
      e.preventDefault() // toggle in place instead of navigating
      const t = el.dataset.mtag as string
      if (selected.has(t)) selected.delete(t)
      else selected.add(t)
      window.__mtagRender?.()
    })
  }

  render()
}

document.addEventListener("nav", initTagFilter)
initTagFilter()
