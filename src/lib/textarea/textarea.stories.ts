import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USATextareaElement } from "./textarea.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-textarea",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-textarea>Hello World</usa-textarea>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USATextareaElement>;

export default meta;

type Story = StoryObj<USATextareaElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
