import { attr, css, element, html, query } from "@joist/element";

@element({
  tagName: "usa-link",
  shadow: [
    css`
      :host {
        display: inline;
        color: #005ea2;
      }

      a {
        color: inherit;
      }
    `,
    html`
      <a>
        <slot></slot>
      </a>
    `,
  ],
})
export class USALinkElement extends HTMLElement {
  @attr()
  accessor href = "";

  #anchor = query("a");

  attributeChangedCallback() {
    this.#anchor({ href: this.href });
  }
}
