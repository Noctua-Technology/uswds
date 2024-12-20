import "./card.element.js";
import "./card-body/card-body.element.js";
import "./card-footer/card-footer.element.js";
import "./card-group/card-group.element.js";
import "./card-header/card-header.element.js";
import "./card-media/card-media.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardElement } from "./card.element.js";

describe("usa-card", () => {
  it("should be accessible", async () => {
    const card = await fixture<USACardElement>(html`
      <usa-card-group>
        <usa-card>
          <usa-card-media>
            <img src="/img/built-to-grow--alt.jpg" alt="A placeholder image" />
          </usa-card-media>

          <usa-card-header>Card with media</usa-card-header>

          <usa-card-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            earum tenetur quo cupiditate, eaque qui officia recusandae.
          </usa-card-body>

          <usa-card-footer>
            <usa-button>Visit Florida Keys</usa-button>
          </usa-card-footer>
        </usa-card>
      </usa-card-group>
    `);

    return assert.isAccessible(card);
  });
});
