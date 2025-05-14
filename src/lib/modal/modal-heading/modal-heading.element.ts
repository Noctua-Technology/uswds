import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-modal-heading": USAModalHeadingElement;
  }
}

@element({
  tagName: "usa-modal-heading",
  shadowDom: [
    css`
      :host {
        font-family:
          Merriweather Web,
          Georgia,
          Cambria,
          Times New Roman,
          Times,
          serif !important;

        font-size: 1.22rem;
      }

      h2 {
        margin-top: 0;
        line-height: 1.4;
        font-size: 1.45rem;
      }
    `,
    html`
      <h2 part="heading">
        <slot></slot>
      </h2>
    `,
  ],
})
export class USAModalHeadingElement extends HTMLElement {}
