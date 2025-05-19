import './button.element.js';

import { assert, fixture, html } from '@open-wc/testing';

import { BUTTON_VARIANTS, type USAButtonElement } from './button.element.js';

describe('usa-button', () => {
  for (const variant of BUTTON_VARIANTS) {
    it('should be accessible', async () => {
      const button = await fixture<USAButtonElement>(html` <usa-button variant=${variant}>Hello World</usa-button> `);

      return assert.isAccessible(button);
    });
  }
});
