import { attr, css, element, html, query } from "@joist/element";
import { inject, injectable } from "@joist/di";

import { USAIcon } from "./icon-types.js";
import { USAConfig } from "../config/config.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-icon": USAIconElement;
  }
}

@element({
  tagName: "usa-icon",
  shadowDom: [
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
@injectable()
export class USAIconElement extends HTMLElement {
  @attr()
  accessor icon: USAIcon = "accessibility_new";

  #use = query("use");
  #config = inject(USAConfig);
  #connected = false;

  connectedCallback() {
    this.#connected = true;
    this.#updateIcon();
  }

  attributeChangedCallback() {
    if (this.#connected) {
      this.#updateIcon();
    }
  }

  #updateIcon() {
    const config = this.#config();
    const use = this.#use();

    if (this.icon !== use.getAttribute("href")) {
      use.setAttribute("href", `${config.spriteSheet}#${this.icon}`);
    }
  }
}
