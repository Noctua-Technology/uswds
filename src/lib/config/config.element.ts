import { inject, injectable, injected, Injector } from "@joist/di";
import { attr, css, element, html } from "@joist/element";

export class USAConfig {
  iconPath: string = "";
}

@injectable({
  name: "usa-config-injector",
})
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
export class USAConfigElement extends HTMLElement {
  @attr({
    name: "icon-path",
  })
  accessor iconPath = "/assets/usa-icons/";

  #injector = inject(Injector);

  @injected()
  onInjected() {
    const { providers } = this.#injector();

    providers.push({
      provide: USAConfig,
      factory: () => this,
    });
  }
}
