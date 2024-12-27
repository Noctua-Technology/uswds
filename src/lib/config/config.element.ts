import { created, injectable, Injector } from "@joist/di";
import { attr, css, element, html } from "@joist/element";

export class USAConfig {
  iconPath: string = "";
}

@injectable({
  name: "USAConfigElement",
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

  @created()
  onInjectorCreated({ providers }: Injector) {
    providers.set(USAConfig, { factory: () => this });
  }
}
