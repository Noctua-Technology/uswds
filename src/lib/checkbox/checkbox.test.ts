import "./checkbox.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { fireEvent } from "@noctuatech-uswds/testing";

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

    await fireEvent.click(form.querySelector("button")!);

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
