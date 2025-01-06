import { attr, css, element, html, listen } from "@joist/element";

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

  attributeChangedCallback() {
    this.option.value = this.value;
  }

  connectedCallback() {
    this.dispatchEvent(
      new Event("usa::select::option::added", { bubbles: true }),
    );
  }

  @listen("slotchange")
  onSlotChange() {
    this.option.textContent = this.textContent;
  }

  disconnectedCallback() {
    this.option.remove();
  }
}
