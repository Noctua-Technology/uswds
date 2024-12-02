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
        display: none;
        font-size: 0.87rem;
        pointer-events: none;
        position: relative;
        text-align: left;
        word-wrap: anywhere;
        z-index: 3;
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

      .preview-heading span {
        color: #005ea2;
        text-decoration: underline;
        font-weight: 400;
      }

      .preview-content > * {
        align-items: center;
        background: #d9e8f6;
        display: flex;
        padding: 0.5rem;
        width: 100%;
        margin-top: 1px;
      }
    `,
    html`
      <slot class="preview-heading">
        <slot></slot>
      </slot>

      <div class="preview-content"></div>
    `,
  ],
})
export class USAFileInputPreviewElement extends HTMLElement {
  @observe()
  accessor files: FileList | null = null;

  #content = query(".preview-content");

  connectedCallback() {
    if (this.files && this.files.length) {
      this.style.display = "block";
    }
  }

  @effect()
  onChange() {
    const content = this.#content();

    if (this.files) {
      content.innerHTML = "";
      this.style.display = "block";

      for (let file of this.files) {
        const item = document.createElement("div");
        item.id = file.name;

        const img = new Image();
        img.height = 40;
        img.width = 40;
        img.src = URL.createObjectURL(file);

        item.append(img, document.createTextNode(file.name));

        content.append(item);
      }
    } else {
      this.style.display = "none";
    }
  }
}
