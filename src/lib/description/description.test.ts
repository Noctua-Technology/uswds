import "./description.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USADescriptionElement } from "./description.element.js";

describe("usa-description", () => {
  it("should be accessible", async () => {
    const description = await fixture<USADescriptionElement>(html`
      <usa-description>Hello World</usa-description>
    `);

    return assert.isAccessible(description);
  });
});
