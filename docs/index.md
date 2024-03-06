---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "auto-story-generator(ASG)"
  text: "Generate and update stories from component files in real time"
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/takuma-ru/auto-story-generator
  image:
    dark: /asg-dark.png
    light: /asg-light.png
    alt: asg

features:
  - icon: ⚙️
    title: Automatic generation
    details: Detects changes in component files and automatically generates story files.
  - icon: 🔄
    title: Automatic updates
    details: Detects changes in component files and automatically updates meta information in stories.
  - icon:
      dark: https://unplugin.vercel.app/logo_dark.svg
      light: https://unplugin.vercel.app/logo_light.svg
    title: Supports a wide variety of build tools
    details: Supports a wide variety of build tools by unplugin.
  - icon: 🧩
    title: Support for various front-end frameworks
    details: Stories can be generated from "Vue", "React" and "Svelte" component files.
---

