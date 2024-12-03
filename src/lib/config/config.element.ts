import { inject, injectable, Injector } from "@joist/di";
import { attr, css, element, html } from "@joist/element";

export class USAConfig {
  spriteSheet = "";
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
  @attr()
  accessor spriteSheet = "/assets/img/sprite.svg";

  #injector = inject(Injector);

  connectedCallback() {
    const { providers } = this.#injector();

    providers.push({ provide: USAConfig, factory: () => this });
  }
}
