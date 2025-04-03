import "./combo-box.element.js";
import "./combo-box-option/combo-box-option.element.js";
import "../input/input.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USATextInputElement } from "../input/input.element.js";
import type { USAComboBoxElement } from "./combo-box.element.js";

describe("usa-combo-box", () => {
  let autocomplete: USAComboBoxElement;
  let input: USATextInputElement;

  beforeEach(async () => {
    autocomplete = await fixture<USAComboBoxElement>(html`
      <usa-combo-box>
        <usa-input slot="input" name="search"></usa-input>

        <usa-combo-box-option value="Apple"></usa-combo-box-option>
        <usa-combo-box-option value="Banana"></usa-combo-box-option>
        <usa-combo-box-option value="Blueberry"></usa-combo-box-option>
        <usa-combo-box-option value="Cherry"></usa-combo-box-option>
      </usa-combo-box>
    `);

    const inputElement = autocomplete.querySelector("usa-input");

    if (!inputElement) {
      throw new Error("Input element not found");
    }

    input = inputElement;
  });

  it("should filter items based on input", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.listItems();

    assert.equal(suggestions.length, 2);
    assert.equal(suggestions[0].dataset.value, "Banana");
    assert.equal(suggestions[1].dataset.value, "Blueberry");
  });

  it("should show all suggestions when input is empty", async () => {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.listItems();
    assert.equal(suggestions.length, 4);
  });

  it("should handle case-insensitive search", async () => {
    input.value = "B";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const suggestions = autocomplete.listItems();
    assert.equal(suggestions.length, 2);
    assert.equal(suggestions[0].dataset.value, "Banana");
    assert.equal(suggestions[1].dataset.value, "Blueberry");
  });

  it("should navigate suggestions with arrow keys", async () => {
    // select item from list
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Arrow down
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    assert.equal(
      autocomplete.currentItemEl?.getAttribute("data-value"),
      "Banana",
    );

    // Arrow down again
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    assert.equal(
      autocomplete.currentItemEl?.getAttribute("data-value"),
      "Blueberry",
    );
  });

  it("should select suggestion with enter key", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Navigate to first suggestion
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    // Select suggestion
    const firstSuggestion = autocomplete.listItems()[0];

    firstSuggestion?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );

    assert.equal(input.value, "Banana");
    assert.equal(autocomplete.list().innerHTML, "");
  });

  it("should focus back on the input if no other items", async () => {
    input.value = "b";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );

    // Try to go up from first suggestion
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }),
    );

    assert.equal(autocomplete.currentItemEl, null);
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

    assert.equal(
      autocomplete.currentItemEl?.getAttribute("data-value"),
      "Blueberry",
    );
  });
});
