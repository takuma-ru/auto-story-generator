import type { Meta, StoryObj } from "@storybook/react";

import { TestA } from "./TestA.tsx";

const meta: Meta<typeof TestA> = {
  title: "components/TestA",
  component: TestA,
  tags: ["autodocs"],
  args: { text: undefined },
  argTypes: { text: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
