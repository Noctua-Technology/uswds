import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-range-slider": USARangeSliderElement;
  }
}

@element({
  tagName: "usa-range-slider",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: 30rem;
      }

      input {
        height: 2.5rem;
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        width: 100%; /* Specific width is required for Firefox. */
        background: transparent; /* Otherwise white in Chrome */
        border-radius: 0;
        color: #1b1b1b;
        display: block;
        margin-top: .5rem;
      }

      input:focus {
        outline: .25rem solid #2491ff;
        outline-offset: 0;
      }

      /* Special styling for WebKit/Blink */
      input::-webkit-slider-thumb {
        height: 1.25rem;
        border-radius: 99rem;
        width: 1.25rem;
        background: #f0f0f0;
        border: 0;
        box-shadow: 0 0 0 2px #757575;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        margin-top: -.19rem;
      }

      input::-webkit-slider-runnable-track {
        background-color: #f0f0f0;
        border-radius: 99rem;
        border: 1px solid #757575;
        cursor: pointer;
        height: 1rem;
        width: 100%;
      }
    `,
    html`
      <label>
        <slot></slot>
      </label>

      <input type="range">
    `,
  ],
})
export class USARangeSliderElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor name = "";

  @attr()
  accessor value = "";

  @attr()
  accessor min = "0";

  @attr()
  accessor max = "100";

  @attr()
  accessor step = "1";

  #label = query("label");
  #input = query("input");
  #internals = this.attachInternals();

  attributeChangedCallback() {
    this.#label({ htmlFor: this.name });

    this.#input({
      name: this.name,
      value: this.value,
      min: this.min,
      max: this.max,
      step: this.step,
    });

    this.#internals.setFormValue(this.value);
  }

  @listen("change")
  onInputChange() {
    const input = this.#input();

    this.value = input.value;
  }
}
