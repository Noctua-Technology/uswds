import { inject, injectable, Injector, Provider } from "@joist/di";
import { attr, css, element, html, ready } from "@joist/element";

export class USAConfig {
  iconPath: string = "";
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
export class USAConfigElement extends HTMLElement {
  @attr({
    name: "icon-path",
  })
  accessor iconPath = "/assets/usa-icons/";

  #injector = inject(Injector);

  @ready()
  onReady() {
    const injector = this.#injector();
    const config = this;

    injector.providers.push({
      provide: USAConfig,
      factory() {
        return {
          get iconPath() {
            return config.iconPath;
          },
        };
      },
    });
  }
}
