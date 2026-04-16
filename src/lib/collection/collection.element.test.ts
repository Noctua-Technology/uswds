import './collection.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USACollectionElement } from './collection.element.js';

describe('usa-collection', () => {
  it('should be accessible', async () => {
    const collection = fixtureSync<USACollectionElement>(html` <usa-collection>Hello World</usa-collection> `);

    return assert.isAccessible(collection);
  });
});
