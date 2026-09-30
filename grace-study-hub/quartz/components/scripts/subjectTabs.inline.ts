// Subject-page section tabs behave like page switches: clicking a tab shows
// only that section (its h2 + the content up to the next section) and hides the
// others, then jumps to the top — instead of scroll-anchoring.
//
// Sections are located by the tab targets themselves: each tab is an
// <a href="#heading-slug">, so we find the matching <h2 id="heading-slug"> and
// group the siblings that follow it under that heading's shared parent. This is
// structure-independent, so it works the same on a plain content-page hub
// (operations-management.md) AND on a folder-index hub (management-accounting/
// index.md, CTRW, MPW), whose article wrapper differs. Graceful fallback: with
// no JS the tabs are still <a href="#slug"> and simply jump to the section.

function initSubjectTabs() {
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.sh-subjtab"))
  if (tabs.length === 0) return

  const tabIds = tabs
    .map((t) => (t.getAttribute("href") || "").replace(/^#/, ""))
    .filter((id) => id.length > 0)

  // The heading element each tab points at (only those that resolve to an h2).
  const heads = tabIds
    .map((id) => document.getElementById(id))
    .filter((h): h is HTMLElement => !!h && h.tagName === "H2")
  if (heads.length === 0) return

  // The container that actually holds the section headings (the note's article,
  // whatever its wrapper). Every section heading shares it.
  const container = heads[0].parentElement
  if (!container) return

  // Walk the container's children once, grouping each tab-heading with the
  // siblings that follow it (until the next tab-heading). Anything before the
  // first section heading (title + intro) is left always-visible.
  const sections = new Map<string, HTMLElement[]>()
  let currentId: string | null = null
  for (const el of Array.from(container.children) as HTMLElement[]) {
    if (el.tagName === "H2" && el.id && tabIds.includes(el.id)) {
      currentId = el.id
      sections.set(currentId, [el])
    } else if (currentId) {
      sections.get(currentId)!.push(el)
    }
  }
  if (sections.size === 0) return

  const show = (id: string) => {
    for (const [sid, els] of sections) {
      const on = sid === id
      for (const e of els) e.style.display = on ? "" : "none"
    }
    for (const t of tabs) {
      t.classList.toggle("active", (t.getAttribute("href") || "").replace(/^#/, "") === id)
    }
    // Jump to the top INSTANTLY. Using "auto" here inherits the page's
    // `html { scroll-behavior: smooth }`, which on a tall hub (a long dc-view
    // intro, e.g. Management Accounting) animates a long slow scroll and feels
    // like the page is scrolling rather than switching. "instant" overrides it.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }

  for (const t of tabs) {
    const id = (t.getAttribute("href") || "").replace(/^#/, "")
    t.addEventListener("click", (e) => {
      e.preventDefault()
      // Stop the click from bubbling up to Quartz's SPA router, which has a
      // window-level listener that treats a same-page "#section" link as an
      // anchor jump and calls el.scrollIntoView() — scrolling DOWN to the
      // heading and overriding our scrollTo(top:0). Without this, every subject
      // hub scrolls down instead of switching sections at the top.
      e.stopPropagation()
      if (sections.has(id)) show(id)
    })
  }

  // Activate the first section that actually resolved to content on load.
  const firstId = [...sections.keys()][0]
  if (firstId) show(firstId)
}

document.addEventListener("nav", initSubjectTabs)
