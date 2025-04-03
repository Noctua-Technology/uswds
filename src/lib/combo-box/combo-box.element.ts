import { injectable } from "@joist/di";
import { css, element, html, listen, query } from "@joist/element";

import { COMBO_BOX_CTX, type ComboBoxContainer } from "./context.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-combo-box": USAComboBoxElement;
  }
}

@injectable({
  name: "usa-combo-box-ctx",
  provideSelfAs: [COMBO_BOX_CTX],
})
@element({
  tagName: "usa-combo-box",
  shadowDom: [
    css`
      :host {
        --usa-combo-max-height: 12.5em;

        display: block;
        max-width: 30rem;
        position: relative;
      }

      ul {
        padding: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        margin: 0;
        border: 1px solid rgb(92, 92, 92);
        max-height: var(--usa-combo-max-height);
        overflow-y: scroll;
        overflow-x: visible;
        z-index: 1001;
      }

      ul:empty {
        border: none;
      }

      ul li {
        background: #ffff;
        list-style: none;
        border-bottom: 1px solid #e6e6e6;
        cursor: pointer;
        display: block;
      }

      ul li:hover {
        background-color: #f0f0f0;
      }

      li:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: -0.25rem;
      }
    `,
    html`
      <slot name="input"></slot>
      <ul tabindex="-1" role="listbox"></ul>
    `,
  ],
})
export class USAComboBoxElement
  extends HTMLElement
  implements ComboBoxContainer
{
  list = query("ul");
  input = query<HTMLInputElement>('[slot="input"]', this);
  currentItemEl: Element | null = null;
  #allListItems = new Set<HTMLLIElement>();

  listItems() {
    return this.list().querySelectorAll("li");
  }

  addOption(el: HTMLLIElement) {
    this.#allListItems.add(el);
  }

  removeOption(el: HTMLLIElement) {
    this.#allListItems.delete(el);
  }

  @listen("focus", (host) => host.input())
  onFocusIn() {
    this.currentItemEl = null;

    const list = this.list();

    const fragment = document.createDocumentFragment();

    for (const item of this.#allListItems) {
      fragment.append(item);
    }

    list.replaceChildren(fragment);
  }

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list();

    this.currentItemEl = null;

    const fragment = document.createDocumentFragment();

    for (const item of this.#allListItems) {
      if (
        item.dataset.value?.toLowerCase().startsWith(input.value.toLowerCase())
      ) {
        fragment.append(item);
      }
    }

    list.replaceChildren(fragment);
  }

  @listen("focusout")
  onFocusOut() {
    setTimeout(() => {
      // This needs to be in a timeout so that it runs as part of the next loop.
      // the active element will not be set until after all of the focus and blur events are done
      if (!this.contains(document.activeElement)) {
        this.list({ innerHTML: "" });
        this.currentItemEl = null;
      }
    }, 0);
  }

  @listen("keydown")
  onArrowDown(e: KeyboardEvent): void {
    if (e.key.toUpperCase() !== "ARROWDOWN") {
      return;
    }

    e.preventDefault();

    if (this.currentItemEl === null) {
      // if there is no current item, set the first item as the current item
      const list = this.list();

      this.currentItemEl = list.firstElementChild;
    } else if (this.currentItemEl.nextSibling) {
      // if there is a current item, set the next item as the current item
      this.currentItemEl = this.currentItemEl.nextElementSibling;
    }

    if (this.currentItemEl instanceof HTMLElement) {
      this.currentItemEl.focus();
    }
  }

  @listen("keydown")
  onArrowUp(e: KeyboardEvent): void {
    if (e.key.toUpperCase() !== "ARROWUP") {
      return;
    }

    e.preventDefault();

    if (this.currentItemEl?.previousElementSibling) {
      this.currentItemEl = this.currentItemEl.previousElementSibling;

      if (this.currentItemEl instanceof HTMLElement) {
        this.currentItemEl.focus();
      }
    } else {
      this.input().focus();
      this.currentItemEl = null;
    }
  }

  @listen("keydown")
  onEnter(e: KeyboardEvent): void {
    if (e.key.toUpperCase() !== "ENTER") {
      return;
    }

    e.preventDefault();

    const target = e.target as HTMLElement;

    this.currentItemEl = null;

    const value = target.dataset.value || "";

    this.input({
      value,
      selectionStart: value.length,
      selectionEnd: value.length,
    }).focus();

    this.list({ innerHTML: "" });
  }

  @listen("click")
  onClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      const value = e.target.getAttribute("value");

      if (value) {
        this.input({
          value,
          selectionStart: value.length,
          selectionEnd: value.length,
        }).focus();

        this.list({ innerHTML: "" });

        this.currentItemEl = null;
      }
    }
  }
}
