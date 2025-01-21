import { attr, css, element, html, listen, query, ready } from "@joist/element";
import { type Changes, effect, observe } from "@joist/observable";

import type { MaskableElement } from "../input-mask/maskable.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-input": USATextInputElement;
  }
}

@element({
  tagName: "usa-input",
  shadowDomOpts: {
    mode: "open",
    delegatesFocus: true,
  },
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        max-width: 30rem;
        margin-bottom: 1.5rem;
        position: relative;
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
        font-size: 1.06rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
      }

      input:not(:disabled):focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      slot[name="detail"]::slotted(*) {
        color: #757575;
      }

      slot[name="detail"]::slotted(usa-icon) {
        width: 1.5rem;
        height: 1.5rem;
      }

      slot[name="detail"] {
        display: block;
        position: absolute;
        bottom: 0.21rem;
        left: 0.5rem;
      }

      :host([detail="pfx"]) input {
        padding-left: 2.5rem;
      }

      :host([detail="sfx"]) input {
        padding-right: 2.5rem;
      }

      :host([detail="sfx"]) slot[name="detail"] {
        right: 0.5rem;
        left: auto;
      }
    `,
    html`
      <label>
        <slot name="detail"></slot>

        <slot></slot>

        <input tabindex="0" />
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

  @attr()
  accessor required = false;

  @attr({
    observed: false,
  })
  accessor detail: "pfx" | "sfx" | "" = "";

  @attr({
    reflect: false,
  })
  @observe()
  accessor value = "";

  @observe()
  accessor selectionStart: number | null = null;

  @observe()
  accessor selectionEnd: number | null = null;

  #internals = this.attachInternals();
  #input = query("input");

  @ready()
  onReady() {
    const input = this.#input();
    input.autofocus = this.autofocus;
  }

  connectedCallback() {
    this.#syncFormState();
  }

  @effect()
  onChange(changes: Changes<this>) {
    const input = this.#input();

    if (input.value !== this.value) {
      input.value = this.value;
    }

    if (changes.has("selectionStart")) {
      input.selectionStart = this.selectionStart;
    }

    if (changes.has("selectionEnd")) {
      input.selectionEnd = this.selectionEnd;
    }

    this.#syncFormState();
  }

  @listen("input")
  onInputChange() {
    const input = this.#input();

    this.value = input.value;
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;
  }

  attributeChangedCallback(attr: string) {
    const input = this.#input();

    switch (attr) {
      case "autocomplete":
        input.autocomplete = this.autocomplete;
        break;

      case "placeholder":
        input.placeholder = this.placeholder;
        break;

      case "name":
        input.name = this.name;
        break;
    }
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setFormValue(input.value);

    if (this.required && !input.value) {
      this.#internals.setValidity({ valueMissing: true }, "Required", input);
    } else {
      this.#internals.setValidity({});
    }
  }
}
