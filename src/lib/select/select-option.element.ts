import { attr, css, element } from "@joist/element";
import { USASelectElement } from "./select.element";

@element({
  tagName: "usa-select-option",
  shadow: [
    css`
      :host {
        display: none;
      }
    `,
  ],
})
export class USASelecOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  #parent: USASelectElement | null = null;

  connectedCallback() {
    if (this.parentElement instanceof USASelectElement) {
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