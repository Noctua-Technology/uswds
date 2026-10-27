import { attr, css, element, html } from '@joist/element';

export class USAConfig {
  iconPath = '';
}

@element({
  tagName: 'usa-config',
  provideSelfAs: [USAConfig],
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
    name: 'icon-path',
  })
  accessor iconPath = '/assets/usa-icons/';
}
