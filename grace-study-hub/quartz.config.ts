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
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Warm editorial theme (Claude design prototype): Lora serif for
        // headings/titles, Inter for UI/body.
        header: "Lora",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        // "Grace's Study Hub" warm-editorial palette: cream canvas, near-white
        // surfaces, terracotta accent, tan borders/numbers, warm-brown text.
        lightMode: {
          light: "#fdfbf8", // surfaces (cards, sidebar, top bar); canvas cream is set in custom.scss
          lightgray: "#ece4d6", // warm tan borders
          gray: "#8a8072", // muted text
          darkgray: "#3a352c", // body text
          dark: "#2e2a24", // headings / strong
          secondary: "#a15d46", // terracotta accent (links, title, buttons)
          tertiary: "#7d4230", // darker terracotta (hover)
          highlight: "rgba(211, 169, 140, 0.22)", // tan highlight
          textHighlight: "#d3a98c55",
        },
        darkMode: {
          light: "#211d17",
          lightgray: "#3a352c",
          gray: "#9a9084",
          darkgray: "#e6ddcf",
          dark: "#f5efe4",
          secondary: "#d98a6f",
          tertiary: "#e8b39a",
          highlight: "rgba(217, 138, 111, 0.15)",
          textHighlight: "#d98a6f44",
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
