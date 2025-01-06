import "./description.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USADescriptionElement } from "./description.element.js";

describe("usa-description", () => {
  it("should be accessible", async () => {
    const description = await fixture<USADescriptionElement>(html`
      <usa-description>Hello World</usa-description>
    `);

    return assert.isAccessible(description);
  });
});
