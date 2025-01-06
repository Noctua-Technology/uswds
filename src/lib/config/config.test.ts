import "./config.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAConfigElement } from "./config.element.js";

describe("usa-config", () => {
  it("should be accessible", async () => {
    const config = await fixture<USAConfigElement>(html`
      <usa-config>Hello World</usa-config>
    `);

    return assert.isAccessible(config);
  });
});
