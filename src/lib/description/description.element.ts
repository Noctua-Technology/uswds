import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-description": USADescriptionElement;
  }
}

@element({
  tagName: "usa-description",
  shadowDom: [
    css`
      :host {
        display: block;
        font-size: 0.93rem;
        margin-top: 0.5rem;
      }
    `,
    html` <slot></slot> `,
  ],
})
export class USADescriptionElement extends HTMLElement {}
