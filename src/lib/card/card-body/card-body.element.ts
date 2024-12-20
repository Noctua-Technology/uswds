import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card-body": USACardBodyElement;
  }
}

@element({
  tagName: "usa-card-body",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex: 1 1 0%;
        padding: 0.5rem 1.5rem;
        flex-basis: auto;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardBodyElement extends HTMLElement {}
