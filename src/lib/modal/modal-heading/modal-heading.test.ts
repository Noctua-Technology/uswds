import "./modal-heading.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAModalHeadingElement } from "./modal-heading.element.js";

describe("usa-modal-heading", () => {
  it("should be accessible", async () => {
    const modalHeading = await fixture<USAModalHeadingElement>(html`
      <usa-modal-heading>Hello World</usa-modal-heading>
    `);

    return assert.isAccessible(modalHeading);
  });
});
