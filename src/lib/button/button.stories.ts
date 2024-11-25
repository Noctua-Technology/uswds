import "./button.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAButtonElement } from "./button.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-button",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-button>Hello World</usa-button>
      <br />
      <br />

      <usa-button variant="secondary">Hello World</usa-button>
      <br />
      <br />

      <usa-button variant="cool">Hello World</usa-button>
      <br />
      <br />

      <usa-button variant="warm">Hello World</usa-button>
      <br />
      <br />

      <usa-button variant="outline">Hello World</usa-button>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAButtonElement>;

export default meta;

type Story = StoryObj<USAButtonElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
