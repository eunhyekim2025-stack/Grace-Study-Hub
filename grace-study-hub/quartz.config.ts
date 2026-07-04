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
    ignorePatterns: ["private", "templates", ".obsidian", "log.md"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Source Serif 4",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        // Elegant academic palette: navy #132743 + gold #b8934c on warm parchment.
        lightMode: {
          light: "#fdfcfa",
          lightgray: "#e9e4d8",
          gray: "#8a8f98",
          darkgray: "#3a4250",
          dark: "#132743",
          secondary: "#132743",
          tertiary: "#b8934c",
          highlight: "rgba(184, 147, 76, 0.12)",
          textHighlight: "#ece2cc88",
        },
        darkMode: {
          light: "#132743",
          lightgray: "#3a4250",
          gray: "#8a8f98",
          darkgray: "#e9e4d8",
          dark: "#fdfcfa",
          secondary: "#c9a25c",
          tertiary: "#ece2cc",
          highlight: "rgba(184, 147, 76, 0.15)",
          textHighlight: "#b8934c55",
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
