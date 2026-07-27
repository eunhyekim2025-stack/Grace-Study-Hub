import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "./../util/lang"
import { FullSlug, resolveRelative } from "../util/path"
// @ts-ignore
import tagExplorerScript from "./scripts/tagExplorer.inline"

// Multi-tag filter for the /tags index: click several tags to see the notes that
// carry ALL of them (intersection / AND). Pure client-side — the note→tags data
// is baked in at build time, so it costs nothing to run. Renders only on the
// tags index page (added there in quartz.layout.ts).
const TagExplorer: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
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

  const counts = new Map<string, number>()
  notes.forEach((n) => n.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
  const tags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))

  const dataJSON = JSON.stringify(notes).replace(/</g, "\\u003c")

  return (
    <div class={classNames(displayClass, "tx")} id="sh-tag-explorer">
      <div class="tx-bar">
        <span class="tx-title">🔎 Combine tags</span>
        <span class="tx-hint">select tags to see notes that have ALL of them</span>
        <button class="tx-clear" id="tx-clear" hidden>
          clear
        </button>
      </div>
      <div class="tx-chips">
        {tags.map(([t, c]) => (
          <button class="tx-chip" data-tag={t}>
            {t}
            <span class="tx-count">{c}</span>
          </button>
        ))}
      </div>
      <div class="tx-meta" id="tx-meta"></div>
      <ul class="tx-results" id="tx-results"></ul>
      <script
        type="application/json"
        id="tx-data"
        dangerouslySetInnerHTML={{ __html: dataJSON }}
      />
    </div>
  )
}

TagExplorer.afterDOMLoaded = tagExplorerScript

export default (() => TagExplorer) satisfies QuartzComponentConstructor
