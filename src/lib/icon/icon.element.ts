import { attr, css, element, html, query } from "@joist/element";

import { USAIcon } from "./icon-types.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-icon": USAIconElement;
  }
}

@element({
  tagName: "usa-icon",
  shadow: [
    css`
      :host {
        display: inline-block;
        height: 2rem;
        position: relative;
        width: 2rem;
      }

      svg {
        fill: currentColor;
        height: 100%;
        width: 100%;
      }
    `,
    html`
      <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
        <use></use>
      </svg>
    `,
  ],
})
export class USAIconElement extends HTMLElement {
  @attr()
  accessor icon: USAIcon = "accessibility_new";

  #use = query("use");

  attributeChangedCallback() {
    const use = this.#use();

    if (this.icon !== use.getAttribute("href")) {
      use.setAttribute("href", `/assets/img/sprite.svg#${this.icon}`);
    }
  }
}
