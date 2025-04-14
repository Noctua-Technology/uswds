import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-button-group": USAButtonGroupElement;
  }
}

@element({
  tagName: "usa-button-group",
  shadowDom: [
    css`
      :host {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }

      @media (min-width: 30em) {
        :host {
          flex-wrap: nowrap;
          align-items: stretch;
          flex-direction: row;
        }
    }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAButtonGroupElement extends HTMLElement {}
