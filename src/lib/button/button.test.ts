import "./button.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAButtonElement } from "./button.element.js";

describe("usa-button", () => {
  it("should be accessible", async () => {
    const button = await fixture<USAButtonElement>(html`
      <usa-button>Hello World</usa-button>
    `);

    return assert.isAccessible(button);
  });
});
