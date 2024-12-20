import "./card-img.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USACardImgElement } from "./card-img.element.js";

describe("usa-card-img", () => {
  it("should be accessible", async () => {
    const cardImg = await fixture<USACardImgElement>(html`
      <usa-card-img>Hello World</usa-card-img>
    `);

    return assert.isAccessible(cardImg);
  });
});
