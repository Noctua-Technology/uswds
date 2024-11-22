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

  @attr()
  accessor target: "_blank" | "_parent" | "_self" | "_top" | "" = "";

  @attr()
  accessor title = "";

  @attr()
  accessor disabled = false;

  #anchor = query("a");

  attributeChangedCallback() {
    const { href, target, title } = this;

    this.#anchor({ href, target, title });
  }
}
