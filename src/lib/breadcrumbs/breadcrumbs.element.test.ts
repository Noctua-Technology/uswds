import './breadcrumbs.element.js';
import './breadcrumb/breadcrumb.element.js';

import { assert, fixture, html } from '@open-wc/testing';

import type { USABreadcrumbsElement } from './breadcrumbs.element.js';

describe('usa-breadcrumbs', () => {
  it('should be accessible', async () => {
    const breadcrumbs = await fixture<USABreadcrumbsElement>(html`
      <usa-breadcrumbs>
        <usa-breadcrumb href="/">Home</usa-breadcrumb>
        <usa-breadcrumb href="/">Federal Contracting</usa-breadcrumb>
        <usa-breadcrumb href="/">Contracting assistance programs</usa-breadcrumb>
        <usa-breadcrumb
          >Economically disadvantaged women-owned small business federal contracting program</usa-breadcrumb
        >
      </usa-breadcrumbs>
    `);

    return assert.isAccessible(breadcrumbs);
  });
});
