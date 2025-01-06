import "./input.element.js";

import { fireEvent } from "@noctuatech-uswds/testing";
import { assert, fixture, html } from "@open-wc/testing";

describe("usa-input", () => {
  it("should be accessible", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <usa-input name="fname" value="Foo">Hello World</usa-input>
    `);

    return assert.isAccessible(form);
  });

  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname" value="Foo">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get("fname"), "Foo");
  });

  it("should update form value as input value changed", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    const input = form.querySelector("usa-input");
    const nativeInput = input?.shadowRoot?.querySelector("input");

    if (nativeInput) {
      nativeInput.value = "Bar";

      await fireEvent.input(nativeInput, { bubbles: true });
    }

    const value = new FormData(form);

    assert.equal(value.get("fname"), "Bar");
  });
});
