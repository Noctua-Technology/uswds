import { inject, injectable } from "@joist/di";
import { attr, element, html } from "@joist/element";

import { COMBO_BOX_CTX } from "../context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-combo-box-option": USAComboBoxOptionElement;
  }
}

@injectable({
  name: "usa-combo-box-option-ctx",
})
@element({
  tagName: "usa-combo-box-option",
  shadowDom: [html`<slot></slot>`],
})
export class USAComboBoxOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  #li = document.createElement("li");
  #ctx = inject(COMBO_BOX_CTX);

  constructor() {
    super();

    this.#li.tabIndex = -1;
    this.#li.role = "option";
  }

  attributeChangedCallback() {
    this.#li.dataset.value = this.value;
    this.#li.textContent = this.value;
  }

  connectedCallback() {
    const ctx = this.#ctx();

    ctx.addOption(this.#li);
  }

  disconnectedCallback() {
    const ctx = this.#ctx();

    ctx.removeOption(this.#li);

    this.#li.remove();
  }
}
