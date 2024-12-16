import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAStepIndicatorElement } from "./step-indicator.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-step-indicator",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-step-indicator>
        <usa-step-indicator-step state="complete" counter>
          Personal information
        </usa-step-indicator-step>

        <usa-step-indicator-step state="complete" counter>
          Household status
        </usa-step-indicator-step>

        <usa-step-indicator-step state="current" counter>
          Supporting documents
        </usa-step-indicator-step>

        <usa-step-indicator-step counter>Signature</usa-step-indicator-step>

        <usa-step-indicator-step counter
          >Review and submit
        </usa-step-indicator-step>
      </usa-step-indicator>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAStepIndicatorElement>;

export default meta;

type Story = StoryObj<USAStepIndicatorElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
