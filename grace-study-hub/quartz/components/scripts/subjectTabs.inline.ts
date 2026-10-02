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

  // Hoist the tab bar to the top of that container. Quartz renders beforeBody
  // (where the bar lives) in a SHORT wrapper that is a *sibling* of the article,
  // so `position: sticky` on the bar has no room to stick over the sections.
  // Moving it into the sections' container gives sticky the full article height
  // as its containing block, so the bar stays pinned under the fixed top bar
  // while a section is scrolled up. Idempotent across SPA-nav re-runs.
  const tabBar = tabs[0].closest(".sh-subjtabs") as HTMLElement | null
  if (tabBar && container.firstElementChild !== tabBar) {
    container.insertBefore(tabBar, container.firstChild)
  }

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

  // Bring the selected section's heading up to just below the sticky tab bar
  // (which itself sits under the fixed top bar). Scrolling to the PAGE top (0)
  // is wrong here: these hubs carry a tall always-visible intro (the dc-view
  // overview) between the tabs and the first section, so top:0 shows the
  // overview, not the section the user picked. We want the chosen section at
  // the top of the reading area, with the tab bar still pinned above it.
  const bringSectionUp = (heading: HTMLElement) => {
    const tabsEl = document.querySelector<HTMLElement>(".sh-subjtabs")
    const topbar =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sh-topbar-h")) || 60
    const tabsH = tabsEl ? Math.round(tabsEl.getBoundingClientRect().height) : 0
    const y = window.scrollY + heading.getBoundingClientRect().top - topbar - tabsH - 10
    window.scrollTo({ top: Math.max(0, y), left: 0 })
  }

  // scroll=true only on a real tab click; on first load we must NOT auto-scroll
  // (the page should open at the top showing the overview).
  const show = (id: string, scroll: boolean) => {
    for (const [sid, els] of sections) {
      const on = sid === id
      for (const e of els) e.style.display = on ? "" : "none"
    }
    for (const t of tabs) {
      t.classList.toggle("active", (t.getAttribute("href") || "").replace(/^#/, "") === id)
    }
    if (!scroll) return
    // Hiding/showing the sections reflows the page, which triggers a competing
    // *synchronous* scroll that overrides an immediate scrollTo here. Running it
    // again on the next animation frame — after that reflow has settled — makes
    // our position authoritative.
    const heading = sections.get(id)?.[0]
    if (!heading) return
    const go = () => bringSectionUp(heading)
    go()
    requestAnimationFrame(go)
  }

  for (const t of tabs) {
    const id = (t.getAttribute("href") || "").replace(/^#/, "")
    t.addEventListener("click", (e) => {
      e.preventDefault()
      // Stop the click from bubbling up to Quartz's SPA router, whose
      // window-level listener treats a same-page "#section" link as an anchor
      // jump (el.scrollIntoView()) and would fight our own positioning.
      e.stopPropagation()
      if (sections.has(id)) show(id, true)
    })
  }

  // Activate the first section on load — WITHOUT scrolling (open at the top).
  const firstId = [...sections.keys()][0]
  if (firstId) show(firstId, false)
}

document.addEventListener("nav", initSubjectTabs)
