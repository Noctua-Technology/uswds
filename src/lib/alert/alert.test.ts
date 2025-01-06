import "./alert.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import { USA_ALERT_TYPES } from "./alert-types.js";

describe("usa-alert", () => {
  for (const alert of USA_ALERT_TYPES) {
    it(`should be accessible: ${alert}`, async () => {
      const form = await fixture(html`
        <usa-alert type=${alert}>
          <h3 slot="heading">Status</h3>

          Lorem ipsum dolor sit amet,&nbsp;
          <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
          eiusmod.
        </usa-alert>
      `);

      return assert.isAccessible(form);
    });
  }
});
