import { attr, css, element, html, listen, query, ready } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-button": USAButtonElement;
  }
}

@element({
  tagName: "usa-button",
  shadow: [
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
        margin-right: 0.5rem;
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
      .usa-button:hover,
      .usa-button.usa-button--hover {
        color: white;
        background-color: #1a4480;
        border-bottom: 0;
        text-decoration: none;
      }
      .usa-button:active,
      .usa-button.usa-button--active {
        color: white;
        background-color: #162e51;
      }
      .usa-button:not([disabled]):focus,
      .usa-button:not([disabled]).usa-focus {
        outline-offset: 0.25rem;
      }

      .usa-button:disabled,
      .usa-button[aria-disabled="true"] {
        color: #454545;
        background-color: #c9c9c9;
        cursor: not-allowed;
        opacity: 1;
      }

      .usa-button:disabled:hover,
      .usa-button:disabled:active,
      .usa-button:disabled:focus,
      .usa-button:disabled.usa-focus,
      .usa-button[aria-disabled="true"]:hover,
      .usa-button[aria-disabled="true"]:active,
      .usa-button[aria-disabled="true"]:focus,
      .usa-button[aria-disabled="true"].usa-focus {
        color: #454545;
        background-color: #c9c9c9;
      }

      .usa-button:disabled.usa-button--hover,
      .usa-button:disabled.usa-button--active,
      .usa-button[aria-disabled="true"].usa-button--hover,
      .usa-button[aria-disabled="true"].usa-button--active {
        color: #454545;
        background-color: #c9c9c9;
        cursor: not-allowed;
        opacity: 1;
      }
      .usa-button:disabled.usa-button--hover:hover,
      .usa-button:disabled.usa-button--hover:active,
      .usa-button:disabled.usa-button--hover:focus,
      .usa-button:disabled.usa-button--hover.usa-focus,
      .usa-button:disabled.usa-button--active:hover,
      .usa-button:disabled.usa-button--active:active,
      .usa-button:disabled.usa-button--active:focus,
      .usa-button:disabled.usa-button--active.usa-focus {
        color: #454545;
        background-color: #c9c9c9;
      }

      .usa-focus,
      .usa-button:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
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
  @attr()
  accessor type: "button" | "submit" | "reset" = "button";

  @attr()
  accessor disabled = false;

  #internals = this.attachInternals();

  #button = query("button");

  @listen("click")
  onInternalClick() {
    const { form } = this.#internals;

    if (form) {
      form.submit();
    }
  }

  attributeChangedCallback() {
    const button = this.#button();

    button.type = this.type;
    button.disabled = this.disabled;
  }
}
