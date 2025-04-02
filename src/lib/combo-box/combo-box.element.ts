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
        display: flex;
        max-width: 30rem;
        flex-direction: column;
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
        max-height: 12.1em;
        overflow-y: scroll;
        overflow-x: visible;
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
        padding: 0.5rem;
      }

      ul li:hover {
        background-color: #f0f0f0;
      }

      li:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: -0.25rem;
      }

      ::slotted(:is(input, usa-input)) {
        margin-bottom: 0;
      }
    `,
    html`
      <slot name="input"></slot>
      <ul tabindex="-1"></ul>
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

  @listen("focusin", (host) => host)
  onFocusIn(e: FocusEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.getAttribute("slot") === "input") {
        const list = this.list();

        for (const item of this.#allListItems) {
          if (!list.contains(item)) {
            list.append(item);
          }
        }
      }
    }
  }

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list();

    this.currentItemEl = null;

    for (const item of this.#allListItems) {
      if (
        item.dataset.value?.toLowerCase().startsWith(input.value.toLowerCase())
      ) {
        if (!list.contains(item)) {
          list.append(item);
        }
      } else {
        item.remove();
      }
    }
  }

  @listen("focusout")
  onFocusOut() {
    setTimeout(() => {
      // This needs to be in a timeout so that it runs as part of the next loop.
      // the active element will not be set until after all of the focus and blur events are done
      if (!this.contains(document.activeElement)) {
        this.list({ textContent: "" });
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

    this.list({ textContent: "" });
  }

  @listen("click")
  onClick(e: MouseEvent) {
    if (e.target instanceof HTMLLIElement) {
      const value = e.target.dataset.value || "";

      this.input({
        value,
        selectionStart: value.length,
        selectionEnd: value.length,
      }).focus();

      this.list({ textContent: "" });

      this.currentItemEl = null;
    }
  }
}
