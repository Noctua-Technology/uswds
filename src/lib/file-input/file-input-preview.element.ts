import { css, element, html, query } from "@joist/element";
import { effect, observe } from "@joist/observable";

@element({
  tagName: "usa-file-input-preview",
  shadowDom: [
    css`
      :host {
        align-items: center;
        background: #d9e8f6;
        display: flex;
        font-size: 0.87rem;
        margin-top: 1px;
        padding: 0.25rem 0.5rem;
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
    `,
    html`
      <img height="40" width="40" />
      <span class="file-name"></span>
    `,
  ],
})
export class USAFileInputPreviewElement extends HTMLElement {
  @observe()
  accessor file: File | null = null;

  #img = query("img");
  #name = query("span");

  @effect()
  onChange() {
    const img = this.#img();
    const name = this.#name();

    if (this.file) {
      img.src = URL.createObjectURL(this.file);
      name.innerHTML = this.file.name;
    }
  }
}
