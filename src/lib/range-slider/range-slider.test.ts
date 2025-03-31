import "./range-slider.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USARangeSliderElement } from "./range-slider.element.js";

describe("usa-range-slider", () => {
  it("should be accessible", async () => {
    const rangeSlider = await fixture<USARangeSliderElement>(html`
      <usa-range-slider name="slider" value="0">Hello World</usa-range-slider>
    `);

    return assert.isAccessible(rangeSlider);
  });
});
