import "./collection-item.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USACollectionItemElement } from "./collection-item.element.js";

describe("usa-collection-item", () => {
  it("should be accessible", async () => {
    const collectionItem = await fixture<USACollectionItemElement>(html`
      <usa-collection-item>Hello World</usa-collection-item>
    `);

    return assert.isAccessible(collectionItem);
  });
});
