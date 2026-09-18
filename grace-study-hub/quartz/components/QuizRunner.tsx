// @ts-ignore
import quizRunnerScript from "./scripts/quizRunner.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Renders nothing itself — it only ships the interactive-quiz runner script that
// hydrates any `[data-sh-quiz]` block a generated quiz note embeds. Registered
// once in the shared layout (afterBody) so it loads on every page.
const QuizRunner: QuartzComponent = () => null

QuizRunner.afterDOMLoaded = quizRunnerScript

export default (() => QuizRunner) satisfies QuartzComponentConstructor
