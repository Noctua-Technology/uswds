import { inject, injectable } from '@joist/di';
import { attr, css, element } from '@joist/element';

import { IconService } from '../services/icon.service.js';
import type { USAIcon } from './icon-types.js';
import { observe } from '@joist/observable';

declare global {
  interface HTMLElementTagNameMap {
    'usa-icon': USAIconElement;
  }
}

@element({
  tagName: 'usa-icon',
  shadowDom: [
    css`
      :host {
        display: inline-block;
        height: 2rem;
        position: relative;
        width: 2rem;
      }

      svg {
        fill: currentColor;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
@injectable({
  name: 'usa-icon-ctx',
})
export class USAIconElement extends HTMLElement {
  @attr()
  accessor icon: USAIcon = 'accessibility_new';

  ariaHidden: string | null = 'true';

  #icon = inject(IconService);
  #injected = false;

  attributeChangedCallback(_: string, newVal: string, oldVal: string) {
    if (this.#injected) {
      if (newVal !== oldVal) {
        this.#updateIcon();
      }
    }
  }

  connectedCallback() {
    this.#injected = true;
    this.#updateIcon();
  }

  async #updateIcon() {
    if (!this.icon) {
      return;
    }

    const icon = this.#icon();

    icon.getIcon(this.icon).then((currentIcon) => {
      if (this.shadowRoot) {
        if (this.shadowRoot.firstElementChild) {
          this.shadowRoot.firstElementChild.replaceWith(currentIcon);
        } else {
          this.shadowRoot.append(currentIcon);
        }
      }
    });
  }
}
