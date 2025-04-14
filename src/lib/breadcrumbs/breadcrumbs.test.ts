import "./breadcrumbs.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USABreadcrumbsElement } from "./breadcrumbs.element.js";

describe("usa-breadcrumbs", () => {
  it("should be accessible", async () => {
    const breadcrumbs = await fixture<USABreadcrumbsElement>(html`
      <usa-breadcrumbs>Hello World</usa-breadcrumbs>
    `);

    return assert.isAccessible(breadcrumbs);
  });
});
