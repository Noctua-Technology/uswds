import '../templating.js';

import { attr, css, element, html, listen, query } from '@joist/element';
import { effect } from '@joist/observable';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-range-slider': USARangeSliderElement;
  }
}

@element({
  tagName: 'usa-range-slider',
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: 30rem;
      }

      input {
        height: 2.5rem;
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        width: 100%; /* Specific width is required for Firefox. */
        background: transparent; /* Otherwise white in Chrome */
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        margin-top: 0.5rem;
      }

      input:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      input::-webkit-slider-thumb {
        height: 1.25rem;
        border-radius: 99rem;
        width: 1.25rem;
        background: #f0f0f0;
        border: 0;
        box-shadow: 0 0 0 2px #757575;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        margin-top: -0.19rem;
      }

      input::-webkit-slider-runnable-track {
        background-color: #f0f0f0;
        border-radius: 99rem;
        border: 1px solid #757575;
        cursor: pointer;
        height: 1rem;
        width: 100%;
      }
    `,
    html`
      <usa-bind attrs="for:name">
        <label part="label">
          <slot></slot>
        </label>
      </usa-bind>

      <usa-bind props="id:name,name,value,min,max,step">
        <input type="range" part="input" />
      </usa-bind>
    `,
  ],
})
export class USARangeSliderElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @bind()
  accessor name = '';

  @attr()
  @bind()
  accessor value = '0';

  @attr()
  @bind()
  accessor min = '0';

  @attr()
  @bind()
  accessor max = '100';

  @attr()
  @bind()
  accessor step = '1';

  #input = query('input');
  #internals = this.attachInternals();

  connectedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange() {
    this.#syncFormState();
  }

  @listen('change')
  onInputChange() {
    const input = this.#input();

    this.value = input.value;
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setValidity({});
    this.#internals.setFormValue(this.value);

    if (input.validationMessage) {
      this.#internals.setValidity({ customError: true }, input.validationMessage, input);
    }
  }
}
