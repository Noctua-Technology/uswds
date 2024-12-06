import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USAAccordionElement } from "./accordion.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-accordion",
  tags: ["autodocs"],
  render(args) {
    return html`
      <usa-accordion id="first" name="ammendment">
        <usa-summary-heading slot="heading">
          First Ammendment
        </usa-summary-heading>

        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </usa-accordion>

      <usa-accordion id="second" name="ammendment">
        <h4 slot="heading">Second Ammendment</h4>

        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </usa-accordion>

      <usa-accordion id="third" name="ammendment">
        <h4 slot="heading">Third Ammendment</h4>

        No Soldier shall, in time of peace be quartered in any house, without
        the consent of the Owner, nor in time of war, but in a manner to be
        prescribed by law.
      </usa-accordion>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAAccordionElement>;

export default meta;

type Story = StoryObj<USAAccordionElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
