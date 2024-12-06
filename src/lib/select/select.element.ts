import { attr, css, element, html, listen, query } from "@joist/element";

import type { USASelecOptionElement } from "./select-option.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-select": USASelectElement;
  }
}

@element({
  tagName: "usa-select",
  shadowDom: [
    css`
      :host {
        display: block;
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        line-height: 1.3;
        position: relative;
        width: 100%;
        max-width: 30rem;
      }

      select {
        font-size: 1.06rem;
        appearance: none;
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        height: 2.5rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      select:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      usa-icon {
        position: absolute;
        right: 0.5rem;
        bottom: 12%;
        height: 1.5rem;
        width: 1.5rem;
      }
    `,
    html`
      <usa-icon icon="unfold_more"></usa-icon>

      <label>
        <div class="label">
          <slot></slot>
        </div>

        <select></select>
      </label>
    `,
  ],
})
export class USASelectElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  #select = query("select");
  #internals = this.attachInternals();

  connectedCallback() {
    const select = this.#select();
    select.value = this.value;
    select.name = this.name;

    this.#internals.setFormValue(this.value);
  }

  @listen("change")
  onSelectChange() {
    const select = this.#select();

    this.#internals.setFormValue(select.value);
  }

  onOptionAdded(el: USASelecOptionElement) {
    const option = document.createElement("option");
    option.value = el.value;
    option.innerHTML = el.innerHTML;
    option.id = this.#createId(el.value);

    const select = this.#select();

    select.append(option);
  }

  onOptionRemoved(el: USASelecOptionElement) {
    const select = this.#select();
    const option = select.querySelector(`#${this.#createId(el.value)}`);

    if (option) {
      option.remove();
    }
  }

  #createId(val: string) {
    return val.split(" ").join("-").toLowerCase();
  }
}
