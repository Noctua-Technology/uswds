import "./summary-box.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USASummaryBoxElement } from "./summary-box.element.js";

describe("usa-summary-box", () => {
  it("should be accessible", async () => {
    const summaryBox = await fixture<USASummaryBoxElement>(html`
      <usa-summary-box>Hello World</usa-summary-box>
    `);

    return assert.isAccessible(summaryBox);
  });
});
