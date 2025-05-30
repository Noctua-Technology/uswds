import './tag.element.js';

import { assert, fixture, html } from '@open-wc/testing';

import type { USATagElement } from './tag.element.js';

describe('usa-tag', () => {
  it('should be accessible', async () => {
    const tag = await fixture<USATagElement>(html` <usa-tag>Hello World</usa-tag> `);

    return assert.isAccessible(tag);
  });
});
