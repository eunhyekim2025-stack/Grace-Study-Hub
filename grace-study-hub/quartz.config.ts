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
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        // "Grace's Study Hub" note-app palette: warm off-white + blue accent
        // (oklch base: bg 0.99/.003/95, accent 0.55/.14/250), clean system sans.
        lightMode: {
          light: "#fcfcf9",
          lightgray: "#dfdeda",
          gray: "#72726e",
          darkgray: "#2a2926",
          dark: "#1b1b17",
          secondary: "#1f74bf",
          tertiary: "#0465af",
          highlight: "rgba(31, 116, 191, 0.10)",
          textHighlight: "#1f74bf22",
        },
        darkMode: {
          light: "#1b1b18",
          lightgray: "#33322d",
          gray: "#8f8e88",
          darkgray: "#d9d7cf",
          dark: "#f5f3ee",
          secondary: "#5fa8e6",
          tertiary: "#8cc3f2",
          highlight: "rgba(95, 168, 230, 0.15)",
          textHighlight: "#5fa8e644",
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
