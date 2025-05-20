import '@joist/templating/define.js';

import { injectable } from '@joist/di';
import { attr, css, element, html, listen, query } from '@joist/element';
import { bind } from '@joist/templating';

import { SELECT_CONTEXT, type SelectContainer } from './context.js';
import { effect } from '@joist/observable';

declare global {
  interface HTMLElementTagNameMap {
    'usa-select': USASelectElement;
  }
}

@injectable({
  name: 'usa-select-ctx',
  provideSelfAs: [SELECT_CONTEXT],
})
@element({
  tagName: 'usa-select',
  shadowDom: [
    css`
      :host {
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
        border-color: #5c5c5c;
        border-style: solid;
        border-radius: 0;
        color: #1b1b1b;
        background-color: #fff;
        display: block;
        height: 2.5rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      select:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      select:disabled {
        background-color: #fff;
        border-color: #757575;
        color: #757575;
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
        <div class="label" part="label">
          <slot></slot>
        </div>

        <j-bind props="value,name,required">
          <select part="select"></select>
        </j-bind>
      </label>
    `,
  ],
})
export class USASelectElement extends HTMLElement implements SelectContainer {
  static formAssociated = true;

  @attr()
  @bind()
  accessor value = '';

  @attr()
  @bind()
  accessor name = '';

  @attr()
  @bind()
  accessor required = false;

  #select = query('select');
  #internals = this.attachInternals();

  connectedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange() {
    this.#syncFormState();
  }

  @listen('change')
  onSelectChange() {
    const select = this.#select();

    this.value = select.value;
  }

  addSelectOption(option: HTMLOptionElement) {
    const select = this.#select();

    if (!this.value && !select.children.length) {
      this.value = option.value;
    }

    select.append(option);
  }

  async #syncFormState() {
    const select = this.#select();

    this.#internals.setFormValue(this.value);
    this.#internals.setValidity({});

    await Promise.resolve();

    if (select.validationMessage) {
      this.#internals.setValidity({ customError: true }, select.validationMessage, select);
    }
  }
}
