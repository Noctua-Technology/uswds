import './description.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USADescriptionElement } from './description.element.js';

describe('usa-description', () => {
  it('should be accessible', async () => {
    const description = fixtureSync<USADescriptionElement>(html` <usa-description>Hello World</usa-description> `);

    return assert.isAccessible(description);
  });
});
