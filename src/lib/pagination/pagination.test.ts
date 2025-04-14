import "./pagination.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAPaginationElement } from "./pagination.element.js";

describe("usa-pagination", () => {
  it("should be accessible", async () => {
    const pagination = await fixture<USAPaginationElement>(html`
      <usa-pagination>Hello World</usa-pagination>
    `);

    return assert.isAccessible(pagination);
  });
});
