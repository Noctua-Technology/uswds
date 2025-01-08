import { attr, css, element, html, listen } from "@joist/element";
import { USASelectElement } from "../select.element.js";

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
export class USASelecOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  readonly option = document.createElement("option");

  #observer = new MutationObserver((records) => {
    for (const { target } of records) {
      if (target instanceof USASelectElement) {
        this.option.selected = target.value === this.value;
      }
    }
  });

  attributeChangedCallback() {
    this.option.value = this.value;
  }

  connectedCallback() {
    if (this.parentElement instanceof USASelectElement) {
      this.#observer.observe(this.parentElement, {
        attributes: true,
        attributeFilter: ["value"],
      });

      this.option.selected = this.parentElement.value === this.value;

      this.parentElement.addOption(this.option);
    }
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
