import { inject, injectable } from "@joist/di";

import { HttpService } from "./http.service.js";
import { USAConfig } from "../config/config.element.js";

@injectable()
export class IconService {
  #http = inject(HttpService);
  #config = inject(USAConfig);
  #iconCache: Map<string, Promise<HTMLTemplateElement>> = new Map();

  async getIcon(icon: string): Promise<Node> {
    const http = this.#http();
    const config = this.#config();

    const cached = this.#iconCache.get(icon);

    if (cached) {
      return cached.then((res) => res.content.firstChild!.cloneNode(true));
    }

    const svg = http
      .fetch(`${config.iconPath}${icon}.svg`)
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.text();
        }

        return "";
      })
      .then((res) => {
        const template = document.createElement("template");
        template.innerHTML = res;

        return template;
      });

    this.#iconCache.set(icon, svg);

    return svg.then((res) => res.content.firstChild!.cloneNode(true));
  }
}
