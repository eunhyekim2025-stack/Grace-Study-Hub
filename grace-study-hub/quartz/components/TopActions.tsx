import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Top-bar action buttons from the Claude design mockup. They open the in-page
// "add content" modal (see AddContentModal / addContent.inline.ts) rather than
// redirecting to GitHub:
//   🎙 녹음/파일 업로드  → upload tab
//   + 새 노트           → new-note tab
const TopActions: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "sh-topactions")}>
      <button class="sh-btn sh-btn-upload" data-add-open="upload">
        🎙 녹음/파일 업로드
      </button>
      <button class="sh-btn sh-btn-new" data-add-open="note">
        + 새 노트
      </button>
    </div>
  )
}

export default (() => TopActions) satisfies QuartzComponentConstructor
