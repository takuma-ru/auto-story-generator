import type { StorybookConfig } from "@storybook/nextjs";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config, options) {
    config.plugins?.push(
      autoStoryGenerator.webpack({
        preset: "react",
        isGenerateStoriesFileAtBuild: true,
        imports: ["src/components/**/*.tsx", "app/_components/**/*.tsx"],
      })
    );

    return config;
  },
};
export default config;
