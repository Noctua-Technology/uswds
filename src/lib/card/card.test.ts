import "./card.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardElement } from "./card.element.js";

describe("usa-card", () => {
  it("should be accessible", async () => {
    const card = await fixture<USACardElement>(html`
      <usa-card>Hello World</usa-card>
    `);

    return assert.isAccessible(card);
  });
});
