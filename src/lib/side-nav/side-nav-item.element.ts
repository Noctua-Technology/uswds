import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-side-nav-item": USASideNavItemElement;
  }
}

@element({
  tagName: "usa-side-nav-item",
  shadowDom: [
    css`
      :host {
        border-top: 1px solid #e6e6e6;
        display: block;
        padding: 0.5rem 1rem;
        text-decoration: none;
        position: relative;
      }

      :host(:last-child) {
        border-bottom: 1px solid #e6e6e6;
      }

      ::slotted(*) {
        color: #5c5c5c;
        text-decoration: none;
        display: flex;
      }

      :host([current]) ::slotted(*) {
        color: #005ea2;
        font-weight: 700;
      }

      :host([current])::after {
        background-color: #005ea2;
        border-radius: 99rem;
        content: "";
        display: block;
        position: absolute;
        bottom: 0.25rem;
        top: 0.25rem;
        width: 0.25rem;
        left: 0;
      }

      :host(:hover) {
        background-color: #f0f0f0;
        color: #005ea2;
      }

      :host(:hover) ::slotted(*) {
        color: #005ea2;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USASideNavItemElement extends HTMLElement {
  @attr()
  accessor current = false;
}
