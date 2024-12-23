import { inject, injectable, injected, Injector, Provider } from "@joist/di";
import { attr, css, element, html, ready } from "@joist/element";

export class USAConfig {
  iconPath: string = "";
}

@injectable()
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
    const config = this;

    const usaConfig: Provider<USAConfig> = {
      provide: USAConfig,
      factory() {
        return {
          get iconPath() {
            return config.iconPath;
          },
        };
      },
    };

    providers.push(usaConfig);
  }
}
