import "./step-indicator-step.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAStepIndicatorStepElement } from "./step-indicator-step.element.js";

describe("usa-step", () => {
  it("should be accessible", async () => {
    const stepIndicatorStep = await fixture<USAStepIndicatorStepElement>(html`
      <usa-step>Hello World</usa-step>
    `);

    return assert.isAccessible(stepIndicatorStep);
  });
});
