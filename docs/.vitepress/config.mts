import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ASG",
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
      {
        text: "Use Cases",
        items: [
          { text: "React", link: "/useCase/react" },
          { text: "Lit", link: "/useCase/lit" },
          { text: "Vue", link: "/useCase/vue" },
          { text: "Svelte", link: "/useCase/svelte" },
          { text: "Custom", link: "/useCase/custom" },
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
