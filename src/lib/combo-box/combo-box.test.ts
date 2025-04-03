import "./combo-box.element.js";
import "./combo-box-option/combo-box-option.element.js";
import "../input/input.element.js";

import { assert, fixture, html } from "@open-wc/testing";
import { userEvent } from "@testing-library/user-event";

import type { USAComboBoxElement } from "./combo-box.element.js";

describe("usa-combo-box", () => {
  let autocomplete: USAComboBoxElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    autocomplete = await fixture<USAComboBoxElement>(html`
      <usa-combo-box name="search" placeholder="Select a fruit">
        <span slot="label">Fruits</span>

        <usa-combo-box-option value="Apple">Apple</usa-combo-box-option>
        <usa-combo-box-option value="Banana">Banana</usa-combo-box-option>
        <usa-combo-box-option value="Blueberry">Blueberry</usa-combo-box-option>
        <usa-combo-box-option value="Cherry">Cherry</usa-combo-box-option>
      </usa-combo-box>
    `);

    input = autocomplete.input();
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

  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-combo-box name="search" value="Apple" placeholder="Select a fruit">
          <span slot="label">Fruits</span>

          <usa-combo-box-option value="Apple">Apple</usa-combo-box-option>
          <usa-combo-box-option value="Banana">Banana</usa-combo-box-option>
          <usa-combo-box-option value="Blueberry">Blueberry</usa-combo-box-option>
          <usa-combo-box-option value="Cherry">Cherry</usa-combo-box-option>
        </usa-combo-box>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);
    assert.equal(value.get("search"), "Apple");
  });

  it("should update form value when an option is selected", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-combo-box name="search" placeholder="Select a fruit">
          <span slot="label">Fruits</span>

          <usa-combo-box-option value="Apple">Apple</usa-combo-box-option>
          <usa-combo-box-option value="Banana">Banana</usa-combo-box-option>
          <usa-combo-box-option value="Blueberry">Blueberry</usa-combo-box-option>
          <usa-combo-box-option value="Cherry">Cherry</usa-combo-box-option>
        </usa-combo-box>

        <button>Submit</button>
      </form>
    `);

    const comboBox = form.querySelector("usa-combo-box");

    if (!comboBox) {
      throw new Error("Combo box not found");
    }

    const input = comboBox.shadowRoot?.querySelector("input");

    if (!input) {
      throw new Error("input not found");
    }

    // Type to show suggestions
    input.value = "Ban";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Select the first suggestion
    const suggestions = comboBox.listItems();

    suggestions[0]
      .querySelector("slot")
      ?.assignedElements()[0]
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const value = new FormData(form);
    assert.equal(value.get("search"), "Banana");
  });

  // it("should not submit when required and no value is selected", async () => {
  //   const form = await fixture<HTMLFormElement>(html`
  //     <form>
  //       <usa-combo-box name="search" required placeholder="Select a fruit">
  //         <span slot="label">Fruits</span>

  //         <usa-combo-box-option value="Apple">Apple</usa-combo-box-option>
  //         <usa-combo-box-option value="Banana">Banana</usa-combo-box-option>
  //         <usa-combo-box-option value="Blueberry">Blueberry</usa-combo-box-option>
  //         <usa-combo-box-option value="Cherry">Cherry</usa-combo-box-option>
  //       </usa-combo-box>

  //       <button>Submit</button>
  //     </form>
  //   `);

  //   assert.equal(form.checkValidity(), false);
  // });

  // it("should reset to default value when form is reset", async () => {
  //   const form = await fixture<HTMLFormElement>(html`
  //     <form>
  //       <usa-combo-box name="search" value="Apple" placeholder="Select a fruit">
  //         <span slot="label">Fruits</span>

  //         <usa-combo-box-option value="Apple">Apple</usa-combo-box-option>
  //         <usa-combo-box-option value="Banana">Banana</usa-combo-box-option>
  //         <usa-combo-box-option value="Blueberry">Blueberry</usa-combo-box-option>
  //         <usa-combo-box-option value="Cherry">Cherry</usa-combo-box-option>
  //       </usa-combo-box>

  //       <button type="submit">Submit</button>
  //       <button type="reset">Reset</button>
  //     </form>
  //   `);

  //   const comboBox = form.querySelector("usa-combo-box");
  //   if (comboBox) {
  //     // Change the value
  //     comboBox.value = "Banana";
  //     comboBox.dispatchEvent(new Event("input", { bubbles: true }));

  //     // Reset the form
  //     form.reset();

  //     // Check that the value was reset
  //     assert.equal(comboBox.value, "Apple");
  //   }
  // });
});
