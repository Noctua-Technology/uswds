import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAComboBoxElement } from "./combo-box.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-combo-box",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<USAComboBoxElement>;

export default meta;

type Story = StoryObj<USAComboBoxElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render() {
    return html`
      <usa-combo-box placeholder="Select a state" name="state">
        <span slot="label">States</span>

        <usa-combo-box-option value="Alabama">Alabama</usa-combo-box-option>
        <usa-combo-box-option value="Alaska">Alaska</usa-combo-box-option>
        <usa-combo-box-option value="Arizona">Arizona</usa-combo-box-option>
        <usa-combo-box-option value="Arkansas">Arkansas</usa-combo-box-option>
        <usa-combo-box-option value="California">California</usa-combo-box-option>
        <usa-combo-box-option value="Colorado">Colorado</usa-combo-box-option>
        <usa-combo-box-option value="Connecticut">Connecticut</usa-combo-box-option>
        <usa-combo-box-option value="Delaware">Delaware</usa-combo-box-option>
        <usa-combo-box-option value="Florida">Florida</usa-combo-box-option>
        <usa-combo-box-option value="Georgia">Georgia</usa-combo-box-option>
        <usa-combo-box-option value="Hawaii">Hawaii</usa-combo-box-option>
        <usa-combo-box-option value="Idaho">Idaho</usa-combo-box-option>
        <usa-combo-box-option value="Illinois">Illinois</usa-combo-box-option>
        <usa-combo-box-option value="Indiana">Indiana</usa-combo-box-option>
        <usa-combo-box-option value="Iowa">Iowa</usa-combo-box-option>
        <usa-combo-box-option value="Kansas">Kansas</usa-combo-box-option>
        <usa-combo-box-option value="Kentucky">Kentucky</usa-combo-box-option>
        <usa-combo-box-option value="Louisiana">Louisiana</usa-combo-box-option>
        <usa-combo-box-option value="Maine">Maine</usa-combo-box-option>
        <usa-combo-box-option value="Maryland">Maryland</usa-combo-box-option>
        <usa-combo-box-option value="Massachusetts">Massachusetts</usa-combo-box-option>
        <usa-combo-box-option value="Michigan">Michigan</usa-combo-box-option>
        <usa-combo-box-option value="Minnesota">Minnesota</usa-combo-box-option>
        <usa-combo-box-option value="Mississippi">Mississippi</usa-combo-box-option>
        <usa-combo-box-option value="Missouri">Missouri</usa-combo-box-option>
        <usa-combo-box-option value="Montana">Montana</usa-combo-box-option>
        <usa-combo-box-option value="Nebraska">Nebraska</usa-combo-box-option>
        <usa-combo-box-option value="Nevada">Nevada</usa-combo-box-option>
        <usa-combo-box-option value="New Hampshire">New Hampshire</usa-combo-box-option>
        <usa-combo-box-option value="New Jersey">New Jersey</usa-combo-box-option>
        <usa-combo-box-option value="New Mexico">New Mexico</usa-combo-box-option>
        <usa-combo-box-option value="New York">New York</usa-combo-box-option>
        <usa-combo-box-option value="North Carolina">North Carolina</usa-combo-box-option>
        <usa-combo-box-option value="North Dakota">North Dakota</usa-combo-box-option>
        <usa-combo-box-option value="Ohio">Ohio</usa-combo-box-option>
        <usa-combo-box-option value="Oklahoma">Oklahoma</usa-combo-box-option>
        <usa-combo-box-option value="Oregon">Oregon</usa-combo-box-option>
        <usa-combo-box-option value="Pennsylvania">Pennsylvania</usa-combo-box-option>
        <usa-combo-box-option value="Rhode Island">Rhode Island</usa-combo-box-option>
        <usa-combo-box-option value="South Carolina">South Carolina</usa-combo-box-option>
        <usa-combo-box-option value="South Dakota">South Dakota</usa-combo-box-option>
        <usa-combo-box-option value="Tennessee">Tennessee</usa-combo-box-option>
        <usa-combo-box-option value="Texas">Texas</usa-combo-box-option>
        <usa-combo-box-option value="Utah">Utah</usa-combo-box-option>
        <usa-combo-box-option value="Vermont">Vermont</usa-combo-box-option>
        <usa-combo-box-option value="Virginia">Virginia</usa-combo-box-option>
        <usa-combo-box-option value="Washington">Washington</usa-combo-box-option>
        <usa-combo-box-option value="West Virginia">West Virginia</usa-combo-box-option>
        <usa-combo-box-option value="Wisconsin">Wisconsin</usa-combo-box-option>
        <usa-combo-box-option value="Wyoming">Wyoming</usa-combo-box-option>
      </usa-combo-box>
    `;
  },
};

