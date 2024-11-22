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
        usa-input-mask {
          display: flex;
          flex-direction: column;
          max-width: 400px;
        }

        usa-input-mask input {
          padding: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
      </style>

      <h2>Default</h2>

      <usa-input-mask mask="(999) 999-9999">
        <label>Phone:</label>

        <usa-input name="phone" placeholder="(999) 999-9999" masked></usa-input>
      </usa-input-mask>

      <usa-input-mask mask="99/99/9999">
        <label>Date:</label>
        <input name="date" placeholder="99/99/9999" />
      </usa-input-mask>

      <h2>Multiple Fields</h2>

      <usa-input-mask mask="(999) 999-9999">
        <label>Home:</label>
        <input name="phone1" placeholder="(999) 999-9999" />

        <label>Cell:</label>
        <input name="phone2" placeholder="(999) 999-9999" />

        <label>Work:</label>
        <input name="phone3" placeholder="(999) 999-9999" />
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
