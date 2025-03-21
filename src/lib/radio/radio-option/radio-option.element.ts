import { inject, injectable, injected } from "@joist/di";
import { attr, css, element, html, query } from "@joist/element";

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

  @attr()
  accessor disabled = false;

  #label = query("label");
  #input = query("input");
  #slot = query("slot");
  #radioCtx = inject(RADIO_CTX);

  #observer = new MutationObserver(() => {
    this.#sync();
  });

  attributeChangedCallback() {
    this.#input({ value: this.value, disabled: this.disabled });
    this.#slot({ name: this.value });

    this.slot = this.value;
  }

  @injected()
  onInjected() {
    const radioCtx = this.#radioCtx();

    radioCtx.addRadioOption(this.#label());

    this.#sync();

    this.#observer.observe(radioCtx, {
      attributeFilter: ["value", "name", "required"],
    });
  }

  disconnectedCallback() {
    this.#label().remove();

    this.#observer.disconnect();
  }

  #sync() {
    const radioCtx = this.#radioCtx();

    this.#input({
      name: radioCtx.name,
      checked: radioCtx.value === this.value,
      required: radioCtx.required,
    });
  }
}
