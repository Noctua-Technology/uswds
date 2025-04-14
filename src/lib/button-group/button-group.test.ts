import "./button-group.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAButtonGroupElement } from "./button-group.element.js";

describe("usa-button-group", () => {
  it("should be accessible", async () => {
    const buttonGroup = await fixture<USAButtonGroupElement>(html`
      <usa-button-group>Hello World</usa-button-group>
    `);

    return assert.isAccessible(buttonGroup);
  });
});
