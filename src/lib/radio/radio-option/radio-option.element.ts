import { attr, css, element, html, query } from "@joist/element";

import { type RadioContainer, RadioContextRequestEvent } from "../context.js";

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
  #radio: RadioContainer | null = null;

  #observer = new MutationObserver(() => {
    if (this.#radio) {
      const input = this.#input();

      input.name = this.#radio.name;
      input.checked = this.#radio.value === this.value;
    }
  });

  attributeChangedCallback() {
    const input = this.#input();
    const slot = this.#slot();

    this.slot = this.value;

    slot.name = this.value;
    input.value = this.value;
  }

  connectedCallback() {
    const input = this.#input();

    this.dispatchEvent(
      new RadioContextRequestEvent((radio) => {
        this.#radio = radio;
      }),
    );

    if (this.#radio) {
      this.#radio.addRadioOption(this.#label());

      input.name = this.#radio.name;
      input.checked = this.#radio.value === this.value;

      this.#observer.observe(this.#radio, {
        attributeFilter: ["value", "name"],
      });
    }
  }

  disconnectedCallback() {
    this.#label().remove();

    this.#observer.disconnect();
  }
}
