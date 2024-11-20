import "./checkbox.element.js";

import { assert } from "chai";
import { USACheckboxElement } from "./checkbox.element.js";

describe("usa-input", () => {
  it("should submit form with default values", (done) => {
    const form = document.createElement("form");

    form.innerHTML = `
      <usa-checkbox name="enabled" value="test" checked>Hello World</usa-input>
      <button>Submit</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = new FormData(form);

      assert.equal(value.get("enabled"), "test");

      done();
    });

    document.body.append(form);

    form.dispatchEvent(new Event("submit"));
  });

  it("should update form value as input value changed", (done) => {
    const form = document.createElement("form");

    const input = new USACheckboxElement();
    input.name = "enabled";
    input.value = "test";

    const nativeInput = input.shadowRoot!.querySelector("input")!;
    nativeInput.checked = true;
    nativeInput.dispatchEvent(new Event("change"));

    form.append(input);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = new FormData(form);

      assert.equal(value.get("enabled"), "test");

      done();
    });

    document.body.append(form);

    form.dispatchEvent(new Event("submit"));
  });
});
