import '@joist/templating/define.js';

import { attr, css, element, html, listen, query } from '@joist/element';
import { effect, observe } from '@joist/observable';
import { bind } from '@joist/templating';

import type { MaskableElement } from '../input-mask/maskable.element.js';

declare global {
  interface HTMLElementTagNameMap {
    'usa-input': USATextInputElement;
  }
}

@element({
  tagName: 'usa-input',
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        max-width: 30rem;
        margin-bottom: 1.5rem;
        position: relative;
      }

      input {
        background-color: #fff;
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        height: 2.5rem;
        line-height: 1.3;
        font-size: 1.06rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      input:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      input:disabled {
        background-color: #fff;
        border-color: #757575;
        color: #757575;
      }

      slot[name='detail']::slotted(*) {
        color: #757575;
      }

      slot[name='detail']::slotted(usa-icon) {
        width: 1.5rem;
        height: 1.5rem;
      }

      slot[name='detail'] {
        display: block;
        position: absolute;
        bottom: 0.21rem;
        left: 0.5rem;
      }

      :host([detail='pfx']) input {
        padding-left: 2.5rem;
      }

      :host([detail='sfx']) input {
        padding-right: 2.5rem;
      }

      :host([detail='sfx']) slot[name='detail'] {
        right: 0.5rem;
        left: auto;
      }
    `,
    html`
      <label>
        <slot name="detail"></slot>

        <slot></slot>

        <j-bind
          props="
            autocomplete,
            autofocus,
            placeholder,
            name,
            type,
            required,
            min,
            max,
            minLength,
            maxLength,
            disabled
          "
        >
          <input tabindex="0" part="input" />
        </j-bind>
      </label>
    `,
  ],
})
export class USATextInputElement extends HTMLElement implements MaskableElement {
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
  accessor min = '';

  @attr()
  @bind()
  accessor max = '';

  @attr()
  @bind()
  accessor minLength = 0;

  @attr()
  @bind()
  accessor maxLength = 524_288;

  @attr()
  @bind()
  accessor required = false;

  @attr()
  @bind()
  accessor disabled = false;

  @attr()
  @bind()
  accessor type: 'text' | 'password' | 'number' = 'text';

  @attr()
  @bind()
  accessor autofocus = false;

  @attr()
  accessor detail: 'pfx' | 'sfx' | '' = '';

  @attr({
    reflect: false,
  })
  @observe()
  accessor value = '';

  @observe()
  accessor selectionStart: number | null = null;

  @observe()
  accessor selectionEnd: number | null = null;

  #internals = this.attachInternals();
  #input = query('input');

  connectedCallback() {
    const { selectionStart, selectionEnd, value } = this;

    // these have to be set manually.
    this.#input({ value, selectionStart, selectionEnd });

    this.#syncFormState();
  }

  @effect()
  onChange() {
    const { selectionStart, selectionEnd, value } = this;

    // these have to be set manually.
    this.#input({ value, selectionStart, selectionEnd });

    this.#syncFormState();
  }

  focus(options?: FocusOptions): void {
    this.#input().focus(options);
  }

  @listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    const form = this.#internals.form;

    if (form) {
      const hasModifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (e.key.toUpperCase() === 'ENTER' && !hasModifier) {
        // this makes sure that the user has a chance to cancel the event before submitting
        setTimeout(() => {
          if (!e.defaultPrevented && !e.isComposing) {
            this.#submit(form);
          }
        });
      }
    }
  }

  @listen('input')
  onInputChange(e: Event) {
    e.stopPropagation();

    const input = this.#input();

    this.value = input.value;
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;

    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setValidity({});
    this.#internals.setFormValue(this.value);

    if (input.validationMessage) {
      this.#internals.setValidity({ customError: true }, input.validationMessage, input);
    }
  }

  #submit(form: HTMLFormElement) {
    const btn = document.createElement('button');
    btn.type = 'submit';
    form.append(btn);

    btn.click();
    btn.remove();
  }
}
