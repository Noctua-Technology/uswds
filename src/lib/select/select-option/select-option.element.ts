import { inject, injectable, injected } from "@joist/di";
import { attr, css, element, html, listen } from "@joist/element";

import { SELECT_CONTEXT } from "../context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-select-option": USASelecOptionElement;
  }
}

@element({
  tagName: "usa-select-option",
  shadowDom: [
    css`
      :host {
        display: none;
      }
    `,
    html`<slot></slot>`,
  ],
})
@injectable({
  name: "usa-select-option-ctx",
})
export class USASelecOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  readonly option = document.createElement("option");

  #select = inject(SELECT_CONTEXT);

  #observer = new MutationObserver(() => {
    const { value } = this.#select();

    this.option.selected = value === this.value;
  });

  attributeChangedCallback() {
    this.option.value = this.value;
  }

  @injected()
  onInjected() {
    const select = this.#select();

    this.option.selected = select.value === this.value;

    select.addSelectOption(this.option);

    this.#observer.observe(select, {
      attributes: true,
      attributeFilter: ["value"],
    });
  }

  @listen("slotchange")
  onSlotChange() {
    this.option.textContent = this.textContent;
  }

  disconnectedCallback() {
    this.#observer.disconnect();

    this.option.remove();
  }
}
