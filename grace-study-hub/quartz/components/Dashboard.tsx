// @ts-ignore  — subjects data, single source of truth
import subjectsData from "../../subjects.json"
// @ts-ignore
import greetingScript from "./scripts/greeting.inline"
// @ts-ignore
import scheduleScript from "./scripts/schedule.inline"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Dashboard home (Claude design prototype). Uses ONLY data the static wiki
// actually has: total notes, subject counts, auto-generated count, tag count,
// recent notes. Spaced-repetition review / streaks are omitted (no data).
type Subject = { slug: string; emoji: string; label: string; hue: number; term?: string; prefixes: string[] }
const SUBJECTS = subjectsData as Subject[]
const dot = (hue: number) => `oklch(0.62 0.15 ${hue})`

// Group subjects by semester, chronological (Semester 1 first; "기타"/no-term last).
function byTerm(subs: Subject[]) {
  const terms = [...new Set(subs.map((s) => s.term || "기타"))].sort((a, b) => {
    if (a === "기타") return 1
    if (b === "기타") return -1
    return a.localeCompare(b, undefined, { numeric: true })
  })
  return terms.map((term) => ({ term, items: subs.filter((s) => (s.term || "기타") === term) }))
}

const Dashboard: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const current = fileData.slug!
  const notes = allFiles.filter((f) => f.slug && !f.slug.startsWith("tags/"))
  const total = notes.length
  const countFor = (p: string[]) => notes.filter((f) => p.some((pre) => (f.slug ?? "").startsWith(pre))).length

  const autoGen = allFiles.filter((f) =>
    ((f.frontmatter?.tags ?? []) as string[]).includes("auto-generated"),
  ).length
  const tags = new Set<string>()
  allFiles.forEach((f) => ((f.frontmatter?.tags ?? []) as string[]).forEach((t) => tags.add(t)))

  const recent = notes
    .filter((f) => f.slug !== "index")
    .sort((a, b) => +new Date(b.dates?.modified ?? 0) - +new Date(a.dates?.modified ?? 0))
    .slice(0, 6)

  const stats: [string, number, string, boolean][] = [
    ["Total notes filed", total, "notes", true],
    ["Subjects", SUBJECTS.length, "subjects", false],
    ["Auto-generated", autoGen, "items", false],
    ["Tags", tags.size, "tags", false],
  ]

  return (
    <div class={classNames(displayClass, "sh-dash")}>
      <div class="sh-dash-head">
        <h1 id="sh-greeting">Hello, Grace 👋</h1>
        <p>
          {total} notes across {SUBJECTS.length} subjects — pick one to drill in.
        </p>
      </div>

      <div class="sh-stats">
        {stats.map(([label, value, unit, dark]) => (
          <div class={dark ? "sh-stat dark" : "sh-stat"}>
            <div class="sh-stat-label">{label}</div>
            <div class="sh-stat-value">
              {value} <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div class="sh-dash-cols">
        <div class="sh-panel sh-dash-main">
          <div class="sh-panel-head">
            <span class="sh-eyebrow">SUBJECTS</span>
          </div>
          <table class="sh-subj-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {byTerm(SUBJECTS).map((g) => (
                <>
                  <tr class="sh-term-row">
                    <td colSpan={3} class="sh-term-head">
                      {g.term}
                    </td>
                  </tr>
                  {g.items.map((s) => (
                    <tr>
                      <td>
                        <span class="sh-dot" style={`--sh-dot: ${dot(s.hue)}`}></span>
                        <span class="sh-subj-emoji">{s.emoji}</span> {s.label}
                      </td>
                      <td class="sh-num">{countFor(s.prefixes)}</td>
                      <td class="sh-open">
                        <a href={resolveRelative(current, s.slug as FullSlug)}>Open →</a>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div class="sh-dash-side">
          <div class="sh-panel sh-schedule" id="sh-schedule">
            <div class="sh-panel-head">
              <span class="sh-eyebrow">📅 MY SCHEDULE</span>
              <button class="sh-sched-refresh" id="sh-sched-refresh" title="Refresh" hidden>
                ⟳
              </button>
            </div>
            <div class="sh-sched-body" id="sh-sched-body"></div>
          </div>

          <div class="sh-panel">
            <div class="sh-panel-head">
              <span class="sh-eyebrow">RECENT</span>
            </div>
            <ul class="sh-recent">
              {recent.map((f) => (
                <li>
                  <a href={resolveRelative(current, f.slug!)}>
                    {(f.frontmatter?.title as string) ?? f.slug}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.afterDOMLoaded = greetingScript + "\n;\n" + scheduleScript

export default (() => Dashboard) satisfies QuartzComponentConstructor
