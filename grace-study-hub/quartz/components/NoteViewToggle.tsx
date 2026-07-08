// @ts-ignore
import noteViewScript from "./scripts/noteView.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Renders nothing — it only carries the Text/Diagram toggle script, which
// activates on note pages that embed a .neg-diagram block and no-ops elsewhere.
const NoteViewToggle: QuartzComponent = () => null
NoteViewToggle.afterDOMLoaded = noteViewScript

export default (() => NoteViewToggle) satisfies QuartzComponentConstructor
