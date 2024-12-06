import "./accordion.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAAccordionElement } from "./accordion.element.js";

describe("usa-accordion", () => {
  it("should be accessible", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion>Hello World</usa-accordion>
    `);

    return assert.isAccessible(accordion);
  });
});
