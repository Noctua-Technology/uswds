import "./input.element.js";

import { assert } from "chai";
import { USATextInputElement } from "./input.element.js";

describe("usa-input", () => {
  it("should submit form with default values", (done) => {
    const form = document.createElement("form");

    form.innerHTML = `
      <usa-input name="fname" value="Hello">Hello World</usa-input>
      
      <button>Submit</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = new FormData(form);

      assert.equal(value.get("fname"), "Hello");

      done();
    });

    document.body.append(form);

    form.dispatchEvent(new Event("submit"));
  });

  it("should update form value as input value changed", (done) => {
    const form = document.createElement("form");

    const input = new USATextInputElement();
    input.name = "fname";

    const nativeInput = input.shadowRoot!.querySelector("input")!;
    nativeInput.value = "FooBar";
    nativeInput.dispatchEvent(new Event("change"));

    form.append(input);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = new FormData(form);

      assert.equal(value.get("fname"), "FooBar2");

      done();
    });

    document.body.append(form);

    form.dispatchEvent(new Event("submit"));
  });
});
