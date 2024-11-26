import "./icon.element.js";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAIconElement } from "./icon.element.js";
import { ICON_TYPES } from "./icon-types.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-icon",
  tags: [],
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

export const AllIcons: Story = {
  render() {
    async function copyIcon(icon: string) {
      try {
        await navigator.clipboard.writeText(
          `<usa-icon icon=${icon}></usa-icon>`
        );
        alert(`copied markup for ${icon}`);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }

    return html`<div style="display: flex; flex-wrap: wrap; gap: .75rem;">
      ${html`${ICON_TYPES.map(
        (icon) => html`
          <button
            @click=${() => copyIcon(icon)}
            style="padding: .5rem 1rem .5rem .5rem; cursor: pointer; background: #fff; border-radius: 4px; gap: .5rem; display: flex; align-items: center"
          >
            <usa-icon icon=${icon}></usa-icon>

            ${icon}
          </button>
        `
      )}`}
    </div>`;
  },
};
