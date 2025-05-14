import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USABreadcrumbsElement } from "./breadcrumbs.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-breadcrumbs",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-breadcrumbs ?wrap=${args.wrap}>
        <usa-breadcrumb href="/home">Home</usa-breadcrumb>
        <usa-breadcrumb href="/federal-contracting">Federal Contracting</usa-breadcrumb>
        <usa-breadcrumb href="/contracting-assistance-programs">Contracting assistance programs</usa-breadcrumb>
        <usa-breadcrumb>Economically disadvantaged women-owned small business federal contracting program</usa-breadcrumb>
      </usa-breadcrumbs>
    `;
  },
  argTypes: {
    wrap: {
      type: "boolean",
      control: "boolean",
    },
  },
  args: {
    wrap: false,
  },
} satisfies Meta<USABreadcrumbsElement>;

export default meta;

type Story = StoryObj<USABreadcrumbsElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
