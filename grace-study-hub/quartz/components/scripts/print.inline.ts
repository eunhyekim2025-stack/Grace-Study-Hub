// Export the current note in several formats. Wired to the "🖨 프린트 / 내보내기"
// button + dropdown menu (see PrintNote.tsx). Rebound on every SPA nav.
//
//   pdf  → opens a clean print window with only the article, then calls print()
//          (the browser's dialog offers "Save as PDF"). Using a dedicated window
//          is far more reliable than window.print() on the live SPA page.
//   png  → rasterizes the article via html-to-image (loaded from CDN on demand).
//   doc  → a Word-openable .doc file (HTML wrapped with Office namespaces).
//   html → a standalone .html web page (styles linked back to the live site).

// Chrome we never want in an export (buttons, nav, sidebars, footer…).
const STRIP_SELECTOR =
  "header, .breadcrumb-container, .sh-delnote, .sh-printnote, .sh-subjbar-wrap, " +
  ".page-footer, .sh-export-menu, script, hr"

function niceTitle(): string {
  const h1 = document.querySelector<HTMLElement>(".center h1, article h1")
  const t = (h1?.textContent || document.title || "note").trim()
  return t || "note"
}

function fileBase(): string {
  const slug = document.body.dataset.slug || ""
  const seg = slug.split("/").filter(Boolean).pop() || "note"
  return seg.replace(/[^\w.-]+/g, "-")
}

// A clone of the note (title + meta + tags + body) with all interactive chrome
// removed — the payload every exporter shares.
function buildExportNode(): HTMLElement | null {
  const center = document.querySelector<HTMLElement>(".center")
  if (!center) return null
  const clone = center.cloneNode(true) as HTMLElement
  clone.querySelectorAll(STRIP_SELECTOR).forEach((n) => n.remove())
  return clone
}

// Copy the site's <link rel=stylesheet> / <style> tags so exported pages keep
// their formatting. A <base> makes the relative CSS/font/image URLs resolve.
function headStyles(): string {
  return Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((n) => (n as HTMLElement).outerHTML)
    .join("\n")
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

function saveDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// ── PDF: open a clean window with just the article and print it ──────────────
function exportPdf(node: HTMLElement, title: string) {
  const w = window.open("", "_blank")
  if (!w) {
    alert("팝업이 차단되었습니다. 이 사이트의 팝업을 허용한 뒤 다시 시도하세요.")
    return
  }
  const html =
    `<!doctype html><html lang="ko"><head><meta charset="utf-8">` +
    `<base href="${location.origin}/"><title>${title}</title>${headStyles()}` +
    `<style>body{margin:0;padding:24px;background:#fff}` +
    `.left.sidebar,.right.sidebar,header,.page-footer{display:none!important}</style>` +
    `</head><body class="sh-print-window">${node.outerHTML}</body></html>`
  w.document.open()
  w.document.write(html)
  w.document.close()
  // Give stylesheets/fonts a moment, then print. Close after the dialog resolves.
  const go = () => {
    w.focus()
    w.print()
  }
  w.onafterprint = () => w.close()
  if (w.document.readyState === "complete") setTimeout(go, 400)
  else w.onload = () => setTimeout(go, 400)
}

// ── HTML: a standalone page (CSS linked back to the live site) ───────────────
function exportHtml(node: HTMLElement, title: string, base: string) {
  const doc =
    `<!doctype html><html lang="ko"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<base href="${location.origin}/"><title>${title}</title>${headStyles()}` +
    `</head><body class="sh-export-page" style="max-width:820px;margin:0 auto;padding:32px">` +
    node.outerHTML +
    `</body></html>`
  saveBlob(new Blob([doc], { type: "text/html;charset=utf-8" }), base + ".html")
}

// ── Word: HTML wrapped in Office namespaces → opens as a .doc ────────────────
function exportDoc(node: HTMLElement, title: string, base: string) {
  const doc =
    `<html xmlns:o="urn:schemas-microsoft-com:office:office" ` +
    `xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">` +
    `<head><meta charset="utf-8"><title>${title}</title>` +
    `<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5}` +
    `h1{font-size:20pt}h2{font-size:15pt}h3{font-size:13pt}` +
    `table{border-collapse:collapse}td,th{border:1px solid #999;padding:4px 8px}` +
    `pre,code{font-family:Consolas,monospace;background:#f3f3f3}` +
    `pre{padding:8px;white-space:pre-wrap}img{max-width:100%}</style></head>` +
    `<body>${node.innerHTML}</body></html>`
  saveBlob(new Blob(["﻿", doc], { type: "application/msword" }), base + ".doc")
}

// ── PNG: rasterize the live article with html-to-image (loaded on demand) ────
function loadHtmlToImage(): Promise<any> {
  const existing = (window as any).htmlToImage
  if (existing) return Promise.resolve(existing)
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = "https://cdn.jsdelivr.net/npm/html-to-image@1.11.13/dist/html-to-image.js"
    s.crossOrigin = "anonymous"
    s.onload = () => resolve((window as any).htmlToImage)
    s.onerror = () => reject(new Error("이미지 라이브러리를 불러오지 못했습니다."))
    document.head.appendChild(s)
  })
}

