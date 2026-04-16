import './config.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USAConfigElement } from './config.element.js';

describe('usa-config', () => {
  it('should be accessible', async () => {
    const config = fixtureSync<USAConfigElement>(html` <usa-config>Hello World</usa-config> `);

    return assert.isAccessible(config);
  });
});
