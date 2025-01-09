import { attr, css, element, html, query } from "@joist/element";

import { inject, injectable, injected } from "@joist/di";
import { RADIO_CTX } from "../context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio-option": USARadioOptionElement;
  }
}

@injectable({
  name: "usa-radio-option-ctx",
})
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
  #radio = inject(RADIO_CTX);

  #observer = new MutationObserver(() => {
    const input = this.#input();
    const radio = this.#radio();

    input.name = radio.name;
    input.checked = radio.value === this.value;
  });

  attributeChangedCallback() {
    const input = this.#input();
    const slot = this.#slot();

    this.slot = this.value;

    slot.name = this.value;
    input.value = this.value;
  }

  @injected()
  onInjected() {
    const input = this.#input();
    const radio = this.#radio();

    radio.addRadioOption(this.#label());

    input.name = radio.name;
    input.checked = radio.value === this.value;

    this.#observer.observe(radio, {
      attributeFilter: ["value", "name"],
    });
  }

  disconnectedCallback() {
    this.#label().remove();

    this.#observer.disconnect();
  }
}
