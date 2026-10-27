import { inject } from '@joist/di';
import { attr, attrChanged, css, element } from '@joist/element';

import { IconService } from '../services/icon.service.js';
import type { USAIcon } from './icon-types.js';

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
export class USAIconElement extends HTMLElement {
  @attr()
  accessor icon: USAIcon | '' = '';

  ariaHidden: string | null = 'true';

  #icon = inject(IconService);

  @attrChanged('icon')
  onIconChanged() {
    this.#updateIcon();
  }

  async #updateIcon() {
    if (!this.icon) {
      return;
    }

    const icon = this.#icon();

    icon
      .getIcon(this.icon)
      .then((currentIcon) => {
        if (this.shadowRoot) {
          if (this.shadowRoot.firstElementChild) {
            this.shadowRoot.firstElementChild.replaceWith(currentIcon);
          } else {
            this.shadowRoot.append(currentIcon);
          }
        }
      })
      .catch(() => {});
  }
}
