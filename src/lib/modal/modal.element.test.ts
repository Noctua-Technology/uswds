import './modal.element.js';
import './modal-heading/modal-heading.element.js';
import './modal-close/modal-close.element.js';

import { assert, fixture, html } from '@open-wc/testing';

import type { USAModalElement } from './modal.element.js';

describe('usa-modal', () => {
  it('should be accessible', async () => {
    const modal = await fixture<USAModalElement>(html`
      <usa-modal open>
        <usa-modal-close></usa-modal-close>

        <usa-modal-heading> Are you sure you want to continue? </usa-modal-heading>

        <p>This is some other example of content</p>
      </usa-modal>
    `);

    return assert.isAccessible(modal);
  });

  it('should open modal if document level element with modal-target is clicked', async () => {
    const container = await fixture<HTMLDivElement>(html`
      <div>
        <button modal-target="test">OPEN</button>

        <usa-modal id="test">
          <usa-modal-close></usa-modal-close>

          <usa-modal-heading> Are you sure you want to continue? </usa-modal-heading>

          <p>This is some other example of content</p>
        </usa-modal>
      </div>
    `);

    const btn = container.querySelector('button')!;
    const modal = container.querySelector('usa-modal')!;

    assert.notOk(modal.isOpen);

    btn.click();

    assert.ok(modal.isOpen);
  });
});
