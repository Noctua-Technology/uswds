import { attr, css, element, html, listen, query } from "@joist/element";

import { USARadioOptionElement } from "./radio-option.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio": USARadioElement;
  }
}

@element({
  tagName: "usa-radio",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 30rem;
      }

      label {
        display: flex;
        cursor: pointer;
        gap: 0.5rem;
      }

      input {
        position: absolute;
        left: -999em;
        right: auto;
      }

      label::before {
        content: " ";
        display: block;
        left: 0;
        height: 1.25rem;
        border-radius: 99rem;
        width: 1.25rem;
        background: #fff;
        box-shadow: 0 0 0 2px #1b1b1b;
        flex: 0 0 1.25rem;
      }

      label:has(input:checked)::before {
        background-color: #005ea2;
        box-shadow:
          0 0 0 2px #005ea2,
          inset 0 0 0 2px #fff;
      }

      label:has(input:focus)::before {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0.25rem;
      }

      :host([tiled]) {
        gap: 0.5rem;
      }

      :host([tiled]) label {
        background-color: #fff;
        border: 2px solid #c9c9c9;
        color: #1b1b1b;
        border-radius: 0.25rem;
        padding: 0.75rem 1rem 0.75rem 0.75rem;
      }

      :host([tiled]) label:has(input:checked) {
        background-color: rgba(0, 94, 162, 0.1);
        border-color: #005ea2;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USARadioElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr({
    observed: false,
  })
  accessor tiled = false;

  get shadow() {
    return this.shadowRoot!;
  }

  #internals = this.attachInternals();

  @listen("change")
  onChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.checked) {
        this.value = e.target.value;
        this.#internals.setFormValue(e.target.value);
      }
    }
  }

  connectedCallback() {
    if (this.value) {
      this.#internals.setFormValue(this.value);
    }
  }

  attributeChangedCallback() {
    for (let radio of this.shadow.querySelectorAll("usa-radio-option")) {
      radio.checked = radio.value === this.value;
      radio.name = this.name;
    }
  }

  @listen("usa::radio::option::added", (el) => el)
  onOptionAdded(e: Event) {
    if (e.target instanceof USARadioOptionElement) {
      e.stopPropagation();

      e.target.checked = e.target.value === this.value;
      e.target.name = this.name;

      this.shadow.append(e.target.radio);
    }
  }
}
