import "./file-input.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAFileInputElement } from "./file-input.element.js";

describe("usa-file-input", () => {
  it("should be accessible", async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input>Hello World</usa-file-input>
    `);

    return assert.isAccessible(fileInput);
  });
});
