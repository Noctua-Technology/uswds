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
        display: flex;
        flex-direction: column;
        font-weight: 400;
        margin-bottom: 1.5rem;
        max-width: 30rem;
        position: relative;
        height: 9lh;
        gap: 0.5rem;
      }

      textarea {
        font-family: inherit;
        font-size: inherit;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        max-width: 30rem;
        padding: .5rem;
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        resize: none;
        flex-grow: 1;
      }

      textarea:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }
    `,
    html`
      <label for="textarea">
        <slot></slot>
      </label>
      
      <textarea id="textarea"></textarea>
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
    this.#input({ autofocus: this.autofocus });
  }

  attributeChangedCallback() {
    this.#input({
      name: this.name,
      placeholder: this.placeholder,
      autocomplete: this.autocomplete,
      required: this.required,
    });
  }

  connectedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange() {
    this.#input({ value: this.value });

    this.#syncFormState();
  }

  @listen("input")
  onInputChange() {
    this.value = this.#input().value;
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setFormValue(input.value);
    this.#internals.setValidity({});

    if (input.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        input.validationMessage,
        input,
      );
    }
  }
}
