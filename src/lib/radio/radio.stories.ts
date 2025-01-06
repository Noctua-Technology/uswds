import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import { when } from "lit/directives/when.js";
import type { USARadioElement } from "./radio.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-radio",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-radio
        name="historical-figures"
        value="frederick-douglass"
        ?tiled=${args.tiled}
      >
        <legend>Select one historical figure</legend>

        <usa-radio-option value="sojourner-truth">
          Sojourner Truth
        </usa-radio-option>

        <usa-radio-option value="frederick-douglass">
          Frederick Douglass
          ${when(
            args.description,
            () => html`<usa-description>${args.description}</usa-description>`,
          )}
        </usa-radio-option>

        <usa-radio-option value="booker-t-washington">
          Booker T. Washington
        </usa-radio-option>

        <usa-radio-option value="george-washington-carver">
          George Washington Carver
        </usa-radio-option>
      </usa-radio>
    `;
  },
  argTypes: {},
  args: {
    tiled: true,
    description:
      "This is optional text that can be used to describe the label in more detail.",
  },
} satisfies Meta<USARadioElement & { description: string }>;

export default meta;

type Story = StoryObj<USARadioElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
