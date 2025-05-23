import { attr, css, element, html, listen, queryAll } from '@joist/element';

import { PATTERN_CHARS, type PatternChar, REG_EXPS, format } from './format.js';
import type { MaskableElement } from './maskable.element.js';

declare global {
  interface HTMLElementTagNameMap {
    'usa-input-mask': USAInputMaskElement;
  }
}

@element({
  tagName: 'usa-input-mask',
  shadowDom: [
    css`
      :host {
        display: contents;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USAInputMaskElement extends HTMLElement {
  @attr()
  accessor mask = '';

  #maskables = queryAll<MaskableElement>('[mask]', this);

  connectedCallback() {
    for (const input of this.#maskables()) {
      const { formatted } = format(input.value || input.getAttribute('value') || '', this.#getMaskFor(input));

      if (formatted) {
        input.value = formatted;
      }
    }
  }

  @listen('input')
  async onInput(e: Event) {
    const input = e.target as MaskableElement;
    const selectionStart = input.selectionStart || 0;
    const prev = input.value;
    const mask = this.#getMaskFor(input);

    const { formatted } = format(input.value, mask);

    input.value = formatted;

    const offset = input.value.length - prev.length;
    const maskChar = mask[selectionStart - 1] as PatternChar | undefined;

    // check if the current value is not a space for characters and has an offset greater then 0
    if (maskChar && !PATTERN_CHARS.includes(maskChar) && offset > 0) {
      input.selectionStart = selectionStart + offset;
      input.selectionEnd = selectionStart + offset;
    } else {
      input.selectionStart = selectionStart;
      input.selectionEnd = selectionStart;
    }
  }

  @listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    const input = e.target as MaskableElement;
    const mask = this.#getMaskFor(input);
    const patternChar = mask[input.selectionStart || 0] as PatternChar;

    if (e.key.length === 1 && /^[a-z0-9]/i.test(e.key)) {
      // check that the key is a single character and that it is a letter or number

      if (input.value.length >= mask.length) {
        // prevent default once value is the same as the mask length
        e.preventDefault();
      } else if (patternChar === '9') {
        if (!REG_EXPS.Numbers.test(e.key)) {
          // if pattern char specifies number and is not
          e.preventDefault();
        }
      } else if (patternChar === 'A') {
        if (!REG_EXPS.Letters.test(e.key)) {
          // if pattern char specifies letter and is not
          e.preventDefault();
        }
      }
    }
  }

  #getMaskFor(input: MaskableElement) {
    return this.mask || input.getAttribute('mask') || '';
  }
}
