import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-collection": USACollectionElement;
  }
}

@element({
  tagName: "usa-collection",
  shadowDom: [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USACollectionElement extends HTMLElement {}
