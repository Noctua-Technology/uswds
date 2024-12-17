import "./modal.element.js";
import "./modal-heading/modal-heading.element.js";
import "./modal-close/modal-close.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAModalElement } from "./modal.element.js";

describe("usa-modal", () => {
  it("should be accessible", async () => {
    const modal = await fixture<USAModalElement>(html`
      <usa-modal open>
        <usa-modal-close></usa-modal-close>

        <usa-modal-heading>
          Are you sure you want to continue?
        </usa-modal-heading>

        <p>This is some other example of content</p>
      </usa-modal>
    `);

    return assert.isAccessible(modal);
  });
});
