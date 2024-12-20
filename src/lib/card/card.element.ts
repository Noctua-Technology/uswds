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

      :host([variant="flag"]) {
        padding-left: 15rem;
      }

      :host([variant="flag"]) ::slotted(usa-card-media) {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        width: 15rem;
      }

      :host([variant="flag"]) ::slotted(usa-card-media[variant="inset"]) {
        padding-bottom: 1.5rem;
        padding-right: 0;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardElement extends HTMLElement {
  @attr()
  accessor role = "listitem";

  @attr()
  accessor variant: "default" | "flag" = "default";
}
