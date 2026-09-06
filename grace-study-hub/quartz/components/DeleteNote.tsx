import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// A discreet "🗑 삭제" button on note pages. The click handler lives in the
// shared addContent.inline script (loaded on every page) so it can also hide
// the note everywhere immediately after deletion. Renders nothing on the
// index / list pages. Carries the note's real source path (for the server) and
// its Quartz slug (so listings can be hidden right away, before the rebuild).
const DeleteNote: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  if (!rel || fileData.slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  const title = (fileData.frontmatter?.title as string) ?? fileData.slug ?? "this note"
  return (
    <div class={classNames(displayClass, "sh-note-actions")}>
      <button
        class="sh-edit-btn sh-edit-btn-page"
        data-edit-path={rel}
        data-edit-title={title}
        data-edit-slug={fileData.slug}
        title="이 노트를 편집"
      >
        ✏️ 노트 편집
      </button>
      <span class="sh-delnote">
        <button
          class="sh-delnote-btn"
          data-del-path={rel}
          data-del-slug={fileData.slug}
          data-del-title={title}
          title="이 노트를 삭제"
        >
          🗑 노트 삭제
        </button>
      </span>
    </div>
  )
}

export default (() => DeleteNote) satisfies QuartzComponentConstructor
