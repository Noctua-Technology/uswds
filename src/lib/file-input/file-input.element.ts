import "./file-input-preview.element.js";
import "../link/link.element.js";

import { attr, css, element, html, listen, query } from "@joist/element";
import { observe } from "@joist/observable";

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
        display: block;
        max-width: 30rem;
        position: relative;
      }

      label {
        display: block;
        position: relative;
        cursor: pointer;
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
        padding: 0.5rem;
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

        <div class="box">
          <input type="file" />

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
  #slot = query(".box");
  #preview = query("usa-file-input-preview");

  connectedCallback() {
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
  onChange() {
    const input = this.#input();
    const slot = this.#slot();
    const preview = this.#preview();

    preview.files = input.files;

    const formData = new FormData();

    if (input.files) {
      slot.style.display = "none";

      for (let file of input.files) {
        formData.append(this.name, file);
      }
    } else {
      slot.style.display = "block";
    }

    this.#internals.setFormValue(formData);
  }
}
