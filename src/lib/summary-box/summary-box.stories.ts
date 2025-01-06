import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USASummaryBoxElement } from "./summary-box.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-summary-box",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-summary-box> Hello World </usa-summary-box>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USASummaryBoxElement>;

export default meta;

type Story = StoryObj<USASummaryBoxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
