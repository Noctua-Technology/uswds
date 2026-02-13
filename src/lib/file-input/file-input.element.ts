import '../templating.js';

import { inject, injectable } from '@joist/di';
import { attr, css, element, html, listen, query } from '@joist/element';
import { Changes, effect } from '@joist/observable';
import { bind } from '@joist/templating';

import { HttpService } from '../services/http.service.js';
import { filenameFromResponse } from './filename.js';

declare global {
  interface HTMLElementTagNameMap {
    'usa-file-input': USAFileInputElement;
  }
}

@injectable({
  name: 'USAFileInputElementCtx',
})
@element({
  tagName: 'usa-file-input',
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

      :host([disabled]) {
        opacity: 0.6;
      }

      :host([disabled]) .box {
        border-color: #c9c9c9;
        background: #f5f5f5;
        cursor: not-allowed;
      }

      :host([disabled]) input,
      :host([disabled]) .link {
        cursor: not-allowed;
        pointer-events: none;
      }

      .link {
        color: #005ea2;
        cursor: pointer;
        text-decoration: underline;
      }

      .link:hover {
        color: #1a4480;
      }

      .box {
        border: 1px dashed #adadad;
        border-radius: 0;
        display: flex;
        font-size: 0.93rem;
        position: relative;
        text-align: center;
        width: 100%;
        height: 5.2rem;
        align-items: center;
        justify-content: center;
      }

      .container {
        position: relative;
      }
    `,
    html`
      <label for="file-input">
        <slot class="label"></slot>
      </label>

      <div class="container">
        <usa-bind props="name,multiple,accept,required,files,disabled">
          <input id="file-input" type="file" tabindex="0" />
        </usa-bind>

        <usa-if bind="files.length">
          <template>
            <usa-bind props="files">
              <usa-file-input-preview part="preview" exportparts="heading, item">
                Selected file <span class="link">Change file</span>
              </usa-file-input-preview>
            </usa-bind>
          </template>

          <template else>
            <div class="box" part="input">
              <slot name="description"> Drag file here or&nbsp;<span class="link">choose from folder</span> </slot>
            </div>
          </template>
        </usa-if>
      </div>
    `,
  ],
})
export class USAFileInputElement extends HTMLElement {
  static formAssociated = true;

  @attr()
  @bind()
  accessor name = '';

  @attr()
  @bind()
  accessor multiple = false;

  @attr()
  @bind()
  accessor accept = '';

  @attr()
  @bind()
  accessor url = '';

  @attr()
  @bind()
  accessor required = false;

  @attr()
  @bind()
  accessor disabled = false;

  @bind()
  accessor files: FileList | null = null;

  #http = inject(HttpService);
  #internals = this.attachInternals();
  #input = query('input');

  connectedCallback() {
    this.syncFormValues();
    this.#loadFromUrl();
  }

  @effect()
  async onURLChanged(changes: Changes<this>) {
    if (changes.has('url')) {
      this.#loadFromUrl();
    }
  }

  @effect()
  async formValuesChange(changes: Changes<this>) {
    if (changes.has('files') || changes.has('name')) {
      this.syncFormValues();
    }
  }

  async syncFormValues() {
    const input = this.#input();

    const formData = new FormData();

    if (this.files?.length) {
      for (const file of this.files) {
        formData.append(this.name, file);
      }
    }

    this.#internals.setFormValue(formData);

    await Promise.resolve();

    if (input.validationMessage) {
      this.#internals.setValidity({ customError: true }, input.validationMessage, input);
    } else {
      this.#internals.setValidity({});
    }
  }

  @listen('input')
  onInputChange(e: Event) {
    e.stopPropagation();

    const input = this.#input();

    if (input.files && input.files.length) {
      this.files = input.files;

      this.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @listen('dragenter')
  onDragEnter() {
    this.classList.add('dragenter');
  }

  @listen('dragleave')
  onDragLeave() {
    this.classList.remove('dragenter');
  }

  @listen('drop')
  onDrop(e: DragEvent) {
    this.classList.remove('dragenter');

    if (e.dataTransfer?.items) {
      e.preventDefault();

      const data = new DataTransfer();

      for (const item of e.dataTransfer.items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();

          if (file && this.#isFileAccepted(file)) {
            data.items.add(file);
          }
        }
      }

      this.files = data.files;

      this.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  #isFileAccepted(file: File): boolean {
    // If no accept property is set, accept all files
    if (!this.accept) {
      return true;
    }

    // Split the accept string by comma and trim whitespace
    const acceptedTypes = this.accept.split(',').map((type) => type.trim());

    for (const acceptType of acceptedTypes) {
      if (acceptType.endsWith('/*')) {
        // Handle wildcard types like "image/*" or "audio/*"

        const mainType = acceptType.split('/')[0];
        if (file.type.startsWith(mainType + '/')) {
          return true;
        }
      } else if (acceptType.startsWith('.')) {
        if (file.name.toLowerCase().endsWith(acceptType.toLowerCase())) {
          return true;
        }
      }

      // Handle exact MIME type match
      if (file.type === acceptType) {
        return true;
      }
    }

    return false;
  }

  async #loadFromUrl(): Promise<void> {
    if (!this.url) {
      return void 0;
    }

    const http = this.#http();

    const res = await http.fetch(this.url);
    const blob = await res.blob();

    // Determine filename from Content-Disposition header when available
    const filename = filenameFromResponse(res);

    const file = new File([blob], filename, { type: blob.type });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    this.files = dataTransfer.files;

    this.dispatchEvent(new Event('input', { bubbles: true }));

    return void 0;
  }
}
