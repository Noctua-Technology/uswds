import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-step-indicator": USAStepIndicatorElement;
  }
}

@element({
  tagName: "usa-step-indicator",
  shadowDom: [
    css`
      :host {
        display: flex;
        gap: 2px;
        counter-reset: usa-step-indicator;
        margin-top: 1rem;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USAStepIndicatorElement extends HTMLElement {}
