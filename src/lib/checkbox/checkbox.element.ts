import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-checkbox": USACheckboxElement;
  }
}

@element({
  tagName: "usa-checkbox",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        --usa-input-bg-color: #fff;
        --usa-input-border-color: #5c5c5c;
        --usa-input-text-color: #1b1b1b;
        --usa-input-focus-color: #2491ff;
        --usa-input-disabled-bg-color: #fff;
        --usa-input-disabled-border-color: #757575;
        --usa-input-disabled-text-color: #757575;
        --usa-input-active-color: #005ea2;
        --usa-input-radius: 0;

        display: inline-block;
        max-width: 30rem;
        position: relative;
      }

      :host([tiled]) label {
        background-color: var(--usa-input-bg-color);
        border: 2px solid var(--usa-input-border-color);
        border-radius: 0.25rem;
        color: var(--usa-input-text-color);
        padding: 0.75rem 1rem 0.75rem 0.75rem;
      }

      label {
        display: inline-flex;
        cursor: pointer;
        font-size: 1.06rem;
        line-height: 1.3;
        width: 100%;
      }

      .checkbox {
        background: var(--usa-input-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        min-width: 1.25rem;
        max-width: 1.25rem;
        border-radius: 0.25rem;
        position: relative;
        margin-right: 0.75rem;
      }

      input:disabled + .checkbox {
        background-color: var(--usa-input-disabled-bg-color);
        box-shadow: 0 0 0 2px var(--usa-input-disabled-border-color);
      }

      input:disabled:is(:checked) + .checkbox {
        background-color: var(--usa-input-disabled-text-color);
        box-shadow: 0 0 0 2px var(--usa-input-disabled-border-color);
      }

      :host([disabled]) label {
        color: var(--usa-input-disabled-text-color);
        cursor: not-allowed;
      }

      input:checked + .checkbox {
        background-color: var(--usa-input-active-color);
        box-shadow: 0 0 0 2px var(--usa-input-active-color);
      }
      
      input:checked + .checkbox::after {
        content: " ";
        display: block;
        height: 1rem;
        width: 0.5rem;
        border-right: 4px solid rgb(255, 255, 255);
        border-bottom: 4px solid rgb(255, 255, 255);
        transform: rotate(45deg) scale(0.65);
      }

      input {
        position: absolute;
      }

      input:focus + .checkbox {
        outline: 0.25rem solid var(--usa-input-focus-color);
        outline-offset: 0.25rem;
      }

      .description {
        display: block;
        font-size: 0.93rem;
        margin-top: 0.5rem;
      }

      .break {
        flex-basis: 100%;
        height: 0;
      }

      :host([tiled]) label:has(input:checked) {
        background-color: rgba(0, 94, 162, 0.1);
        border-color: var(--usa-input-active-color);
      }

      :host([tiled]) label:has(input:checked:is(:disabled)) {
        background-color: var(--usa-input-disabled-bg-color);
        border-color: var(--usa-input-disabled-border-color);
      }
    `,
    html`
      <label>
        <input type="checkbox" tabindex="0"/>

        <div class="checkbox"></div>

        <div class="title">
          <slot></slot>
        </div>
      </label>
    `,
  ],
})
export class USACheckboxElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor checked = false;

  @attr()
  accessor name = "";

  @attr()
  accessor value = "";

  @attr()
  accessor required = false;

  @attr()
  accessor disabled = false;

  @attr({
    observed: false,
  })
  accessor tiled = false;

  #checkbox = query("input");

  #internals = this.attachInternals();

  attributeChangedCallback() {
    this.#checkbox({
      checked: this.checked,
      name: this.name,
      disabled: this.disabled,
      required: this.required,
    });

    this.#syncFormState();
  }

  @listen("change", "input[type=checkbox]")
  onCheckboxChange() {
    const checkbox = this.#checkbox();
    this.checked = checkbox.checked;

    this.#syncFormState();
  }

  #syncFormState() {
    const checkbox = this.#checkbox();

    this.#internals.setValidity({});
    this.#internals.setFormValue(checkbox.checked ? this.value : null);

    if (checkbox.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        checkbox.validationMessage,
        checkbox,
      );
    }
  }
}
