import { inject, injectable } from "@joist/di";
import { attr, css, element, html } from "@joist/element";

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

  #config = inject(USAConfig);

  connectedCallback() {
    const config = this.#config();

    config.iconPath = this.iconPath;
  }
}
