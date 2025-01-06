import { inject, injectable, injected } from "@joist/di";
import { attr, css, element } from "@joist/element";

import { IconService } from "../services/icon.service.js";
import type { USAIcon } from "./icon-types.js";

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

  #icon = inject(IconService);
  #injected = false;

  @injected()
  onInjected() {
    this.#injected = true;
    this.#updateIcon();
  }

  attributeChangedCallback() {
    if (this.#injected) {
      this.#updateIcon();
    }
  }

  async #updateIcon() {
    const icon = this.#icon();

    if (this.shadowRoot) {
      this.shadowRoot.append(await icon.getIcon(this.icon));
    }
  }
}
