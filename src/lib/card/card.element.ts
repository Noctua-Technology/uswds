import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card": USACardElement;
  }
}

@element({
  tagName: "usa-card",
  shadowDom: [
    css`
      :host {
        color: #1b1b1b;
        background-color: #fff;
        font-size: 1.06rem;
        line-height: 1.5;
        border-width: 2px;
        border-color: #e6e6e6;
        border-style: solid;
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 0.25rem;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardElement extends HTMLElement {
  @attr()
  accessor role = "listitem";
}
