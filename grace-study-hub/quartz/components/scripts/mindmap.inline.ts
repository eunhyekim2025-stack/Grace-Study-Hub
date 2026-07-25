// Builds a radial mind map at the top of every note FROM THE NOTE ITSELF — it
// reads the rendered structure (title → H2 → H3 → key detail points) and draws a
// bubble-and-line concept map, like a hand-drawn one. Nothing is written to the
// note; the map is a live, additive overview, so all existing content is
// preserved. The detail tier pulls the salient point from each bullet (its bold
// term, else its first clause) so the map shows real content, not just section
// names. Rebuilt on every SPA nav. No external library (pure SVG via innerHTML).

type MNode = { label: string; children: MNode[]; level: number }

const MAX_DETAILS = 4 // detail leaves per heading
const MAX_NODES = 46 // safety cap so the layout stays legible

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  )
}

function cleanHeading(h: HTMLElement): string {
  const clone = h.cloneNode(true) as HTMLElement
  // Drop Quartz's clickable section-anchor so it doesn't leak "#" into the label.
  clone.querySelectorAll("a, svg").forEach((n) => n.remove())
  return (clone.textContent || "")
    .replace(/[#¶]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function firstLine(s: string, max = 58): string {
  return s.replace(/\s+/g, " ").trim().slice(0, max)
}

// The salient phrase from a bullet: its bold term if any, else its first clause.
function detailLabel(li: Element): string {
  const strong = li.querySelector("strong, b")
  let s = (strong?.textContent || li.textContent || "").replace(/\s+/g, " ").trim()
  if (!strong) s = s.split(/[.:;—–]| - | → /)[0].trim() // first clause only
  return s.slice(0, 30)
}

function addDetails(parent: MNode, list: Element, budget: { n: number }) {
  const items = Array.from(list.querySelectorAll(":scope > li"))
  for (const li of items) {
    if (parent.children.length >= MAX_DETAILS || budget.n <= 0) break
    const label = detailLabel(li)
    if (label) {
      parent.children.push({ label, children: [], level: parent.level + 1 })
      budget.n--
    }
  }
}

// Assemble the tree by walking the article in document order: H2 → branch,
// H3 → sub-branch, and each following list contributes detail leaves.
function buildTree(): MNode | null {
  const article = document.querySelector<HTMLElement>(".center article")
  if (!article) return null
  const titleEl = document.querySelector<HTMLElement>(".article-title")
  const rootLabel = firstLine(titleEl?.textContent || document.title || "Note") || "Note"
  const root: MNode = { label: rootLabel, children: [], level: 0 }
  const budget = { n: MAX_NODES }

  let curH2: MNode | null = null
  let curH3: MNode | null = null
  for (const el of Array.from(article.children) as HTMLElement[]) {
    if (budget.n <= 0) break
    const tag = el.tagName
    if (tag === "H2") {
      const label = cleanHeading(el)
      if (!label) continue
      curH2 = { label, children: [], level: 1 }
      curH3 = null
      root.children.push(curH2)
      budget.n--
    } else if (tag === "H3") {
      const label = cleanHeading(el)
      if (!label) continue
      curH3 = { label, children: [], level: curH2 ? 2 : 1 }
      ;(curH2 || root).children.push(curH3)
      budget.n--
    } else if (tag === "UL" || tag === "OL") {
      const parent = curH3 || curH2
      if (parent) addDetails(parent, el, budget)
    }
  }

  // Fallbacks for heading-less / simple notes, so EVERY note with content still
  // gets a useful Graph view.
  // (a) Top-level list → branches, with their nested items as detail leaves.
  if (root.children.length === 0) {
    const lists = Array.from(article.querySelectorAll<HTMLElement>(":scope > ul, :scope > ol"))
    for (const list of lists) {
      for (const li of Array.from(list.children) as HTMLElement[]) {
        if (li.tagName !== "LI" || root.children.length >= 8) break
        const label = detailLabel(li) || firstLine(li.textContent || "", 40)
        if (!label) continue
        const branch: MNode = { label, children: [], level: 1 }
        const sub = li.querySelector<HTMLElement>(":scope > ul, :scope > ol")
        if (sub) {
          for (const s of Array.from(sub.children) as HTMLElement[]) {
            if (s.tagName !== "LI" || branch.children.length >= MAX_DETAILS) break
            const dl = detailLabel(s)
            if (dl) branch.children.push({ label: dl, children: [], level: 2 })
          }
        }
        root.children.push(branch)
      }
      if (root.children.length) break
    }
  }
  // (b) Internal wiki-links → "related concept" nodes (ties into your linked notes).
  if (root.children.length === 0) {
    const seen = new Set<string>()
    for (const a of Array.from(article.querySelectorAll<HTMLElement>("a.internal")).slice(0, 24)) {
      const label = firstLine(a.textContent || "", 26)
      if (label && !seen.has(label.toLowerCase())) {
        seen.add(label.toLowerCase())
        root.children.push({ label, children: [], level: 1 })
        if (root.children.length >= 8) break
      }
    }
  }
  // (c) Bold / emphasized terms.
  if (root.children.length === 0) {
    const seen = new Set<string>()
    for (const s of Array.from(article.querySelectorAll<HTMLElement>("strong, b, em")).slice(0, 10)) {
      const label = firstLine(s.textContent || "", 28)
      if (label && !seen.has(label.toLowerCase())) {
        seen.add(label.toLowerCase())
        root.children.push({ label, children: [], level: 1 })
        if (root.children.length >= 8) break
      }
    }
  }
  // (d) Last resort — the first sentence of each of the first few paragraphs.
  if (root.children.length === 0) {
    for (const p of Array.from(article.querySelectorAll<HTMLElement>(":scope > p")).slice(0, 6)) {
      const sentence = (p.textContent || "").replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s/)[0]
      const label = firstLine(sentence, 40)
      if (label) root.children.push({ label, children: [], level: 1 })
    }
  }

  return root.children.length ? root : null
}

function bubbleSize(node: MNode): { w: number; h: number } {
  const lvl = Math.min(node.level, 3)
  const w = [176, 150, 130, 112][lvl]
  const fs = [14, 12.5, 11.5, 10.5][lvl]
  const cpl = Math.max(6, Math.floor(w / (fs * 0.56)))
  const lines = Math.min(4, Math.max(1, Math.ceil(node.label.length / cpl)))
  const h = Math.round(lines * (fs * 1.28) + 16)
  return { w, h }
}

type Pt = { x: number; y: number }

function leafCount(n: MNode): number {
  return n.children.length ? n.children.reduce((s, c) => s + leafCount(c), 0) : 1
}

// Recursive sector-based radial layout: each node owns an angular slice sized by
// its leaf count, and sits on the ring for its depth. This keeps whole branches
// in separate wedges, so adding a detail tier doesn't collide across branches.
function layout(root: MNode): Map<MNode, Pt> {
  const pos = new Map<MNode, Pt>()
  const rings = [0, root.children.length <= 2 ? 155 : 195, 340, 480]
  const radiusFor = (lvl: number) =>
    lvl < rings.length ? rings[lvl] : rings[rings.length - 1] + (lvl - rings.length + 1) * 150

  const assign = (node: MNode, a0: number, a1: number) => {
    const mid = (a0 + a1) / 2
    const r = radiusFor(node.level)
    pos.set(node, { x: Math.cos(mid) * r, y: Math.sin(mid) * r })
    const total = leafCount(node)
    let a = a0
    for (const c of node.children) {
      const span = (a1 - a0) * (leafCount(c) / total)
      assign(c, a, a + span)
      a += span
    }
  }
  assign(root, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI)
  return pos
}

function walk(node: MNode, fn: (n: MNode) => void) {
  fn(node)
  node.children.forEach((c) => walk(c, fn))
}

function render(canvas: HTMLElement, root: MNode) {
  const pos = layout(root)
  const sizes = new Map<MNode, { w: number; h: number }>()

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  walk(root, (n) => {
    const p = pos.get(n)!
    const s = bubbleSize(n)
    sizes.set(n, s)
    minX = Math.min(minX, p.x - s.w / 2)
    minY = Math.min(minY, p.y - s.h / 2)
    maxX = Math.max(maxX, p.x + s.w / 2)
    maxY = Math.max(maxY, p.y + s.h / 2)
  })
  const pad = 28
  minX -= pad
  minY -= pad
  maxX += pad
  maxY += pad
  const vw = maxX - minX
  const vh = maxY - minY

  // Connectors first (drawn under the bubbles).
  let edges = ""
  const drawEdge = (a: MNode, b: MNode) => {
    const pa = pos.get(a)!
    const pb = pos.get(b)!
    edges += `<line x1="${pa.x.toFixed(1)}" y1="${pa.y.toFixed(1)}" x2="${pb.x.toFixed(
      1,
    )}" y2="${pb.y.toFixed(1)}" class="mm-edge mm-edge-l${Math.min(b.level, 3)}" />`
  }
  walk(root, (n) => n.children.forEach((c) => drawEdge(n, c)))

  // Bubbles (foreignObject lets the browser wrap + theme the text).
  let bubbles = ""
  walk(root, (n) => {
    const p = pos.get(n)!
    const s = sizes.get(n)!
    bubbles +=
      `<foreignObject x="${(p.x - s.w / 2).toFixed(1)}" y="${(p.y - s.h / 2).toFixed(1)}" ` +
      `width="${s.w}" height="${s.h}">` +
      `<div xmlns="http://www.w3.org/1999/xhtml" class="mm-bubble mm-l${Math.min(n.level, 3)}">` +
      `<span>${esc(n.label)}</span></div></foreignObject>`
  })

  canvas.innerHTML =
    `<svg class="mm-svg" viewBox="${minX.toFixed(1)} ${minY.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(
      1,
    )}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mind map of this note">` +
    `<g>${edges}</g><g>${bubbles}</g></svg>`
}

function initMindmap() {
  const wrap = document.getElementById("sh-mindmap")
  const canvas = document.getElementById("sh-mm-canvas")
  const article = document.querySelector<HTMLElement>(".center article")
  if (!wrap || !canvas) return // not a note page

  const tree = buildTree()
  if (!tree) {
    // Nothing to map → hide the toggle and just show the note text.
    wrap.hidden = true
    canvas.hidden = true
    if (article) article.style.display = ""
    return
  }
  render(canvas, tree)
  wrap.hidden = false

  const buttons = Array.from(wrap.querySelectorAll<HTMLElement>(".mm-vbtn"))
  const setView = (view: string) => {
    const graph = view === "graph"
    canvas.hidden = !graph
    if (article) article.style.display = graph ? "none" : ""
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.mmView === view))
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  buttons.forEach((b) => {
    if (b.dataset.bound === "1") return
    b.dataset.bound = "1"
    b.addEventListener("click", () => setView(b.dataset.mmView || "text"))
  })
  setView("text") // default: show the note
}

document.addEventListener("nav", initMindmap)
initMindmap()
