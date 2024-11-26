import "./button.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { BUTTON_VARIANTS, USAButtonElement } from "./button.element.js";

describe("usa-button", () => {
  for (let variant of BUTTON_VARIANTS) {
    it("should be accessible", async () => {
      const button = await fixture<USAButtonElement>(html`
        <usa-button variant=${variant}>Hello World</usa-button>
      `);

      return assert.isAccessible(button);
    });
  }
});
