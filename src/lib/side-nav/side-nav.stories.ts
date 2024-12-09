import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USASideNavElement } from "./side-nav.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-side-nav",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-side-nav>
        <usa-side-nav-item current>
          <usa-link href="#">Current Page</usa-link>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent Link</usa-link>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent Link</usa-link>
        </usa-side-nav-item>
      </usa-side-nav>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USASideNavElement>;

export default meta;

type Story = StoryObj<USASideNavElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
