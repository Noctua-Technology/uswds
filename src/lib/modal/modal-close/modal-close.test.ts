import "./modal-close.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAModalCloseElement } from "./modal-close.element.js";

describe("usa-modal-close", () => {
  it("should be accessible", async () => {
    const modalClose = await fixture<USAModalCloseElement>(html`
      <usa-modal-close>Hello World</usa-modal-close>
    `);

    return assert.isAccessible(modalClose);
  });
});
