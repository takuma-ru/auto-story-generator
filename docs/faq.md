# FAQ

### Q: I launched a story, but the story file is not generated.

::: details Answer
Story generation is performed when the component file is saved.
Therefore, try saving the file you want the story to be generated.
:::

### Q: What happens to the test code described in the story file when the story is updated?

::: details Answer
The test code will not disappear or be updated.
The only information that is automatically updated by this library is the `const meta = ...` information.
:::

### Q: I want to set the `meta.title` by myself, and I want to define some parts in the `meta` by myself.

::: details Answer
The following writing style can be used to address this issue.

```tsx
// ...

const meta: Meta<typeof Component> = {
  title: "components/Component",
  // ...
};

meta.title = "components/utils/Component";

export default meta;
// ...
```
:::

If the problem persists...
Please raise it in an Issue or ask a question in a discussion.

### Links

[Issues - takuma-ru/auto-story-generator](https://github.com/takuma-ru/auto-story-generator/issues)

[Discussions - takuma-ru/auto-story-generator](https://github.com/takuma-ru/auto-story-generator/discussions)
