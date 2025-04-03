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
          name="state" 
          slot="input" 
          autocomplete="off" 
          detail="sfx">
          States
          <usa-icon slot="detail" icon="expand_more"></usa-icon>
        </usa-input>

        <usa-combo-box-option value="Alabama">
          <img src="./assets/flags/alabama.svg" alt="Alabama" height="20" /> Alabama
        </usa-combo-box-option>

        <usa-combo-box-option value="Alaska">
          <img src="./assets/flags/alaska.svg" alt="Alaska" height="20" /> Alaska
        </usa-combo-box-option>

        <usa-combo-box-option value="Arizona">
          <img src="./assets/flags/arizona.svg" alt="Arizona" height="20" /> Arizona
        </usa-combo-box-option>

        <usa-combo-box-option value="Arkansas">
          <img src="./assets/flags/arkansas.svg" alt="Arkansas" height="20" /> Arkansas
        </usa-combo-box-option>

        <usa-combo-box-option value="California">
          <img src="./assets/flags/california.svg" alt="California" height="20" /> California
        </usa-combo-box-option>

        <usa-combo-box-option value="Colorado">
          <img src="./assets/flags/colorado.svg" alt="Colorado" height="20" /> Colorado
        </usa-combo-box-option>

        <usa-combo-box-option value="Connecticut">
          <img src="./assets/flags/connecticut.svg" alt="Connecticut" height="20" /> Connecticut
        </usa-combo-box-option>

        <usa-combo-box-option value="Delaware">
          <img src="./assets/flags/delaware.svg" alt="Delaware" height="20" /> Delaware
        </usa-combo-box-option>

        <usa-combo-box-option value="Florida">
          <img src="./assets/flags/florida.svg" alt="Florida" height="20" /> Florida
        </usa-combo-box-option>

        <usa-combo-box-option value="Georgia">
          <img src="./assets/flags/georgia.svg" alt="Georgia" height="20" /> Georgia
        </usa-combo-box-option>

        <usa-combo-box-option value="Hawaii">
          <img src="./assets/flags/hawaii.svg" alt="Hawaii" height="20" /> Hawaii
        </usa-combo-box-option>

        <usa-combo-box-option value="Idaho">
          <img src="./assets/flags/idaho.svg" alt="Idaho" height="20" /> Idaho
        </usa-combo-box-option>

        <usa-combo-box-option value="Illinois">
          <img src="./assets/flags/illinois.svg" alt="Illinois" height="20" /> Illinois
        </usa-combo-box-option>

        <usa-combo-box-option value="Indiana">
          <img src="./assets/flags/indiana.svg" alt="Indiana" height="20" /> Indiana
        </usa-combo-box-option>

        <usa-combo-box-option value="Iowa">
          <img src="./assets/flags/iowa.svg" alt="Iowa" height="20" /> Iowa
        </usa-combo-box-option>

        <usa-combo-box-option value="Kansas">
          <img src="./assets/flags/kansas.svg" alt="Kansas" height="20" /> Kansas
        </usa-combo-box-option>

        <usa-combo-box-option value="Kentucky">
          <img src="./assets/flags/kentucky.svg" alt="Kentucky" height="20" /> Kentucky
        </usa-combo-box-option>

        <usa-combo-box-option value="Louisiana">
          <img src="./assets/flags/louisiana.svg" alt="Louisiana" height="20" /> Louisiana
        </usa-combo-box-option>

        <usa-combo-box-option value="Maine">
          <img src="./assets/flags/maine.svg" alt="Maine" height="20" /> Maine
        </usa-combo-box-option>

        <usa-combo-box-option value="Maryland">
          <img src="./assets/flags/maryland.svg" alt="Maryland" height="20" /> Maryland
        </usa-combo-box-option>

        <usa-combo-box-option value="Massachusetts">
          <img src="./assets/flags/massachusetts.svg" alt="Massachusetts" height="20" /> Massachusetts
        </usa-combo-box-option>

        <usa-combo-box-option value="Michigan">
          <img src="./assets/flags/michigan.svg" alt="Michigan" height="20" /> Michigan
        </usa-combo-box-option>

        <usa-combo-box-option value="Minnesota">
          <img src="./assets/flags/minnesota.svg" alt="Minnesota" height="20" /> Minnesota
        </usa-combo-box-option>

        <usa-combo-box-option value="Mississippi">
          <img src="./assets/flags/mississippi.svg" alt="Mississippi" height="20" /> Mississippi
        </usa-combo-box-option>

        <usa-combo-box-option value="Missouri">
          <img src="./assets/flags/missouri.svg" alt="Missouri" height="20" /> Missouri
        </usa-combo-box-option>

        <usa-combo-box-option value="Montana">
          <img src="./assets/flags/montana.svg" alt="Montana" height="20" /> Montana
        </usa-combo-box-option>

        <usa-combo-box-option value="Nebraska">
          <img src="./assets/flags/nebraska.svg" alt="Nebraska" height="20" /> Nebraska
        </usa-combo-box-option>

        <usa-combo-box-option value="Nevada">
          <img src="./assets/flags/nevada.svg" alt="Nevada" height="20" /> Nevada
        </usa-combo-box-option>

        <usa-combo-box-option value="New Hampshire">
          <img src="./assets/flags/new_hampshire.svg" alt="New Hampshire" height="20" /> New Hampshire
        </usa-combo-box-option>

        <usa-combo-box-option value="New Jersey">
          <img src="./assets/flags/new_jersey.svg" alt="New Jersey" height="20" /> New Jersey
        </usa-combo-box-option>

        <usa-combo-box-option value="New Mexico">
          <img src="./assets/flags/new_mexico.svg" alt="New Mexico" height="20" /> New Mexico
        </usa-combo-box-option>

        <usa-combo-box-option value="New York">
          <img src="./assets/flags/new_york.svg" alt="New York" height="20" /> New York
        </usa-combo-box-option>

        <usa-combo-box-option value="North Carolina">
          <img src="./assets/flags/north_carolina.svg" alt="North Carolina" height="20" /> North Carolina
        </usa-combo-box-option>

        <usa-combo-box-option value="North Dakota">
          <img src="./assets/flags/north_dakota.svg" alt="North Dakota" height="20" /> North Dakota
        </usa-combo-box-option>

        <usa-combo-box-option value="Ohio">
          <img src="./assets/flags/ohio.svg" alt="Ohio" height="20" /> Ohio
        </usa-combo-box-option>

        <usa-combo-box-option value="Oklahoma">
          <img src="./assets/flags/oklahoma.svg" alt="Oklahoma" height="20" /> Oklahoma
        </usa-combo-box-option>

        <usa-combo-box-option value="Oregon">
          <img src="./assets/flags/oregon.svg" alt="Oregon" height="20" /> Oregon
        </usa-combo-box-option>

        <usa-combo-box-option value="Pennsylvania">
          <img src="./assets/flags/pennsylvania.svg" alt="Pennsylvania" height="20" /> Pennsylvania
        </usa-combo-box-option>

        <usa-combo-box-option value="Rhode Island">
          <img src="./assets/flags/rhode_island.svg" alt="Rhode Island" height="20" /> Rhode Island
        </usa-combo-box-option>

        <usa-combo-box-option value="South Carolina">
          <img src="./assets/flags/south_carolina.svg" alt="South Carolina" height="20" /> South Carolina
        </usa-combo-box-option>

        <usa-combo-box-option value="South Dakota">
          <img src="./assets/flags/south_dakota.svg" alt="South Dakota" height="20" /> South Dakota
        </usa-combo-box-option>

        <usa-combo-box-option value="Tennessee">
          <img src="./assets/flags/tennessee.svg" alt="Tennessee" height="20" /> Tennessee
        </usa-combo-box-option>

        <usa-combo-box-option value="Texas">
          <img src="./assets/flags/texas.svg" alt="Texas" height="20" /> Texas
        </usa-combo-box-option>

        <usa-combo-box-option value="Utah">
          <img src="./assets/flags/utah.svg" alt="Utah" height="20" /> Utah
        </usa-combo-box-option>

        <usa-combo-box-option value="Vermont">
          <img src="./assets/flags/vermont.svg" alt="Vermont" height="20" /> Vermont
        </usa-combo-box-option>

        <usa-combo-box-option value="Virginia">
          <img src="./assets/flags/virginia.svg" alt="Virginia" height="20" /> Virginia
        </usa-combo-box-option>

        <usa-combo-box-option value="Washington">
          <img src="./assets/flags/washington.svg" alt="Washington" height="20" /> Washington
        </usa-combo-box-option>

        <usa-combo-box-option value="West Virginia">
          <img src="./assets/flags/west_virginia.svg" alt="West Virginia" height="20" /> West Virginia
        </usa-combo-box-option>

        <usa-combo-box-option value="Wisconsin">
          <img src="./assets/flags/wisconsin.svg" alt="Wisconsin" height="20" /> Wisconsin
        </usa-combo-box-option>
        
        <usa-combo-box-option value="Wyoming">
          <img src="./assets/flags/wyoming.svg" alt="Wyoming" height="20" /> Wyoming
        </usa-combo-box-option>
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
