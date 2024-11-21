import "./input-mask.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import {
  USAInputMaskElement,
  InputMaskChangeEvent,
  format,
} from "./input-mask.element";

describe("format", () => {
  it("should retrn the correct raw value", () => {
    assert.deepEqual(format("(123) 456 7890", "(***) ***-****"), {
      raw: "1234567890",
      formatted: "(123) 456-7890",
    });
  });

  it("should return a formatted phone number (***) ***-****", () => {
    assert.deepEqual(format("1234567890", "(***) ***-****"), {
      raw: "1234567890",
      formatted: "(123) 456-7890",
    });
  });

  it("should return a formatted phone number ***-***-****", () => {
    assert.deepEqual(format("1234567890", "***-***-****"), {
      raw: "1234567890",
      formatted: "123-456-7890",
    });
  });

  it("should only allow numbers", () => {
    assert.deepEqual(format("304213abcd", "999-999-9999"), {
      raw: "304213abcd",
      formatted: "304-213-",
    });
  });

  it("should only allow a mix of letters and numbers", () => {
    assert.deepEqual(format("C94749", "A-99999"), {
      raw: "C94749",
      formatted: "C-94749",
    });
  });
});

describe("InputMaskElement", () => {
  it("should format default value", async () => {
    const el = await fixture<USAInputMaskElement>(html`
      <usa-input-mask mask="(999) 999-9999">
        <input name="phone" value="1234567890" />
      </usa-input-mask>
    `);

    const input = el.querySelector("input")!;

    assert.equal(input.value, "(123) 456-7890");
    assert.equal(input.getAttribute("value"), "1234567890");
  });

  it("should update value when on input event", async () => {
    const el = await fixture<USAInputMaskElement>(html`
      <usa-input-mask mask="(999) 999-9999">
        <input name="phone" />
      </usa-input-mask>
    `);

    const input = el.querySelector("input") as HTMLInputElement;

    input.value = "8888888888";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    assert.equal(input.value, "(888) 888-8888");
    assert.equal(input.getAttribute("value"), "8888888888");
  });

  it("should dispatch custom change event after formatting", async () => {
    const el = await fixture<USAInputMaskElement>(html`
      <usa-input-mask mask="(999) 999-9999">
        <input name="phone" />
      </usa-input-mask>
    `);

    const input = el.querySelector("input") as HTMLInputElement;
    input.value = "8888888888";

    return new Promise((resolve) => {
      el.addEventListener("inputmaskchange", (e) => {
        const evt = e as InputMaskChangeEvent;

        assert.equal(evt.value, "(888) 888-8888");

        resolve();
      });

      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });
});
