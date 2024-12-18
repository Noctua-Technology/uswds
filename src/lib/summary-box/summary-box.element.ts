import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-summary-box": USASummaryBoxElement;
  }
}

@element({
  tagName: "usa-summary-box",
  shadowDom: [
    css`
      :host {
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        font-size: 1.06rem;
        line-height: 1.5;
        color: #1b1b1b;
        background-color: #e7f6f8;
        border-radius: 0.25rem;
        border: 1px #99deea solid;
        padding: 1.5rem;
        position: relative;
        display: block;
      }
    `,
    html` <slot></slot> `,
  ],
})
export class USASummaryBoxElement extends HTMLElement {}
