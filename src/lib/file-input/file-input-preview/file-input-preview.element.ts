import "@joist/templating/define.js";

import { css, element, html } from "@joist/element";
import { bind } from "@joist/templating";

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
        background: var(--usa-input-bg-color);
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
        background: var(--usa-input-bg-color);
        display: flex;
        padding: 0.5rem;
        width: 100%;
        margin-top: 1px;
      }
    `,
    html`
      <slot class="preview-heading"></slot>
      
      <j-for bind="fileEntries" key="src">
        <template>
          <div class="preview-item">
            <j-if bind="each.value.isImage">
              <template>
                <j-props>
                  <img height="40" width="40" aria-hidden="true" $.src="each.value.src" />
                </j-props>
              </template>

              <template else>
                <usa-icon icon="file_present"></usa-icon>
              </template>
            </j-if>

            <j-value bind="each.value.file.name"></j-value>
          </div>
        </template>
      </j-for>
    `,
  ],
})
export class USAFileInputPreviewElement extends HTMLElement {
  @bind()
  accessor fileEntries: FileEntry[] = [];

  #files: FileList | null = null;

  get files() {
    return this.#files;
  }

  set files(value: FileList | null) {
    this.#files = value;

    this.fileEntries = Array.from(value ?? []).map((file) => ({
      file,
      src: URL.createObjectURL(file),
      isImage: file.type.startsWith("image"),
    }));
  }
}

interface FileEntry {
  file: File;
  src: string;
  isImage: boolean;
}
