import "./tag.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USATagElement } from "./tag.element.js";

describe("usa-tag", () => {
  it("should be accessible", async () => {
    const tag = await fixture<USATagElement>(html`
      <usa-tag>Hello World</usa-tag>
    `);

    return assert.equal(true, false);
  });
});
