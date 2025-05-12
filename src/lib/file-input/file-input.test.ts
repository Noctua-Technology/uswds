import "./file-input.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import type { USAFileInputElement } from "./file-input.element.js";

describe("usa-file-input", () => {
  it("should be accessible", async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input>Hello World</usa-file-input>
    `);

    return assert.isAccessible(fileInput);
  });

  it("should submit files with the form", async () => {
    const data = new DataTransfer();
    data.items.add(new File([], "first.txt"));
    data.items.add(new File([], "second.txt"));

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-file-input name="upload" .files=${data.files}>
          Input accepts a single file

          <div slot="description">
            Drag file here or <usa-link>choose from folder</usa-link>
          </div>
        </usa-file-input>

        <button>Submit</button>
      </form>
    `);

    const formData = new FormData(form);

    const fileNames = formData.getAll("upload").map((file) => {
      if (file instanceof File) {
        return file.name;
      }

      return "";
    });

    assert.deepEqual(fileNames, ["first.txt", "second.txt"]);
  });

  it("should show file preview after drag and drop", async () => {
    const fileInput = await fixture<USAFileInputElement>(html`
      <usa-file-input>
        Input accepts a single file
      </usa-file-input>
    `);

    const nativeInput = fileInput.shadowRoot?.querySelector("input");

    assert.isOk(nativeInput);

    // Simulate drag and drop with a file
    const data = new DataTransfer();
    data.items.add(new File([], "test.txt"));

    const dropEvent = new DragEvent("drop", {
      dataTransfer: data,
      bubbles: true,
      cancelable: true,
    });

    nativeInput.dispatchEvent(dropEvent);

    // Wait for effects to resolve
    await Promise.resolve();

    // Verify that filesVisible is true and files are set
    assert.isTrue(fileInput.filesVisible);
    assert.equal(fileInput.files?.length, 1);
    assert.equal(fileInput.files?.[0].name, "test.txt");
  });
});
