import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-button": USAButtonElement;
  }
}

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "cool",
  "warm",
  "outline",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

@element({
  tagName: "usa-button",
  shadowDom: [
    css`
      :host {
        display: contents;
      }

      .usa-button {
        box-sizing: border-box;
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        font-size: 1.06rem;
        line-height: 0.9;
        color: white;
        background-color: #005ea2;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        align-items: center;
        border: 0;
        border-radius: 0.25rem;
        cursor: pointer;
        -moz-column-gap: 0.5rem;
        column-gap: 0.5rem;
        display: inline-flex;
        font-weight: 700;
        justify-content: center;
        padding: 0.75rem 1.25rem;
        text-align: center;
        text-decoration: none;
        width: 100%;
        cursor: pointer;
      }

      @media all and (min-width: 30em) {
        .usa-button {
          width: auto;
        }
      }

      .usa-button:visited {
        color: white;
      }

      .usa-button:hover {
        color: white;
        background-color: #1a4480;
        border-bottom: 0;
        text-decoration: none;
      }

      .usa-button:active {
        color: white;
        background-color: #162e51;
      }

      .usa-button:not([disabled]):focus {
        outline-offset: 0.25rem;
      }

      .usa-button:disabled {
        color: #454545;
        background-color: #c9c9c9;
        cursor: not-allowed;
        opacity: 1;
      }

      .usa-button:disabled:hover,
      .usa-button:disabled:active,
      .usa-button:disabled:focus {
        color: #454545;
        background-color: #c9c9c9;
      }

      .usa-button:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      /** Secondary */
      :host([variant="secondary"]) .usa-button {
        color: #fff;
        background-color: #d83933;
      }

      :host([variant="secondary"]) .usa-button:hover {
        background-color: #b50909;
      }

      :host([variant="secondary"]) .usa-button:active {
        background-color: #8b0a03;
      }

      /** cool */
      :host([variant="cool"]) .usa-button {
        color: #1b1b1b;
        background-color: #00bde3;
      }

      :host([variant="cool"]) .usa-button:hover {
        background-color: #28a0cb;
      }

      :host([variant="cool"]) .usa-button:active {
        color: #fff;
        background-color: #07648d;
      }

      /** warm */
      :host([variant="warm"]) .usa-button {
        color: #1b1b1b;
        background-color: #fa9441;
      }

      :host([variant="warm"]) .usa-button:hover {
        color: #fff;
        background-color: #c05600;
      }

      :host([variant="warm"]) .usa-button:active {
        color: #fff;
        background-color: #775540;
      }

      /** outline */
      :host([variant="outline"]) .usa-button {
        background-color: transparent;
        box-shadow: inset 0 0 0 2px #005ea2;
        color: #005ea2;
      }

      :host([variant="outline"]) .usa-button:hover {
        box-shadow: inset 0 0 0 2px #1a4480;
        color: #1a4480;
      }

      :host([variant="outline"]) .usa-button:active {
        box-shadow: inset 0 0 0 2px #162e51;
        color: #162e51;
      }
    `,
    html`
      <button class="usa-button">
        <slot></slot>
      </button>
    `,
  ],
})
export class USAButtonElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor type: "button" | "submit" | "reset" = "button";

  @attr()
  accessor disabled = false;

  @attr({
    observed: false,
  })
  accessor variant: ButtonVariant = "primary";

  #internals = this.attachInternals();
  #button = query("button");

  @listen("keydown", () => document.body)
  onKeyDown(e: KeyboardEvent) {
    if (this.type === "submit") {
      if (e.key.toUpperCase() === "ENTER") {
        this.#handleForm();
      }
    }
  }

  @listen("click")
  onInternalClick() {
    this.#handleForm();
  }

  attributeChangedCallback() {
    const button = this.#button();
    button.type = this.type;
    button.disabled = this.disabled;
  }

  #handleForm() {
    const { form } = this.#internals;

    if (form) {
      if (this.type === "submit") {
        const btn = document.createElement("button");
        btn.type = "submit";
        form.append(btn);

        btn.click();
        btn.remove();
      } else if (this.type === "reset") {
        form.reset();
      }
    }
  }
}
