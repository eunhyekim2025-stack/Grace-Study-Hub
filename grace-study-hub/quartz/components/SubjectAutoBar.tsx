// @ts-ignore  — subjects data, single source of truth
import subjectsData from "../../subjects.json"
// @ts-ignore
import subjectTabsScript from "./scripts/subjectTabs.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Subject-page treatment from the "Business Law Subject Page" design:
// a dark "✦ Auto-Generate" bar + section tabs (Concepts / Cases / Statutes /
// Quizzes, derived from the page's own h2 headings). Renders only on subject
// hub pages (slugs listed in subjects.json). The two buttons open the in-page
// add-content modal preset to this subject.
type Subject = { slug: string; emoji: string; label: string; prefixes: string[] }
const SUBJECTS = subjectsData as Subject[]

const SubjectAutoBar: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const subj = SUBJECTS.find((s) => s.slug === slug)
  if (!subj) return null

  const count = allFiles.filter((f) =>
    subj.prefixes.some((p) => (f.slug ?? "").startsWith(p)),
  ).length

  // Section tabs from the page's own section headings (drop the h1 page title;
  // Quartz's toc depth is 0 for the top heading, 1 for the "##" sections).
  const toc = (fileData.toc ?? []) as { depth: number; text: string; slug: string }[]
  const minDepth = toc.length ? Math.min(...toc.map((h) => h.depth)) : 0
  const tabs = toc
    .filter((h) => h.depth === minDepth + 1)
    .map((h) => ({
      // "Content — Legal Concepts (…)" → "Content", strip trailing folder hints.
      label: h.text.replace(/\s*[—(].*$/, "").trim() || h.text,
      slug: h.slug,
    }))

  return (
    <div class="sh-subjbar-wrap">
      <div class="sh-subjbar">
        <div class="sh-subjbar-left">
          <span class="sh-subjbar-title">✦ Auto-Generate</span>
          <span class="sh-subjbar-sub">
            Summarize all {count} {subj.label} notes or build a review deck from this subject
          </span>
        </div>
        <div class="sh-subjbar-actions">
          <button class="sh-subjbar-btn ghost" data-sh-summarize data-sh-subject={subj.slug}>
            Summarize subject
          </button>
          <button
            class="sh-subjbar-btn solid"
            data-sh-quiz-toggle
            data-sh-subject={subj.slug}
            aria-expanded="false"
          >
            Build quiz →
          </button>
        </div>
      </div>

      {/* Quiz options — opens under the bar (does NOT reuse the add-note modal).
          Pick count + difficulty, Generate posts to /api/generate. */}
      <div class="sh-genquiz" data-sh-quiz-panel hidden>
        <label class="sh-genquiz-field">
          <span>Questions</span>
          <input class="sh-input" type="number" data-sh-quiz-count min="1" max="20" value="5" />
        </label>
        <label class="sh-genquiz-field">
          <span>Difficulty</span>
          <select class="sh-input" data-sh-quiz-difficulty>
            <option value="easy">Easy</option>
            <option value="medium" selected>
              Medium
            </option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button class="sh-subjbar-btn solid" data-sh-quiz-generate data-sh-subject={subj.slug}>
          Generate
        </button>
      </div>
      <div class="sh-gen-status" data-sh-gen-status hidden></div>

      {tabs.length > 0 && (
        <div class="sh-subjtabs">
          {tabs.map((t, i) => (
            <a class={i === 0 ? "sh-subjtab active" : "sh-subjtab"} href={`#${t.slug}`}>
              {t.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

SubjectAutoBar.afterDOMLoaded = subjectTabsScript

export default (() => SubjectAutoBar) satisfies QuartzComponentConstructor
