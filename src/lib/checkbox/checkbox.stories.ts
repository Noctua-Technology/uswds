import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { when } from "lit/directives/when.js";

import type { USACheckboxElement } from "./checkbox.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-checkbox",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-checkbox
        name=${args.name}
        value=${ifDefined(args.value)}
        checked=${ifDefined(args.checked)}
        ?tiled=${args.tiled}
      >
        Hello World
        ${when(
          args.description,
          () => html`<usa-description>${args.description}</usa-description>`
        )}
      </usa-checkbox>
    `;
  },
  argTypes: {
    name: {
      control: "text",
    },
    value: {
      control: "text",
    },
    description: {
      control: "text",
    },
    tiled: {
      control: "boolean",
    },
  },
  args: {
    name: "toc",
    value: "agree",
    tiled: false,
  },
} satisfies Meta<USACheckboxElement & { description: string }>;

export default meta;

type Story = StoryObj<USACheckboxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
