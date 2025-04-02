import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAComboBoxElement } from "./combo-box.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-combo-box",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-combo-box>
        <usa-input name="search" slot="input" autocomplete="off">States</usa-input>

        <datalist>
          <option value="Alabama"></option>
          <option value="Alaska"></option>
          <option value="Arizona"></option>
          <option value="Arkansas"></option>
          <option value="California"></option>
          <option value="Colorado"></option>
          <option value="Connecticut"></option>
          <option value="Delaware"></option>
          <option value="Florida"></option>
          <option value="Georgia"></option>
          <option value="Hawaii"></option>
          <option value="Idaho"></option>
          <option value="Illinois"></option>
          <option value="Indiana"></option>
          <option value="Iowa"></option>
          <option value="Kansas"></option>
          <option value="Kentucky"></option>
          <option value="Louisiana"></option>
          <option value="Maine"></option>
          <option value="Maryland"></option>
          <option value="Massachusetts"></option>
          <option value="Michigan"></option>
          <option value="Minnesota"></option>
          <option value="Mississippi"></option>
          <option value="Missouri"></option>
          <option value="Montana"></option>
          <option value="Nebraska"></option>
          <option value="Nevada"></option>
          <option value="New Hampshire"></option>
          <option value="New Jersey"></option>
          <option value="New Mexico"></option>
          <option value="New York"></option>
          <option value="North Carolina"></option>
          <option value="North Dakota"></option>
          <option value="Ohio"></option>
          <option value="Oklahoma"></option>
          <option value="Oregon"></option>
          <option value="Pennsylvania"></option>
          <option value="Rhode Island"></option>
          <option value="South Carolina"></option>
          <option value="South Dakota"></option>
          <option value="Tennessee"></option>
          <option value="Texas"></option>
          <option value="Utah"></option>
          <option value="Vermont"></option>
          <option value="Virginia"></option>
          <option value="Washington"></option>
          <option value="West Virginia"></option>
          <option value="Wisconsin"></option>
          <option value="Wyoming"></option>
        </datalist>
      </usa-combo-box>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAComboBoxElement>;

export default meta;

type Story = StoryObj<USAComboBoxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
