import "@joist/templating/define.js";

import { attr, css, element, html, listen } from "@joist/element";
import { bind } from "@joist/templating";

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
        overflow: hidden;
      }

      button, a {
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

      :is(button, a):visited {
        color: white;
      }

      :is(button, a):hover {
        color: white;
        background-color: #1a4480;
        border-bottom: 0;
        text-decoration: none;
      }

      :is(button, a):active {
        color: white;
        background-color: #162e51;
      }

      :is(button, a):not([disabled]):focus {
        outline-offset: 0.25rem;
      }

      :is(button, a):disabled {
        color: #454545;
        background-color: #c9c9c9;
        cursor: not-allowed;
        opacity: 1;
      }

      :is(button, a):disabled:hover,
      :is(button, a):disabled:active,
      :is(button, a):disabled:focus {
        color: #454545;
        background-color: #c9c9c9;
      }

      :is(button, a):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      /** Secondary */
      :host([variant="secondary"]) :is(button, a) {
        color: #fff;
        background-color: #d83933;
      }

      :host([variant="secondary"]) :is(button, a):hover {
        background-color: #b50909;
      }

      :host([variant="secondary"]) :is(button, a):active {
        background-color: #8b0a03;
      }

      /** cool */
      :host([variant="cool"]) :is(button, a) {
        color: #1b1b1b;
        background-color: #00bde3;
      }

      :host([variant="cool"]) :is(button, a):hover {
        background-color: #28a0cb;
      }

      :host([variant="cool"]) :is(button, a):active {
        color: #fff;
        background-color: #07648d;
      }

      /** warm */
      :host([variant="warm"]) :is(button, a) {
        color: #1b1b1b;
        background-color: #fa9441;
      }

      :host([variant="warm"]) :is(button, a):hover {
        color: #fff;
        background-color: #c05600;
      }

      :host([variant="warm"]) :is(button, a):active {
        color: #fff;
        background-color: #775540;
      }

      /** outline */
      :host([variant="outline"]) :is(button, a) {
        background-color: transparent;
        box-shadow: inset 0 0 0 2px #005ea2;
        color: #005ea2;
      }

      :host([variant="outline"]) :is(button, a):hover {
        box-shadow: inset 0 0 0 2px #1a4480;
        color: #1a4480;
      }

      :host([variant="outline"]) :is(button, a):active {
        box-shadow: inset 0 0 0 2px #162e51;
        color: #162e51;
      }
    `,
    html`
      <j-if bind="href">
        <template>
          <j-props>
            <a $href="href" $disabled="disabled" $target="target">
              <slot></slot>
            </a>
          </j-props>
        </template>

        <template else>
          <j-props>
            <button tabindex="0" $type="type" $disabled="disabled" $value="value">
              <slot></slot>
            </button>
          </j-props>
        </template>
      </j-if>
    `,
  ],
})
export class USAButtonElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @bind()
  accessor type: "button" | "submit" | "reset" = "button";

  @attr()
  @bind()
  accessor disabled = false;

  @attr()
  accessor variant: ButtonVariant = "primary";

  @attr()
  @bind()
  accessor value = "";

  @attr()
  @bind()
  accessor href = "";

  @attr()
  @bind()
  accessor target = "";

  accessor tabIndex = 0;

  #internals = this.attachInternals();

  @listen("click")
  onInternalClick() {
    this.#handleForm();
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
