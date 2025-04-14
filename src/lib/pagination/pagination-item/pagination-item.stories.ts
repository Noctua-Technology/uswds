import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAPaginationItemElement } from "./pagination-item.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-pagination-item",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-pagination-item>Hello World</usa-pagination-item>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAPaginationItemElement>;

export default meta;

type Story = StoryObj<USAPaginationItemElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
