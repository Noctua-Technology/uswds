import '@joist/templating/define.js';

import { attr, css, element, html, listen, query } from '@joist/element';
import { bind } from '@joist/templating';
import { effect } from '@joist/observable';

declare global {
  interface HTMLElementTagNameMap {
    'usa-checkbox': USACheckboxElement;
  }
}

@element({
  tagName: 'usa-checkbox',
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: inline-block;
        max-width: 30rem;
        position: relative;
      }

      :host([tiled]) label {
        background-color: #fff;
        border: 2px solid #5c5c5c;
        border-radius: 0.25rem;
        color: #1b1b1b;
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
        background: #fff;
        box-shadow: 0 0 0 2px #1b1b1b;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        min-width: 1.25rem;
        max-width: 1.25rem;
        border-radius: 2px;
        position: relative;
        margin-right: 0.75rem;
      }

      input:disabled + .checkbox {
        background-color: #fff;
        box-shadow: 0 0 0 2px #757575;
      }

      input:disabled:is(:checked) + .checkbox {
        background-color: #757575;
        box-shadow: 0 0 0 2px #757575;
      }

      :host([disabled]) label {
        color: #757575;
        cursor: not-allowed;
      }

      input:checked + .checkbox {
        background-color: #005ea2;
        box-shadow: 0 0 0 2px #005ea2;
      }

      input:checked + .checkbox::after {
        content: ' ';
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
        outline: 0.25rem solid #2491ff;
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
        border-color: #005ea2;
      }

      :host([tiled]) label:has(input:checked:is(:disabled)) {
        background-color: #fff;
        border-color: #757575;
      }
    `,
    html`
      <label>
        <j-bind props="checked,required,disabled" target="input">
          <input type="checkbox" tabindex="0" />
          <div class="checkbox" part="checkbox"></div>
        </j-bind>

        <div class="title" part="title">
          <slot></slot>
        </div>
      </label>
    `,
  ],
})
export class USACheckboxElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @bind()
  accessor checked = false;

  @attr()
  @bind()
  accessor name = '';

  @attr()
  @bind()
  accessor value = '';

  @attr()
  @bind()
  accessor required = false;

  @attr()
  @bind()
  accessor disabled = false;

  @attr({
    observed: false,
  })
  accessor tiled = false;

  #checkbox = query('input');
  #internals = this.attachInternals();

  @effect()
  onChange() {
    this.#syncFormState();
  }

  @listen('change', 'input[type=checkbox]')
  onCheckboxChange(e: Event) {
    e.stopPropagation();

    const checkbox = this.#checkbox();
    this.checked = checkbox.checked;

    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #syncFormState() {
    const checkbox = this.#checkbox();

    this.#internals.setValidity({});
    this.#internals.setFormValue(this.checked ? this.value : null);

    if (checkbox.validationMessage) {
      this.#internals.setValidity({ customError: true }, checkbox.validationMessage, checkbox);
    }
  }
}
