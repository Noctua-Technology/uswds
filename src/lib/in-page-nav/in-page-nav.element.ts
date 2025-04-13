import { attr, css, element, html, queryAll } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-in-page-nav": USAInPageNavElement;
  }
}

@element({
  tagName: "usa-in-page-nav",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        margin-top: 0;
        padding: 0;
        max-width: 15rem;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USAInPageNavElement extends HTMLElement {
  @attr()
  accessor role = "list";

  items = queryAll("usa-in-page-nav-item", this);

  #observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          for (const item of this.items()) {
            item.active = entry.target === item.targetElement;
          }

          break;
        }
      }
    },
    { rootMargin: "0px 0px -60% 0px" },
  );

  connectedCallback() {
    const items = this.items();

    for (const item of items) {
      if (item.targetElement) {
        this.#observer.observe(item.targetElement);
      }
    }
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }
}
