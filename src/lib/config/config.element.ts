import { inject, injectable, Injector } from "@joist/di";
import { attr, css, element, html } from "@joist/element";

export class USAConfig {
  iconPath = "";
  iconCache: Map<string, Promise<string>> = new Map();
}

@element({
  tagName: "usa-config",
  shadowDom: [
    css`
      :host {
        display: contents;
      }
    `,
    html`<slot></slot>`,
  ],
})
@injectable()
export class USAConfigElement extends HTMLElement implements USAConfig {
  @attr({
    name: "icon-path",
  })
  accessor iconPath = "/assets/usa-icons/";

  iconCache: Map<string, Promise<string>> = new Map();

  #injector = inject(Injector);

  connectedCallback() {
    const { providers } = this.#injector();

    providers.push({ provide: USAConfig, factory: () => this });
  }
}
