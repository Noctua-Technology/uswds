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
        <usa-step state="complete" counter=${args.counter}>
          Personal information
        </usa-step>

        <usa-step state="complete" counter=${args.counter}>
          Household status
        </usa-step>

        <usa-step state="current" counter=${args.counter}>
          Supporting documents
        </usa-step>

        <usa-step counter=${args.counter}>Signature</usa-step>

        <usa-step counter=${args.counter}>Review and submit</usa-step>
      </usa-step-indicator>
    `;
  },
  argTypes: {
    counter: {
      control: "select",
      options: ["on", "small"],
    },
  },
  args: {
    counter: "on",
  },
} satisfies Meta<USAStepIndicatorElement & { counter: string }>;

export default meta;

type Story = StoryObj<USAStepIndicatorElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
