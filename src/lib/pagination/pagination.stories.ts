import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAPaginationElement } from "./pagination.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-pagination",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-pagination>
        <usa-pagination-item>
          <usa-link href="#">
            <usa-icon icon="navigate_before"></usa-icon> Previous
          </usa-link>
        </usa-pagination-item>
        
        <usa-pagination-item>
          <usa-pagination-no>1</usa-pagination-no>
        </usa-pagination-item>

        <usa-pagination-item>...</usa-pagination-item>
        
        <usa-pagination-item>
          <usa-pagination-no>9</usa-pagination-no>
        </usa-pagination-item>
        
        <usa-pagination-item>
          <usa-pagination-no active>10</usa-pagination-no>
        </usa-pagination-item>

        <usa-pagination-item>
          <usa-pagination-no>11</usa-pagination-no>
        </usa-pagination-item>

        <usa-pagination-item>...</usa-pagination-item>

        <usa-pagination-item>
          <usa-pagination-no>24</usa-pagination-no>
        </usa-pagination-item>
        
        <usa-pagination-item>
          <usa-link href="#">
            Next <usa-icon icon="navigate_next"></usa-icon>
          </usa-link>
        </usa-pagination-item>
      </usa-pagination>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAPaginationElement>;

export default meta;

type Story = StoryObj<USAPaginationElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
