import "./accordion.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAAccordionElement } from "./accordion.element.js";

describe("usa-accordion", () => {
  it("should be accessible", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        <div class="content">
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of
          speech, or of the press; or the right of the people peaceably to
          assemble, and to petition the Government for a redress of grievances.
        </div>
      </usa-accordion>
    `);

    return assert.isAccessible(accordion);
  });

  it("should toggle the open state when clicked", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        <div class="content">
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of
          speech, or of the press; or the right of the people peaceably to
          assemble, and to petition the Government for a redress of grievances.
        </div>
      </usa-accordion>
    `);

    const heading = accordion.querySelector("h4");
    const content = accordion.querySelector<HTMLDivElement>(".content");

    heading?.click();

    assert.isTrue(content?.checkVisibility());
  });

  it("should toggle the open state when clicked", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        <div class="content">
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of
          speech, or of the press; or the right of the people peaceably to
          assemble, and to petition the Government for a redress of grievances.
        </div>
      </usa-accordion>
    `);

    const heading = accordion.querySelector("h4");
    const content = accordion.querySelector<HTMLDivElement>(".content");

    assert.isFalse(content?.checkVisibility());

    heading?.click();

    assert.isTrue(content.checkVisibility());
  });

  it("should only allow a single accordion in a group to be open", async () => {
    const el = await fixture(html`
      <section>
        <usa-accordion name="ammendment">
          <h4 slot="heading">First Ammendment</h4>
          <div class="content">Content for First</div>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Second Ammendment</h4>
          <div class="content">Content for Second</div>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Third Ammendment</h4>
          <div class="content">Content for Third</div>
        </usa-accordion>
      </section>
    `);

    const headings = el.querySelectorAll("h4");
    const content = Array.from(el.querySelectorAll<HTMLDivElement>(".content"));

    headings[0].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [true, false, false],
    );

    headings[1].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [false, true, false],
    );

    headings[2].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [false, false, true],
    );
  });

  it("should not close accordion not in the same group", async () => {
    const el = await fixture(html`
      <section>
        <usa-accordion name="ammendment">
          <h4 slot="heading">First Ammendment</h4>
          <div class="content">Content for First</div>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Second Ammendment</h4>
          <div class="content">Content for Second</div>
        </usa-accordion>

        <usa-accordion name="different">
          <h4 slot="heading">Third Ammendment</h4>
          <div class="content">Content for Third</div>
        </usa-accordion>
      </section>
    `);

    const headings = el.querySelectorAll("h4");
    const content = Array.from(el.querySelectorAll<HTMLDivElement>(".content"));

    headings[0].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [true, false, false],
    );

    headings[1].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [false, true, false],
    );

    headings[2].click();

    assert.deepEqual(
      content.map((el) => el.checkVisibility()),
      [false, true, true],
    );
  });
});
