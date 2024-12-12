import { attr, css, element } from "@joist/element";

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
  ],
})
export class USASelecOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  readonly option = document.createElement("option");

  attributeChangedCallback() {
    this.option.textContent = this.textContent;
    this.option.value = this.value;
  }

  connectedCallback() {
    this.dispatchEvent(
      new Event("usa::select::option::added", { bubbles: true })
    );
  }

  disconnectedCallback() {
    this.option.remove();
  }
}
