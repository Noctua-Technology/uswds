import { injectable } from "@joist/di";
import {
  attr,
  attrChanged,
  css,
  element,
  html,
  listen,
  query,
} from "@joist/element";

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
      * {
        box-sizing: border-box
      }
      
      :host {
        --usa-combo-max-height: 12.5em;

        display: block;
        max-width: 30rem;
        position: relative;
        margin-bottom: 1.5rem;
      }
      
      input {
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        height: 2.5rem;
        line-height: 1.3;
        font-size: 1.06rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
        padding-right: 2.8rem;
      }

      input:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      ul {
        padding: 0;
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: translateY(100%);
        margin: 0;
        border: 1px solid rgb(92, 92, 92);
        max-height: var(--usa-combo-max-height);
        overflow-y: scroll;
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

      .usa-combo-box-icon {
        display: block;
        position: absolute;
        bottom: 0rem;
        right: 0.5rem;
        cursor: pointer;
      }

      .usa-combo-box-icon .line {
        width: 1px;
        top: 0.3rem;
        bottom: 0.5rem;
        left: -0.3rem;
        position: absolute;
        background-color: #c6cace;
      }
    `,
    html`
      <label>
        <slot name="label"></slot>

        <input 
          tabindex="0" 
          role="combobox" 
          autocomplete="off" 
          aria-controls="combo-box-list" 
          aria-expanded="false"
        />

        <div class="usa-combo-box-icon">
          <div class="line"></div>

          <usa-icon icon="expand_more"></usa-icon>
        </div>
      </label>

      <ul tabindex="-1" role="listbox" id="combo-box-list"></ul>
    `,
  ],
})
export class USAComboBoxElement
  extends HTMLElement
  implements ComboBoxContainer
{
  static formAssociated = true;

  @attr()
  accessor name = "";

  @attr()
  accessor required = false;

  @attr()
  accessor value = "";

  @attr()
  accessor placeholder = "";

  list = query("ul");
  input = query("input");
  currentItemEl: Element | null = null;

  #allListItems = new Set<HTMLLIElement>();
  #internals = this.attachInternals();

  attributeChangedCallback() {
    this.input({
      name: this.name,
      placeholder: this.placeholder,
      required: this.required,
    });
  }

  @attrChanged("value", "required")
  onValueChanged() {
    this.#syncFormState();
  }

  connectedCallback() {
    this.#syncFormState();
  }

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

    this.input({ ariaExpanded: "true" });

    const fragment = document.createDocumentFragment();

    for (const item of this.#allListItems) {
      fragment.append(item);
    }

    list.replaceChildren(fragment);
  }

  @listen("input")
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

        this.input({ ariaExpanded: "false" });
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

    this.input().focus();

    this.list({ innerHTML: "" });

    this.value = value;
  }

  @listen("click")
  onClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      const value = e.target.getAttribute("value");

      if (value) {
        this.input().focus();

        this.list({ innerHTML: "" });

        this.currentItemEl = null;

        this.value = value;
      }
    }
  }

  #syncFormState() {
    const input = this.input({ value: this.value });

    this.#internals.setValidity({});
    this.#internals.setFormValue(this.value);

    if (input.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        input.validationMessage,
        input,
      );
    }
  }
}
