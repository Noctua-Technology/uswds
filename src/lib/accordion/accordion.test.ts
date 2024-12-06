import "./accordion.element.js";

import { fixture, html, assert } from "@open-wc/testing";

import { USAAccordionElement } from "./accordion.element.js";

describe("usa-accordion", () => {
  it("should be accessible", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </usa-accordion>
    `);

    return assert.isAccessible(accordion);
  });

  it("should toggle the open state when clicked", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </usa-accordion>
    `);

    const details = accordion.shadowRoot!.querySelector("details")!;
    const summary = details.querySelector("summary")!;

    summary.click();

    assert.isTrue(details.open);
  });

  it("should toggle the open state when clicked", async () => {
    const accordion = await fixture<USAAccordionElement>(html`
      <usa-accordion id="first" name="ammendment">
        <h4 slot="heading">First Ammendment</h4>

        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </usa-accordion>
    `);

    const details = accordion.shadowRoot!.querySelector("details")!;
    const summary = details.querySelector("summary")!;

    assert.isFalse(details.open);

    summary.click();

    assert.isTrue(details.open);
  });

  it("should only allow a single accordion in a group to be open", async () => {
    const el = await fixture(html`
      <section>
        <usa-accordion name="ammendment">
          <h4 slot="heading">First Ammendment</h4>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Second Ammendment</h4>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Third Ammendment</h4>
        </usa-accordion>
      </section>
    `);

    const accordion = Array.from(el.querySelectorAll("usa-accordion"));

    const details = accordion.map(
      (el) => el.shadowRoot!.querySelector("details")!
    );

    const summaries = details.map((el) => el.querySelector("summary")!);

    summaries[0].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [true, false, false]
    );

    summaries[1].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [false, true, false]
    );

    summaries[2].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [false, false, true]
    );
  });

  it("should not close accordion not in the same group", async () => {
    const el = await fixture(html`
      <section>
        <usa-accordion name="ammendment">
          <h4 slot="heading">First Ammendment</h4>
        </usa-accordion>

        <usa-accordion name="ammendment">
          <h4 slot="heading">Second Ammendment</h4>
        </usa-accordion>

        <usa-accordion name="anotherone">
          <h4 slot="heading">Third Ammendment</h4>
        </usa-accordion>
      </section>
    `);

    const accordion = Array.from(el.querySelectorAll("usa-accordion"));

    const details = accordion.map(
      (el) => el.shadowRoot!.querySelector("details")!
    );

    const summaries = details.map((el) => el.querySelector("summary")!);

    summaries[0].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [true, false, false]
    );

    summaries[1].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [false, true, false]
    );

    summaries[2].click();

    assert.deepEqual(
      details.map((detail) => detail.open),
      [false, true, true]
    );
  });
});
