import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Grace's Study Hub",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "grace-study-hub.vercel.app",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "log.md",
      // "More" areas — kept in the Obsidian vault, excluded from the site.
      // Cross-Domain
      "cross-domain/**",
      // AI · Foresight (LLM/AI wiki + early warning)
      "ai-foresight.md",
      "concepts/**",
      "models/**",
      "papers/**",
      "prompts/**",
      "tools/**",
      "drivers/**",
      "signals/**",
      "systems/**",
      // About Me
      "about-me.md",
      // Other projects sharing this Obsidian vault — NOT part of the study hub:
      // company/finance snapshots (DBS, OCBC, SingTel, MOC) …
      "companies/**",
      // … and leftover graph-visualization pages from the LLM/AI wiki.
      "overview.md",
      "graph-dashboard.md",
      "graph-viz.md",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Slate/blue dashboard theme (Claude design prototype): Source Serif 4
        // for content headings (editorial section titles), Inter for UI/body.
        header: "Source Serif 4",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        // "Grace's Study Hub" dashboard palette: cool light-gray canvas, white
        // surfaces, slate text, blue accent, slate-200 borders (Tailwind slate).
        lightMode: {
          light: "#ffffff", // surfaces (cards, sidebar, top bar); canvas set in custom.scss
          lightgray: "#e2e8f0", // slate-200 borders
          gray: "#64748b", // slate-500 muted text
          darkgray: "#334155", // slate-700 body text
          dark: "#1e293b", // slate-800 headings / strong
          secondary: "#3b82f6", // blue-500 accent (links, buttons, active)
          tertiary: "#2563eb", // blue-600 hover
          highlight: "rgba(59, 130, 246, 0.10)",
          textHighlight: "#3b82f622",
        },
        darkMode: {
          light: "#0f172a", // slate-900
          lightgray: "#334155",
          gray: "#94a3b8",
          darkgray: "#cbd5e1",
          dark: "#f8fafc",
          secondary: "#60a5fa",
          tertiary: "#93c5fd",
          highlight: "rgba(96, 165, 250, 0.15)",
          textHighlight: "#60a5fa44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
