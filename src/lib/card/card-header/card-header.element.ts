import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card-header": USACardHeaderElement;
  }
}

@element({
  tagName: "usa-card-header",
  shadowDom: [
    css`
      :host {
        font-family:
          Merriweather Web,
          Georgia,
          Cambria,
          Times New Roman,
          Times,
          serif !important;
        display: flex;
        padding: 1.5rem 1.5rem 0.5rem;
        font-size: 1.22rem;
        font-weight: bold;
        line-height: 1.2;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardHeaderElement extends HTMLElement {}
