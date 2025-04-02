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
        <usa-input
          placeholder="Select a state"
          name="search" 
          slot="input" 
          autocomplete="off" 
          detail="sfx" 
          role="combobox">
          States
          <usa-icon slot="detail" icon="expand_more"></usa-icon>
        </usa-input>

        <usa-combo-box-option value="Alabama"></usa-combo-box-option>
        <usa-combo-box-option value="Alaska"></usa-combo-box-option>
        <usa-combo-box-option value="Arizona"></usa-combo-box-option>
        <usa-combo-box-option value="Arkansas"></usa-combo-box-option>
        <usa-combo-box-option value="California"></usa-combo-box-option>
        <usa-combo-box-option value="Colorado"></usa-combo-box-option>
        <usa-combo-box-option value="Connecticut"></usa-combo-box-option>
        <usa-combo-box-option value="Delaware"></usa-combo-box-option>
        <usa-combo-box-option value="Florida"></usa-combo-box-option>
        <usa-combo-box-option value="Georgia"></usa-combo-box-option>
        <usa-combo-box-option value="Hawaii"></usa-combo-box-option>
        <usa-combo-box-option value="Idaho"></usa-combo-box-option>
        <usa-combo-box-option value="Illinois"></usa-combo-box-option>
        <usa-combo-box-option value="Indiana"></usa-combo-box-option>
        <usa-combo-box-option value="Iowa"></usa-combo-box-option>
        <usa-combo-box-option value="Kansas"></usa-combo-box-option>
        <usa-combo-box-option value="Kentucky"></usa-combo-box-option>
        <usa-combo-box-option value="Louisiana"></usa-combo-box-option>
        <usa-combo-box-option value="Maine"></usa-combo-box-option>
        <usa-combo-box-option value="Maryland"></usa-combo-box-option>
        <usa-combo-box-option value="Massachusetts"></usa-combo-box-option>
        <usa-combo-box-option value="Michigan"></usa-combo-box-option>
        <usa-combo-box-option value="Minnesota"></usa-combo-box-option>
        <usa-combo-box-option value="Mississippi"></usa-combo-box-option>
        <usa-combo-box-option value="Missouri"></usa-combo-box-option>
        <usa-combo-box-option value="Montana"></usa-combo-box-option>
        <usa-combo-box-option value="Nebraska"></usa-combo-box-option>
        <usa-combo-box-option value="Nevada"></usa-combo-box-option>
        <usa-combo-box-option value="New Hampshire"></usa-combo-box-option>
        <usa-combo-box-option value="New Jersey"></usa-combo-box-option>
        <usa-combo-box-option value="New Mexico"></usa-combo-box-option>
        <usa-combo-box-option value="New York"></usa-combo-box-option>
        <usa-combo-box-option value="North Carolina"></usa-combo-box-option>
        <usa-combo-box-option value="North Dakota"></usa-combo-box-option>
        <usa-combo-box-option value="Ohio"></usa-combo-box-option>
        <usa-combo-box-option value="Oklahoma"></usa-combo-box-option>
        <usa-combo-box-option value="Oregon"></usa-combo-box-option>
        <usa-combo-box-option value="Pennsylvania"></usa-combo-box-option>
        <usa-combo-box-option value="Rhode Island"></usa-combo-box-option>
        <usa-combo-box-option value="South Carolina"></usa-combo-box-option>
        <usa-combo-box-option value="South Dakota"></usa-combo-box-option>
        <usa-combo-box-option value="Tennessee"></usa-combo-box-option>
        <usa-combo-box-option value="Texas"></usa-combo-box-option>
        <usa-combo-box-option value="Utah"></usa-combo-box-option>
        <usa-combo-box-option value="Vermont"></usa-combo-box-option>
        <usa-combo-box-option value="Virginia"></usa-combo-box-option>
        <usa-combo-box-option value="Washington"></usa-combo-box-option>
        <usa-combo-box-option value="West Virginia"></usa-combo-box-option>
        <usa-combo-box-option value="Wisconsin"></usa-combo-box-option>
        <usa-combo-box-option value="Wyoming"></usa-combo-box-option>
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
