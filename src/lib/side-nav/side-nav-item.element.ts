import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-side-nav-item": USASideNavItemElement;
  }
}

@element({
  tagName: "usa-side-nav-item",
  shadowDom: [
    css`
      :host {
        --usa-nav-item-padding-left: 2rem;

        display: block;
        border-top: 1px solid #e6e6e6;
      }

      .side-nav-item {
        display: flex;
        padding: 0.5rem 1rem;
        text-decoration: none;
        position: relative;
      }

      .side-nav-item:hover {
        background-color: #f0f0f0;
        color: #005ea2;
      }

      ::slotted(*) {
        color: #5c5c5c;
        text-decoration: none;
        display: block;
        width: 100%;
      }

      :host(:hover) ::slotted(*) {
        color: #005ea2;
      }

      :host([current]) ::slotted(*:not(usa-side-nav-item)) {
        color: #005ea2;
        font-weight: 700;
      }

      :host([current]) .side-nav-item::after {
        background-color: #005ea2;
        border-radius: 99rem;
        content: "";
        display: block;
        position: absolute;
        bottom: 0.25rem;
        top: 0.25rem;
        width: 0.25rem;
        left: 0;
      }

      :host([slot="children"]) .side-nav-item {
        padding-left: var(--usa-nav-item-padding-left);
      }

      :host([slot="children"]) ::slotted(usa-side-nav-item) {
        --usa-nav-item-padding-left: 3rem;
      }

      :host([slot="children"]) .side-nav-item::after {
        display: none;
      }
    `,
    html`
      <div class="side-nav-item">
        <slot></slot>
      </div>

      <slot name="children"></slot>
    `,
  ],
})
export class USASideNavItemElement extends HTMLElement {
  @attr()
  accessor current = false;
}
