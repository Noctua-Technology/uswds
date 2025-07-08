import '../templating.js';

import { attr, css, element, html, query } from '@joist/element';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-link': USALinkElement;
  }
}

@element({
  tagName: 'usa-link',
  shadowDom: [
    css`
      :host {
        display: inline;
        color: #005ea2;
        text-decoration: underline;
      }

      a {
        color: inherit;
        text-decoration: inherit;
        display: inherit;
        text-overflow: inherit;
      }
    `,
    html`
      <usa-bind props="href,target,title">
        <a>
          <slot></slot>
        </a>
      </usa-bind>
    `,
  ],
})
export class USALinkElement extends HTMLElement {
  @attr()
  @bind()
  accessor href = '';

  @attr()
  @bind()
  accessor target: '_blank' | '_parent' | '_self' | '_top' | '' = '';

  @attr()
  @bind()
  accessor title = '';
}
