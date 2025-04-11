import { attr, css, element, html, listen, query } from "@joist/element";

import { USASearchEvent } from "./search.event.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-search": USASearchElement;
  }
}

@element({
  tagName: "usa-search",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        position: relative;
      }

      form {
        display: flex;
        align-items: flex-end
      }

      usa-input {
        flex-grow: 1;
      }

      usa-button {
        margin-bottom: 1.5rem;
        height: 2.5rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        position: relative;
      }
    `,
    html`
      <form>
        <usa-input>
          <slot></slot>
        </usa-input>

        <usa-button type="submit">Search</usa-button>
      </form>
    `,
  ],
})
export class USASearchElement extends HTMLElement {
  @attr()
  accessor name = "search";

  @attr()
  accessor placeholder = "Search";

  @attr()
  accessor required = false;

  @attr()
  accessor disabled = false;

  @attr()
  accessor autocomplete: AutoFill = "off";

  @attr()
  accessor value = "";

  #input = query("usa-input");

  attributeChangedCallback() {
    this.#input({
      name: this.name,
      placeholder: this.placeholder,
      required: this.required,
      disabled: this.disabled,
      autocomplete: this.autocomplete,
      value: this.value,
    });
  }

  @listen("submit", "form")
  onSubmit(e: Event) {
    const event = new USASearchEvent(this.value);

    this.dispatchEvent(event);

    console.log(event.defaultPrevented);

    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }
}
