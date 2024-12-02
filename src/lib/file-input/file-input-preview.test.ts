import "./file-input-preview.element.js";
import "../link/link.element.js";

import { assert, fixture, html } from "@open-wc/testing";

import { USAFileInputPreviewElement } from "./file-input-preview.element.js";

describe("usa-file-input-preview", () => {
  it("should be accessible with no files", async () => {
    const fileInputPreview = await fixture<USAFileInputPreviewElement>(html`
      <usa-file-input-preview>
        Selected file <usa-link>Change file</usa-link>
      </usa-file-input-preview>
    `);

    return assert.isAccessible(fileInputPreview);
  });

  it("should be accessible with files", async () => {
    const data = new DataTransfer();
    data.items.add(new File([], "image1.jpg"));
    data.items.add(new File([], "image2.jpg"));

    const fileInputPreview = await fixture<USAFileInputPreviewElement>(html`
      <usa-file-input-preview .files=${data.files}>
        Selected file <usa-link>Change file</usa-link>
      </usa-file-input-preview>
    `);

    return assert.isAccessible(fileInputPreview);
  });

  it("should display file preview for images", async () => {
    const data = new DataTransfer();
    data.items.add(new File([], "image1.jpg"));
    data.items.add(new File([], "image2.jpg"));

    const { shadowRoot } = await fixture<USAFileInputPreviewElement>(html`
      <usa-file-input-preview .files=${data.files}>
        Selected file <usa-link>Change file</usa-link>
      </usa-file-input-preview>
    `);

    const previewItems = Array.from(
      shadowRoot!.querySelectorAll(".preview-item")
    ).map((item) => item.textContent);

    assert.deepEqual(previewItems, ["image1.jpg", "image2.jpg"]);
  });

  it("should display fewer previews when the number of items decreases", async () => {
    const data = new DataTransfer();
    data.items.add(new File([], "image1.jpg"));
    data.items.add(new File([], "image2.jpg"));

    const fileInputPreview = await fixture<USAFileInputPreviewElement>(html`
      <usa-file-input-preview .files=${data.files}>
        Selected file <usa-link>Change file</usa-link>
      </usa-file-input-preview>
    `);

    const data2 = new DataTransfer();
    data2.items.add(new File([], "image1.jpg"));

    fileInputPreview.files = data2.files;

    // need this to wait for effects to resolve
    await Promise.resolve();

    const previewItems = Array.from(
      fileInputPreview.shadowRoot!.querySelectorAll(".preview-item")
    ).map((item) => item.textContent);

    assert.deepEqual(previewItems, ["image1.jpg"]);
  });

  it("should create preview images for each file", async () => {
    const data = new DataTransfer();
    data.items.add(new File(["Image1"], "image1.jpg"));
    data.items.add(new File(["Image2"], "image2.jpg"));

    const { shadowRoot } = await fixture<USAFileInputPreviewElement>(html`
      <usa-file-input-preview .files=${data.files}>
        Selected file <usa-link>Change file</usa-link>
      </usa-file-input-preview>
    `);

    const [first, second] = Array.from(
      shadowRoot!.querySelectorAll<HTMLImageElement>(".preview-item img")
    ).map((item) => item.src.substring(29));

    // we are just testing that the two hashes are in fact different
    assert.isFalse(first === second);
  });
});
