import { injectable } from "@joist/di";
import { attr, css, element, html, listen } from "@joist/element";

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
        --usa-input-bg-color: #fff;
        --usa-input-border-color: #5c5c5c;
        --usa-input-text-color: #1b1b1b;
        --usa-input-focus-color: #2491ff;
        --usa-input-disabled-bg-color: #fff;
        --usa-input-disabled-border-color: #757575;
        --usa-input-disabled-text-color: #757575;
        --usa-input-active-color: #005ea2;
        --usa-radio-active-color: var(--usa-input-active-color);
        --usa-radio-tiled-bg: rgba(0, 94, 162, 0.1);
        --usa-radio-focus-color: var(--usa-input-focus-color);
        --usa-input-radius: 0;

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
        background: var(--usa-input-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-text-color);
        flex: 0 0 1.25rem;
        position: relative;
        z-index: 1000;
      }

      label:has(input:checked)::before {
        background-color: var(--usa-radio-active-color);
        box-shadow:
          0 0 0 2px var(--usa-radio-active-color),
          inset 0 0 0 2px var(--usa-input-bg-color);
      }

      label:has(input:checked:is(:disabled))::before {
        background-color: var(--usa-input-disabled-text-color);
        box-shadow:
          0 0 0 2px var(--usa-input-disabled-text-color),
          inset 0 0 0 2px var(--usa-input-bg-color);
      }

      label:has(input:disabled) {
        cursor: not-allowed;
        color: var(--usa-input-disabled-text-color) !important;
      }

      label:has(input:disabled)::before {
        background-color: var(--usa-input-disabled-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-disabled-border-color);
      }
      
      label:has(input:focus)::before {
        outline: 0.25rem solid var(--usa-radio-focus-color);
        outline-offset: 0.25rem;
      }

      :host([tiled]) {
        gap: 0.5rem;
      }

      :host([tiled]) label {
        background-color: var(--usa-input-bg-color);
        border: 2px solid var(--usa-input-border-color);
        border-radius: 0.25rem;
        color: var(--usa-input-text-color);
        padding: 0.75rem 1rem 0.75rem 0.75rem;
      }

      .radio {
        background: var(--usa-input-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        min-width: 1.25rem;
        max-width: 1.25rem;
        border-radius: var(--usa-input-radius);
        position: relative;
        margin-right: 0.75rem;
      }

      input:disabled + .radio {
        background-color: var(--usa-input-disabled-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-disabled-border-color);
      }

      input:disabled:is(:checked) + .radio {
        background-color: var(--usa-input-disabled-text-color);
        box-shadow: 0 0 0 2px var(--usa-input-disabled-border-color);
      }

      :host([disabled]) label {
        color: var(--usa-input-disabled-text-color);
        cursor: not-allowed;
      }

      input:checked + .radio {
        background-color: var(--usa-input-active-color);
        box-shadow: 0 0 0 2px var(--usa-input-active-color);
      }

      input:focus + .radio {
        outline: 0.25rem solid var(--usa-input-focus-color);
        outline-offset: 0.25rem;
      }

      :host([tiled]) label:has(input:checked) {
        background-color: rgba(0, 94, 162, 0.1);
        border-color: var(--usa-input-active-color);
      }

      :host([tiled]) label:has(input:checked:is(:disabled)) {
        background-color: var(--usa-input-disabled-bg-color);
        border-color: var(--usa-input-disabled-border-color);
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
  #firstInput: HTMLInputElement | null = null;

  addRadioOption(el: HTMLElement) {
    this.shadowRoot?.append(el);

    if (this.#firstInput === null) {
      this.#firstInput = el.querySelector("input");
    }

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

    if (this.#firstInput?.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        this.#firstInput.validationMessage,
        this.#firstInput,
      );
    }
  }
}
