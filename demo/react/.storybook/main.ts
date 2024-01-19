import type { StorybookConfig } from "@storybook/react-vite";

import { mergeConfig } from "vite";
import { join, dirname, resolve } from "path";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [
        autoStoryGenerator.vite({
          dirname: resolve(__dirname, "../src"),
          preset: "react",
        }),
      ],

      resolve: {
        alias: {
          "~": resolve(__dirname, "../src"),
        },
      },
    }),
};
export default config;
