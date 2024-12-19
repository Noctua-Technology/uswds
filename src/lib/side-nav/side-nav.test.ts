import "../link/link.element.js";
import "./side-nav.element.js";
import "./side-nav-item/side-nav-item.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USASideNavElement } from "./side-nav.element.js";

describe("usa-side-nav", () => {
  it("should be accessible", async () => {
    const sideNav = await fixture<USASideNavElement>(html`
      <usa-side-nav>
        <usa-side-nav-item current>
          <usa-link href="#">Current Page</usa-link>

          <usa-side-nav-item slot="children">
            <usa-link href="#">Child</usa-link>
          </usa-side-nav-item>

          <usa-side-nav-item slot="children" current>
            <usa-link href="#">Child</usa-link>

            <usa-side-nav-item slot="children">
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>

            <usa-side-nav-item slot="children" current>
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>

            <usa-side-nav-item slot="children">
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>
          </usa-side-nav-item>

          <usa-side-nav-item slot="children">
            <usa-link href="#">Child</usa-link>
          </usa-side-nav-item>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent</usa-link>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent</usa-link>
        </usa-side-nav-item>
      </usa-side-nav>
    `);

    return assert.isAccessible(sideNav);
  });

  it("should set child padding correctly", async () => {
    const sideNav = await fixture<USASideNavElement>(html`
      <usa-side-nav>
        <usa-side-nav-item current>
          <usa-link href="#">Current Page</usa-link>

          <usa-side-nav-item slot="children">
            <usa-link href="#">Child</usa-link>
          </usa-side-nav-item>

          <usa-side-nav-item slot="children" current>
            <usa-link href="#">Child</usa-link>

            <usa-side-nav-item slot="children">
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>

            <usa-side-nav-item slot="children" current>
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>

            <usa-side-nav-item slot="children">
              <usa-link href="#">Grandchild</usa-link>
            </usa-side-nav-item>
          </usa-side-nav-item>

          <usa-side-nav-item slot="children">
            <usa-link href="#">Child</usa-link>
          </usa-side-nav-item>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent</usa-link>
        </usa-side-nav-item>

        <usa-side-nav-item>
          <usa-link href="#">Parent</usa-link>
        </usa-side-nav-item>
      </usa-side-nav>
    `);

    const items = sideNav.querySelectorAll("usa-side-nav-item");

    assert.equal(
      getComputedStyle(items[1]).getPropertyValue(
        "--usa-nav-item-padding-left"
      ),
      "2rem"
    );

    assert.equal(
      getComputedStyle(items[3]).getPropertyValue(
        "--usa-nav-item-padding-left"
      ),
      "3rem"
    );
  });
});
