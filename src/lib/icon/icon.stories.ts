import "./icon.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAIconElement } from "./icon.element.js";
import { ICON_TYPES } from "./icon-types.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-icon",
  tags: ["autodocs"],
  render(args) {
    return html`<usa-icon icon="${args.icon}"></usa-icon>`;
  },
  argTypes: {
    icon: {
      type: "string",
      control: "select",
      options: ICON_TYPES,
    },
  },
  args: {
    icon: ICON_TYPES[35],
  },
} satisfies Meta<USAIconElement>;

export default meta;

type Story = StoryObj<USAIconElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {},
};

export const AllIcons: Story = {
  render() {
    return html`${ICON_TYPES.map(
      (icon) => html`<usa-icon icon=${icon}></usa-icon>${"\n"}`
    )}`;
  },
};
