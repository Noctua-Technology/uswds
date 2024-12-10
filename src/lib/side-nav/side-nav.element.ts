import "./side-nav-item.element.js";

import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-side-nav": USASideNavElement;
  }
}

@element({
  tagName: "usa-side-nav",
  shadowDom: [
    css`
      :host {
        display: block;
        font-size: 1.06rem;
        line-height: 1.3;
        border-bottom: 1px solid #e6e6e6;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USASideNavElement extends HTMLElement {}
