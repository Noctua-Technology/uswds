import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-pagination": USAPaginationElement;
  }
}

@element({
  tagName: "usa-pagination",
  shadowDom: [
    css`
      :host {
        margin-bottom: 0;
        margin-top: 0;
        list-style-type: none;
        padding-left: 0;
        align-items: center;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        width: auto;
        gap: .5rem;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAPaginationElement extends HTMLElement {}
