import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAAlertElement } from "./alert.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-alert",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<USAAlertElement>;

export default meta;

type Story = StoryObj<USAAlertElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <usa-alert type="info">
          <h3 slot="heading">Informative status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>

        <usa-alert type="warning">
          <h3 slot="heading">Warning status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>

        <usa-alert type="success">
          <h3 slot="heading">Success status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>

        <usa-alert type="error">
          <h3 slot="heading">Error status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>

        <usa-alert type="emergency">
          <h3 slot="heading">Emergency status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>
      </div>
    `;
  },
};
