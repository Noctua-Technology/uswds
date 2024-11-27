import "../input/input.element.js";
import "./input-mask.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAInputMaskElement } from "./input-mask.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "input-mask",
  tags: ["autodocs"],
  render() {
    return html`
      <style>
        input {
          padding: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
      </style>

      <h2>Default</h2>

      <usa-input-mask>
        <usa-input
          data-testid="usa-input"
          name="phone"
          placeholder="(999) 999-9999"
          autocomplete="off"
          mask="(999) 999-9999"
        >
          Phone:
        </usa-input>

        <br />

        <label>Date:</label>
        <br />

        <input
          name="date"
          placeholder="99/99/9999"
          mask="99/99/9999"
          autocomplete="off"
        />
      </usa-input-mask>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAInputMaskElement>;

export default meta;

type Story = StoryObj<USAInputMaskElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
