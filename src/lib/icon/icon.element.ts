import { attr, css, element } from "@joist/element";
import { inject, injectable } from "@joist/di";

import { USAIcon } from "./icon-types.js";
import { USAConfig } from "../config/config.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-icon": USAIconElement;
  }
}

@element({
  tagName: "usa-icon",
  shadowDom: [
    css`
      :host {
        display: inline-block;
        height: 2rem;
        position: relative;
        width: 2rem;
      }

      svg {
        fill: currentColor;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
@injectable()
export class USAIconElement extends HTMLElement {
  @attr()
  accessor icon: USAIcon = "accessibility_new";

  ariaHidden: string | null = "true";

  #shadow = this.attachShadow({ mode: "open" });
  #config = inject(USAConfig);
  #connected = false;

  connectedCallback() {
    this.#connected = true;
    this.#updateIcon();
  }

  attributeChangedCallback() {
    if (this.#connected) {
      this.#updateIcon();
    }
  }

  async #updateIcon() {
    this.#shadow.innerHTML = await this.fetchIcon();
  }

  async fetchIcon() {
    const config = this.#config();
    const cached = config.iconCache.get(this.icon);

    if (cached) {
      return cached;
    }

    const svg = fetch(`${config.iconPath}${this.icon}.svg`).then((res) => {
      switch (res.status) {
        case 200:
          return res.text();
      }

      return "";
    });

    config.iconCache.set(this.icon, svg);

    return svg;
  }
}
