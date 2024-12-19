import { css, element, html, query } from "@joist/element";
import { effect, observe } from "@joist/observable";

declare global {
  interface HTMLElementTagNameMap {
    "usa-file-input-preview": USAFileInputPreviewElement;
  }
}

@element({
  tagName: "usa-file-input-preview",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        font-size: 0.87rem;
        pointer-events: none;
        position: relative;
        text-align: left;
        word-wrap: anywhere;
        z-index: 3;
      }

      :host([hidden]) {
        display: none;
      }

      img {
        border: 0;
        display: block;
        height: 2.5rem;
        margin-right: 0.5rem;
        -o-object-fit: contain;
        object-fit: contain;
        width: 2.5rem;
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

      .preview-item {
        align-items: center;
        background: #d9e8f6;
        display: flex;
        padding: 0.5rem;
        width: 100%;
        margin-top: 1px;
      }
    `,
    html`
      <template>
        <div class="preview-item">
          <img height="40" width="40" aria-hidden="true" />
        </div>
      </template>

      <slot class="preview-heading"></slot>
    `,
  ],
})
export class USAFileInputPreviewElement extends HTMLElement {
  @observe()
  accessor files: FileList | null = null;

  #items = new Map<string, Element>();
  #template = query("template");

  connectedCallback() {
    this.onChange();
  }

  @effect()
  onChange() {
    const template = this.#template();

    if (this.files && this.files.length) {
      this.hidden = false;

      let names = new Set<string>();

      for (let file of this.files) {
        names.add(file.name);

        if (!this.#items.has(file.name)) {
          const clone = template.content.cloneNode(true);

          const item = clone.childNodes[1] as Element;
          item.id = file.name;
          item.append(document.createTextNode(file.name));

          const img = item.querySelector("img")!;
          img.src = URL.createObjectURL(file);

          this.shadowRoot!.append(item);

          this.#items.set(file.name, item);
        }
      }

      for (let [name, item] of this.#items) {
        if (!names.has(name)) {
          item.remove();
          this.#items.delete(name);
        }
      }
    } else {
      this.hidden = true;
    }
  }
}