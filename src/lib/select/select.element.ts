import { type Injector, created, injectable } from "@joist/di";
import { attr, css, element, html, listen, query } from "@joist/element";

import { SELECT_CONTEXT } from "./context.js";

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
        line-height: 1.3;
        position: relative;
        width: 100%;
        max-width: 30rem;
        margin-bottom: 1.5rem;
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
@injectable()
export class USASelectElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr()
  accessor required = false;

  #select = query("select");
  #internals = this.attachInternals();

  connectedCallback() {
    const select = this.#select();
    select.value = this.value;
    select.name = this.name;

    this.#syncFormState();
  }

  attributeChangedCallback() {
    const select = this.#select();
    select.value = this.value;
    select.name = this.name;

    this.#syncFormState();
  }

  @created()
  onCreated(injector: Injector) {
    injector.providers.set(SELECT_CONTEXT, { factory: () => this });
  }

  @listen("change")
  onSelectChange() {
    const select = this.#select();

    this.value = select.value;

    this.#syncFormState();
  }

  addSelectOption(option: HTMLOptionElement) {
    const select = this.#select();
    select.append(option);
  }

  #syncFormState() {
    this.#internals.setFormValue(this.value);
    this.#internals.setValidity({});

    if (this.required && !this.value) {
      this.#internals.setValidity(
        { valueMissing: true },
        "Please select an option",
        this.#select(),
      );
    }
  }
}
