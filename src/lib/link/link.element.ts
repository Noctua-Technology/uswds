import { attr, css, element, html, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-link": USALinkElement;
  }
}

@element({
  tagName: "usa-link",
  shadowDom: [
    css`
      :host {
        display: inline-flex;
        color: #005ea2;
        text-decoration: underline;
      }

      a {
        color: inherit;
        text-decoration: inherit;
        display: inherit;
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

  @attr({
    observed: false,
  })
  accessor disabled = false;

  #anchor = query("a");

  attributeChangedCallback(attr: string) {
    const anchor = this.#anchor();

    switch (attr) {
      case "href":
        anchor.href = this.href;
        break;

      case "target":
        anchor.target = this.target;
        break;

      case "title":
        anchor.target = this.title;
        break;
    }
  }
}
