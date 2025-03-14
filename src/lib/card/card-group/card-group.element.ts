import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-card-group": USACardGroupElement;
  }
}

@element({
  tagName: "usa-card-group",
  shadowDom: [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      :host([variant="flag"]) {
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USACardGroupElement extends HTMLElement {
  @attr()
  accessor role = "list";
}
