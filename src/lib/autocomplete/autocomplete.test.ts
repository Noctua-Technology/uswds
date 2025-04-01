import "./autocomplete.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAAutocompleteElement } from "./autocomplete.element.js";

describe("usa-autocomplete", () => {
  it("should be accessible", async () => {
    const autocomplete = await fixture<USAAutocompleteElement>(html`
      <usa-autocomplete>Hello World</usa-autocomplete>
    `);

    return assert.isAccessible(autocomplete);
  });
});
