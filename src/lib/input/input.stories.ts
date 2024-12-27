import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USATextInputElement } from "./input.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-input",
  tags: ["autodocs"],
  render() {
    return html`
      <form>
        <usa-input name="fname" value="Danny" autocomplete="off">
          First name
        </usa-input>

        <usa-button type="submit">Submit</usa-button>
      </form>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USATextInputElement>;

export default meta;

type Story = StoryObj<USATextInputElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
