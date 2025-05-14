import '@joist/templating/define.js';

import { css, element, html } from '@joist/element';
import { observe } from '@joist/observable';
import { bind } from '@joist/templating';

declare global {
  interface HTMLElementTagNameMap {
    'usa-file-input-preview': USAFileInputPreviewElement;
  }
}

@element({
  tagName: 'usa-file-input-preview',
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
        border-radius: 0;
        overflow: hidden;
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
        background: #d9e8f6;
        align-items: center;
        display: flex;
        pointer-events: none;
        position: relative;
        z-index: 3;
        font-weight: 700;
        justify-content: space-between;
        padding: 0.5rem;
        text-align: left;
        font-size: 0.93rem;
        line-height: 1.6;
      }

      .preview-item {
        background: #d9e8f6;
        align-items: center;
        display: flex;
        padding: 0.5rem;
        width: 100%;
        margin-top: 1px;
        margin-bottom: 1px;
      }
    `,
    html`
      <slot class="preview-heading" part="heading"></slot>

      <j-for bind="fileEntries" key="src">
        <template>
          <div class="preview-item" part="item">
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
  @observe()
  accessor files: FileList | null = null;

  @bind((i) => {
    if (!i.files || i.files.length === 0) {
      return [];
    }

    return Array.from(i.files).map((file) => ({
      file,
      src: URL.createObjectURL(file),
      isImage: file.type.startsWith('image'),
    }));
  })
  accessor fileEntries: FileEntry[] = [];
}

interface FileEntry {
  file: File;
  src: string;
  isImage: boolean;
}
