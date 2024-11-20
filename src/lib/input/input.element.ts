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
  accessor name = "";

  @attr()
  accessor autocomplete: AutoFill = "on";

  @attr()
  @observe()
  accessor value = "";

  #internals = this.attachInternals();
  #input = query("input");

  @ready()
  onReady() {
    this.#internals.setFormValue(this.value);
    this.#input({ value: this.value, autocomplete: this.autocomplete });
  }

  @effect()
  onChange() {
    this.#internals.setFormValue(this.value);
    this.#input({ value: this.value, autocomplete: this.autocomplete });
  }

  @listen("change", "input")
  onInputChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.#internals.setFormValue(e.target.value);
    }
  }
}
