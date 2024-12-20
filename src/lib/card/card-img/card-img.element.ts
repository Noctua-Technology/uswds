import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card-img": USACardImgElement;
  }
}

@element({
  tagName: "usa-card-img",
  shadowDom: [
    css`
      :host {
        display: block;
        border-top-left-radius: calc(0.25rem - 2px);
        border-top-right-radius: calc(0.25rem - 2px);
        background-color: #f0f0f0;
        position: relative;
        overflow: hidden;
      }

      :host([variant="inset"]) {
        background-color: #fff;
        padding-top: 1.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }

      ::slotted(img) {
        display: block;
        height: 100%;
        width: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }

      :host(:not(:first-child)) {
        margin-top: 0.5rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    `,
    html` <slot></slot> `,
  ],
})
export class USACardImgElement extends HTMLElement {
  @attr()
  accessor varint: "standard" | "inset" = "standard";
}
