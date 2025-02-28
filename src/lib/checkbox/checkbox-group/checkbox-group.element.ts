import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-checkbox-group": USACheckboxGroupElement;
  }
}

@element({
  tagName: "usa-checkbox-group",
  shadowDom: [
    css`
      :host {
        display: flex;
        gap: 0.75rem;
        flex-direction: column;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USACheckboxGroupElement extends HTMLElement {}
