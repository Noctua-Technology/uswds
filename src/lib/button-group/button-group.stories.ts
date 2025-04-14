import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAButtonGroupElement } from "./button-group.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-button-group",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-button-group>
        <usa-button variant="outline">Back</usa-button>
        <usa-button variant="primary">Continue</usa-button>
      </usa-button-group>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAButtonGroupElement>;

export default meta;

type Story = StoryObj<USAButtonGroupElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
