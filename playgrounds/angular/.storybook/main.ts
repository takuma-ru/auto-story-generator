import type { StorybookConfig } from "@storybook/angular";
import { resolve } from "path";
import autoStoryGenerator from '../../../packages/auto-story-generator/src/index';

const customConfig = {
  webpackFinal: async (config) => {
    let plugin = autoStoryGenerator.webpack({
      preset: "angular",
      imports: ["src/app/**/*.component.ts"],
      isGenerateStoriesFileAtBuild: true,
      prettierConfigPath: resolve(__dirname, '../.prettierrc'),
    });
    config.plugins.push(plugin);
    return config;
  }
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  ...customConfig,
  docs: {
    autodocs: 'tag',
  },
};
export default config;
