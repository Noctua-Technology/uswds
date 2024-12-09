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
      }
    `,
    html` <slot></slot> `,
  ],
})
export class USASideNavElement extends HTMLElement {}
