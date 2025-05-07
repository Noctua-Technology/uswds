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
        --usa-input-bg-color: #fff;
        --usa-input-border-color: #5c5c5c;
        --usa-input-text-color: #1b1b1b;
        --usa-input-focus-color: #2491ff;
        --usa-input-disabled-bg-color: #fff;
        --usa-input-disabled-border-color: #757575;
        --usa-input-disabled-text-color: #757575;
        --usa-input-radius: 0;

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
        border-radius: var(--usa-input-radius);
        color: var(--usa-input-text-color);
        display: block;
        padding: .5rem;
        border-width: 1px;
        border-color: var(--usa-input-border-color);
        border-style: solid;
        background-color: var(--usa-input-bg-color);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        resize: none;
        flex-grow: 1;
      }

      textarea:not(:disabled):focus {
        outline: 0.25rem solid var(--usa-input-focus-color);
        outline-offset: 0;
      }

      textarea:disabled {
        background-color: var(--usa-input-disabled-bg-color);
        border-color: var(--usa-input-disabled-border-color);
        color: var(--usa-input-disabled-text-color);
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
