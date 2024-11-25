import { attr, css, element, html, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-link": USALinkElement;
  }
}

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

  attributeChangedCallback(attr: string) {
    const anchor = this.#anchor();
    const { href, target, title } = this;

    switch (attr) {
      case "href":
        anchor.href = href;
        break;

      case "target":
        anchor.target = target;
        break;

      case "title":
        anchor.target = title;
        break;
    }
  }
}