export const WithImages: Story = {
  render() {
    return html`
      <usa-combo-box placeholder="Select a state" name="state">
        <span slot="label">States</span>

        <usa-combo-box-option value="Alabama">
          <img loading="lazy" src="./flags/alabama.svg" alt="Alabama" height="20" /> Alabama
        </usa-combo-box-option>

        <usa-combo-box-option value="Alaska">
          <img loading="lazy" src="./flags/alaska.svg" alt="Alaska" height="20" /> Alaska
        </usa-combo-box-option>

        <usa-combo-box-option value="Arizona">
          <img loading="lazy" src="./flags/arizona.svg" alt="Arizona" height="20" /> Arizona
        </usa-combo-box-option>

        <usa-combo-box-option value="Arkansas">
          <img loading="lazy" src="./flags/arkansas.svg" alt="Arkansas" height="20" /> Arkansas
        </usa-combo-box-option>

        <usa-combo-box-option value="California">
          <img loading="lazy" src="./flags/california.svg" alt="California" height="20" /> California
        </usa-combo-box-option>

        <usa-combo-box-option value="Colorado">
          <img loading="lazy" src="./flags/colorado.svg" alt="Colorado" height="20" /> Colorado
        </usa-combo-box-option>

        <usa-combo-box-option value="Connecticut">
          <img loading="lazy" src="./flags/connecticut.svg" alt="Connecticut" height="20" /> Connecticut
        </usa-combo-box-option>

        <usa-combo-box-option value="Delaware">
          <img loading="lazy" src="./flags/delaware.svg" alt="Delaware" height="20" /> Delaware
        </usa-combo-box-option>

        <usa-combo-box-option value="Florida">
          <img loading="lazy" src="./flags/florida.svg" alt="Florida" height="20" /> Florida
        </usa-combo-box-option>

        <usa-combo-box-option value="Georgia">
          <img loading="lazy" src="./flags/georgia.svg" alt="Georgia" height="20" /> Georgia
        </usa-combo-box-option>

        <usa-combo-box-option value="Hawaii">
          <img loading="lazy" src="./flags/hawaii.svg" alt="Hawaii" height="20" /> Hawaii
        </usa-combo-box-option>

        <usa-combo-box-option value="Idaho">
          <img loading="lazy" src="./flags/idaho.svg" alt="Idaho" height="20" /> Idaho
        </usa-combo-box-option>

        <usa-combo-box-option value="Illinois">
          <img loading="lazy" src="./flags/illinois.svg" alt="Illinois" height="20" /> Illinois
        </usa-combo-box-option>

        <usa-combo-box-option value="Indiana">
          <img loading="lazy" src="./flags/indiana.svg" alt="Indiana" height="20" /> Indiana
        </usa-combo-box-option>

        <usa-combo-box-option value="Iowa">
          <img loading="lazy" src="./flags/iowa.svg" alt="Iowa" height="20" /> Iowa
        </usa-combo-box-option>

        <usa-combo-box-option value="Kansas">
          <img loading="lazy" src="./flags/kansas.svg" alt="Kansas" height="20" /> Kansas
        </usa-combo-box-option>

        <usa-combo-box-option value="Kentucky">
          <img loading="lazy" src="./flags/kentucky.svg" alt="Kentucky" height="20" /> Kentucky
        </usa-combo-box-option>

        <usa-combo-box-option value="Louisiana">
          <img loading="lazy" src="./flags/louisiana.svg" alt="Louisiana" height="20" /> Louisiana
        </usa-combo-box-option>

        <usa-combo-box-option value="Maine">
          <img loading="lazy" src="./flags/maine.svg" alt="Maine" height="20" /> Maine
        </usa-combo-box-option>

        <usa-combo-box-option value="Maryland">
          <img loading="lazy" src="./flags/maryland.svg" alt="Maryland" height="20" /> Maryland
        </usa-combo-box-option>

        <usa-combo-box-option value="Massachusetts">
          <img loading="lazy" src="./flags/massachusetts.svg" alt="Massachusetts" height="20" /> Massachusetts
        </usa-combo-box-option>

        <usa-combo-box-option value="Michigan">
          <img loading="lazy" src="./flags/michigan.svg" alt="Michigan" height="20" /> Michigan
        </usa-combo-box-option>

        <usa-combo-box-option value="Minnesota">
          <img loading="lazy" src="./flags/minnesota.svg" alt="Minnesota" height="20" /> Minnesota
        </usa-combo-box-option>

        <usa-combo-box-option value="Mississippi">
          <img loading="lazy" src="./flags/mississippi.svg" alt="Mississippi" height="20" /> Mississippi
        </usa-combo-box-option>

        <usa-combo-box-option value="Missouri">
          <img loading="lazy" src="./flags/missouri.svg" alt="Missouri" height="20" /> Missouri
        </usa-combo-box-option>

        <usa-combo-box-option value="Montana">
          <img loading="lazy" src="./flags/montana.svg" alt="Montana" height="20" /> Montana
        </usa-combo-box-option>

        <usa-combo-box-option value="Nebraska">
          <img loading="lazy" src="./flags/nebraska.svg" alt="Nebraska" height="20" /> Nebraska
        </usa-combo-box-option>

        <usa-combo-box-option value="Nevada">
          <img loading="lazy" src="./flags/nevada.svg" alt="Nevada" height="20" /> Nevada
        </usa-combo-box-option>

        <usa-combo-box-option value="New Hampshire">
          <img loading="lazy" src="./flags/new_hampshire.svg" alt="New Hampshire" height="20" /> New Hampshire
        </usa-combo-box-option>

        <usa-combo-box-option value="New Jersey">
          <img loading="lazy" src="./flags/new_jersey.svg" alt="New Jersey" height="20" /> New Jersey
        </usa-combo-box-option>

        <usa-combo-box-option value="New Mexico">
          <img loading="lazy" src="./flags/new_mexico.svg" alt="New Mexico" height="20" /> New Mexico
        </usa-combo-box-option>

        <usa-combo-box-option value="New York">
          <img loading="lazy" src="./flags/new_york.svg" alt="New York" height="20" /> New York
        </usa-combo-box-option>

        <usa-combo-box-option value="North Carolina">
          <img loading="lazy" src="./flags/north_carolina.svg" alt="North Carolina" height="20" /> North Carolina
        </usa-combo-box-option>

        <usa-combo-box-option value="North Dakota">
          <img loading="lazy" src="./flags/north_dakota.svg" alt="North Dakota" height="20" /> North Dakota
        </usa-combo-box-option>

        <usa-combo-box-option value="Ohio">
          <img loading="lazy" src="./flags/ohio.svg" alt="Ohio" height="20" /> Ohio
        </usa-combo-box-option>

        <usa-combo-box-option value="Oklahoma">
          <img loading="lazy" src="./flags/oklahoma.svg" alt="Oklahoma" height="20" /> Oklahoma
        </usa-combo-box-option>

        <usa-combo-box-option value="Oregon">
          <img loading="lazy" src="./flags/oregon.svg" alt="Oregon" height="20" /> Oregon
        </usa-combo-box-option>

        <usa-combo-box-option value="Pennsylvania">
          <img loading="lazy" src="./flags/pennsylvania.svg" alt="Pennsylvania" height="20" /> Pennsylvania
        </usa-combo-box-option>

        <usa-combo-box-option value="Rhode Island">
          <img loading="lazy" src="./flags/rhode_island.svg" alt="Rhode Island" height="20" /> Rhode Island
        </usa-combo-box-option>

        <usa-combo-box-option value="South Carolina">
          <img loading="lazy" src="./flags/south_carolina.svg" alt="South Carolina" height="20" /> South Carolina
        </usa-combo-box-option>

        <usa-combo-box-option value="South Dakota">
          <img loading="lazy" src="./flags/south_dakota.svg" alt="South Dakota" height="20" /> South Dakota
        </usa-combo-box-option>

        <usa-combo-box-option value="Tennessee">
          <img loading="lazy" src="./flags/tennessee.svg" alt="Tennessee" height="20" /> Tennessee
        </usa-combo-box-option>

        <usa-combo-box-option value="Texas">
          <img loading="lazy" src="./flags/texas.svg" alt="Texas" height="20" /> Texas
        </usa-combo-box-option>

        <usa-combo-box-option value="Utah">
          <img loading="lazy" src="./flags/utah.svg" alt="Utah" height="20" /> Utah
        </usa-combo-box-option>

        <usa-combo-box-option value="Vermont">
          <img loading="lazy" src="./flags/vermont.svg" alt="Vermont" height="20" /> Vermont
        </usa-combo-box-option>

        <usa-combo-box-option value="Virginia">
          <img loading="lazy" src="./flags/virginia.svg" alt="Virginia" height="20" /> Virginia
        </usa-combo-box-option>

        <usa-combo-box-option value="Washington">
          <img loading="lazy" src="./flags/washington.svg" alt="Washington" height="20" /> Washington
        </usa-combo-box-option>

        <usa-combo-box-option value="West Virginia">
          <img loading="lazy" src="./flags/west_virginia.svg" alt="West Virginia" height="20" /> West Virginia
        </usa-combo-box-option>

        <usa-combo-box-option value="Wisconsin">
          <img loading="lazy" src="./flags/wisconsin.svg" alt="Wisconsin" height="20" /> Wisconsin
        </usa-combo-box-option>
        
        <usa-combo-box-option value="Wyoming">
          <img loading="lazy" src="./flags/wyoming.svg" alt="Wyoming" height="20" /> Wyoming
        </usa-combo-box-option>
      </usa-combo-box>
    `;
  },
};
