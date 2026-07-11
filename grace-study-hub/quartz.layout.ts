import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

// 탐색기(Explorer)를 "수업(과목)"별로 묶어 보여주기 위한 설정.
// 파일/폴더는 그대로 두고 *표시*만 바꾼다 — 폴더를 실제로 옮기면 그래프 ontology
// (entity_type = 최상위 폴더명)와 수백 개의 [[wikilink]]가 깨지기 때문.
// 주의: 아래 함수들은 .toString()으로 직렬화돼 브라우저에서 실행되므로
//       외부 변수를 참조하지 말고 함수 안에 모든 것을 인라인해야 한다.
// ➕ 과목 추가: mapFn의 `labels`(표시명)와 sortFn의 `rank`(정렬순)에 새 폴더 키를
//    같은 그룹으로 한 줄씩 추가한다. 등록을 빠뜨려도 폴더는 사라지지 않고 목록 맨 끝에
//    원래 이름으로 표시된다(안전). 전체 절차는 CLAUDE.md "과목(Subject) 추가 규약" 참조.
const explorerOptions = {
  // 좌측 트리 목차: 제목을 달고 폴더를 펼친 상태로 기본 표시한다.
  title: "🗂 All notes",
  folderDefaultState: "open" as const,
  // 폴더 표시명을 과목 라벨(이모지 + 한글)로 교체
  mapFn: (node: FileTrieNode) => {
    if (!node.isFolder) return
    const labels: Record<string, string> = {
      // ⚖️ Business Law
      "law-concepts": "⚖️ Business Law · Concepts",
      cases: "⚖️ Business Law · Cases",
      statutes: "⚖️ Business Law · Statutes",
      // 📊 Decision Analysis
      "da-concepts": "📊 Decision Analysis (DA) · Notes & Quizzes",
      // 💰 Financial Accounting
      "fa-concepts": "💰 Financial Accounting (FA) · Notes",
      // ⚙️ Operations Management
      "ops-concepts": "⚙️ Operations Management · Notes",
      // 🔗 Cross-Domain
      "cross-domain": "🔗 Cross-Domain · 3-Subject Integration",
      // 🤖 LLM/AI Wiki
      concepts: "🤖 AI Wiki · Concepts",
      models: "🤖 AI Wiki · Models",
      papers: "🤖 AI Wiki · Papers",
      prompts: "🤖 AI Wiki · Prompts",
      tools: "🤖 AI Wiki · Tools",
      // 🛰️ Early Warning · Systems Thinking
      drivers: "🛰️ Early Warning · Drivers",
      signals: "🛰️ Early Warning · Signals",
      systems: "🛰️ Systems Thinking",
    }
    const label = labels[node.slugSegment]
    if (label) node.displayName = label
  },
  // 과목 블록 단위로 정렬 (블록 내부는 알파벳/숫자순)
  sortFn: (a: FileTrieNode, b: FileTrieNode) => {
    const rank: Record<string, number> = {
      "law-concepts": 10,
      cases: 11,
      statutes: 12,
      "da-concepts": 20,
      "fa-concepts": 30,
      "ops-concepts": 35,
      "cross-domain": 40,
      concepts: 50,
      models: 51,
      papers: 52,
      prompts: 53,
      tools: 54,
      drivers: 60,
      signals: 61,
      systems: 62,
    }
    // 폴더를 파일보다 먼저
    if (a.isFolder && !b.isFolder) return -1
    if (!a.isFolder && b.isFolder) return 1
    const cmp = (x: FileTrieNode, y: FileTrieNode) =>
      x.displayName.localeCompare(y.displayName, undefined, { numeric: true, sensitivity: "base" })
    if (a.isFolder && b.isFolder) {
      const ra = rank[a.slugSegment] ?? 999
      const rb = rank[b.slugSegment] ?? 999
      return ra !== rb ? ra - rb : cmp(a, b)
    }
    return cmp(a, b)
  },
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // Full-width "note-app" top bar (ported from the Claude design mockup):
  // G-logo wordmark on the left, a growing search box in the middle, and the
  // dark-mode / reader-mode toggles on the right. Styled in custom.scss.
  header: [
    Component.SidebarToggle(),
    Component.PageTitle(),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.TopActions() },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
  ],
  // In-page "add content" modal, rendered once per page (hidden until opened
  // from the top-bar buttons).
  afterBody: [Component.AddContentModal(), Component.NoteViewToggle()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Dashboard home renders only on the index (custom.scss hides the plain
    // markdown article there).
    Component.ConditionalRender({
      component: Component.Dashboard(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // 🗑 Delete button (renders only on real note pages, not the index/lists).
    Component.DeleteNote(),
    // Subject-page "Auto-Generate" bar + section tabs (renders only on the
    // subject hub pages listed in subjects.json; no-op elsewhere).
    Component.SubjectAutoBar(),
  ],
  // Left column = the mockup's "과목(Subjects)" sidebar (All notes → subjects
  // → More → tags). The client-side Explorer tree is retired in favor of this.
  left: [Component.SubjectNav()],
  // 2-column app shell: right panel (TOC/graph/backlinks) removed to match
  // the mockup's clean subjects screen.
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [Component.SubjectNav()],
  right: [],
}
