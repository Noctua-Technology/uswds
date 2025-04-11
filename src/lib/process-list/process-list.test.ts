import "./process-list.element.js";
import "./process-list-item/process-list-item.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAProcessListElement } from "./process-list.element.js";

describe("usa-process-list", () => {
  it("should be accessible", async () => {
    const processList = await fixture<USAProcessListElement>(html`
      <usa-process-list>
        <usa-process-list-item>
          <h4 slot="title">Start a process</h4>

          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque.

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.</li>
            <li>Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.</li>
            <li>Aliquam erat volutpat. Sed quis velit.</li>
          </ul>
        </usa-process-list-item>

        <usa-process-list-item>
          <h4 slot="title">Proceed to the second step</h4>
          
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.
        </usa-process-list-item>

        <usa-process-list-item>
          <h4 slot="title">Complete the step-by-step process</h4>
          
          Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.
        </usa-process-list-item>
      </usa-process-list>
    `);

    return assert.isAccessible(processList);
  });
});
