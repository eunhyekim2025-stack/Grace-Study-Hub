// Collapse / expand the left sidebar. Toggling `html.sh-side-collapsed` drives
// the CSS: the sidebar column animates to 0 and the content fills the space.
// The choice is remembered across pages/visits via localStorage.
const KEY = "sh-side-collapsed"

function apply(collapsed: boolean) {
  document.documentElement.classList.toggle("sh-side-collapsed", collapsed)
}

// Apply the saved state without animating (avoids a "flash then slide" on load).
function init() {
  const collapsed = localStorage.getItem(KEY) === "1"
  document.documentElement.classList.add("sh-side-notransition")
  apply(collapsed)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => document.documentElement.classList.remove("sh-side-notransition")),
  )
}

const w = window as unknown as { __shSideInit?: boolean }
if (!w.__shSideInit) {
  w.__shSideInit = true
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest("[data-side-toggle]")
    if (!btn) return
    e.preventDefault()
    const collapsed = !document.documentElement.classList.contains("sh-side-collapsed")
    apply(collapsed)
    localStorage.setItem(KEY, collapsed ? "1" : "0")
  })
}
document.addEventListener("nav", init)
init()
