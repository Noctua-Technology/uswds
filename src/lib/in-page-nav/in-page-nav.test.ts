import "./in-page-nav.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAInPageNavElement } from "./in-page-nav.element.js";

describe("usa-in-page-nav", () => {
  it("should be accessible", async () => {
    const inPageNav = await fixture<USAInPageNavElement>(html`
      <usa-in-page-nav>Hello World</usa-in-page-nav>
    `);

    return assert.isAccessible(inPageNav);
  });
});
