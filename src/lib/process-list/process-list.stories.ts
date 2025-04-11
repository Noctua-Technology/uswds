import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAProcessListElement } from "./process-list.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-process-list",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-process-list>Hello World</usa-process-list>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAProcessListElement>;

export default meta;

type Story = StoryObj<USAProcessListElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
