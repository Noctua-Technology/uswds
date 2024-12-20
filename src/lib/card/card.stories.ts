import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { USACardElement } from "./card.element.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "usa-card",
  tags: ["autodocs"],
  render() {
    return html`
      <usa-card-group>
        <usa-card>
          <usa-card-header>Card</usa-card-header>

          <usa-card-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            earum tenetur quo cupiditate, eaque qui officia recusandae.
          </usa-card-body>

          <usa-card-footer>
            <usa-button>Visit Florida Keys</usa-button>
          </usa-card-footer>
        </usa-card>

        <usa-card>
          <usa-card-img>
            <img
              src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
              alt="A placeholder image"
            />
          </usa-card-img>

          <usa-card-header>Card with media</usa-card-header>

          <usa-card-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            earum tenetur quo cupiditate, eaque qui officia recusandae.
          </usa-card-body>

          <usa-card-footer>
            <usa-button>Visit Florida Keys</usa-button>
          </usa-card-footer>
        </usa-card>

        <usa-card>
          <usa-card-header>Media with heaer first</usa-card-header>

          <usa-card-img>
            <img
              src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
              alt="A placeholder image"
            />
          </usa-card-img>

          <usa-card-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            possimus similique nemo odit doloremque laudantium?
          </usa-card-body>

          <usa-card-footer>
            <usa-button>Visit Florida Keys</usa-button>
          </usa-card-footer>
        </usa-card>

        <usa-card>
          <usa-card-img variant="inset">
            <img
              src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
              alt="A placeholder image"
            />
          </usa-card-img>

          <usa-card-header>Inset media</usa-card-header>

          <usa-card-body>
            Etiam vitae sodales metus. Fusce id orci dignissim, efficitur risus
            eget, tempus odio. Donec lectus ante, auctor eget cursus sed,
            convallis quis magna. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Mauris mattis tellus
            bibendum aliquet malesuada.
          </usa-card-body>

          <usa-card-footer>
            <usa-button>Visit Florida Keys</usa-button>
          </usa-card-footer>
        </usa-card>
      </usa-card-group>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USACardElement>;

export default meta;

type Story = StoryObj<USACardElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
