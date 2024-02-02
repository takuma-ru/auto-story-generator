import { html } from "lit";

import type { Meta, StoryObj } from "@storybook/web-components";

import { CeTestA, CeTestAProps } from "../ce-test-a/ce-test-a.ce";

const meta: Meta<CeTestAProps> = {
  title: "components/ce-test-a",
  tags: ["autodocs"],
  render: (args) => {
    new CeTestA();

    return html`<ce-test-a prop-a="${args.propA}">ce-test-a</ce-test-a>`;
  },
  args: { propA: undefined },
  argTypes: { propA: { control: "text" } },
};

export default meta;

export type CeTestAStory = StoryObj<CeTestAProps>;

export const Primary: CeTestAStory = {};
