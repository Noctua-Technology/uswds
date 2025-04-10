import { attr, css, element, html, listen, query, ready } from "@joist/element";

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
  shadowDomOpts: {
    mode: "open",
    delegatesFocus: true,
  },
  shadowDom: [
    css`
      :host {
        display: inline-block;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      button {
        box-sizing: border-box;
        font-size: 1.06rem;
        line-height: 0.9;
        color: white;
        background-color: #005ea2;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        align-items: center;
        border: 0;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
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
        height: 100%;
        cursor: pointer;
      }

      @media all and (min-width: 30em) {
        :host {
          width: auto;
        }
      }

      button:visited {
        color: white;
      }

      button:hover {
        color: white;
        background-color: #1a4480;
        border-bottom: 0;
        text-decoration: none;
      }

      button:active {
        color: white;
        background-color: #162e51;
      }

      button:not([disabled]):focus {
        outline-offset: 0.25rem;
      }

      button:disabled {
        color: #454545;
        background-color: #c9c9c9;
        cursor: not-allowed;
        opacity: 1;
      }

      button:disabled:hover,
      button:disabled:active,
      button:disabled:focus {
        color: #454545;
        background-color: #c9c9c9;
      }

      button:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      /** Secondary */
      :host([variant="secondary"]) button {
        color: #fff;
        background-color: #d83933;
      }

      :host([variant="secondary"]) button:hover {
        background-color: #b50909;
      }

      :host([variant="secondary"]) button:active {
        background-color: #8b0a03;
      }

      /** cool */
      :host([variant="cool"]) button {
        color: #1b1b1b;
        background-color: #00bde3;
      }

      :host([variant="cool"]) button:hover {
        background-color: #28a0cb;
      }

      :host([variant="cool"]) button:active {
        color: #fff;
        background-color: #07648d;
      }

      /** warm */
      :host([variant="warm"]) button {
        color: #1b1b1b;
        background-color: #fa9441;
      }

      :host([variant="warm"]) button:hover {
        color: #fff;
        background-color: #c05600;
      }

      :host([variant="warm"]) button:active {
        color: #fff;
        background-color: #775540;
      }

      /** outline */
      :host([variant="outline"]) button {
        background-color: transparent;
        box-shadow: inset 0 0 0 2px #005ea2;
        color: #005ea2;
      }

      :host([variant="outline"]) button:hover {
        box-shadow: inset 0 0 0 2px #1a4480;
        color: #1a4480;
      }

      :host([variant="outline"]) button:active {
        box-shadow: inset 0 0 0 2px #162e51;
        color: #162e51;
      }
    `,
    html`
      <button tabindex="0">
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

  @attr()
  accessor variant: ButtonVariant = "primary";

  @attr()
  accessor value = "";

  accessor tabIndex = 0;

  #internals = this.attachInternals();
  #button = query("button");

  @ready()
  onReady() {
    this.#button({ autofocus: this.autofocus });
  }

  @listen("click")
  onInternalClick() {
    this.#handleForm();
  }

  attributeChangedCallback() {
    this.#button({ type: this.type, disabled: this.disabled });
  }

  #handleForm() {
    const { form } = this.#internals;

    if (form) {
      if (this.type === "submit") {
        this.#submit(form);
      } else if (this.type === "reset") {
        form.reset();
      }
    }
  }

  #submit(form: HTMLFormElement) {
    const btn = document.createElement("button");
    btn.type = "submit";
    form.append(btn);

    btn.click();
    btn.remove();
  }
}
