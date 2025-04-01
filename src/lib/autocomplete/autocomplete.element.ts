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
  focusedIndex: number | null = null;

  @listen("input", (host) => host)
  async onInput() {
    const input = this.input();
    const list = this.list({ innerHTML: "" });

    this.focusedIndex = null;

    list.innerHTML = "";

    const filteredItems = this.search(input.value);

    for (const item of filteredItems) {
      const li = document.createElement("li");

      const btn = document.createElement("button");
      btn.innerHTML = item;
      btn.dataset.value = item;
      btn.tabIndex = -1;

      li.append(btn);
      list.append(li);
    }
  }

  @listen("keydown")
  onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const key = e.key.toUpperCase();
    const focusable = this.list().querySelectorAll("button");

    switch (key) {
      case "ARROWDOWN": {
        e.preventDefault();

        if (this.focusedIndex === focusable.length - 1) {
          break;
        }

        if (this.focusedIndex === null) {
          this.focusedIndex = 0;
        } else {
          this.focusedIndex = this.focusedIndex + 1;
        }

        const focusableItem = focusable[this.focusedIndex];

        if (focusableItem) {
          focusableItem.focus();
        }

        break;
      }

      case "ARROWUP": {
        e.preventDefault();

        if (this.focusedIndex !== null && this.focusedIndex > 0) {
          this.focusedIndex = this.focusedIndex - 1;

          const focusableItem = focusable[this.focusedIndex];

          if (focusableItem) {
            focusableItem.focus();
          }
        }

        break;
      }

      case "ENTER": {
        e.preventDefault();

        this.focusedIndex = null;

        this.input({
          value: target.dataset.value,
        });

        this.list({
          innerHTML: "",
        });

        break;
      }

      case "ESCAPE": {
        this.focusedIndex = null;

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
