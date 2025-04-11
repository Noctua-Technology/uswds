import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-process-list": USAProcessListElement;
  }
}

@element({
  tagName: "usa-process-list",
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
export class USAProcessListElement extends HTMLElement {}
