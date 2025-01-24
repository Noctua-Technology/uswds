import { attr, css, element, html, listen, query, ready } from "@joist/element";
import { effect, observe } from "@joist/observable";

declare global {
  interface HTMLElementTagNameMap {
    "usa-textarea": USATextareaElement;
  }
}

@element({
  tagName: "usa-textarea",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        max-width: 30rem;
        margin-bottom: 1.5rem;
        position: relative;
        height: calc(6lh + .5rem);
      }

      textarea {
        font-family: inherit;
        font-size: inherit;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        margin-top: .5rem;
        max-width: 30rem;
        padding: .5rem;
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        height: 100%;
        resize: none;
      }

      textarea:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }
    `,
    html`
      <label>
        <slot></slot>

        <textarea></textarea>
      </label>
    `,
  ],
})
export class USATextareaElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor name = "";

  @attr()
  accessor autocomplete: AutoFill = "on";

  @attr()
  accessor placeholder = "";

  @attr()
  accessor required = false;

  @attr({
    reflect: false,
  })
  @observe()
  accessor value = "";

  #internals = this.attachInternals();
  #input = query("textarea");

  @ready()
  onReady() {
    const input = this.#input();
    input.autofocus = this.autofocus;
  }

  connectedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange() {
    this.#input({
      value: this.value,
    });

    this.#syncFormState();
  }

  @listen("input")
  onInputChange() {
    this.value = this.#input().value;
  }

  attributeChangedCallback() {
    this.#input({
      name: this.name,
      placeholder: this.placeholder,
      autocomplete: this.autocomplete,
    });
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setFormValue(input.value);

    if (this.required && !input.value) {
      this.#internals.setValidity({ valueMissing: true }, "Required", input);
    } else {
      this.#internals.setValidity({});
    }
  }
}
