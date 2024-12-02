import "./file-input-preview.element.js";
import "../link/link.element.js";

import { attr, css, element, html, listen, query } from "@joist/element";
import { effect, observe } from "@joist/observable";

declare global {
  interface HTMLElementTagNameMap {
    "usa-file-input": USAFileInputElement;
  }
}

@element({
  tagName: "usa-file-input",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: contents;
      }

      label {
        display: block;
        position: relative;
        cursor: pointer;
        max-width: 30rem;
      }

      slot[name="label"] {
        display: block;
      }

      span,
      ::slotted(span) {
        color: #005ea2;
        text-decoration: underline;
        font-weight: 400;
      }

      input {
        cursor: pointer;
        height: 100%;
        left: 0;
        margin: 0;
        max-width: none;
        position: absolute;
        text-indent: -999em;
        top: 0;
        width: 100%;
      }

      .label {
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        margin-bottom: 0.5rem;
      }

      .box {
        border: 1px dashed #adadad;
        display: block;
        font-size: 0.93rem;
        position: relative;
        text-align: center;
        width: 100%;
        max-width: 30rem;
        padding: 2rem 1rem;
      }
    `,
    html`
      <label>
        <slot class="label"></slot>

        <input type="file" />

        <div class="box">
          <slot name="description">
            Drag file here or <usa-link>choose from folder</usa-link>
          </slot>
        </div>

        <usa-file-input-preview>
          Selected file <usa-link>Change file</usa-link>
        </usa-file-input-preview>
      </label>
    `,
  ],
})
export class USAFileInputElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  accessor name = "";

  @attr()
  accessor multiple = true;

  @attr()
  accessor accept = "";

  @observe()
  accessor files: FileList | null = null;

  #internals = this.attachInternals();
  #input = query("input");
  #box = query(".box");
  #preview = query("usa-file-input-preview");

  @effect()
  onChange() {
    const input = this.#input();

    if (this.files) {
      input.files = this.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  attributeChangedCallback() {
    const input = this.#input();
    input.name = this.name;
    input.multiple = this.multiple;
    input.accept = this.accept;
  }

  @listen("change")
  onInputChange() {
    const input = this.#input();
    const box = this.#box();
    const preview = this.#preview();

    preview.files = input.files;

    const formData = new FormData();

    if (input.files) {
      box.style.display = "none";

      for (let file of input.files) {
        formData.append(this.name, file);
      }
    } else {
      box.style.display = "block";
    }

    this.#internals.setFormValue(formData);
  }
}
