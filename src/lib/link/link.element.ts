import { attr, css, element, html, query } from "@joist/element";

@element({
  tagName: "usa-link",
  shadow: [
    css`
      :host {
        color: #005ea2;
      }
    `,
    html`
      <a>
        <slot></slot>
      </a>
    `,
  ],
})
export class USWDSAlertElement extends HTMLElement {
  @attr()
  accessor href = "";

  #anchor = query("a");

  attributeChangedCallback() {
    this.#anchor({ href: this.href });
  }
}
