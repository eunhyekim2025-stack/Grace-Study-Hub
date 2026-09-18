// Interactive quiz runner. A generated quiz note embeds its questions as JSON in
// <div class="sh-quiz" data-sh-quiz><script type="application/json" class="sh-quiz-data">…</script></div>.
// This renders answerable inputs, and only on "Grade" reveals the answers +
// explanations and a score (auto-graded MCQ/True-False, self-checked for the
// open-ended ones). Answers are never in the static markdown.

type QItem = {
  type?: string
  q?: string
  options?: string[]
  correct?: string
  answer?: string
  explanation?: string
}
type QData = { difficulty?: string; explain?: boolean; questions?: QItem[] }

const quizData = new WeakMap<HTMLElement, QItem[]>()
const AUTO = new Set(["mcq", "truefalse"])

function qEsc(s: string): string {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  )
}

// The letter a multiple-choice option starts with ("C. …" → "C"), used to match
// the model's `correct` field; falls back to A/B/C… by position.
function optionLetter(opt: string, idx: number): string {
  const m = String(opt).match(/^\s*\(?([A-Za-z])[).:]/)
  return (m ? m[1] : String.fromCharCode(65 + idx)).toUpperCase()
}

function qType(q: QItem): string {
  return String(q.type || (q.options && q.options.length ? "mcq" : "short")).toLowerCase()
}

function mountQuiz(root: HTMLElement) {
  if (root.dataset.shQuizReady === "1") return
  const dataEl = root.querySelector(".sh-quiz-data")
  let data: QData = {}
  try {
    data = JSON.parse(dataEl?.textContent || "{}")
  } catch {
    return
  }
  const qs = Array.isArray(data.questions) ? data.questions : []
  if (!qs.length) return
  quizData.set(root, qs)
  root.dataset.shQuizReady = "1"

  const rows = qs
    .map((q, i) => {
      const type = qType(q)
      let input = ""
      if (type === "mcq" && q.options?.length) {
        input = q.options
          .map(
            (o, j) =>
              `<label class="sh-quiz-opt"><input type="radio" name="q${i}" value="${qEsc(
                optionLetter(o, j),
              )}"><span>${qEsc(o)}</span></label>`,
          )
          .join("")
      } else if (type === "truefalse") {
        input = ["True", "False"]
          .map(
            (o) =>
              `<label class="sh-quiz-opt"><input type="radio" name="q${i}" value="${o}"><span>${o}</span></label>`,
          )
          .join("")
      } else if (type === "scenario") {
        input = `<textarea class="sh-quiz-text" rows="3" placeholder="Your answer…"></textarea>`
      } else {
        input = `<input class="sh-quiz-text" type="text" placeholder="Your answer…">`
      }
      return (
        `<li class="sh-quiz-q" data-q="${i}">` +
        `<div class="sh-quiz-qtext"><span class="sh-quiz-num">Q${i + 1}</span> ${qEsc(q.q || "")}</div>` +
        `<div class="sh-quiz-input">${input}</div>` +
        `<div class="sh-quiz-reveal" hidden></div>` +
        `</li>`
      )
    })
    .join("")

  root.innerHTML =
    `<ol class="sh-quiz-list">${rows}</ol>` +
    `<div class="sh-quiz-actions">` +
    `<button type="button" class="sh-quiz-grade">Grade ↓</button>` +
    `<button type="button" class="sh-quiz-reset" hidden>Try again</button>` +
    `<span class="sh-quiz-score" hidden></span>` +
    `</div>`
}

function recompute(root: HTMLElement) {
  const scoreEl = root.querySelector<HTMLElement>(".sh-quiz-score")
  if (!scoreEl) return
  const items = root.querySelectorAll<HTMLElement>(".sh-quiz-q")
  let correct = 0
  let selfTotal = 0
  let selfDone = 0
  items.forEach((li) => {
    if (li.dataset.gradeable === "1") {
      if (li.dataset.right === "1") correct++
    } else {
      selfTotal++
      if (li.dataset.self === "yes") {
        correct++
        selfDone++
      } else if (li.dataset.self === "no") {
        selfDone++
      }
    }
  })
  scoreEl.innerHTML =
    `<b>${correct} / ${items.length} correct</b>` +
    (selfTotal ? ` · ${selfDone}/${selfTotal} self-checked` : "")
  scoreEl.hidden = false
}

