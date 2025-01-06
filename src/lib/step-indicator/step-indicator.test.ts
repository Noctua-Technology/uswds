import "./step-indicator.element.js";
import "./step/step.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAStepIndicatorElement } from "./step-indicator.element.js";

describe("usa-step-indicator", () => {
  it("should be accessible", async () => {
    const stepIndicator = await fixture<USAStepIndicatorElement>(html`
      <usa-step-indicator>
        <usa-step state="complete" counter="on">Personal information</usa-step>
        <usa-step state="complete" counter="on">Household status</usa-step>
        <usa-step state="current" counter="on">Supporting documents</usa-step>
        <usa-step counter="on">Signature</usa-step>
        <usa-step counter="on">Review and submit</usa-step>
      </usa-step-indicator>
    `);

    return assert.isAccessible(stepIndicator);
  });
});
