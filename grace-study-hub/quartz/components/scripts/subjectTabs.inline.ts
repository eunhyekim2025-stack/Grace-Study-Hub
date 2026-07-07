// Subject-page section tabs behave like page switches: clicking a tab shows
// only that section (the h2 + its content) and hides the others, then scrolls
// to the top — instead of scroll-anchoring. Graceful fallback: the tabs are
// still <a href="#slug">, so without JS they simply jump to the section.

function initSubjectTabs() {
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.sh-subjtab"))
  if (tabs.length === 0) return
  const article = document.querySelector<HTMLElement>(".center article")
  if (!article) return

  // Group the article's children into sections keyed by each h2's id.
  // Everything before the first h2 (title + subtitle) is the always-visible intro.
  const sections = new Map<string, HTMLElement[]>()
  let currentId: string | null = null
  for (const el of Array.from(article.children) as HTMLElement[]) {
    if (el.tagName === "H2" && el.id) {
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
      t.classList.toggle("active", (t.getAttribute("href") || "").slice(1) === id)
    }
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  for (const t of tabs) {
    const id = (t.getAttribute("href") || "").slice(1)
    t.addEventListener("click", (e) => {
      e.preventDefault()
      if (sections.has(id)) show(id)
    })
  }

  // Activate the first section on load.
  const firstId = (tabs[0].getAttribute("href") || "").slice(1)
  if (sections.has(firstId)) show(firstId)
}

document.addEventListener("nav", initSubjectTabs)
