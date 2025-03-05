import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USACheckboxElement } from "./checkbox.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-checkbox",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-checkbox-group>
        <legend class="usa-legend">Select any historical figure</legend>

        <usa-checkbox name="historical-figure" value="sojurner-truth" tiled>
          Sojourner Truth
          <usa-description>This is optional text that can be used to describe the label in more detail.</usa-description>
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="frederick-douglass" tiled>
          Frederick Douglass
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="booker-t-washington" tiled>
          Booker T. Washington
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="gw-carver" tiled disabled>
          George Washington Carver
        </usa-checkbox>
      </usa-checkbox-group>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USACheckboxElement & { description: string }>;

export default meta;

type Story = StoryObj<USACheckboxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render() {
    return html`
      <usa-checkbox-group>
        <legend class="usa-legend">Select any historical figure</legend>

        <usa-checkbox name="historical-figure" value="sojurner-truth">
          Sojourner Truth
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="frederick-douglass">
          Frederick Douglass
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="booker-t-washington">
          Booker T. Washington
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="gw-carver" disabled>
          George Washington Carver
        </usa-checkbox>
      </usa-checkbox-group>
    `;
  },
};

export const Tiled: Story = {
  render() {
    return html`
      <usa-checkbox-group>
        <legend class="usa-legend">Select any historical figure</legend>

        <usa-checkbox name="historical-figure" value="sojurner-truth" tiled>
          Sojourner Truth
          <usa-description>This is optional text that can be used to describe the label in more detail.</usa-description>
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="frederick-douglass" tiled>
          Frederick Douglass
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="booker-t-washington" tiled>
          Booker T. Washington
        </usa-checkbox>

        <usa-checkbox name="historical-figure" value="gw-carver" tiled disabled>
          George Washington Carver
        </usa-checkbox>
      </usa-checkbox-group>
    `;
  },
};
