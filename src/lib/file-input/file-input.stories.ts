import "./file-input.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAFileInputElement } from "./file-input.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-file-input",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-file-input></usa-file-input>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAFileInputElement>;

export default meta;

type Story = StoryObj<USAFileInputElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
