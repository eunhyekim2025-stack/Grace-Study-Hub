// @ts-ignore  — subjects data, single source of truth
import subjectsData from "../../subjects.json"
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
          <button class="sh-subjbar-btn ghost" data-add-open="upload" data-add-subject={subj.slug}>
            Summarize subject
          </button>
          <button class="sh-subjbar-btn solid" data-add-open="note" data-add-subject={subj.slug}>
            Build quiz →
          </button>
        </div>
      </div>

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

export default (() => SubjectAutoBar) satisfies QuartzComponentConstructor
