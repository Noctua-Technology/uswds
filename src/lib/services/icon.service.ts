import { inject, injectable } from '@joist/di';

import { USAConfig } from '../config/config.element.js';
import { HttpService } from './http.service.js';
import { USAIcon } from '../icon/icon-types.js';

@injectable()
export class IconService {
  #config = inject(USAConfig);
  #http = inject(HttpService);
  #iconCache: Map<USAIcon, HTMLTemplateElement> = new Map();

  async getIcon(icon: USAIcon, abortSignal?: AbortSignal): Promise<Node> {
    const config = this.#config();
    const http = this.#http();

    const cached = this.#iconCache.get(icon);

    if (cached) {
      if (!cached.content.firstElementChild) {
        throw Error('cached value is not valid');
      }

      return cached.content.firstElementChild.cloneNode(true);
    }

    const svg = http
      .fetch(`${config.iconPath}${icon}.svg`, {
        signal: abortSignal,
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.text();
        }

        return '';
      })
      .then((res) => {
        const template = document.createElement('template');
        template.innerHTML = res;

        this.#iconCache.set(icon, template);

        return template;
      });

    return svg.then((res) => {
      if (!res.content.firstElementChild) {
        throw Error('ICON is not valid');
      }

      return res.content.firstElementChild.cloneNode(true);
    });
  }
}
