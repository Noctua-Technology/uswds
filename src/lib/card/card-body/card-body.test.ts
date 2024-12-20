import "./card-body.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardBodyElement } from "./card-body.element.js";

describe("usa-card-body", () => {
  it("should be accessible", async () => {
    const cardBody = await fixture<USACardBodyElement>(html`
      <usa-card-body>Hello World</usa-card-body>
    `);

    return assert.isAccessible(cardBody);
  });
});
