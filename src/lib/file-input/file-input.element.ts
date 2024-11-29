import "./file-input-preview.element.js";

import { attr, css, element, html, listen, query } from "@joist/element";

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
        border: 1px dashed #adadad;
        display: block;
        font-size: 0.93rem;
        position: relative;
        text-align: center;
        width: 100%;
        max-width: 30rem;
      }

      label {
        display: block;
        position: relative;
      }

      slot {
        display: block;
        padding: 2rem 1rem;
      }

      .usa-file-input__choose {
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
    `,
    html`
      <label>
        <input type="file" />

        <slot>
          <span class="usa-file-input__drag-text">Drag file here or</span>
          <span class="usa-file-input__choose">choose from folder</span>
        </slot>

        <usa-file-input-preview style="display: none;"></usa-file-input-preview>
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

  #internals = this.attachInternals();
  #input = query("input");
  #slot = query("slot");
  #preview = query("usa-file-input-preview");

  attributeChangedCallback() {
    const input = this.#input();
    input.name = this.name;
    input.multiple = this.multiple;
  }

  @listen("change")
  onChange() {
    const input = this.#input();
    const slot = this.#slot();
    const preview = this.#preview();

    preview.files = input.files;

    if (input.files && input.files.length) {
      slot.style.display = "none";
      preview.style.display = "block";
    } else {
      slot.style.display = "block";
      preview.style.display = "none";
    }
  }
}
