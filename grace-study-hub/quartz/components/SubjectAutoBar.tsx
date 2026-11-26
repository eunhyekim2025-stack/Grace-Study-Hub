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
  // Match both top-level hubs (slug "operations-management") and folder-index
  // hubs whose page slug is "<subject>/index" (management-accounting,
  // critical-thinking-in-real-world, management-of-people-at-work).
  const subj = SUBJECTS.find((s) => s.slug === slug || slug === `${s.slug}/index`)
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
    <>
    <div class="sh-subjbar-wrap">
      <div class="sh-subjbar">
        <div class="sh-subjbar-left">
          <span class="sh-subjbar-title">✦ Auto-Generate</span>
          <span class="sh-subjbar-sub">
            Summarize all {count} {subj.label} notes or build a review deck from this subject
          </span>
        </div>
        <div class="sh-subjbar-actions">
          <button
            class="sh-subjbar-btn ghost"
            data-sh-summary-toggle
            data-sh-subject={subj.slug}
            aria-expanded="false"
          >
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

      {/* Revision-summary options open as a MODAL (own window), not an inline
          panel. Scope picks all chapters or specific ones; the "Specific
          chapters" input only appears when that scope is chosen. */}
      <div class="sh-modal" data-sh-summary-modal hidden>
        <div class="sh-modal-backdrop" data-sh-summary-close></div>
        <div class="sh-modal-card" role="dialog" aria-modal="true" aria-label="Revision summary">
          <div class="sh-modal-tabs">
            <span class="sh-modal-title">✦ Revision summary</span>
            <button class="sh-modal-x" data-sh-summary-close aria-label="닫기">
              ✕
            </button>
          </div>
          <div class="sh-field">
            <label>Scope</label>
            <select class="sh-input" data-sh-summary-scope>
              <option value="all" selected>
                All chapters — broad recap of the whole subject
              </option>
              <option value="specific">Specific chapters — deeper, detailed</option>
            </select>
          </div>
          <div class="sh-field" data-sh-summary-chapters-field hidden>
            <label>Which chapters / topics?</label>
            <input
              class="sh-input"
              type="text"
              data-sh-summary-chapters
              placeholder="e.g. modules 9-12 · or newsvendor, SPC, MRP"
            />
            <p class="sh-modal-hint" style="margin:6px 0 0">
              Pulls from these chapters' recordings, decks and notes for a more detailed summary.
            </p>
          </div>
          <div class="sh-modal-actions">
            <button
              class="sh-subjbar-btn solid"
              data-sh-summary-generate
              data-sh-subject={subj.slug}
            >
              Generate summary
            </button>
          </div>
          <div class="sh-gen-status" data-sh-summary-status hidden></div>
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
        <label class="sh-genquiz-field">
          <span>Type</span>
          <select class="sh-input" data-sh-quiz-type>
            <option value="auto" selected>
              Auto (match past exams)
            </option>
            <option value="mcq">Multiple choice</option>
            <option value="short">Short answer</option>
            <option value="truefalse">True / False</option>
            <option value="fill">Fill in the blank</option>
            <option value="scenario">Scenario / essay</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
        <label class="sh-genquiz-field">
          <span>Style</span>
          <select class="sh-input" data-sh-quiz-style>
            <option value="auto" selected>
              Auto
            </option>
            <option value="conceptual">Conceptual</option>
            <option value="application">Application / calc</option>
            <option value="definitions">Definitions / recall</option>
            <option value="exam">Exam-style (traps)</option>
          </select>
        </label>
        <label class="sh-genquiz-field sh-genquiz-wide">
          <span>Focus — topics/chapters (optional)</span>
          <input
            class="sh-input"
            type="text"
            data-sh-quiz-focus
            placeholder="e.g. faultlines, social identity · or chapters 5–7"
          />
        </label>
        <label class="sh-genquiz-check">
          <input type="checkbox" data-sh-quiz-explain checked />
          <span>Include answer explanations</span>
        </label>
        <button class="sh-subjbar-btn solid" data-sh-quiz-generate data-sh-subject={subj.slug}>
          Generate
        </button>
      </div>
      <div class="sh-gen-status" data-sh-gen-status hidden></div>
    </div>

    {/* Tabs live OUTSIDE sh-subjbar-wrap so their containing block is the tall
        content column — otherwise `position: sticky` would have no room to stick
        (a sticky element only sticks within its parent's box). Kept sticky so
        the user can keep switching sections after scrolling into one. */}
    {tabs.length > 0 && (
      <div class="sh-subjtabs">
        {tabs.map((t, i) => (
          <a class={i === 0 ? "sh-subjtab active" : "sh-subjtab"} href={`#${t.slug}`}>
            {t.label}
          </a>
        ))}
      </div>
    )}
    </>
  )
}

SubjectAutoBar.afterDOMLoaded = subjectTabsScript

export default (() => SubjectAutoBar) satisfies QuartzComponentConstructor
