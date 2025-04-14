import "./breadcrumb.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USABreadcrumbElement } from "./breadcrumb.element.js";

describe("usa-breadcrumb", () => {
  it("should be accessible", async () => {
    const breadcrumb = await fixture<USABreadcrumbElement>(html`
      <usa-breadcrumb>Hello World</usa-breadcrumb>
    `);

    return assert.isAccessible(breadcrumb);
  });
});
