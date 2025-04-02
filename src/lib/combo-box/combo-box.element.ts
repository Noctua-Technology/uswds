import { css, element, html, listen, query, queryAll } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-combo-box": USAComboBoxElement;
  }
}

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
export class USAComboBoxElement extends HTMLElement {
  list = query("ul");
  input = query<HTMLInputElement>('[slot="input"]', this);
  datalist = queryAll<HTMLOptionElement>("datalist option", this);
  currentItemEl: Element | null = null;

  listItems() {
    return this.list().querySelectorAll("li");
  }

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list({ innerHTML: "" });

    this.currentItemEl = null;

    list.innerHTML = "";

    const filteredItems = this.search(input.value);

    for (const item of filteredItems) {
      const li = this.#createListItem(item);

      list.append(li);
    }
  }

  @listen("focusin")
  onFocusIn(e: Event) {
    if (e.target instanceof HTMLElement) {
      if (e.target.getAttribute("slot") === "input") {
        const list = this.list();
        const input = this.input();

        if (!input.value) {
          for (const item of this.datalist()) {
            const li = this.#createListItem(item.value);

            list.append(li);
          }
        }
      }
    }
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
  onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const key = e.key.toUpperCase();
    const list = this.list();

    switch (key) {
      case "ARROWDOWN": {
        e.preventDefault();

        if (
          this.currentItemEl &&
          this.currentItemEl.nextElementSibling === null
        ) {
          // last item in current list
          break;
        }

        if (this.currentItemEl === null) {
          // if there is no current item, set the first item as the current item
          this.currentItemEl = list.firstElementChild;
        } else {
          // if there is a current item, set the next item as the current item
          this.currentItemEl = this.currentItemEl.nextElementSibling;
        }

        if (this.currentItemEl instanceof HTMLElement) {
          this.currentItemEl.focus();
        }

        break;
      }

      case "ARROWUP": {
        e.preventDefault();

        if (this.currentItemEl?.previousElementSibling) {
          this.currentItemEl = this.currentItemEl.previousElementSibling;

          if (this.currentItemEl instanceof HTMLElement) {
            this.currentItemEl.focus();
          }
        }

        break;
      }

      case "ENTER": {
        e.preventDefault();

        this.currentItemEl = null;

        this.input({
          value: target.dataset.value,
        });

        this.list({
          innerHTML: "",
        });

        break;
      }
    }
  }

  search(val: string) {
    const res: string[] = [];

    for (const option of this.datalist()) {
      if (option.value.toLowerCase().startsWith(val.toLowerCase())) {
        res.push(option.value);
      }
    }

    return res;
  }

  #createListItem(item: string) {
    const li = document.createElement("li");
    li.innerHTML = item;
    li.dataset.value = item;
    li.tabIndex = -1;

    li.addEventListener("click", () => {
      const input = this.input();
      const list = this.list();

      this.currentItemEl = null;
      input.value = item;
      list.innerHTML = "";
    });

    return li;
  }
}
