import { inject, injectable } from "@joist/di";
import { attr, css, element, html, query } from "@joist/element";

import { COMBO_BOX_CTX } from "../context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-combo-box-option": USAComboBoxOptionElement;
  }
}

const listTemplate = html`
  <li tabindex="-1" role="option">
    <slot></slot>
  </li>
`;

@injectable({
  name: "usa-combo-box-option-ctx",
})
@element({
  tagName: "usa-combo-box-option",
  shadowDom: [
    css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;  
    }
    `,
    html`<slot></slot>`,
  ],
})
export class USAComboBoxOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  #listItem = listTemplate.createNode() as HTMLElement;
  #li = query("li", this.#listItem);
  #slot = query("slot", this.#listItem);
  #ctx = inject(COMBO_BOX_CTX);

  attributeChangedCallback() {
    const value = this.value.split(" ").join("-").toLocaleLowerCase();

    this.#li().dataset.value = this.value;

    this.#slot({ name: value });

    this.slot = value;
  }

  connectedCallback() {
    const ctx = this.#ctx();

    ctx.addOption(this.#li());
  }

  disconnectedCallback() {
    const ctx = this.#ctx();

    ctx.removeOption(this.#li());

    this.#li().remove();
  }
}
