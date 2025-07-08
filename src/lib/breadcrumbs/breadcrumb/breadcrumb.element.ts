import { attr, css, element, html } from '@joist/element';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-breadcrumb': USABreadcrumbElement;
  }
}

@element({
  tagName: 'usa-breadcrumb',
  shadowDom: [
    css`
      :host {
        position: relative;
        right: auto;
        display: inline;
        max-width: unset;
        padding-right: 1.5rem;
      }

      :host(:last-child) usa-icon {
        display: none;
      }

      a[href] {
        color: #005ea2;
        display: inline;
        text-decoration: underline;
      }

      usa-icon {
        height: 1rem;
        width: 1.5rem;
        position: absolute;
        top: 0.075rem;
      }
    `,
    html`
      <usa-bind props="href">
        <a>
          <slot></slot>
        </a>
      </usa-bind>

      <usa-icon icon="navigate_next"></usa-icon>
    `,
  ],
})
export class USABreadcrumbElement extends HTMLElement {
  @attr()
  @bind()
  accessor href = '';

  @attr()
  accessor role = 'listitem';
}
