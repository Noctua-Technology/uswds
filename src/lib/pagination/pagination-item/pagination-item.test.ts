import "./pagination-item.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAPaginationItemElement } from "./pagination-item.element.js";

describe("usa-pagination-item", () => {
  it("should be accessible", async () => {
    const paginationItem = await fixture<USAPaginationItemElement>(html`
      <usa-pagination-item>Hello World</usa-pagination-item>
    `);

    return assert.isAccessible(paginationItem);
  });
});
