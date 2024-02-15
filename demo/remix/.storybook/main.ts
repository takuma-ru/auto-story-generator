import type { StorybookConfig } from "@storybook/react-webpack5";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(jsx|tsx)",
    "../components/TestA/TestA.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config, options) {
    config.plugins?.push(
      autoStoryGenerator.webpack({
        preset: "react",
        imports: ["**/components/**/*.tsx"],
      })
    );

    return config;
  },
};
export default config;
