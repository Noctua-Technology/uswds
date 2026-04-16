import './summary-box.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';

import type { USASummaryBoxElement } from './summary-box.element.js';

describe('usa-summary-box', () => {
  it('should be accessible', async () => {
    const summaryBox = fixtureSync<USASummaryBoxElement>(html` <usa-summary-box>Hello World</usa-summary-box> `);

    return assert.isAccessible(summaryBox);
  });
});
