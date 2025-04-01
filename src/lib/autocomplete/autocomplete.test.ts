import "./autocomplete.element.js";
import "../input/input.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USATextInputElement } from "../input/input.element.js";
import type { USAAutocompleteElement } from "./autocomplete.element.js";

describe("usa-autocomplete", () => {
  let autocomplete: USAAutocompleteElement;
  let input: USATextInputElement;

  beforeEach(async () => {
    autocomplete = await fixture<USAAutocompleteElement>(html`
      <usa-autocomplete>
        <usa-input slot="input" name="search"></usa-input>
      </usa-autocomplete>
    `);

    const inputElement = autocomplete.querySelector("usa-input");

    if (!inputElement) {
      throw new Error("Input element not found");
    }

    input = inputElement;
    autocomplete.items = ["Apple", "Banana", "Blueberry", "Cherry"];
  });

  it("should filter items based on input", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.list().querySelectorAll("li");
    assert.equal(suggestions.length, 2);
    assert.equal(suggestions[0].textContent, "Banana");
    assert.equal(suggestions[1].textContent, "Blueberry");
  });

  it("should show no suggestions when input is empty", async () => {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.list().querySelectorAll("li");
    assert.equal(suggestions.length, 0);
  });

  it("should handle case-insensitive search", async () => {
    input.value = "B";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.list().querySelectorAll("li");
    assert.equal(suggestions.length, 2);
    assert.equal(suggestions[0].textContent, "Banana");
    assert.equal(suggestions[1].textContent, "Blueberry");
  });

  it("should navigate suggestions with arrow keys", async () => {
    // select item from list
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Arrow down
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    assert.equal(autocomplete.currentItem?.textContent, "Banana");

    // Arrow down again
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    assert.equal(autocomplete.currentItem?.textContent, "Blueberry");
  });

  it("should select suggestion with enter key", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Navigate to first suggestion
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    // Select suggestion
    const firstSuggestion = autocomplete.list().querySelector("li");

    firstSuggestion?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );

    assert.equal(input.value, "Banana");
    assert.equal(autocomplete.list().innerHTML, "");
  });

  it("should clear suggestions with escape key", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Clear suggestions
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );

    assert.equal(autocomplete.list().innerHTML, "");
    assert.equal(autocomplete.currentItem, null);
  });

  it("should not go above first suggestion with arrow up", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    // Try to go up from first suggestion
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }),
    );

    assert.equal(autocomplete.currentItem?.textContent, "Banana");
  });

  it("should not go below last suggestion with arrow down", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Navigate to last suggestion
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    assert.equal(autocomplete.currentItem?.textContent, "Blueberry");
  });
});
