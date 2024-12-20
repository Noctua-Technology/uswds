import "./card-footer.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardFooterElement } from "./card-footer.element.js";

describe("usa-card-footer", () => {
  it("should be accessible", async () => {
    const cardFooter = await fixture<USACardFooterElement>(html`
      <usa-card-footer>Hello World</usa-card-footer>
    `);

    return assert.isAccessible(cardFooter);
  });
});
