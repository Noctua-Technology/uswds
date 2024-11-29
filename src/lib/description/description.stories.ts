import "./description.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USADescriptionElement } from "./description.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-description",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-description>Hello World</usa-description>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USADescriptionElement>;

export default meta;

type Story = StoryObj<USADescriptionElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
