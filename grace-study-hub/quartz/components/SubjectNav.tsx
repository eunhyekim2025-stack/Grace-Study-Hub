import { FullSlug, resolveRelative, simplifySlug, slugTag, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Always-visible sidebar, ported 1:1 from the Claude design mockup:
//   과목(Subjects) → 전체 노트(All notes, w/ total) → subject rows (colored
//   dot + label + count) → + 과목 추가 → 태그(Tags) chips.
// Server-rendered (no JS), so it never depends on the client Explorer tree.
type Subject = { slug: string; emoji: string; label: string; hue: number; prefixes: string[] }

const SUBJECTS: Subject[] = [
  { slug: "business-law", emoji: "⚖️", label: "Business Law", hue: 250, prefixes: ["law-concepts/", "cases/", "statutes/"] },
  { slug: "decision-analysis", emoji: "📊", label: "Decision Analysis", hue: 150, prefixes: ["da-concepts/"] },
  { slug: "financial-accounting", emoji: "💰", label: "Financial Accounting", hue: 85, prefixes: ["fa-concepts/"] },
  { slug: "operations-management", emoji: "⚙️", label: "Operations Management", hue: 25, prefixes: ["ops-concepts/"] },
]

const dot = (hue: number) => `oklch(0.62 0.15 ${hue})`

const SubjectNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const current = fileData.slug!
  const slugs = allFiles.map((f) => f.slug ?? "")
  const noteSlugs = slugs.filter((s) => s && !s.startsWith("tags/"))
  const total = noteSlugs.length
  const countFor = (p: string[]) => (p.length === 0 ? 0 : noteSlugs.filter((s) => p.some((pre) => s.startsWith(pre))).length)

  // Top tags across the wiki → chips
  const tagCounts = new Map<string, number>()
  for (const f of allFiles) {
    for (const t of (f.frontmatter?.tags ?? []) as string[]) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    }
  }
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t)

  const row = (s: Subject) => {
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
  }

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
        {SUBJECTS.map(row)}
      </ul>

      <a href={resolveRelative(current, "add-content" as FullSlug)} class="sh-add-subject">
        <span class="sh-plus">+</span> Add subject
      </a>

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
