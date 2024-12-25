import { Injector } from "@joist/di";
import { assert } from "@open-wc/testing";

import { HttpService } from "./http.service.js";
import { IconService } from "./icon.service.js";

describe("IconService", () => {
  it("should fetch icon if not in cache", async () => {
    let callCount = 0;

    const app = new Injector({
      providers: [
        {
          provide: HttpService,
          use: class extends HttpService {
            async fetch(): Promise<Response> {
              callCount++;
              return new Response("<svg></svg>");
            }
          },
        },
      ],
    });

    const icon = app.inject(IconService);

    const res = await icon.getIcon("test");

    assert.equal(res.nodeName, "svg");
    assert.equal(callCount, 1);
  });

  it("should not fetch new icon if the icon is found in the cache", async () => {
    let callCount = 0;

    const app = new Injector({
      providers: [
        {
          provide: HttpService,
          use: class extends HttpService {
            async fetch(): Promise<Response> {
              callCount++;
              return new Response("<svg></svg>");
            }
          },
        },
      ],
    });

    const icon = app.inject(IconService);

    await icon.getIcon("test");

    const res = await icon.getIcon("test");

    assert.equal(res.nodeName, "svg");
    assert.equal(callCount, 1);
  });
});
