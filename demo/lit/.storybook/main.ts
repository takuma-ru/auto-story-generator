import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [
        autoStoryGenerator.vite({
          preset: "lit",
          imports: ["**/src/components/**/*.ce.ts"],
        }),
      ],
    });
  },
};
export default config;
