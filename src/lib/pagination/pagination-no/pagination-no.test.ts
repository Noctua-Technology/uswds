import "./pagination-no.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAPaginationNoElement } from "./pagination-no.element.js";

describe("usa-pagination-no", () => {
  it("should be accessible", async () => {
    const paginationNo = await fixture<USAPaginationNoElement>(html`
      <usa-pagination-no>Hello World</usa-pagination-no>
    `);

    return assert.isAccessible(paginationNo);
  });
});
