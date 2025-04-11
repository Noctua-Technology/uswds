import "./process-list.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAProcessListElement } from "./process-list.element.js";

describe("usa-process-list", () => {
  it("should be accessible", async () => {
    const processList = await fixture<USAProcessListElement>(html`
      <usa-process-list>Hello World</usa-process-list>
    `);

    return assert.isAccessible(processList);
  });
});
