import './in-page-nav.element.js';
import './in-page-nav-item/in-page-nav-item.element.js';

import { assert, fixture, html } from '@open-wc/testing';

import type { USAInPageNavElement } from './in-page-nav.element.js';

describe('usa-in-page-nav', () => {
  it('should be accessible', async () => {
    const inPageNav = await fixture<USAInPageNavElement>(html`
      <usa-in-page-nav>
        <usa-in-page-nav-item target="lorem-ipsum-dolor" primary> Lorem ipsum dolor </usa-in-page-nav-item>
        <usa-in-page-nav-item target="consectetuer-adipiscing-elit" primary>
          Consectetuer adipiscing elit
        </usa-in-page-nav-item>
        <usa-in-page-nav-item target="nullam-sit-amet-enim"> Nullam sit amet enim </usa-in-page-nav-item>
        <usa-in-page-nav-item target="vivamus-pharetra-posuere-sapien">
          Vivamus pharetra posuere sapien
        </usa-in-page-nav-item>
        <usa-in-page-nav-item target="suspendisse-id-velit"> Suspendisse id velit </usa-in-page-nav-item>
        <usa-in-page-nav-item target="orci-magna-rhoncus-neque"> Orci magna rhoncus neque </usa-in-page-nav-item>
        <usa-in-page-nav-item target="aliquam-erat-volutpat-velit-vitae-ligula-volutpat" primary>
          Aliquam erat volutpat: velit vitae ligula volutpat
        </usa-in-page-nav-item>
        <usa-in-page-nav-item target="vitae-ligula"> Vitae ligula </usa-in-page-nav-item>
      </usa-in-page-nav>
    `);

    return assert.isAccessible(inPageNav);
  });
});
