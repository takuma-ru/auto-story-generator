# Lit

### Setup

  `.storybook/main.ts` or `.storybook/main.js`
  ::: code-group
  ```ts [Vite]
  autoStoryGenerator.vite({
    preset: "lit",
    imports: ["src/components/**/*.ce.ts"],
  })
  ```

  ```ts [Webpack]
  autoStoryGenerator.webpack({
    preset: "lit",
    imports: ["src/components/**/*.ce.ts"],
  })
  ```
  :::

<!-- ### Example (Case 1)



  ::: code-group
  ```ts [component]

  ```

  ```ts [story]
  ```
  ::: -->