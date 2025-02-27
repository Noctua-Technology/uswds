import "./collection.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USACollectionElement } from "./collection.element.js";

describe("usa-collection", () => {
  it("should be accessible", async () => {
    const collection = await fixture<USACollectionElement>(html`
      <usa-collection>Hello World</usa-collection>
    `);

    return assert.isAccessible(collection);
  });
});
