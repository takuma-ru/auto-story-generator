# @takuma-ru/auto-story-generator

![asg-thumbnail](https://github.com/takuma-ru/auto-story-generator/assets/49429291/dca65c2c-3384-45c0-a761-e85276cb2393)

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

import { mergeConfig } from "vite";

import autoStoryGenerator from "@takuma-ru/auto-story-generator";

const config: StorybookConfig = {
  viteFinal: async (config) =>
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
| React     | ✅         |
| Vue       | 🚧         |
| Lit       | ✅         |
| Angular   | 🚧         |
| Svelte    | 📝         |
| Custom    | 📝         |