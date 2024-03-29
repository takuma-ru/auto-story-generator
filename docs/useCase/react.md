# React

### Setup

  `.storybook/main.ts` or `.storybook/main.js`
  ::: code-group
  ```ts [Vite]
  autoStoryGenerator.vite({
    preset: "react",
    imports: ["src/components/**/*.tsx"],
  })
  ```

  ```ts [Webpack]
  autoStoryGenerator.webpack({
    preset: "react",
    imports: ["src/components/**/*.tsx"],
  })
  ```
  :::

### How to write code

In order to generate stories, the Props type must be defined in the component file.
The following writing style is supported.

```tsx
// {ComponentName}Props Interface
interface ComponentNameProps {
  propA: string;
}

// {ComponentName}Props Type
type ComponentNameProps = {
  propA: string;
}

// Props Interface
interface Props {
  propA: string;
}

// Props Type
type Props = {
  propA: string;
}

// Defined within component arguments
const ComponentName = ({ propA }: {propA: string}) => {
  return <div>{propA}</div>
}
```

### Example

Example of defining Props type with `{ComponentName}Props`.

  ::: code-group
  ```tsx [component]
  import { FC } from "react";

  interface XXXXProps {
    propA: string;
    propB?: boolean;
  }

  export const XXXX: FC<XXXXProps> = ({
    propA,
    propB = false,
  }) => {
    return (
      <div className="xxxx">
        <p>{propA}</p>
        {
          propB
            ? <p>propB is true</p>
            : <p>propB is false</p>
        }
      </div>
    );
  };
  ```

  ```tsx [story]
  import type { Meta, StoryObj } from "@storybook/react";

  import { XXXX } from "./XXXX.tsx";

  const meta: Meta<typeof XXXX> = {
    title: "components/XXXX",
    component: XXXX,
    tags: ["autodocs"],
    args: { propA: undefined, propB: undefined },
    argTypes: { propA: { control: "text" }, propB: { control: "boolean" } },
  };

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Primary: Story = {};
  ```
  :::