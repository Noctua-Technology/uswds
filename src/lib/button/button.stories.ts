import "./button.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { USAButtonElement } from "./button.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-button",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-button>Hello World</usa-button>
      <usa-button disabled>Hello World</usa-button>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAButtonElement>;

export default meta;

type Story = StoryObj<USAButtonElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Test: Story = {
  args: {},
};
