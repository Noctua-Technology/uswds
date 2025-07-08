import '../../templating.js';

import { attr, css, element, html } from '@joist/element';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-pagination-no': USAPaginationNoElement;
  }
}

@element({
  tagName: 'usa-pagination-no',
  shadowDom: [
    css`
      :host {
        align-items: center;
        border-color: rgba(27, 27, 27, 0.2);
        border-radius: 0.25rem;
        border-style: solid;
        border-width: 1px;
        color: #005ea2;
        display: inline-flex;
        justify-content: center;
        width: 100%;
      }

      a {
        display: inline-flex;
        justify-content: center;
        text-decoration: underline;
        cursor: pointer;
        padding: 0.5rem;
        color: inherit;
      }

      :host([active]) {
        background-color: #1b1b1b;
        border-color: transparent;
        color: #fff;
      }
    `,
    html`
      <usa-bind props="href">
        <a>
          <slot></slot>
        </a>
      </usa-bind>
    `,
  ],
})
export class USAPaginationNoElement extends HTMLElement {
  @attr()
  @bind()
  accessor href = '#';

  @attr()
  accessor active = false;
}
