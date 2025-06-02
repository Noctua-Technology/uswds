import '@joist/templating/define.js';

import { attr, css, element, html, listen, query } from '@joist/element';
import { effect } from '@joist/observable';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-textarea': USATextareaElement;
  }
}

@element({
  tagName: 'usa-textarea',
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        font-size: 1.06rem;
        line-height: 1.3;
        display: flex;
        flex-direction: column;
        font-weight: 400;
        margin-bottom: 1.5rem;
        max-width: 30rem;
        position: relative;
        height: 9lh;
        gap: 0.5rem;
      }

      textarea {
        font-family: inherit;
        font-size: inherit;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        padding: 0.5rem;
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        background-color: #fff;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        resize: none;
        flex-grow: 1;
      }

      textarea:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      textarea:disabled {
        background-color: #fff;
        border-color: #757575;
        color: #757575;
      }
    `,
    html`
      <j-bind attrs="for:name">
        <label part="label">
          <slot></slot>
        </label>
      </j-bind>

      <j-bind props="name,placeholder,autocomplete,required,value,id:name">
        <textarea id="textarea" part="textarea"></textarea>
      </j-bind>
    `,
  ],
})
export class USATextareaElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @bind()
  accessor name = '';

  @attr()
  @bind()
  accessor autocomplete: AutoFill = 'on';

  @attr()
  @bind()
  accessor placeholder = '';

  @attr()
  @bind()
  accessor required = false;

  @attr()
  @bind()
  accessor autofocus = false;

  @attr({
    reflect: false,
  })
  @bind()
  accessor value = '';

  #internals = this.attachInternals();
  #input = query('textarea');

  formAssociatedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange() {
    this.#syncFormState();
  }

  @listen('input')
  onInputChange(e: Event) {
    e.stopPropagation();

    this.value = this.#input().value;

    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  async #syncFormState() {
    const input = this.#input();

    this.#internals.setFormValue(this.value);
    this.#internals.setValidity({});

    await Promise.resolve();

    if (input.validationMessage) {
      this.#internals.setValidity({ customError: true }, input.validationMessage, input);
    }
  }
}
