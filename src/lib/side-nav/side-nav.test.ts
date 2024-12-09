import "./side-nav.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USASideNavElement } from "./side-nav.element.js";

describe("usa-side-nav", () => {
  it("should be accessible", async () => {
    const sideNav = await fixture<USASideNavElement>(html`
      <usa-side-nav>Hello World</usa-side-nav>
    `);

    return assert.isAccessible(sideNav);
  });
});
