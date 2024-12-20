import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card-footer": USACardFooterElement;
  }
}

@element({
  tagName: "usa-card-footer",
  shadowDom: [
    css`
      :host {
        display: flex;
        padding: 0.5rem 1.5rem 1.5rem;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardFooterElement extends HTMLElement {}