async function exportPng(base: string, btn?: HTMLElement) {
  const target = document.querySelector<HTMLElement>(".center")
  if (!target) return
  const prev = btn?.textContent
  if (btn) {
    btn.textContent = "🖼 PNG 생성 중…"
    ;(btn as HTMLButtonElement).disabled = true
  }
  try {
    const lib = await loadHtmlToImage()
    const bg = getComputedStyle(document.body).backgroundColor || "#ffffff"
    // Skip the interactive chrome while capturing.
    const skip = (n: Element) =>
      n instanceof HTMLElement &&
      (n.tagName === "HEADER" ||
        n.classList.contains("breadcrumb-container") ||
        n.classList.contains("sh-delnote") ||
        n.classList.contains("sh-printnote") ||
        n.classList.contains("sh-subjbar-wrap") ||
        n.classList.contains("page-footer"))
    const dataUrl = await lib.toPng(target, {
      backgroundColor: bg,
      pixelRatio: 2,
      filter: (n: Element) => !skip(n),
    })
    saveDataUrl(dataUrl, base + ".png")
  } catch (e) {
    alert((e as Error).message || "PNG로 내보내지 못했습니다.")
  } finally {
    if (btn) {
      btn.textContent = prev || "🖼 PNG"
      ;(btn as HTMLButtonElement).disabled = false
    }
  }
}

function runExport(kind: string, btn?: HTMLElement) {
  const title = niceTitle()
  const base = fileBase()
  if (kind === "png") {
    exportPng(base, btn)
    return
  }
  const node = buildExportNode()
  if (!node) return
  if (kind === "pdf") exportPdf(node, title)
  else if (kind === "doc") exportDoc(node, title, base)
  else if (kind === "html") exportHtml(node, title, location.origin + "/")
}

function initPrint() {
  const btn = document.getElementById("sh-print-btn")
  const menu = document.getElementById("sh-export-menu")
  if (!btn || !menu || btn.dataset.bound === "1") return
  btn.dataset.bound = "1"

  const open = () => {
    menu.hidden = false
    btn.setAttribute("aria-expanded", "true")
  }
  const close = () => {
    menu.hidden = true
    btn.setAttribute("aria-expanded", "false")
  }
  const toggle = () => (menu.hidden ? open() : close())

  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    toggle()
  })
  menu.querySelectorAll<HTMLElement>("button[data-export]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation()
      const kind = item.dataset.export || ""
      // PNG keeps the menu open (shows progress); others close immediately.
      if (kind !== "png") close()
      runExport(kind, item)
    })
  })
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target as Node) && e.target !== btn) close()
  })
  document.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") close()
  })
}

document.addEventListener("nav", initPrint)
initPrint()
