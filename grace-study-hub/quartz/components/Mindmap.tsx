import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore  — subjects data, single source of truth
import subjectsData from "../../subjects.json"
// @ts-ignore
import mindmapScript from "./scripts/mindmap.inline"

// Subject hub pages (slugs listed in subjects.json) are excluded — they get the
// ✦ Auto-Generate bar instead, and a mind map of a table-of-contents hub is not
// useful.
const SUBJECT_SLUGS = new Set((subjectsData as { slug: string }[]).map((s) => s.slug))

// A "📝 Text view / 🗺 Graph view" toggle at the top of every note. Text view is
// the note itself; Graph view is a radial mind map generated on the client from
// the note's own headings + key detail points (see mindmap.inline.ts) — purely
// additive, so all existing note content is preserved untouched. Renders nothing
// on the index / list / subject-hub pages. If a note has no mappable structure,
// the script keeps the toggle hidden and just shows the text.
const Mindmap: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  const slug = fileData.slug ?? ""
  if (!rel || slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  if (SUBJECT_SLUGS.has(slug)) return null
  return (
    <div class={classNames(displayClass, "mm-wrap")} id="sh-mindmap" hidden>
      <div class="mm-toolbar" role="group" aria-label="Note view">
        <button class="mm-vbtn active" data-mm-view="text">📝 Text view</button>
        <button class="mm-vbtn" data-mm-view="graph">🗺 Graph view</button>
      </div>
      <div class="mm-graph" id="sh-mm-canvas" hidden></div>
    </div>
  )
}

Mindmap.afterDOMLoaded = mindmapScript

export default (() => Mindmap) satisfies QuartzComponentConstructor
