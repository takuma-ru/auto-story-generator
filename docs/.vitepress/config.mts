import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ASG",
  description:
    "Automatic real-time story file generation from React, Vue, Angular and Lit component files",
  head: [
    /* ["link", { rel: "icon", type: "image/svg+xml", href: "/asg-light.svg" }], */
    ["link", { rel: "icon", type: "image/png", href: "/asg-light.png" }],
    ["meta", { name: "theme-color", content: "#ff4785" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      {
        property: "og:title",
        content:
          "ASG | Automatic real-time story file generation from React, Vue, Angular and Lit component files",
      },
    ],
    ["meta", { property: "og:site_name", content: "ASG" }],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://auto-story-generator.takumaru.dev/asg-thumbnail-radius.png",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://auto-story-generator.takumaru.dev/",
      },
    ],
  ],
  themeConfig: {
    logo: {
      dark: "/asg-dark.png",
      light: "/asg-light.png",
    },

    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/introduction/getting-started" },
      { text: "FAQ", link: "/faq" },
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
          { text: "Angular", link: "/useCase/angular" },
          { text: "Custom", link: "/useCase/custom" },
        ],
      },
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Error Codes",
        link: "/errors",
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
