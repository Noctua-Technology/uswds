import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-breadcrumbs": USABreadcrumbsElement;
  }
}

@element({
  tagName: "usa-breadcrumbs",
  shadowDom: [
    css`
      :host {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 0;
        margin-top: 0;
        list-style-type: none;
        padding-left: 0;
        display: block;
        padding: .25rem;
        margin-left: -.25rem;
        margin-right: -.25rem;
      }

      :host([wrap]) {
        white-space: normal;
      }
    `,
    html`
      <slot></slot>
    `,
  ],
})
export class USABreadcrumbsElement extends HTMLElement {
  @attr()
  accessor role = "list";

  @attr()
  accessor wrap = false;
}
