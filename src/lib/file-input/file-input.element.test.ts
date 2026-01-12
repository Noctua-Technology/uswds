import './file-input.element.js';

import { assert, fixture, html } from '@open-wc/testing';
import { DOMInjector } from '@joist/di';

import type { USAFileInputElement } from './file-input.element.js';
import { HttpService } from '../services/http.service.js';

describe('usa-file-input', () => {
  it('should be accessible', async () => {
    const fileInput = await fixture<USAFileInputElement>(html` <usa-file-input>Hello World</usa-file-input> `);

    return assert.isAccessible(fileInput);
  });

  it('should submit files with the form', async () => {
    const data = new DataTransfer();
    data.items.add(new File([], 'first.txt'));
    data.items.add(new File([], 'second.txt'));

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-file-input name="upload" .files=${data.files}>
          Input accepts a single file

          <div slot="description">Drag file here or <usa-link>choose from folder</usa-link></div>
        </usa-file-input>

        <button>Submit</button>
      </form>
    `);

    const formData = new FormData(form);

    const fileNames = formData.getAll('upload').map((file) => {
      if (file instanceof File) {
        return file.name;
      }

      return '';
    });

    assert.deepEqual(fileNames, ['first.txt', 'second.txt']);
  });

  it('should show file preview after drag and drop', async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input> Input accepts a single file </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input');

    assert.isOk(nativeInput);

    // Simulate drag and drop with a file
    const data = new DataTransfer();
    data.items.add(new File([], 'test.txt'));

    const dropEvent = new DragEvent('drop', {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that filesVisible is true and files are set
    assert.equal(fileInput.files?.length, 1);
    assert.equal(fileInput.files?.[0].name, 'test.txt');
  });

  it('should fire input event when a file is dragged and dropped', async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input> Input accepts a single file </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input');

    assert.isOk(nativeInput);

    // Create a spy to track input events
    let inputEventFired = false;
    fileInput.addEventListener('input', () => {
      inputEventFired = true;
    });

    // Simulate drag and drop with a file
    const data = new DataTransfer();
    data.items.add(new File([], 'test.txt'));

    const dropEvent = new DragEvent('drop', {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that the input event was fired
    assert.isTrue(inputEventFired);
  });

  it('should filter dropped files based on accept MIME type', async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input accept="image/*"> Input accepts only images </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input');

    assert.isOk(nativeInput);

    // Simulate drag and drop with mixed file types
    const data = new DataTransfer();
    data.items.add(new File([], 'image.png', { type: 'image/png' }));
    data.items.add(new File([], 'document.txt', { type: 'text/plain' }));
    data.items.add(new File([], 'photo.jpg', { type: 'image/jpeg' }));

    const dropEvent = new DragEvent('drop', {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that only image files were accepted
    assert.equal(fileInput.files?.length, 2);
    assert.equal(fileInput.files?.[0].name, 'image.png');
    assert.equal(fileInput.files?.[1].name, 'photo.jpg');
  });

  it('should filter dropped files based on accept file extension', async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input accept=".txt,.pdf"> Input accepts text and PDF files </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input');

    assert.isOk(nativeInput);

    // Simulate drag and drop with mixed file types
    const data = new DataTransfer();
    data.items.add(new File([], 'document.txt'));
    data.items.add(new File([], 'image.png'));
    data.items.add(new File([], 'report.pdf'));

    const dropEvent = new DragEvent('drop', {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that only .txt and .pdf files were accepted
    assert.equal(fileInput.files?.length, 2);
    assert.equal(fileInput.files?.[0].name, 'document.txt');
    assert.equal(fileInput.files?.[1].name, 'report.pdf');
  });

  it('should accept all dropped files when accept property is not set', async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input> Input accepts all files </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input');

    assert.isOk(nativeInput);

    // Simulate drag and drop with mixed file types
    const data = new DataTransfer();
    data.items.add(new File([], 'document.txt'));
    data.items.add(new File([], 'image.png'));
    data.items.add(new File([], 'report.pdf'));

    const dropEvent = new DragEvent('drop', {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that all files were accepted
    assert.equal(fileInput.files?.length, 3);
  });

  it('should not clear files if 0 files are uploaded', async () => {
    const initialData = new DataTransfer();
    initialData.items.add(new File([], 'existing.txt'));

    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input .files=${initialData.files}> Input accepts files </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector('input') as HTMLInputElement;

    assert.isOk(nativeInput);

    // Verify initial files are set
    assert.equal(fileInput.files?.length, 1);
    assert.equal(fileInput.files?.[0].name, 'existing.txt');

    // Trigger input event with 0 files
    nativeInput.files = new DataTransfer().files;

    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(inputEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that existing files were not cleared
    assert.equal(fileInput.files?.length, 1);
    assert.equal(fileInput.files?.[0].name, 'existing.txt');
  });

  it('should load file from url and set files', async () => {
    class MockHttpService extends HttpService {
      async fetch(url: string): Promise<Response> {
        const file = new File(['file contents'], 'test-file.txt', { type: 'text/plain' });

        return {
          ok: true,
          status: 200,
          blob: async () => file,
          url,
          headers: new Headers({
            'Content-Disposition': 'attachment; filename="test-file.txt"',
          }),
        } as any;
      }
    }

    const root = new DOMInjector({
      providers: [[HttpService, { use: MockHttpService }]],
    });

    root.attach(document.body);

    const fileInput = await fixture<USAFileInputElement>(html`<usa-file-input></usa-file-input>`);

    fileInput.url = 'https://example.com/path/to/test-file.txt';

    return new Promise((resolve) => {
      fileInput.addEventListener(
        'input',
        () => {
          assert.equal(fileInput.files?.length, 1);
          assert.equal(fileInput.files?.[0].name, 'test-file.txt');
          assert.equal(fileInput.files?.[0].type, 'text/plain');

          root.detach();

          resolve();
        },
        { once: true },
      );
    });
  });
});
