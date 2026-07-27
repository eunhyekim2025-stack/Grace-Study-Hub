import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
// @ts-ignore
import tagFilterScript from "./scripts/tagFilter.inline"

// A site-wide, in-place multi-tag filter. Any tag chip marked with data-mtag
// (home/sidebar tags, note tags) toggles a shared selection; a small floating
// panel lists the notes that carry ALL selected tags. Pure client-side, free —
// the note→tags data is baked in at build time. Rendered once per page.
const TagFilter: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const current = fileData.slug!
  const notes = (allFiles ?? [])
    .filter(
      (f) =>
        f.slug &&
        !f.slug.startsWith("tags/") &&
        f.slug !== "index" &&
        ((f.frontmatter?.tags ?? []) as string[]).length > 0,
    )
    .map((f) => ({
      title: (f.frontmatter?.title as string) ?? f.slug,
      href: resolveRelative(current, f.slug as FullSlug),
      tags: (f.frontmatter?.tags ?? []) as string[],
    }))
  const dataJSON = JSON.stringify(notes).replace(/</g, "\\u003c")

  return (
    <div id="sh-tagfilter" class="tf" hidden>
      <div class="tf-head">
        <span class="tf-title">🔎 <span id="tf-count"></span></span>
        <span class="tf-sel" id="tf-sel"></span>
        <button class="tf-clear" id="tf-clear">모두 해제</button>
        <button class="tf-x" id="tf-x" aria-label="닫기">✕</button>
      </div>
      <ul class="tf-results" id="tf-results"></ul>
      <script
        type="application/json"
        id="sh-tagfilter-data"
        dangerouslySetInnerHTML={{ __html: dataJSON }}
      />
    </div>
  )
}

TagFilter.afterDOMLoaded = tagFilterScript

export default (() => TagFilter) satisfies QuartzComponentConstructor
