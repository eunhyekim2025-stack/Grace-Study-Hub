import { Root, Element, Node } from "hast"
import { toString } from "hast-util-to-string"
import { slug as githubSlug } from "github-slugger"
import { FullSlug } from "../util/path"
import { ProcessedContent } from "../plugins/vfile"

// A "related word" / "key term" link is a plain wikilink like [[note|Term]] that
// resolves to another note's base slug with NO #heading fragment, so the browser
// lands at the top of the target note instead of at the section that defines the
// term. This post-processing pass runs after every file has been parsed (so all
// heading ids are known) and, for such a link, appends the matching heading's
// #slug to the href when the link's display text names a heading in the target
// note. Links that already carry an anchor are left untouched.

interface HeadingInfo {
  /** the heading element's id (its slug), assigned earlier by rehype-slug */
  id: string
  /** normalized visible text of the heading */
  text: string
}

const headingTagRegex = /^h[1-6]$/

// punctuation that marks the end of a leading "Term" phrase in a descriptive
// heading such as "Little's Law — the one relation linking I, R and T"
const separatorChars = new Set([":", "—", "–", "-", "|", "(", "·", ",", "…"])

function getClassNames(node: Element): string[] {
  const cls = node.properties?.className
  if (Array.isArray(cls)) return cls.map(String)
  if (typeof cls === "string") return cls.split(/\s+/)
  return []
}

function normalize(s: string): string {
  // fold smart apostrophes/quotes so display text and heading text compare equal
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .trim()
}

// Collect every real section heading in a file's HTML tree, keyed by id.
// Headings inside a `dc-view` diagram block are decorative map labels, not
// navigable sections, so they are excluded.
function collectHeadings(tree: Root): HeadingInfo[] {
  const out: HeadingInfo[] = []
  const walk = (node: Node, inDcView: boolean) => {
    if (node.type === "element") {
      const el = node as Element
      const nowInDcView = inDcView || getClassNames(el).includes("dc-view")
      if (
        !nowInDcView &&
        headingTagRegex.test(el.tagName) &&
        typeof el.properties?.id === "string"
      ) {
        out.push({ id: el.properties.id, text: normalize(toString(el)) })
      }
      for (const child of el.children ?? []) walk(child, nowInDcView)
    } else if ("children" in node && Array.isArray((node as any).children)) {
      for (const child of (node as any).children) walk(child, inDcView)
    }
  }
  walk(tree, false)
  return out
}

// Given a link's display text, find the best-matching heading in the target note.
// Tier 1 (exact): the display text slugs to a heading's id exactly.
// Tier 2 (leading phrase): the display text is the leading phrase of a descriptive
// heading, e.g. "Little's Law" -> "Little's Law — the one relation …". This is
// gated on both a slug-boundary prefix AND a real punctuation separator after the
// phrase, so a bare word like "process" does NOT match a heading "Process choice".
function findHeadingId(displayText: string, headings: HeadingInfo[]): string | undefined {
  const termSlug = githubSlug(displayText)
  if (!termSlug) return undefined
  const termNorm = normalize(displayText)

  let exact: string | undefined
  let leading: string | undefined

  for (const h of headings) {
    if (h.id === termSlug) {
      if (exact === undefined) exact = h.id // earliest exact wins
      continue
    }
    if (leading === undefined && h.id.startsWith(termSlug + "-") && h.text.startsWith(termNorm)) {
      // require a punctuation separator immediately after the leading phrase
      const rest = h.text.slice(termNorm.length).replace(/^\s+/, "")
      if (rest.length > 0 && separatorChars.has(rest[0])) {
        leading = h.id
      }
    }
  }

  return exact ?? leading
}

function getDisplayText(node: Element): string | undefined {
  if (node.children.length === 1 && node.children[0].type === "text") {
    return node.children[0].value
  }
  return undefined
}

/**
 * Mutates each file's HTML tree in place, appending `#<heading-slug>` to internal
 * "related term" links whose display text names a section in the target note.
 * Returns the number of links that were rewritten (for logging/tests).
 */
export function resolveHeadingLinks(content: ProcessedContent[]): number {
  // Build a registry: target note full slug -> its real headings.
  const registry = new Map<FullSlug, HeadingInfo[]>()
  for (const [tree, file] of content) {
    if (file.data.slug) {
      registry.set(file.data.slug, collectHeadings(tree as Root))
    }
  }

  let rewritten = 0
  const visitLinks = (node: Node) => {
    if (node.type === "element") {
      const el = node as Element
      if (el.tagName === "a" && el.properties) {
        const href = el.properties.href
        const targetSlug = el.properties["data-slug"]
        // only plain internal note links with NO existing anchor
        if (
          typeof href === "string" &&
          !href.includes("#") &&
          typeof targetSlug === "string"
        ) {
          const headings = registry.get(targetSlug as FullSlug)
          const displayText = getDisplayText(el)
          if (headings && displayText) {
            const headingId = findHeadingId(displayText, headings)
            if (headingId) {
              el.properties.href = href + "#" + headingId
              rewritten++
            }
          }
        }
      }
      for (const child of el.children ?? []) visitLinks(child)
    } else if ("children" in node && Array.isArray((node as any).children)) {
      for (const child of (node as any).children) visitLinks(child)
    }
  }

  for (const [tree] of content) {
    visitLinks(tree as Root)
  }

  return rewritten
}
