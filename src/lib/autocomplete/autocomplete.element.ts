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
        display: contents;
      }

      ul {
        padding: 0; margin: 0;
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
  currentItem: Element | null = null;

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list({ innerHTML: "" });

    this.currentItem = null;

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
        this.currentItem = null;
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

        if (this.currentItem && this.currentItem.nextElementSibling === null) {
          // last item in current list
          break;
        }

        if (this.currentItem === null) {
          // if there is no current item, set the first item as the current item
          this.currentItem = list.firstElementChild;
        } else {
          // if there is a current item, set the next item as the current item
          this.currentItem = this.currentItem.nextElementSibling;
        }

        if (this.currentItem instanceof HTMLElement) {
          this.currentItem.focus();
        }

        break;
      }

      case "ARROWUP": {
        e.preventDefault();

        if (this.currentItem?.previousElementSibling) {
          this.currentItem = this.currentItem.previousElementSibling;

          if (this.currentItem instanceof HTMLElement) {
            this.currentItem.focus();
          }
        }

        break;
      }

      case "ENTER": {
        e.preventDefault();

        this.currentItem = null;

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

        this.currentItem = null;

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
