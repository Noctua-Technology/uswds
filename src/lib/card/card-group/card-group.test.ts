import "./card-group.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardGroupElement } from "./card-group.element.js";

describe("usa-card-group", () => {
  it("should be accessible", async () => {
    const cardGroup = await fixture<USACardGroupElement>(html`
      <usa-card-group>Hello World</usa-card-group>
    `);

    return assert.isAccessible(cardGroup);
  });
});
