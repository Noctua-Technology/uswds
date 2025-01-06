import "./modal-heading.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAModalHeadingElement } from "./modal-heading.element.js";

describe("usa-modal-heading", () => {
  it("should be accessible", async () => {
    const modalHeading = await fixture<USAModalHeadingElement>(html`
      <usa-modal-heading>Hello World</usa-modal-heading>
    `);

    return assert.isAccessible(modalHeading);
  });
});
