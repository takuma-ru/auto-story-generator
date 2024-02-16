# Generate Options

## `preset`


### Support Status
Specify the name of the framework.
::: warning
At this time, some special naming and writing is required for story generation. (This will be improved in future updates.)
:::

| Preset    | Support Status |
| --------- | -------------- |
| `react`   | ✅              |
| `vue`     | 🚧              |
| `lit`     | ✅              |
| `svelte`  | 📝              |
| `angular` | 🚧              |
| `custom`  | 📝              |
> ✅: Supported<br>
> 🚧: Work in progress<br>
> ❌: Not supported<br>
> 📝: Not yet implemented<br>

### Example
```ts
autoStoryGenerator.vite({
  preset: "react",
})
```

## `imports`
Specify the directory(s) where the component(s) for which you wish to generate a Story are located.

### Example
```ts
autoStoryGenerator.vite({
  imports: ["src/components/**/*.tsx"],
})
```

## `prettierConfigPath`
prettier is executed when stories are generated and when stories are updated.
You can have that set up.

### Example
```ts
autoStoryGenerator.vite({
  prettierConfigPath: resolve(__dirname, "../.prettierrc"),
})
```