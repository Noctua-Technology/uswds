import "./radio.element.js";
import "./radio-option.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USARadioElement } from "./radio.element.js";

describe("usa-radio", () => {
  it("should be accessible", async () => {
    const radio = await fixture<USARadioElement>(html`
      <usa-radio name="historical-figures" value="frederick-douglass" tiled>
        <usa-radio-option value="sojourner-truth">
          Sojourner Truth
        </usa-radio-option>

        <usa-radio-option value="frederick-douglass">
          Frederick Douglass
        </usa-radio-option>

        <usa-radio-option value="booker-t.-washington">
          Booker T. Washington
        </usa-radio-option>

        <usa-radio-option value="george-washington-carver">
          George Washington Carver
        </usa-radio-option>
      </usa-radio>
    `);

    return assert.isAccessible(radio);
  });

  it("should submit form with default values", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-radio name="historical-figures" value="frederick-douglass">
          <usa-radio-option value="sojourner-truth">
            Sojourner Truth
          </usa-radio-option>

          <usa-radio-option value="frederick-douglass">
            Frederick Douglass
          </usa-radio-option>

          <usa-radio-option value="booker-t.-washington">
            Booker T. Washington
          </usa-radio-option>

          <usa-radio-option value="george-washington-carver">
            George Washington Carver
          </usa-radio-option>
        </usa-radio>
      </form>
    `);

    const value = new FormData(form);

    const nativeInputs = form
      .querySelector("usa-radio")!
      .shadowRoot!.querySelectorAll("input");

    assert.equal(nativeInputs[1].checked, true);
    assert.equal(value.get("historical-figures"), "frederick-douglass");
  });

  it("should submit form with changed value", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-radio name="historical-figures" value="frederick-douglass">
          <usa-radio-option value="sojourner-truth">
            Sojourner Truth
          </usa-radio-option>

          <usa-radio-option value="frederick-douglass">
            Frederick Douglass
          </usa-radio-option>

          <usa-radio-option value="booker-t.-washington">
            Booker T. Washington
          </usa-radio-option>

          <usa-radio-option value="george-washington-carver">
            George Washington Carver
          </usa-radio-option>
        </usa-radio>
      </form>
    `);

    const nativeInputs = form
      .querySelector("usa-radio")!
      .shadowRoot!.querySelectorAll("input");

    nativeInputs[3].click();

    const value = new FormData(form);

    assert.equal(value.get("historical-figures"), "george-washington-carver");
  });
});
