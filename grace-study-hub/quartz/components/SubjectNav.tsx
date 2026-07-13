// @ts-ignore  — plain JSON data file, single source of truth for subjects.
import subjectsData from "../../subjects.json"
import { FullSlug, resolveRelative, simplifySlug, slugTag, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Always-visible sidebar (Claude design mockup): 과목 header → 전체 노트(All
// notes, w/ total) → subject rows (colored dot + label + count) → + Add subject
// → 태그 chips. Subjects come from subjects.json, which the /api/add-subject
// serverless function appends to — so newly created subjects appear here
// automatically on the next build. Server-rendered (no JS).
type Subject = { slug: string; emoji: string; label: string; hue: number; term?: string; prefixes: string[] }
const SUBJECTS = subjectsData as Subject[]

const dot = (hue: number) => `oklch(0.62 0.15 ${hue})`

// Group subjects by semester, newest term first ("기타"/no-term last).
function byTerm(subs: Subject[]) {
  const terms = [...new Set(subs.map((s) => s.term || "기타"))].sort((a, b) => {
    if (a === "기타") return 1
    if (b === "기타") return -1
    return b.localeCompare(a, undefined, { numeric: true })
  })
  return terms.map((term) => ({ term, items: subs.filter((s) => (s.term || "기타") === term) }))
}

const SubjectNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const current = fileData.slug!
  const slugs = allFiles.map((f) => f.slug ?? "")
  const noteSlugs = slugs.filter((s) => s && !s.startsWith("tags/"))
  const total = noteSlugs.length
  const countFor = (p: string[]) => (p.length === 0 ? 0 : noteSlugs.filter((s) => p.some((pre) => s.startsWith(pre))).length)

  const tagCounts = new Map<string, number>()
  for (const f of allFiles) {
    for (const t of (f.frontmatter?.tags ?? []) as string[]) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    }
  }
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t)

  return (
    <nav class={classNames(displayClass, "sh-subjects")}>
      <p class="sh-subjects-title">Subjects</p>
      <ul>
        <li>
          <a href={resolveRelative(current, "index" as FullSlug)} class={simplifySlug(current) === "index" ? "sh-subject sh-all active" : "sh-subject sh-all"}>
            <span class="sh-subject-emoji">🗂</span>
            <span class="sh-subject-label">All notes</span>
            <span class="sh-count">{total}</span>
          </a>
        </li>
      </ul>

      {byTerm(SUBJECTS).map((g, gi) => {
        // Open the newest term by default (and any term holding the active page).
        const holdsActive = g.items.some((s) => simplifySlug(current) === simplifySlug(s.slug as FullSlug))
        return (
          <details class="sh-term" open={gi === 0 || holdsActive}>
            <summary class="sh-term-summary">{g.term}</summary>
            <ul>
              {g.items.map((s) => {
                const href = resolveRelative(current, s.slug as FullSlug)
                const active = simplifySlug(current) === simplifySlug(s.slug as FullSlug)
                const count = countFor(s.prefixes)
                return (
                  <li>
                    <a href={href} class={active ? "sh-subject active" : "sh-subject"}>
                      <span class="sh-dot" style={`--sh-dot: ${dot(s.hue)}`}></span>
                      <span class="sh-subject-emoji">{s.emoji}</span>
                      <span class="sh-subject-label">{s.label}</span>
                      {count > 0 && <span class="sh-count">{count}</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}

      <button class="sh-add-subject" data-add-open="subject">
        <span class="sh-plus">+</span> Add subject
      </button>

      {topTags.length > 0 && (
        <>
          <p class="sh-subjects-title">Tags</p>
          <div class="sh-tags">
            {topTags.map((t) => (
              <a class="sh-tag" href={resolveRelative(current, joinSegments("tags", slugTag(t)) as FullSlug)}>
                {t}
              </a>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}

export default (() => SubjectNav) satisfies QuartzComponentConstructor
