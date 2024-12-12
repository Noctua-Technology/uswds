import { attr, css, element, html } from "@joist/element";

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
        display: inline-flex;
        flex-direction: column;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USARadioOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr()
  accessor checked = false;

  radio = document.createElement("label");
  input = document.createElement("input");
  slotEl = document.createElement("slot");

  constructor() {
    super();

    this.input.type = "radio";

    this.radio.append(this.input, this.slotEl);
  }

  attributeChangedCallback() {
    this.slot = this.value;
    this.input.name = this.name;
    this.input.value = this.value;
    this.slotEl.name = this.value;
    this.input.checked = this.checked;
  }

  connectedCallback() {
    this.dispatchEvent(
      new Event("usa::radio::option::added", { bubbles: true })
    );
  }

  disconnectedCallback() {
    this.radio.remove();
  }
}