function gradeQuiz(root: HTMLElement) {
  const qs = quizData.get(root)
  if (!qs) return
  qs.forEach((q, i) => {
    const li = root.querySelector<HTMLElement>(`.sh-quiz-q[data-q="${i}"]`)
    if (!li) return
    const type = qType(q)
    const reveal = li.querySelector<HTMLElement>(".sh-quiz-reveal")
    if (!reveal) return
    const gradeable = AUTO.has(type) && q.correct != null && q.correct !== ""
    if (gradeable) {
      li.dataset.gradeable = "1"
      const picked = root.querySelector<HTMLInputElement>(`input[name="q${i}"]:checked`)?.value || ""
      const want = String(q.correct).trim().toLowerCase()
      const ok = !!picked && picked.trim().toLowerCase() === want
      li.dataset.right = ok ? "1" : "0"
      li.classList.add(ok ? "correct" : "incorrect")
      li.querySelectorAll<HTMLElement>(".sh-quiz-opt").forEach((lab) => {
        const val = lab.querySelector<HTMLInputElement>("input")?.value || ""
        if (val.trim().toLowerCase() === want) lab.classList.add("is-correct")
        else if (val === picked) lab.classList.add("is-picked")
      })
    } else {
      li.dataset.gradeable = "0"
    }
    const ans = q.answer ? `<div class="sh-quiz-ans"><b>Answer:</b> ${qEsc(q.answer)}</div>` : ""
    const exp = q.explanation ? `<div class="sh-quiz-exp">${qEsc(q.explanation)}</div>` : ""
    const self = gradeable
      ? ""
      : `<div class="sh-quiz-self">Mark yourself: ` +
        `<button type="button" class="sh-quiz-self-yes">✓ Right</button> ` +
        `<button type="button" class="sh-quiz-self-no">✗ Wrong</button></div>`
    reveal.innerHTML = ans + exp + self
    reveal.hidden = false
  })
  root
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".sh-quiz-input input, .sh-quiz-input textarea")
    .forEach((el) => (el.disabled = true))
  const grade = root.querySelector<HTMLButtonElement>(".sh-quiz-grade")
  const reset = root.querySelector<HTMLButtonElement>(".sh-quiz-reset")
  if (grade) grade.hidden = true
  if (reset) reset.hidden = false
  recompute(root)
  root.querySelector(".sh-quiz-score")?.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

function selfMark(root: HTMLElement, target: HTMLElement) {
  const li = target.closest<HTMLElement>(".sh-quiz-q")
  if (!li) return
  const yes = !!target.closest(".sh-quiz-self-yes")
  li.dataset.self = yes ? "yes" : "no"
  li.classList.toggle("correct", yes)
  li.classList.toggle("incorrect", !yes)
  li.querySelector(".sh-quiz-self-yes")?.classList.toggle("active", yes)
  li.querySelector(".sh-quiz-self-no")?.classList.toggle("active", !yes)
  recompute(root)
}

// One delegated listener for every quiz on the page (module runs once).
document.addEventListener("click", (e) => {
  const t = e.target as HTMLElement
  const root = t.closest<HTMLElement>("[data-sh-quiz]")
  if (!root) return
  if (t.closest(".sh-quiz-grade")) gradeQuiz(root)
  else if (t.closest(".sh-quiz-reset")) {
    root.dataset.shQuizReady = ""
    mountQuiz(root)
  } else if (t.closest(".sh-quiz-self-yes") || t.closest(".sh-quiz-self-no")) selfMark(root, t)
})

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLElement>("[data-sh-quiz]").forEach(mountQuiz)
})
