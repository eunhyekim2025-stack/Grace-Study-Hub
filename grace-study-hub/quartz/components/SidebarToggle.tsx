// @ts-ignore
import sidebarToggleScript from "./scripts/sidebarToggle.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Top-bar hamburger that collapses / expands the left "과목" sidebar. When
// collapsed, the sidebar column shrinks to 0 and the content reflows to fill
// the freed space (see custom.scss). Lives in the top bar so it stays reachable
// even while the sidebar is hidden. State persists in localStorage.
const SidebarToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      class={classNames(displayClass, "sh-side-toggle")}
      data-side-toggle
      aria-label="사이드바 접기/펼치기"
      title="사이드바 접기 / 펼치기"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  )
}

SidebarToggle.afterDOMLoaded = sidebarToggleScript

export default (() => SidebarToggle) satisfies QuartzComponentConstructor
