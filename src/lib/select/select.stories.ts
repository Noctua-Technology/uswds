import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USASelectElement } from "./select.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-select",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-select value="third">
        Hello World

        <usa-select-option value="first">first</usa-select-option>
        <usa-select-option value="second">second</usa-select-option>
        <usa-select-option value="third">third</usa-select-option>
        <usa-select-option value="fourth">fourth</usa-select-option>
      </usa-select>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USASelectElement>;

export default meta;

type Story = StoryObj<USASelectElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
