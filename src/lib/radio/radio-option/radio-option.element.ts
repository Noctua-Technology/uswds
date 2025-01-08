import { attr, css, element, html, query } from "@joist/element";

import { USARadioElement } from "../radio.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio-option": USARadioOptionElement;
  }
}

@element({
  tagName: "usa-radio-option",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-top: 0.05rem;
      }
    `,
    html`
      <!-- This label will be moved to the shadow dom of its parent -->
      <label>
        <input type="radio" tabindex="0" />
        <slot name="reserved"></slot>
      </label>

      <slot></slot>
    `,
  ],
})
export class USARadioOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  #label = query("label");
  #input = query("input");
  #slot = query("slot");

  #observer = new MutationObserver((records) => {
    for (const { target } of records) {
      if (target instanceof USARadioElement) {
        const input = this.#input();

        input.checked = target.value === this.value;
        input.name = target.name;
      }
    }
  });

  attributeChangedCallback() {
    this.slot = this.value;

    const input = this.#input();
    const slot = this.#slot();

    slot.name = this.value;
    input.value = this.value;
  }

  connectedCallback() {
    if (this.parentElement instanceof USARadioElement) {
      this.#observer.observe(this.parentElement, {
        attributes: true,
        attributeFilter: ["value", "name"],
      });

      const input = this.#input();

      input.name = this.parentElement.name ?? "";
      input.checked = this.parentElement.value === this.value;

      this.parentElement.addRadioOption(this.#label());
    }
  }

  disconnectedCallback() {
    this.#label().remove();

    this.#observer.disconnect();
  }
}
