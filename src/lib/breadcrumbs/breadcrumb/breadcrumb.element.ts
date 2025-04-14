import { attr, css, element, html, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-breadcrumb": USABreadcrumbElement;
  }
}

@element({
  tagName: "usa-breadcrumb",
  shadowDom: [
    css`
      :host {
        position: relative;
        right: auto;
        display: inline;
        max-width: unset;
        padding-right: 1.5rem;
      }

      :host(:last-child) usa-icon {
        display: none;
      }

      a[href] {
        color: #005ea2;
        display: inline;
        text-decoration: underline;
      }

      usa-icon {
        height: 1rem;
        width: 1.5rem;
        position: absolute;
        top: .075rem;
      }
    `,
    html`
      <a>
        <slot></slot>
      </a>

      <usa-icon icon="navigate_next"></usa-icon>
    `,
  ],
})
export class USABreadcrumbElement extends HTMLElement {
  @attr()
  accessor href = "";

  @attr()
  accessor role = "listitem";

  #a = query("a");

  attributeChangedCallback() {
    this.#a({ href: this.href });
  }
}
