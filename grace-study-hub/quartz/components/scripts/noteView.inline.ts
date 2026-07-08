// Per-note custom "Diagram view" convention.
//
// Any note whose markdown contains a  <div class="dc-view"> … </div>  block
// automatically gets a Text/Diagram toggle: Diagram view shows the custom
// block, Text view shows the plain markdown body. The toolbar is injected
// automatically — authors only write the .dc-view block (see the note design
// kit in custom.scss). Legacy .neg-diagram / .neg-toolbar are still honored.
//
// No-ops on pages without a .dc-view/.neg-diagram block.

function initNoteView() {
  const article = document.querySelector<HTMLElement>(".center article")
  if (!article) return
  const diagram = article.querySelector<HTMLElement>(".dc-view, .neg-diagram")
  if (!diagram) return

  // Reuse a hand-authored toolbar if present, else inject one before the block.
  let toolbar = article.querySelector<HTMLElement>(".dc-toolbar, .neg-toolbar")
  if (!toolbar) {
    toolbar = document.createElement("div")
    toolbar.className = "dc-toolbar"
    toolbar.innerHTML =
      '<button class="dc-vbtn" data-dc-view="text">📝 Text view</button>' +
      '<button class="dc-vbtn active" data-dc-view="diagram">🗺 Diagram view</button>'
    diagram.parentElement?.insertBefore(toolbar, diagram)
  }

  // Text-view elements = article children that are neither the toolbar nor the
  // diagram block (i.e. the rendered markdown body).
  const isChrome = (el: HTMLElement) =>
    el === diagram ||
    el === toolbar ||
    el.classList.contains("dc-toolbar") ||
    el.classList.contains("neg-toolbar")
  const textEls = (Array.from(article.children) as HTMLElement[]).filter((el) => !isChrome(el))

  const buttons = toolbar.querySelectorAll<HTMLElement>("[data-dc-view], [data-neg-view]")
  const viewOf = (b: HTMLElement) => b.dataset.dcView || b.dataset.negView || "diagram"

  const setView = (view: string) => {
    const diagramOn = view !== "text"
    diagram.style.display = diagramOn ? "" : "none"
    for (const el of textEls) el.style.display = diagramOn ? "none" : ""
    for (const b of buttons) b.classList.toggle("active", viewOf(b) === view)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  for (const b of buttons) b.addEventListener("click", () => setView(viewOf(b)))
  setView("diagram")
}

document.addEventListener("nav", initNoteView)
