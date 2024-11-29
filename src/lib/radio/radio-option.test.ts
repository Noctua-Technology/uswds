import "./radio.element.js";
import "./radio-option.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import { USARadioOptionElement } from "./radio-option.element.js";

describe("usa-radio-option", () => {
  it("should map value to slot", async () => {
    const radio = await fixture<USARadioOptionElement>(html`
      <usa-radio>
        <usa-radio-option value="first">First</usa-radio-option>
      </usa-radio>
    `);

    const option = radio.querySelectorAll("usa-radio-option");

    assert.equal(option[0].value, option[0].slot);
  });
});
