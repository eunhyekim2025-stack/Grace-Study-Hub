import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import printScript from "./scripts/print.inline"

// "🖨 프린트 / 내보내기" button on note pages. Clicking it opens a small menu that
// exports the current note in several formats:
//   • PDF   — opens a clean print window (→ browser "Save as PDF")
//   • PNG   — rasterizes the article (html-to-image, loaded on demand)
//   • Word  — a .doc file Word / Google Docs can open
//   • HTML  — a standalone web page
// Renders nothing on the index / list pages, matching DeleteNote.
const PrintNote: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  if (!rel || fileData.slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  return (
    <div class={classNames(displayClass, "sh-printnote")}>
      <button
        class="sh-printnote-btn"
        id="sh-print-btn"
        aria-haspopup="true"
        aria-expanded="false"
        title="이 노트를 프린트 / 파일로 내보내기"
      >
        🖨 프린트 / 내보내기 <span class="sh-print-caret">▾</span>
      </button>
      <div class="sh-export-menu" id="sh-export-menu" role="menu" hidden>
        <button data-export="pdf" role="menuitem">🖨 PDF <span>인쇄 · Save as PDF</span></button>
        <button data-export="png" role="menuitem">🖼 PNG <span>이미지</span></button>
        <button data-export="doc" role="menuitem">📝 Word <span>.doc</span></button>
        <button data-export="html" role="menuitem">🌐 HTML <span>웹페이지</span></button>
      </div>
    </div>
  )
}

PrintNote.afterDOMLoaded = printScript

export default (() => PrintNote) satisfies QuartzComponentConstructor
