import "./card-header.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardHeaderElement } from "./card-header.element.js";

describe("usa-card-header", () => {
  it("should be accessible", async () => {
    const cardHeader = await fixture<USACardHeaderElement>(html`
      <usa-card-header>Hello World</usa-card-header>
    `);

    return assert.isAccessible(cardHeader);
  });
});
