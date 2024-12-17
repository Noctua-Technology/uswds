import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAModalElement } from "./modal.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-modal",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-modal open>
        <usa-modal-close></usa-modal-close>

        <usa-modal-heading>
          Are you sure you want to continue?
        </usa-modal-heading>

        <usa-input autofocus placeholder="foo@email.com">
          Enter your email to continue
        </usa-input>

        <usa-button action="confirm">Yes I am sure</usa-button>
        <usa-button action="cancel" variant="outline">Cancel</usa-button>
      </usa-modal>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAModalElement>;

export default meta;

type Story = StoryObj<USAModalElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
