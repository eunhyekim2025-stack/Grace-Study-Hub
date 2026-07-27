// Multi-tag AND filter on the /tags page. Reads the baked-in note→tags data,
// lets you toggle several tag chips, and lists the notes that carry ALL selected
// tags. Chips that can no longer narrow the current result set are dimmed. Pure
// client-side — no network, no cost. Rebound on every SPA nav.

type TxNote = { title: string; href: string; tags: string[] }

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  )
}

function initTagExplorer() {
  const root = document.getElementById("sh-tag-explorer")
  if (!root || root.dataset.bound === "1") return

  let notes: TxNote[] = []
  try {
    notes = JSON.parse(document.getElementById("tx-data")?.textContent || "[]")
  } catch {
    notes = []
  }

  const chips = Array.from(root.querySelectorAll<HTMLElement>(".tx-chip"))
  const results = document.getElementById("tx-results")
  const meta = document.getElementById("tx-meta")
  const clearBtn = document.getElementById("tx-clear")
  if (!results || !meta) return
  root.dataset.bound = "1"

  const selected = new Set<string>()

  // On an individual tag page (slug "tags/<tag>") open preselected to that tag,
  // so clicking a tag anywhere lands in a combinable filter already started.
  const slug = document.body.dataset.slug || ""
  if (slug.startsWith("tags/") && slug !== "tags/index") {
    const pre = slug.slice("tags/".length)
    if (chips.some((c) => c.dataset.tag === pre)) selected.add(pre)
  }

  const render = () => {
    const sel = [...selected]
    const matched = sel.length ? notes.filter((n) => sel.every((t) => n.tags.includes(t))) : notes

    // Tags that still co-occur with the current matches can narrow further.
    const viable = new Set<string>()
    matched.forEach((n) => n.tags.forEach((t) => viable.add(t)))
    chips.forEach((c) => {
      const t = c.dataset.tag as string
      c.classList.toggle("active", selected.has(t))
      c.classList.toggle("tx-dim", sel.length > 0 && !selected.has(t) && !viable.has(t))
    })

    meta.textContent = sel.length
      ? `${matched.length} note${matched.length !== 1 ? "s" : ""} tagged ${sel.join(" + ")}`
      : `${notes.length} tagged notes — pick tags to combine`

    results.innerHTML = matched
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(
        (n) =>
          `<li><a href="${n.href}">${esc(n.title)}</a>` +
          `<span class="tx-tags">${n.tags.map((t) => `#${esc(t)}`).join(" ")}</span></li>`,
      )
      .join("")

    if (clearBtn) clearBtn.hidden = sel.length === 0
  }

  chips.forEach((c) => {
    c.addEventListener("click", () => {
      const t = c.dataset.tag as string
      if (selected.has(t)) selected.delete(t)
      else selected.add(t)
      render()
    })
  })
  clearBtn?.addEventListener("click", () => {
    selected.clear()
    render()
  })
  render()
}

document.addEventListener("nav", initTagExplorer)
initTagExplorer()
