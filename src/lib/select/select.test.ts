import "./select.element.js";
import "./select-option.element.js";

import { fixture, html, assert } from "@open-wc/testing";

describe("usa-checkbox", () => {
  it("should be accessible", async () => {
    const el = await fixture<HTMLFormElement>(html`
      <usa-select name="example">
        <span slot="label">Hello World</span>

        <usa-select-option value="first">First</usa-select-option>
        <usa-select-option value="second">Second</usa-select-option>
        <usa-select-option value="third">Third</usa-select-option>
      </usa-select>
    `);

    return assert.isAccessible(el);
  });

  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example" value="second">
          <span slot="label">Hello World</span>

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get("example"), "second");
  });

  it("should update form value as select value changed", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example" value="second">
          <span slot="label">Hello World</span>

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const select = form.querySelector("usa-select")!;
    const nativeSelect = select.shadowRoot!.querySelector("select")!;
    nativeSelect.value = "third";
    nativeSelect.dispatchEvent(new Event("change"));

    const value = new FormData(form);

    assert.equal(value.get("example"), "third");
  });
});
