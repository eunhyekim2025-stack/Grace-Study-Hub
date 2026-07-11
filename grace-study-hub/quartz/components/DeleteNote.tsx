// @ts-ignore
import deleteNoteScript from "./scripts/deleteNote.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// A discreet "🗑 삭제" button on note pages. Deleting is destructive, so it
// confirms and posts to /api/delete with the recalled password. The note's real
// source path (fileData.relativePath) is embedded so the server deletes the
// exact file. Renders nothing on the index / list pages.
const DeleteNote: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  if (!rel || fileData.slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  const title = (fileData.frontmatter?.title as string) ?? fileData.slug ?? "this note"
  return (
    <div class={classNames(displayClass, "sh-delnote")}>
      <button class="sh-delnote-btn" data-del-path={rel} data-del-title={title} title="이 노트를 삭제">
        🗑 노트 삭제
      </button>
    </div>
  )
}

DeleteNote.afterDOMLoaded = deleteNoteScript

export default (() => DeleteNote) satisfies QuartzComponentConstructor
