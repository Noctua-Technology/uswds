import { attr, css, element, html } from "@joist/element";

import { USARadioElement } from "./radio.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio-option": USARadioElement;
  }
}

@element({
  tagName: "usa-radio-option",
  shadowDom: [
    css`
      :host {
        display: inline-block;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USARadioOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  #parent: USARadioElement | null = null;

  attributeChangedCallback() {
    this.slot = this.value;
  }

  connectedCallback() {
    if (this.parentElement instanceof USARadioElement) {
      this.#parent = this.parentElement;

      this.parentElement.onOptionAdded(this);
    }
  }

  disconnectedCallback() {
    if (this.#parent) {
      this.#parent.onOptionRemoved(this);
    }
  }
}
