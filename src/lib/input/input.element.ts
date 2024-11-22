import { attr, css, element, html, listen, query } from "@joist/element";

import { MaskableElement } from "../input-mask/maskable.element.js";
import { effect, observe } from "@joist/observable";

@element({
  tagName: "usa-input",
  shadow: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        max-width: 30rem;
      }

      input {
        border-width: 1px;
        border-color: #5c5c5c;
        border-style: solid;
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        height: 2.5rem;
        line-height: 1.3;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      input:not(disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }
    `,
    html`
      <label>
        <slot></slot>

        <input />
      </label>
    `,
  ],
})
export class USATextInputElement
  extends HTMLElement
  implements MaskableElement
{
  static formAssociated = true;

  @attr()
  accessor name = "";

  @attr()
  accessor autocomplete: AutoFill = "on";

  @attr()
  accessor placeholder = "";

  @attr({
    reflect: false,
  })
  @observe()
  accessor value = "";

  get selectionStart() {
    return this.internalInput().selectionStart;
  }

  #internals = this.attachInternals();

  internalInput = query("input");

  setSelectionRange(start: number, end: number) {
    const input = this.internalInput();

    input.setSelectionRange(start, end);
  }

  @effect()
  onChange() {
    const input = this.internalInput();
    input.value = this.value;
  }

  @listen("input", (el) => el.internalInput())
  onInputChange() {
    const input = this.internalInput();

    this.#internals.setFormValue(input.value);

    this.value = input.value;
  }

  attributeChangedCallback(attr: string) {
    const input = this.internalInput();

    const changes: Record<string, Function> = {
      autocomplete: () => {
        input.autocomplete = this.autocomplete;
      },
      placeholder: () => {
        input.placeholder = this.placeholder;
      },
      name: () => {
        input.name = this.name;
      },
      value: () => {
        input.value = this.value;
        this.#internals.setFormValue(this.value);
      },
    };

    const changeFn = changes[attr];

    if (changeFn) {
      changeFn();
    }
  }
}
