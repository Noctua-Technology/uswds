import './button-group.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USAButtonGroupElement } from './button-group.element.js';

describe('usa-button-group', () => {
  it('should be accessible', async () => {
    const buttonGroup = fixtureSync<USAButtonGroupElement>(html` <usa-button-group>Hello World</usa-button-group> `);

    return assert.isAccessible(buttonGroup);
  });
});
