import { injectable } from "@joist/di";
import { attr, css, element, html, listen, query } from "@joist/element";

import { SELECT_CONTEXT, type SelectContainer } from "./context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-select": USASelectElement;
  }
}

@injectable({
  name: "usa-select-ctx",
  provideSelfAs: [SELECT_CONTEXT],
})
@element({
  tagName: "usa-select",
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
        --usa-input-radius: 0;

        display: block;
        line-height: 1.3;
        position: relative;
        width: 100%;
        max-width: 30rem;
        margin-bottom: 1.5rem;
      }

      select {
        font-size: 1.06rem;
        appearance: none;
        border-width: 1px;
        border-color: var(--usa-input-border-color);
        border-style: solid;
        border-radius: var(--usa-input-radius);
        color: var(--usa-input-text-color);
        background-color: var(--usa-input-bg-color);
        display: block;
        height: 2.5rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      select:not(:disabled):focus {
        outline: 0.25rem solid var(--usa-input-focus-color);
        outline-offset: 0;
      }

      select:disabled {
        background-color: var(--usa-input-disabled-bg-color);
        border-color: var(--usa-input-disabled-border-color);
        color: var(--usa-input-disabled-text-color);
      }

      usa-icon {
        position: absolute;
        right: 0.5rem;
        bottom: 12%;
        height: 1.5rem;
        width: 1.5rem;
      }
    `,
    html`
      <usa-icon icon="unfold_more"></usa-icon>

      <label>
        <div class="label">
          <slot></slot>
        </div>

        <select></select>
      </label>
    `,
  ],
})
export class USASelectElement extends HTMLElement implements SelectContainer {
  static formAssociated = true;

  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr()
  accessor required = false;

  #select = query("select");
  #internals = this.attachInternals();

  connectedCallback() {
    this.#select({
      value: this.value,
      name: this.name,
      required: this.required,
    });

    this.#syncFormState();
  }

  attributeChangedCallback() {
    this.#select({
      value: this.value,
      name: this.name,
      required: this.required,
    });

    this.#syncFormState();
  }

  @listen("change")
  onSelectChange() {
    const select = this.#select();

    this.value = select.value;

    this.#syncFormState();
  }

  addSelectOption(option: HTMLOptionElement) {
    const select = this.#select();
    select.append(option);
  }

  #syncFormState() {
    const select = this.#select();

    this.#internals.setFormValue(this.value);
    this.#internals.setValidity({});

    if (select.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        select.validationMessage,
        select,
      );
    }
  }
}
