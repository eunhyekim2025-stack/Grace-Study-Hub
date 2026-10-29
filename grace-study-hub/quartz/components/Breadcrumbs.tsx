import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { trieFromAllFiles } from "../util/ctx"
// @ts-ignore — subjects data (single source of truth for folder → hub mapping)
import subjectsData from "../../subjects.json"

// A subject's content folders (ops-concepts/, cases/, …) have no index.md, so
// Quartz emits a bare auto-generated folder page for them. That makes the
// folder crumb in a note's breadcrumb ("Home ❯ ops concepts") land on that bare
// listing instead of the curated subject hub. Remap each such folder crumb to
// the subject hub so "going back" from a note always returns to the hub.
// Folder-index hubs (management-accounting/index, …) already resolve to the hub,
// so only map folders whose hub slug differs from the folder itself.
const FOLDER_TO_HUB: Record<string, { slug: string; label: string }> = {}
for (const s of subjectsData as { slug: string; label: string; prefixes: string[] }[]) {
  for (const p of s.prefixes) {
    const folder = p.replace(/\/+$/, "")
    if (folder && folder !== s.slug) {
      FOLDER_TO_HUB[folder] = { slug: s.slug, label: s.label }
    }
  }
}

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    ctx,
  }: QuartzComponentProps) => {
    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const slugParts = fileData.slug!.split("/")
    const pathNodes = trie.ancestryChain(slugParts)

    if (!pathNodes) {
      return null
    }

    const crumbs: CrumbData[] = pathNodes.map((node, idx) => {
      const crumb = formatCrumb(node.displayName, fileData.slug!, simplifySlug(node.slug))
      if (idx === 0) {
        crumb.displayName = options.rootName
      }

      // Middle (folder) crumb that is a subject content folder → point it at the
      // subject hub and label it with the subject name, so "back" lands on the
      // curated hub instead of the bare folder listing.
      if (idx !== 0 && idx !== pathNodes.length - 1) {
        // simplifySlug("ops-concepts/index") → "ops-concepts/", so also trim the
        // trailing slash to match the (slash-less) keys in FOLDER_TO_HUB.
        const folderKey = simplifySlug(node.slug).replace(/\/+$/, "")
        const hub = FOLDER_TO_HUB[folderKey]
        if (hub) {
          crumb.displayName = hub.label
          crumb.path = resolveRelative(fileData.slug!, hub.slug as SimpleSlug)
        }
      }

      // For last node (current page), set empty path
      if (idx === pathNodes.length - 1) {
        crumb.path = ""
      }

      return crumb
    })

    if (!options.showCurrentPage) {
      crumbs.pop()
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
