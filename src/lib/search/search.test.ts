import "./search.element.js";
import "../input/input.element.js";
import "../button/button.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USASearchElement } from "./search.element.js";

describe("usa-search", () => {
  it("should be accessible", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search name="search">Hello World</usa-search>
    `);

    console.log(search.shadowRoot?.querySelector("usa-input")?.constructor);

    return assert.isAccessible(search);
  });
});
