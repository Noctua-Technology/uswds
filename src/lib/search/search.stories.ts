import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USASearchElement } from "./search.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-search",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-search>Search</usa-search>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USASearchElement>;

export default meta;

type Story = StoryObj<USASearchElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
