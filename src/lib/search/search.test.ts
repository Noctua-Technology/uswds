import "./search.element.js";
import "../input/input.element.js";
import "../button/button.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import { userEvent } from "@testing-library/user-event";
import type { USASearchElement } from "./search.element.js";

describe("usa-search", () => {
  it("should be accessible", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search name="search">Hello World</usa-search>
    `);

    return assert.isAccessible(search);
  });

  it("should have default attribute values", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search></usa-search>
    `);

    assert.equal(search.name, "search");
    assert.equal(search.placeholder, "Search");
    assert.equal(search.required, false);
    assert.equal(search.disabled, false);
    assert.equal(search.autocomplete, "off");
    assert.equal(search.value, "");
  });

  it("should update attributes when changed", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search></usa-search>
    `);

    search.name = "custom-name";
    search.placeholder = "Custom Placeholder";
    search.required = true;
    search.disabled = true;
    search.autocomplete = "on";
    search.value = "test value";

    assert.equal(search.name, "custom-name");
    assert.equal(search.placeholder, "Custom Placeholder");
    assert.equal(search.required, true);
    assert.equal(search.disabled, true);
    assert.equal(search.autocomplete, "on");
    assert.equal(search.value, "test value");
  });

  it("should handle form submission", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search></usa-search>
    `);

    let submitted = false;

    search.addEventListener("submit", (e) => {
      e.preventDefault();

      submitted = true;
    });

    const form = search.shadowRoot?.querySelector("form");
    form?.dispatchEvent(new Event("submit", { bubbles: true, composed: true }));

    assert.isTrue(submitted);
  });

  it("should update value on input change", async () => {
    const search = await fixture<USASearchElement>(html`
      <usa-search></usa-search>
    `);

    const input = search.shadowRoot?.querySelector("usa-input");
    input?.dispatchEvent(new Event("input", { bubbles: true }));

    assert.equal(search.value, "");
  });
});
