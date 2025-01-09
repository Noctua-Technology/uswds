import "./checkbox.element.js";

import { assert, fixture, html } from "@open-wc/testing";

describe("usa-checkbox", () => {
  it("should be accessible", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <usa-checkbox name="fname" value="Foo">Hello World</usa-checkbox>
    `);

    return assert.isAccessible(form);
  });

  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-checkbox name="enabled" value="test" checked>
          Hello World
        </usa-checkbox>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get("enabled"), "test");
  });

  it("should update form value as input value changed", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-checkbox name="enabled" value="test">Hello World</usa-checkbox>

        <button>Submit</button>
      </form>
    `);

    const checkbox = form.querySelector("usa-checkbox");
    const nativeInput = checkbox?.shadowRoot?.querySelector("input");

    if (nativeInput) {
      nativeInput.click();
    }

    const value = new FormData(form);

    assert.equal(value.get("enabled"), "test");
  });

  it("should not submit when not valid", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-checkbox name="enabled" value="test" required>
          Hello World
        </usa-checkbox>

        <button>Submit</button>
      </form>
    `);

    assert.equal(form.checkValidity(), false);
  });
});
