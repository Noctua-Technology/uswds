import { attr, css, element, html, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-pagination-no": USAPaginationNoElement;
  }
}

@element({
  tagName: "usa-pagination-no",
  shadowDom: [
    css`
      :host {
        align-items: center;
        border-color: rgba(27, 27, 27, .2);
        border-radius: .25rem;
        border-style: solid;
        border-width: 1px;
        color: #005ea2;
        display: inline-flex;
        justify-content: center;
        width: 100%;
      }

      a {
        display: inline-flex;
        justify-content: center;
        text-decoration: underline;
        cursor: pointer;
        padding: .5rem;
        color: inherit;
      }

      :host([active]) {
        background-color: #1b1b1b;
        border-color: transparent;
        color: #fff;
      }   
    `,
    html`
      <a>
        <slot></slot>
      </a>
    `,
  ],
})
export class USAPaginationNoElement extends HTMLElement {
  @attr()
  accessor href = "#";

  @attr()
  accessor active = false;

  #a = query("a");

  attributeChangedCallback() {
    this.#a({ href: this.href });
  }
}
