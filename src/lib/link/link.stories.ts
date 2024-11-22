import "../icon/icon.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-link",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<{}>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render() {
    return html`<a class="usa-link" href="www.google.com">Hello World</a>`;
  },
};

export const External: Story = {
  render() {
    return html`
      <a class="usa-link" href="www.google.com">
        Hello World

        <usa-icon icon="launch"></usa-icon>
      </a>
    `;
  },
};
