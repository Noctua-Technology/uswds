import { attr, css, element, html, listen, query, ready } from "@joist/element";
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
export class USATextInputElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @observe()
  accessor name = "";

  @attr()
  @observe()
  accessor autocomplete: AutoFill = "on";

  @attr()
  @observe()
  accessor placeholder: AutoFill = "on";

  @observe()
  accessor value = "";

  selectionStart: number | null = null;

  #internals = this.attachInternals();
  internalInput = query("input");

  setSelectionRange(start: number, end: number) {
    const input = this.internalInput();

    input.setSelectionRange(start, end);

    this.selectionStart = start;
  }

  @effect()
  onChange() {
    const input = this.internalInput();

    // set internal input value
    input.value = this.value;
    input.autocomplete = this.autocomplete;
    input.placeholder = this.placeholder;

    // set form value
    this.#internals.setFormValue(this.value);
  }

  @listen("input", (el) => el.internalInput())
  onInputChange() {
    const input = this.internalInput();

    this.#internals.setFormValue(input.value);

    this.value = input.value;
    this.selectionStart = input.selectionStart;
  }
}
