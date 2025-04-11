import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-process-list-item": USAProcessListItemElement;
  }
}

@element({
  tagName: "usa-process-list-item",
  shadowDom: [
    css`
      :host {
        background: blue;
        color: #fff;
        display: inline-block;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAProcessListItemElement extends HTMLElement {}
