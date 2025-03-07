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
        display: block;
        max-width: 30rem;
        position: relative;
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
      }

      input {
        cursor: pointer;
        left: 0;
        margin: 0;
        max-width: none;
        position: absolute;
        text-indent: -999em;
        width: 100%;
        z-index: 1;
        bottom: 0;
        top: 0;
      }

      input:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }

      label slot.label {
        font-size: 1.06rem;
        line-height: 1.3;
        display: block;
        font-weight: 400;
        margin-bottom: 0.5rem;
      }

      :host(.dragenter) .box {
        border-color: #2491ff;
      }

      .box {
        border: 1px dashed #adadad;
        display: flex;
        font-size: 0.93rem;
        position: relative;
        text-align: center;
        width: 100%;
        max-width: 30rem;
        height: 5.2rem;
        align-items: center;
        justify-content: center;
      }

      .container {
        position: relative;
      }
    `,
    html`
      <label>
        <slot class="label"></slot>

        <div class="container">
          <input type="file" tabindex="0"/>

          <div class="box">
            <slot name="description">
              Drag file here or <usa-link>choose from folder</usa-link>
            </slot>
          </div>

          <usa-file-input-preview>
            Selected file <usa-link>Change file</usa-link>
          </usa-file-input-preview>
        </div>
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

  @attr()
  accessor required = false;

  @observe()
  accessor files: FileList | null = null;

  #internals = this.attachInternals();
  #input = query("input");
  #box = query(".box");
  #preview = query("usa-file-input-preview");

  attributeChangedCallback() {
    this.#input({
      name: this.name,
      multiple: this.multiple,
      accept: this.accept,
      required: this.required,
    });
  }

  connectedCallback() {
    const input = this.#input();

    if (input.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        input.validationMessage,
        input,
      );
    }
  }

  @effect()
  onChange() {
    const input = this.#input({ files: this.files });
    this.#preview({ files: this.files });

    const box = this.#box();

    const formData = new FormData();

    box.style.display = this.files?.length ? "none" : "flex";

    if (this.files?.length) {
      for (const file of this.files) {
        formData.append(this.name, file);
      }
    }

    this.#internals.setFormValue(formData);

    if (input.validationMessage) {
      this.#internals.setValidity(
        { customError: true },
        input.validationMessage,
        input,
      );
    } else {
      this.#internals.setValidity({});
    }
  }

  @listen("change")
  onInputChange() {
    const input = this.#input();

    this.files = input.files;

    this.dispatchEvent(new Event("change"));
  }

  @listen("dragenter")
  onDragEnter() {
    this.classList.add("dragenter");
  }

  @listen("dragleave")
  onDragLeave() {
    this.classList.remove("dragenter");
  }

  @listen("drop")
  onDrop(e: DragEvent) {
    this.classList.remove("dragenter");

    if (e.dataTransfer?.items) {
      e.preventDefault();

      const data = new DataTransfer();

      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();

          if (file) {
            data.items.add(file);
          }
        }
      }

      this.files = data.files;
    }
  }
}
