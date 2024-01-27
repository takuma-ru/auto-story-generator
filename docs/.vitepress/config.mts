import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ASG(writing...)",
  description: "Generate and update stories from component files in real time",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/introduction/getting-started" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is This?", link: "/introduction/what" },
          { text: "Getting Started", link: "/introduction/getting-started" },
          { text: "Options", link: "/introduction/options" },
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
