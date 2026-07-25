import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import printScript from "./scripts/print.inline"

// A "🖨 프린트" button on note pages. Clicking it calls window.print(); the
// `@media print` rules in custom.scss strip the top bar, sidebars, footer and
// action buttons so only the article (title + meta + body) lands on paper / PDF.
// Renders nothing on the index / list pages, matching DeleteNote.
const PrintNote: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  if (!rel || fileData.slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  return (
    <div class={classNames(displayClass, "sh-printnote")}>
      <button class="sh-printnote-btn" id="sh-print-btn" title="이 노트를 프린트 / PDF로 저장">
        🖨 프린트
      </button>
    </div>
  )
}

PrintNote.afterDOMLoaded = printScript

export default (() => PrintNote) satisfies QuartzComponentConstructor
