import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAModalHeadingElement } from "./modal-heading.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-modal-heading",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-modal-heading>Hello World</usa-modal-heading>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAModalHeadingElement>;

export default meta;

type Story = StoryObj<USAModalHeadingElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
