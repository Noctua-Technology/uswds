import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USACollectionElement } from "./collection.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-collection",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-collection>
        <usa-collection-item>
          <h4 slot="heading">
            <usa-link href="#">Gears of Government President's Award winners</usa-link>
          </h4>

          <div slot="description">
            Today, the Administration announces the winners of the Gears of Government President’s Award. This program recognizes the contributions of individuals and teams across the federal workforce who make a profound difference in the lives of the American people.
          </div>

          <usa-tag slot="tags">NEW</usa-tag>
          <usa-tag slot="tags">PMA</usa-tag>
          <usa-tag slot="tags">OMB</usa-tag>
        </usa-collection-item>

        <usa-collection-item>
          <img height="80" width="80" src="/assets/img/gog-logo.png" slot="img"/>

          <h4 slot="heading">
            <usa-link href="#">Gears of Government President's Award winners</usa-link>
          </h4>

          <div slot="description">
            Today, the Administration announces the winners of the Gears of Government President’s Award. This program recognizes the contributions of individuals and teams across the federal workforce who make a profound difference in the lives of the American people.
          </div>

          <usa-tag slot="tags">NEW</usa-tag>
          <usa-tag slot="tags">PMA</usa-tag>
          <usa-tag slot="tags">OMB</usa-tag>
        </usa-collection-item>

        <usa-collection-item>
          <h4 slot="heading">
            <usa-link href="#">Women-owned small business dashboard</usa-link>
          </h4>

          <div slot="description">
            In honor of National Women's Small Business Month, we've partnered with SBA's Office of Government Contracting and Business Development and Office of Program Performance, Analysis, and Evaluation to highlight the Women-Owned Small Businesses (WOSBs) data dashboard!
          </div>

          <usa-tag slot="tags">NEW</usa-tag>
          <usa-tag slot="tags">PMA</usa-tag>
          <usa-tag slot="tags">OMB</usa-tag>
        </usa-collection-item>

        <usa-collection-item>
          <img height="52" width="80" src="/assets/img/wosb1.jpg" slot="img"/>

          <h4 slot="heading">
            <usa-link href="#">Women-owned small business dashboard</usa-link>
          </h4>
          
          <div slot="description">
            In honor of National Women's Small Business Month, we've partnered with SBA's Office of Government Contracting and Business Development and Office of Program Performance, Analysis, and Evaluation to highlight the Women-Owned Small Businesses (WOSBs) data dashboard!
          </div>

          <usa-tag slot="tags">NEW</usa-tag>
          <usa-tag slot="tags">PMA</usa-tag>
          <usa-tag slot="tags">OMB</usa-tag>
        </usa-collection-item>
      </usa-collection>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USACollectionElement>;

export default meta;

type Story = StoryObj<USACollectionElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
