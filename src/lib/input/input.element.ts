import { attr, css, element, html, listen, query, ready } from "@joist/element";
import { effect, observe } from "@joist/observable";

import type { MaskableElement } from "../input-mask/maskable.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-input": USATextInputElement;
  }
}

@element({
  tagName: "usa-input",
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
  accessor min = "";

  @attr()
  accessor max = "";

  @attr()
  accessor minLength = -1;

  @attr()
  accessor maxLength = -1;

  @attr()
  accessor required = false;

  @attr()
  accessor disabled = false;

  @attr()
  accessor type: "text" | "password" | "number" = "text";

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

  get validationMessage() {
    return this.#input().validationMessage;
  }

  #internals = this.attachInternals();
  #input = query("input");

  @ready()
  onReady() {
    this.#input({ autofocus: this.autofocus });
  }

  attributeChangedCallback(attr: string) {
    this.#input({
      autocomplete: this.autocomplete,
      placeholder: this.placeholder,
      name: this.name,
      type: this.type,
      required: this.required,
      min: this.min,
      max: this.max,
      minLength: this.minLength,
      maxLength: this.maxLength,
      disabled: this.disabled,
    });
  }

  connectedCallback() {
    this.#syncFormState();
  }

  focus(options?: FocusOptions): void {
    this.#input().focus(options);
  }

  @effect()
  onChange() {
    const { value, selectionStart, selectionEnd } = this;

    this.#input({ value, selectionStart, selectionEnd });

    this.#syncFormState();
  }

  @listen("keydown")
  onKeyDown(e: KeyboardEvent) {
    const form = this.#internals.form;

    if (form) {
      const hasModifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (e.key.toUpperCase() === "ENTER" && !hasModifier) {
        // this makes sure that the user has a chance to cancel the event before submitting
        setTimeout(() => {
          if (!e.defaultPrevented && !e.isComposing) {
            this.#submit(form);
          }
        });
      }
    }
  }

  @listen("input")
  onInputChange() {
    const input = this.#input();

    this.value = input.value;
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;
  }

  #syncFormState() {
    const input = this.#input();

    this.#internals.setValidity({});
    this.#internals.setFormValue(input.value);

    if (input.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        input.validationMessage,
        input,
      );
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
