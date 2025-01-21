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

  get files() {
    return this.#input().files;
  }

  set files(list: FileList | null) {
    this.#input().files = list;

    this.#syncFormState();
  }

  #internals = this.attachInternals();
  #input = query("input");
  #box = query(".box");
  #preview = query("usa-file-input-preview");

  attributeChangedCallback() {
    const input = this.#input();
    input.name = this.name;
    input.multiple = this.multiple;
    input.accept = this.accept;
  }

  @listen("change")
  onInputChange() {
    this.#syncFormState();

    this.dispatchEvent(new Event("change"));
  }

  #syncFormState() {
    const input = this.#input();
    const box = this.#box();
    const preview = this.#preview();

    preview.files = input.files;

    const formData = new FormData();

    if (input.files?.length) {
      box.style.display = "none";

      for (const file of input.files) {
        formData.append(this.name, file);
      }
    } else {
      box.style.display = "flex";
    }

    this.#internals.setFormValue(formData);
  }
}
