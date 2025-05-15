# Angular

::: warning
📝 Not a fully functioning story generation...
:::

### Setup

  `.storybook/main.ts` or `.storybook/main.js`
  ::: code-group

  ```ts [Webpack]
  autoStoryGenerator.webpack({
    preset: "angular",

    // depending on your folder structure set imports array
    // "src/**/components/**/*.ts"; or "src/**/*.ts";
    imports: ["src/components/**/*.ts"],
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