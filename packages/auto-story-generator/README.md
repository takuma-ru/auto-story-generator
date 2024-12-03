# @takuma-ru/auto-story-generator

![asg-thumbnail](https://auto-story-generator.takumaru.dev/asg-thumbnail-radius.png)

## Description

Automatic real-time story file generation from React, Vue, Angular and Lit component files

## Getting Started

### 1. Install the package

```bash
npm i @takuma-ru/auto-story-generator
```

### 2. Add config

Add settings to main.ts in Storybook (`./storybook/main.ts`)

For `React`, `Vite`

```ts
import type { StorybookConfig } from "@storybook/react-vite";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

import { mergeConfig } from "vite";

const config: StorybookConfig = {
  viteFinal: async config =>
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

## Supported Frameworks

> ✅: Supported<br>
> 🚧: Work in progress<br>
> ❌: Not supported<br>
> 📝: Not yet implemented<br>

| Framework | Supported |
| --------- | --------- |
| React     | ✅        |
| Vue       | 🚧        |
| Lit       | ✅        |
| Angular   | 🚧        |
| Svelte    | 📝        |
| Custom    | 📝        |

## Contributors
### Main contributor
[![](https://avatars.githubusercontent.com/u/49429291?v=4&size=32)](https://github.com/takuma-ru)
takuma-ru : Core API, React presets more...

### Special thanks
<!-- TODO: Add GeetaKrishna65 Profile image -->
<!-- GeetaKrishna65 : Create Angular presets -->
