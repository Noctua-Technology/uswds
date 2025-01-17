import "./textarea.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USATextareaElement } from "./textarea.element.js";

describe("usa-textarea", () => {
  it("should be accessible", async () => {
    const textarea = await fixture<USATextareaElement>(html`
      <usa-textarea>Hello World</usa-textarea>
    `);

    return assert.isAccessible(textarea);
  });
});
