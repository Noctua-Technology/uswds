import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-in-page-nav-item": USAInPageNavItemElement;
  }
}

@element({
  tagName: "usa-in-page-nav-item",
  shadowDom: [
    css`
      :host {
        border-left: solid .25rem transparent;
        display: flex;
        font-size: .93rem;
        line-height: 1.1;
        position: relative;
      }

      a {
        color: #005ea2;
        padding: .5rem 1rem;
        text-decoration: none;
      }

      :host([primary]) a {
        font-weight: bold;
      }

      :host([active]) a {
        color: #1b1b1b;
      }

      :host([active]) {
        border-color: #1b1b1b;
        color: #1b1b1b;
      }
    `,
    html`
      <a>
        <slot></slot>
      </a>
    `,
  ],
})
export class USAInPageNavItemElement extends HTMLElement {
  @attr()
  accessor role = "listitem";

  @attr()
  accessor primary = false;

  @attr()
  accessor target = "";

  @attr()
  accessor active = false;

  get targetElement() {
    return document.getElementById(this.target);
  }

  #a = query("a");

  attributeChangedCallback() {
    this.#a({ href: `#${this.target}` });
  }

  @listen("click")
  async onClick(e: Event) {
    e.preventDefault();

    if (this.targetElement) {
      this.targetElement.scrollIntoView({ behavior: "smooth" });
    }

    history.pushState(null, "", `#${this.target}`);
  }
}
