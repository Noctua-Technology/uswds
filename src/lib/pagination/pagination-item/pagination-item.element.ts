import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-pagination-item": USAPaginationItemElement;
  }
}

@element({
  tagName: "usa-pagination-item",
  shadowDom: [
    css`
      :host {
        display: inline-flex;
        height: 2.5rem;
        justify-content: center;
        line-height: 1;
        min-width: 2.5rem;
        align-items: center;
      }

      :host(:first-child) {
        margin-right: 1rem;
      }

      :host(:last-child) {
        margin-left: 1rem;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAPaginationItemElement extends HTMLElement {}
