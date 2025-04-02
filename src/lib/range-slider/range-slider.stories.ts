import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USARangeSliderElement } from "./range-slider.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-range-slider",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-range-slider name="test" value="50">Hello World</usa-range-slider>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USARangeSliderElement>;

export default meta;

type Story = StoryObj<USARangeSliderElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
