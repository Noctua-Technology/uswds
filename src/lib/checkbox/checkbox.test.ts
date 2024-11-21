import "./checkbox.element.js";

import { fixture, html, assert } from "@open-wc/testing";

describe("usa-checkbox", () => {
  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-checkbox name="enabled" value="test" checked>
          Hello World
        </usa-checkbox>

        <button>Submit</button>
      </form>
    `);

    return new Promise((resolve) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = new FormData(form);

        assert.equal(value.get("enabled"), "test");

        resolve();
      });

      form.dispatchEvent(new Event("submit"));
    });
  });

  it("should update form value as input value changed", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-checkbox name="enabled" value="test">Hello World</usa-checkbox>

        <button>Submit</button>
      </form>
    `);

    const checkbox = form.querySelector("usa-checkbox")!;
    const nativeInput = checkbox.shadowRoot!.querySelector("input")!;
    nativeInput.checked = true;
    nativeInput.dispatchEvent(new Event("change"));

    return new Promise((resolve) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = new FormData(form);

        assert.equal(value.get("enabled"), "test");

        resolve();
      });

      form.dispatchEvent(new Event("submit"));
    });
  });
});
