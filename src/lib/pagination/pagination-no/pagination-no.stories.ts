import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAPaginationNoElement } from "./pagination-no.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-pagination-no",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-pagination-no>Hello World</usa-pagination-no>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAPaginationNoElement>;

export default meta;

type Story = StoryObj<USAPaginationNoElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
