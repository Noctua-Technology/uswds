import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-modal": USAModalElement;
  }
}

@element({
  tagName: "usa-modal",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: contents;
      }

      dialog {
        border: none;
        font-size: 1.06rem;
        line-height: 1.5;
        border-radius: 0.5rem;
        background: #fff;
        color: #1b1b1b;
        max-width: 30rem;
        padding-top: 4rem;
        padding-left: 4rem;
        padding-right: 4rem;
        padding-bottom: 2rem;
        position: relative;
        width: 100%;
      }

      ::backdrop {
        background: rgba(0, 0, 0, 0.7);
      }
    `,
    html`
      <dialog>
        <slot></slot>
      </dialog>
    `,
  ],
})
export class USAModalElement extends HTMLElement {
  @attr()
  accessor open = false;

  #dialog = query("dialog");

  attributeChangedCallback() {
    if (this.isConnected && this.open) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  connectedCallback() {
    if (this.open) {
      this.openModal();
    }
  }

  openModal() {
    const dialog = this.#dialog();

    dialog.showModal();
  }

  closeModal() {
    const dialog = this.#dialog();

    dialog.close();
  }

  @listen("click", () => document.body)
  onGlobalModalAction(e: Event) {
    if (e.target instanceof Element) {
      const modalTarget = e.target.getAttribute("modal-target");

      if (modalTarget === this.id) {
        this.openModal();
      }
    }
  }

  @listen("click", (host) => host)
  onModalAction(e: Event) {
    if (e.target instanceof Element) {
      const action = e.target.getAttribute("modal-action");

      switch (action) {
        case "confirm":
          this.closeModal();
          break;

        case "cancel":
          this.closeModal();
          break;

        case "close":
          this.closeModal();
          break;
      }
    }
  }
}
