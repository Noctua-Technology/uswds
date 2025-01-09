import { injectable } from "@joist/di";
import { attr, css, element, html, listen, query } from "@joist/element";

import { RADIO_CTX, type RadioContainer } from "./context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio": USARadioElement;
  }
}

@injectable({
  name: "usa-radio-ctx",
  provideSelfAs: [RADIO_CTX],
})
@element({
  tagName: "usa-radio",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 30rem;
        margin-bottom: 1.5rem;
      }

      label {
        display: flex;
        cursor: pointer;
        gap: 0.5rem;
        position: relative;
      }

      input {
        position: absolute;
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
        position: relative;
        z-index: 1000;
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

      slot {
        display: flex;
      }
    `,
    html`
      <slot name="legend" id="legend" tabindex="-1"></slot>

      <slot></slot>
    `,
  ],
})
export class USARadioElement extends HTMLElement implements RadioContainer {
  static formAssociated = true;

  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr()
  accessor required = false;

  @attr({
    observed: false,
  })
  accessor tiled = false;

  #internals = this.attachInternals();
  #legend = query("#legend");

  connectedCallback() {
    this.#syncFormState();
  }

  addRadioOption(el: HTMLElement) {
    this.shadowRoot?.append(el);

    this.#syncFormState();
  }

  @listen("change")
  onChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.checked) {
        this.value = e.target.value;

        this.#syncFormState();
      }
    }
  }

  #syncFormState() {
    this.#internals.setFormValue(this.value);
    this.#internals.setValidity({});

    if (this.required && !this.value) {
      const input = this.shadowRoot?.querySelector("input");

      this.#internals.setValidity(
        { valueMissing: true },
        "Please select an option if you want to proceed",
        input ?? this.#legend(),
      );
    }
  }
}
