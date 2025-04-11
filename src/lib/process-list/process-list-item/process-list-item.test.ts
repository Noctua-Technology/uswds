import "./process-list-item.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAProcessListItemElement } from "./process-list-item.element.js";

describe("usa-process-list-item", () => {
  it("should be accessible", async () => {
    const processListItem = await fixture<USAProcessListItemElement>(html`
      <usa-process-list-item>Hello World</usa-process-list-item>
    `);

    return assert.isAccessible(processListItem);
  });
});
