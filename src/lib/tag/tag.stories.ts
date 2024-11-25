import "./tag.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import { TAG_VARIANTS, type USATagElement } from "./tag.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-tag",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-tag variant=${args.variant}>Hello World</usa-tag>`;
  },
  argTypes: {
    variant: {
      control: "select",
      options: TAG_VARIANTS,
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<USATagElement>;

export default meta;

type Story = StoryObj<USATagElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
