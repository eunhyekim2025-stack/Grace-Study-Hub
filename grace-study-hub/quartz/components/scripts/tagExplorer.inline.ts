// Multi-tag AND filter on tag pages. Toggle chips to list notes carrying ALL
// selected tags. Decluttered: only the top tags show by default (with a "show
// all" toggle and a search box), and once you've selected tags, only the ones
// that can narrow further stay visible. Pure client-side — no network, no cost.

type TxNote = { title: string; href: string; tags: string[] }

const INITIAL = 24 // tags shown before "show all"

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
  const moreBtn = document.getElementById("tx-more")
  const search = document.getElementById("tx-search") as HTMLInputElement | null
  if (!results || !meta) return
  root.dataset.bound = "1"

  const selected = new Set<string>()
  let showAll = false
  let query = ""

  // Preselect the current tag page's tag so it opens already filtered.
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

    // Decide chip visibility: search match + (top-N unless expanded/searching) +
    // (when filtering, only selected or still-combinable tags).
    const q = query.trim().toLowerCase()
    let shown = 0
    let hiddenByCollapse = 0
    chips.forEach((c, i) => {
      const t = c.dataset.tag as string
      const isSel = selected.has(t)
      const matchesSearch = !q || t.toLowerCase().includes(q)
      const combinable = !sel.length || isSel || viable.has(t)
      const withinTop = showAll || q !== "" || isSel || i < INITIAL
      let show = matchesSearch && combinable
      if (show && !withinTop) {
        hiddenByCollapse++
        show = false
      }
      c.classList.toggle("active", isSel)
      c.hidden = !show
      if (show) shown++
    })

    if (moreBtn) {
      if (hiddenByCollapse > 0) {
        moreBtn.hidden = false
        moreBtn.textContent = `+ 태그 ${hiddenByCollapse}개 더 보기`
      } else if (showAll && !q) {
        moreBtn.hidden = false
        moreBtn.textContent = "간략히 보기"
      } else {
        moreBtn.hidden = true
      }
    }

    meta.textContent = sel.length
      ? `${matched.length} note${matched.length !== 1 ? "s" : ""} · ${sel.map((t) => "#" + t).join(" ")}`
      : `${notes.length} tagged notes — pick tags to combine`

    results.innerHTML = sel.length
      ? matched
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(
            (n) =>
              `<li><a href="${n.href}">${esc(n.title)}</a>` +
              `<span class="tx-tags">${n.tags.map((t) => `#${esc(t)}`).join(" ")}</span></li>`,
          )
          .join("")
      : ""

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
    if (search) search.value = ""
    query = ""
    render()
  })
  moreBtn?.addEventListener("click", () => {
    showAll = !showAll
    render()
  })
  search?.addEventListener("input", () => {
    query = search.value
    render()
  })

  render()
}

document.addEventListener("nav", initTagExplorer)
initTagExplorer()
