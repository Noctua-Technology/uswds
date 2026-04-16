import './modal-close.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USAModalCloseElement } from './modal-close.element.js';

describe('usa-modal-close', () => {
  it('should be accessible', async () => {
    const modalClose = fixtureSync<USAModalCloseElement>(html` <usa-modal-close>Hello World</usa-modal-close> `);

    return assert.isAccessible(modalClose);
  });
});
