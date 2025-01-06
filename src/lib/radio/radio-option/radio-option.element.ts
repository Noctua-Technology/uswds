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
        display: flex;
        flex-direction: column;
        margin-top: 0.05rem;
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

  readonly radio = document.createElement("label");
  readonly #input = document.createElement("input");
  readonly #slotEl = document.createElement("slot");

  constructor() {
    super();

    this.#input.type = "radio";

    this.radio.append(this.#input, this.#slotEl);
  }

  attributeChangedCallback() {
    this.slot = this.value;

    this.#input.name = this.name;
    this.#input.value = this.value;
    this.#input.checked = this.checked;

    this.#slotEl.name = this.value;
  }

  connectedCallback() {
    this.dispatchEvent(
      new Event("usa::radio::option::added", { bubbles: true }),
    );
  }

  disconnectedCallback() {
    this.radio.remove();
  }
}
