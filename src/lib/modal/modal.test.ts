import "./modal.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAModalElement } from "./modal.element.js";

describe("usa-modal", () => {
  it("should be accessible", async () => {
    const modal = await fixture<USAModalElement>(html`
      <usa-modal>Hello World</usa-modal>
    `);

    return assert.isAccessible(modal);
  });
});
