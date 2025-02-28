import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-tag": USATagElement;
  }
}

export const TAG_VARIANTS = ["default", "big"] as const;
export const TAG_TYPES = ["new", "default"] as const;

export type TagVariant = (typeof TAG_VARIANTS)[number];
export type TagType = (typeof TAG_TYPES)[number];

@element({
  tagName: "usa-tag",
  shadowDom: [
    css`
      :host {
        font-size: 0.93rem;
        color: #1b1b1b;
        text-transform: uppercase;
        background-color: #e6e6e6;
        border-radius: 2px;
        margin-right: 0.25rem;
        padding: 1px 0.5rem;
      }

      :host([variant="big"]) {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 1.06rem;
      }

      :host([type="new"]) {
        background-color: #c05600;
        color: #fff;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USATagElement extends HTMLElement {
  @attr()
  accessor variant: TagVariant = "default";

  @attr()
  accessor type: TagType = "default";
}
