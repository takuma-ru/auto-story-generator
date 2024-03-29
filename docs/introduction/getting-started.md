# Get Started

## Install
::: code-group

```bash [npm]
npm i -D @takuma-ru/auto-story-generator
```

```bash [yarn]
yarn add -D @takuma-ru/auto-story-generator
```

```bash [pnpm]
pnpm add -D @takuma-ru/auto-story-generator
```

:::

## Setup
### 0. Setup Storybook
Install Storybook in your project on [Storybook Docs - Install](https://storybook.js.org/docs/get-started/install).

### 1. Add plugin to your config

`./storybook/main.ts` or `./storybook/main.js`
::: code-group

```ts{5,12-15} [Vite]
import type { StorybookConfig } from "@storybook/react-vite";

import { mergeConfig } from "vite";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  /* ... */
  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [
        autoStoryGenerator.vite({
          preset: "react",
          imports: ["src/components/**/*.tsx"],
        }),
      ],
    }),
};

export default config;
```

```ts{4,10-13} [Webpack]
import type { StorybookConfig } from "@storybook/react/types";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  /* ... */
  webpackFinal: (config) => {
    config.plugins.push(
      autoStoryGenerator.webpack({
        preset: "react",
        imports: ["src/components/**/*.tsx"],
      })
    );
    return config;
  },
};

export default config;
```

:::

### 2. Done!
Now, when you run Storybook, it will automatically generate stories from the component files.

The story is generated at the time the component file is **saved**.

#### Use cases in each framework

- [React](/useCase/react)
- [Vue](/useCase/vue)
- [Svelte](/useCase/svelte)
- [Angular](/useCase/angular)
- [Lit](/useCase/lit)
- [Custom](/useCase/custom)


### 3. Make more advanced settings
See [Generate Options](/introduction/options).