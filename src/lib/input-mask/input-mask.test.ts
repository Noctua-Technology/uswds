import "./input-mask.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import { format } from "./format.js";
import { USAInputMaskElement } from "./input-mask.element.js";

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

describe("usa-input-mask", () => {
  it("should format default value", async () => {
    const el = await fixture<USAInputMaskElement>(html`
      <usa-input-mask mask="(999) 999-9999">
        <input name="phone" value="1234567890" mask />
      </usa-input-mask>
    `);

    const input = el.querySelector("input")!;

    assert.equal(input.value, "(123) 456-7890");
    assert.equal(input.getAttribute("value"), "1234567890");
  });

  it("should update value when on input event", async () => {
    const el = await fixture<USAInputMaskElement>(html`
      <usa-input-mask mask="(999) 999-9999">
        <input name="phone" mask />
      </usa-input-mask>
    `);

    const input = el.querySelector("input")!;

    input.value = "8888888888";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    assert.equal(input.value, "(888) 888-8888");
  });
});
