import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-collection-item": USACollectionItemElement;
  }
}

@element({
  tagName: "usa-collection-item",
  shadowDom: [
    css`
      :host {
        display: flex;
        gap: 1rem;
      }

      .content {
        display: flex;
        flex-direction: column;
      }

      slot[name="heading"]::slotted(*) {
        font-size: 1.13rem;
        line-height: 1.3;
        margin-bottom: 0;
        margin-top: 0;
      }

      .description {
        margin-bottom: .5rem;
        margin-top: .5rem;
      }
    `,
    html`
      <slot name="img"></slot>

      <div class="content">
        <div class="heading">
          <slot name="heading"></slot>
        </div>

        <div class="description">
          <slot name="description"></slot>
        </div>

        <div class="meta">
          <slot name="meta"></slot>
        </div>
      </div>
    `,
  ],
})
export class USACollectionItemElement extends HTMLElement {}
