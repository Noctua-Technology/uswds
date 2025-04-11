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
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAProcessListElement extends HTMLElement {}
