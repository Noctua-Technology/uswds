import "./checkbox.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USACheckboxElement } from "./checkbox.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-checkbox",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-checkbox>Hello World</usa-checkbox>

      <hr />

      <br />

      <usa-checkbox tiled>
        Hello World

        <span slot="description">
          This is optional text that can be used to describe the label in more
          detail.
        </span>
      </usa-checkbox>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USACheckboxElement>;

export default meta;

type Story = StoryObj<USACheckboxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
