import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-checkbox": USACheckboxElement;
  }
}

@element({
  tagName: "usa-checkbox",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: inline-block;
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        max-width: 30rem;
      }

      :host([tiled]) label {
        background-color: #fff;
        border: 2px solid #c9c9c9;
        border-radius: 0.25rem;
        color: #1b1b1b;
        padding: 0.75rem 1rem 0.75rem 0.75rem;
      }

      label {
        display: inline-flex;
        cursor: pointer;
        font-size: 1.06rem;
        line-height: 1.3;
        flex-wrap: wrap;
      }

      .checkbox {
        background: #fff;
        box-shadow: 0 0 0 2px #1b1b1b;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        width: 1.25rem;
        border-radius: 2px;
        position: relative;
        margin-right: 0.75rem;
      }

      input:checked + .checkbox {
        background-color: #005ea2;
        box-shadow: 0 0 0 2px #005ea2;
      }

      input:checked + .checkbox::after {
        content: " ";
        display: block;
        height: 1rem;
        width: 0.5rem;
        border-right: 4px solid rgb(255, 255, 255);
        border-bottom: 4px solid rgb(255, 255, 255);
        transform: rotate(45deg) scale(0.65);
      }

      input {
        height: 0;
        width: 0;
        position: absolute;
        left: -999em;
        right: auto;
      }

      input:focus + .checkbox {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0.25rem;
      }

      .description {
        display: block;
        font-size: 0.93rem;
        margin-top: 0.5rem;
      }

      .break {
        flex-basis: 100%;
        height: 0;
      }

      .spacer {
        height: 1.25rem;
        width: 1.25rem;
        margin-right: 0.75rem;
      }

      :host([tiled]) label:has(input:checked) {
        background-color: rgba(0, 94, 162, 0.1);
        border-color: #005ea2;
      }
    `,
    html`
      <label>
        <input type="checkbox" />

        <div class="checkbox"></div>

        <div class="title">
          <slot></slot>
        </div>
      </label>
    `,
  ],
})
export class USACheckboxElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor checked = false;

  @attr()
  accessor name = "";

  @attr()
  accessor value = "";

  @attr({
    observed: false,
  })
  accessor tiled = false;

  #checkbox = query("input");
  #internals = this.attachInternals();

  connectedCallback() {
    const checkbox = this.#checkbox();

    if (this.checked) {
      this.#internals.setFormValue(this.value);
    }

    checkbox.checked = this.checked;
    checkbox.name = this.name;
  }

  attributeChangedCallback() {
    const checkbox = this.#checkbox();

    checkbox.checked = this.checked;
    checkbox.name = this.name;
  }

  @listen("change", "input[type=checkbox]")
  onCheckboxChange() {
    const checkbox = this.#checkbox();

    if (checkbox.checked) {
      this.#internals.setFormValue(this.value);
    } else {
      this.#internals.setFormValue(null);
    }
  }
}
