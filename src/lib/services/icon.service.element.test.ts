import { Injector } from '@joist/di';
import { assert } from '@open-wc/testing';

import { HttpService } from './http.service.js';
import { IconService } from './icon.service.js';

describe('IconService', () => {
  it('should fetch icon if not in cache', async () => {
    let callCount = 0;

    const app = new Injector({
      providers: [
        [
          HttpService,
          {
            use: class extends HttpService {
              async fetch(): Promise<Response> {
                callCount++;
                return new Response('<svg></svg>');
              }
            },
          },
        ],
      ],
    });

    const icon = app.inject(IconService);

    const res = await icon.getIcon('test' as any);

    assert.equal(res.nodeName, 'svg');
    assert.equal(callCount, 1);
  });

  it('should not fetch new icon if the icon is found in the cache', async () => {
    let callCount = 0;

    const app = new Injector({
      providers: [
        [
          HttpService,
          {
            use: class extends HttpService {
              async fetch(): Promise<Response> {
                callCount++;
                return new Response('<svg></svg>');
              }
            },
          },
        ],
      ],
    });

    const icon = app.inject(IconService);

    await icon.getIcon('accessibility_new');

    const res = await icon.getIcon('accessibility_new');

    assert.equal(res.nodeName, 'svg');
    assert.equal(callCount, 1);
  });

  it('should not fetch multiple times if the same icon is requested at the same time', async () => {
    let callCount = 0;

    const app = new Injector({
      providers: [
        [
          HttpService,
          {
            use: class extends HttpService {
              async fetch(): Promise<Response> {
                callCount++;
                return new Response('<svg></svg>');
              }
            },
          },
        ],
      ],
    });

    const icon = app.inject(IconService);

    await Promise.all([
      icon.getIcon('accessibility_new'),
      icon.getIcon('accessibility_new'),
      icon.getIcon('accessibility_new'),
    ]);

    assert.equal(callCount, 1);
  });
});
