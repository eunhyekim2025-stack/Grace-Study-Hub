// Builds a radial mind map at the top of every note FROM THE NOTE ITSELF — it
// reads the rendered headings (title → H2 → H3) and draws a bubble-and-line map,
// like a hand-drawn concept map. Nothing is written to the note; the map is a
// live, additive overview, so all existing content is preserved. Rebuilt on
// every SPA nav. No external library (pure SVG via innerHTML).

type MNode = { label: string; children: MNode[]; level: number }

const OPEN_KEY = "sh-mm-open"

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

function firstLine(s: string): string {
  return s.replace(/\s+/g, " ").trim().slice(0, 60)
}

// Assemble the tree from the article's headings, with graceful fallbacks so even
// heading-light notes get a small map.
function buildTree(): MNode | null {
  const article = document.querySelector<HTMLElement>(".center article")
  if (!article) return null
  const titleEl = document.querySelector<HTMLElement>(".article-title")
  const rootLabel = firstLine(titleEl?.textContent || document.title || "Note") || "Note"
  const root: MNode = { label: rootLabel, children: [], level: 0 }

  const heads = Array.from(article.querySelectorAll<HTMLElement>("h2, h3"))
  let lastH2: MNode | null = null
  for (const h of heads) {
    const label = cleanHeading(h)
    if (!label) continue
    if (h.tagName === "H2") {
      lastH2 = { label, children: [], level: 1 }
      root.children.push(lastH2)
    } else {
      const node: MNode = { label, children: [], level: 2 }
      if (lastH2) lastH2.children.push(node)
      else root.children.push({ ...node, level: 1 })
    }
  }

  // Fallback 1: no headings → use the note's top-level list items as branches.
  if (root.children.length === 0) {
    const items = Array.from(
      article.querySelectorAll<HTMLElement>(":scope > ul > li, :scope > ol > li"),
    ).slice(0, 7)
    for (const li of items) {
      const label = firstLine(li.textContent || "")
      if (label) root.children.push({ label, children: [], level: 1 })
    }
  }
  // Fallback 2: still nothing → use bold terms.
  if (root.children.length === 0) {
    const strongs = Array.from(article.querySelectorAll<HTMLElement>("strong, b")).slice(0, 6)
    const seen = new Set<string>()
    for (const s of strongs) {
      const label = firstLine(s.textContent || "")
      if (label && !seen.has(label.toLowerCase())) {
        seen.add(label.toLowerCase())
        root.children.push({ label, children: [], level: 1 })
      }
    }
  }

  return root.children.length ? root : null
}

function bubbleSize(node: MNode): { w: number; h: number } {
  const w = node.level === 0 ? 176 : node.level === 1 ? 148 : 128
  const fs = node.level === 0 ? 14 : node.level === 1 ? 12.5 : 11.5
  const cpl = Math.max(6, Math.floor(w / (fs * 0.56)))
  const lines = Math.min(4, Math.max(1, Math.ceil(node.label.length / cpl)))
  const h = Math.round(lines * (fs * 1.28) + 16)
  return { w, h }
}

type Pt = { x: number; y: number }

// Radial layout: root at origin, H2 branches spread evenly on a ring, each H3
// child fanned out just past its parent.
function layout(root: MNode): Map<MNode, Pt> {
  const pos = new Map<MNode, Pt>()
  pos.set(root, { x: 0, y: 0 })
  const branches = root.children
  const n = branches.length
  const R1 = n <= 3 ? 200 : n <= 6 ? 240 : 280
  const R2 = 168
  branches.forEach((b, i) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * i) / n
    const bx = Math.cos(ang) * R1
    const by = Math.sin(ang) * R1
    pos.set(b, { x: bx, y: by })
    const kids = b.children
    const m = kids.length
    if (m) {
      const spread = Math.min(Math.PI * 0.55, 0.34 * m)
      kids.forEach((k, j) => {
        const a2 = ang + (m === 1 ? 0 : -spread / 2 + (spread * j) / (m - 1))
        pos.set(k, { x: bx + Math.cos(a2) * R2, y: by + Math.sin(a2) * R2 })
      })
    }
  })
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
    )}" y2="${pb.y.toFixed(1)}" class="mm-edge" />`
  }
  root.children.forEach((b) => {
    drawEdge(root, b)
    b.children.forEach((k) => drawEdge(b, k))
  })

  // Bubbles (foreignObject lets the browser wrap + theme the text).
  let bubbles = ""
  walk(root, (n) => {
    const p = pos.get(n)!
    const s = sizes.get(n)!
    bubbles +=
      `<foreignObject x="${(p.x - s.w / 2).toFixed(1)}" y="${(p.y - s.h / 2).toFixed(1)}" ` +
      `width="${s.w}" height="${s.h}">` +
      `<div xmlns="http://www.w3.org/1999/xhtml" class="mm-bubble mm-l${n.level}">` +
      `<span>${esc(n.label)}</span></div></foreignObject>`
  })

  canvas.innerHTML =
    `<svg class="mm-svg" viewBox="${minX.toFixed(1)} ${minY.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(
      1,
    )}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mind map of this note">` +
    `<g>${edges}</g><g>${bubbles}</g></svg>`
}

function applyOpen(panel: HTMLElement, open: boolean) {
  panel.classList.toggle("rolled", !open)
  const btn = panel.querySelector("#sh-mm-toggle")
  btn?.setAttribute("aria-expanded", String(open))
}

function initMindmap() {
  const panel = document.getElementById("sh-mindmap")
  const canvas = document.getElementById("sh-mm-canvas")
  if (!panel || !canvas) return // not a note page

  const tree = buildTree()
  if (!tree) {
    panel.hidden = true
    return
  }
  render(canvas, tree)
  panel.hidden = false

  const open = localStorage.getItem(OPEN_KEY) !== "0"
  applyOpen(panel, open)

  const btn = document.getElementById("sh-mm-toggle")
  if (btn && btn.dataset.bound !== "1") {
    btn.dataset.bound = "1"
    btn.addEventListener("click", () => {
      const nowOpen = panel.classList.contains("rolled")
      applyOpen(panel, nowOpen)
      localStorage.setItem(OPEN_KEY, nowOpen ? "1" : "0")
    })
  }
}

document.addEventListener("nav", initMindmap)
initMindmap()
