import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "auto-story-generator",
  description:
    "Automatic real-time story file generation from React, Vue, and Lit component files",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/takuma-ru/auto-story-generator",
      },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/@takuma-ru/auto-story-generator",
      },
    ],
  },
});
