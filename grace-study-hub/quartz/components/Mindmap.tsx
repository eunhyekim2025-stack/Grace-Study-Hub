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

// A radial "🧠 Mind map" panel at the top of every note. The map is generated on
// the client from the note's own headings + key detail points (see
// mindmap.inline.ts) — it's purely additive, so all existing note content is
// preserved untouched. Renders nothing on the index / list / subject-hub pages.
// If a note has no mappable structure, the script hides the panel.
const Mindmap: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const rel = fileData.relativePath
  const slug = fileData.slug ?? ""
  if (!rel || slug === "index" || !rel.toLowerCase().endsWith(".md")) return null
  if (SUBJECT_SLUGS.has(slug)) return null
  return (
    <div class={classNames(displayClass, "mm-panel")} id="sh-mindmap" hidden>
      <div class="mm-head">
        <span class="mm-eyebrow">🧠 Mind map</span>
        <span class="mm-sub">auto-mapped from this note’s headings</span>
        <button class="mm-toggle" id="sh-mm-toggle" aria-expanded="true" title="접기 / 펼치기">
          <span class="mm-toggle-ico">▾</span>
        </button>
      </div>
      <div class="mm-roll">
        <div class="mm-canvas" id="sh-mm-canvas"></div>
      </div>
    </div>
  )
}

Mindmap.afterDOMLoaded = mindmapScript

export default (() => Mindmap) satisfies QuartzComponentConstructor
