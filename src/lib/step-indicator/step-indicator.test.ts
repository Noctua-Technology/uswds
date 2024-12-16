import "./step-indicator.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAStepIndicatorElement } from "./step-indicator.element.js";

describe("usa-step-indicator", () => {
  it("should be accessible", async () => {
    const stepIndicator = await fixture<USAStepIndicatorElement>(html`
      <usa-step-indicator>Hello World</usa-step-indicator>
    `);

    return assert.isAccessible(stepIndicator);
  });
});
