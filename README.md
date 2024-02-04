
> [!NOTE]
> This is a fork of [@takuma-ru/auto-story-generator](https://github.com/takuma-ru/auto-story-generator/assets/49429291/dca65c2c-3384-45c0-a761-e85276cb2393)(which doesn't support Angular). This is meant to extend @takuma-ru/auto-story-generator and support Angular. 

# auto-angular-story-generator

![asg-thumbnail](https://github.com/takuma-ru/auto-story-generator/assets/49429291/dca65c2c-3384-45c0-a761-e85276cb2393)

## Description
Automatic real-time story file generation from React, Vue, Lit and Angular component files

## Getting Started
### 1. Install the package
```bash
npm i auto-angular-story-generator
```

### 2. Add config
Add settings to main.ts in Storybook (`./storybook/main.ts`)

For `React`, `Vite`
```ts
import type { StorybookConfig } from "@storybook/react-vite";

import { mergeConfig } from "vite";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [
        autoStoryGenerator.vite({
          preset: "react",
          imports: ["**/src/components/**/*.tsx"],
        }),
      ],
    }),
};

export default config;
```

> [!WARNING]  
> Don't run this plugin(Angular part) on your apps right away. Test it on a sample Application or create a new Angular app.

> [!NOTE]
> Angular feature is a WIP. Only a basic story can be created at this point of time. Modify the created stories as required. Will try to improve story creation.

For `Angular` [Webpack custom config](https://storybook.js.org/docs/builders/webpack#working-with-webpack-plugins)

```ts
import type { StorybookConfig } from "@storybook/angular";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const customConfig = {
  webpackFinal: async (config) => {
    let plugin = autoStoryGenerator.webpack({
      preset: "angular",
      imports: ["**/src/**/*.component.ts"],
    });
    config.plugins.push(plugin);
    return config;
  }
}

const primeConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  // spread the object here instead of mergeConfig(avaialable for vite) 
  ...customConfig,
  docs: {
    autodocs: "tag",
  },
};

export default primeConfig;
```
> [!NOTE]
> In Angular, for first time story creation, a run tme error occurs, can ignore it. 



## Supported Frameworks
> ✅: Supported
> 🚧: Work in progress
> ❌: Not supported
> 📝: Not yet implemented

| Framework | Supported |
| --------- | --------- |
| React     | ✅         |
| Vue       | 🚧         |
| Lit       | ✅         |
| Angular   | 🚧         |
| Svelte    | 📝         |