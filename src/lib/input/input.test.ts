import "./input.element.js";

import { fixture, html, assert } from "@open-wc/testing";

describe("usa-input", () => {
  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname" value="Foo">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    return new Promise((resolve) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = new FormData(form);

        assert.equal(value.get("fname"), "Foo");

        resolve();
      });

      form.dispatchEvent(new Event("submit"));
    });
  });

  it("should update form value as input value changed", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    const checkbox = form.querySelector("usa-input")!;
    const nativeInput = checkbox.shadowRoot!.querySelector("input")!;
    nativeInput.value = "Bar";
    nativeInput.dispatchEvent(new Event("change"));

    return new Promise((resolve) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = new FormData(form);

        assert.equal(value.get("fname"), "Bar");

        resolve();
      });

      form.dispatchEvent(new Event("submit"));
    });
  });
});
