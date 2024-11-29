import "./file-input-preview.element.js";

import { attr, css, element, html, listen, query } from "@joist/element";

import { USAFileInputPreviewElement } from "./file-input-preview.element.js";

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

      .preview-heading {
        align-items: center;
        background: #d9e8f6;
        display: flex;
        pointer-events: none;
        position: relative;
        z-index: 3;
        font-weight: 700;
        justify-content: space-between;
        padding: 0.5rem;
        text-align: left;
      }
    `,
    html`
      <label>
        <input type="file" />

        <slot>
          <span class="usa-file-input__drag-text">Drag file here or</span>
          <span class="usa-file-input__choose">choose from folder</span>
        </slot>

        <div class="preview-heading" style="display: none;">
          Selected file <span class="usa-file-input__choose">Change file</span>
        </div>
      </label>
    `,
  ],
})
export class USAFileInputElement extends HTMLElement {
  @attr()
  accessor name = "";

  @attr()
  accessor multiple = true;

  #label = query("label");
  #input = query("input");
  #slot = query("slot");
  #preview = query(".preview-heading");

  attributeChangedCallback() {
    const input = this.#input();
    input.name = this.name;
    input.multiple = this.multiple;
  }

  @listen("change")
  onChange() {
    const label = this.#label();
    const input = this.#input();
    const slot = this.#slot();
    const preview = this.#preview();

    if (input.files && input.files.length) {
      slot.style.display = "none";
      preview.style.display = "flex";

      for (let file of input.files) {
        const preview = new USAFileInputPreviewElement();
        preview.file = file;

        label.append(preview);
      }
    } else {
      slot.style.display = "flex";
      preview.style.display = "none";
    }
  }
}
