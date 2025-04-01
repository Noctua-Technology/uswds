import { css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-autocomplete": USAAutocompleteElement;
  }
}

@element({
  tagName: "usa-autocomplete",
  shadowDom: [
    css`
      :host {
        display: flex;
        max-width: 30rem;
        flex-direction: column;
      }

      ul {
        padding: 0; margin: 0;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }

      ul li {
        list-style: none;
        border-bottom: 1px solid #e6e6e6;
        cursor: pointer;
        display: block;
        padding: 0.5rem;
      }

      ::slotted(:is(input, usa-input)) {
        margin-bottom: 0;
      }
    `,
    html`
      <slot name="input"></slot>

      <ul></ul>
    `,
  ],
})
export class USAAutocompleteElement extends HTMLElement {
  list = query("ul");
  input = query<HTMLInputElement>('[slot="input"]', this);
  items: string[] = [];
  currentItemEl: Element | null = null;
  currentItem: string | null = null;

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list({ innerHTML: "" });

    this.currentItemEl = null;

    list.innerHTML = "";

    const filteredItems = this.search(input.value);

    for (const item of filteredItems) {
      const li = document.createElement("li");

      li.innerHTML = item;
      li.dataset.value = item;
      li.tabIndex = -1;

      list.append(li);
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

      case "ESCAPE": {
        e.preventDefault();

        this.currentItemEl = null;

        this.list({
          innerHTML: "",
        });

        break;
      }
    }
  }

  search(val: string) {
    if (!val) {
      return [];
    }

    return this.items.filter((item) =>
      item.toLowerCase().startsWith(val.toLowerCase()),
    );
  }
}
