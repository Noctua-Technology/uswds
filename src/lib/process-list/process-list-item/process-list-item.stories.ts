import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAProcessListItemElement } from "./process-list-item.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-process-list-item",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-process-list-item>Hello World</usa-process-list-item>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAProcessListItemElement>;

export default meta;

type Story = StoryObj<USAProcessListItemElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
