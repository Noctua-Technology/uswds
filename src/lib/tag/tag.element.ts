import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-tag": USATagElement;
  }
}

export const TAG_VARIANTS = ["default", "big"] as const;

export type TagVariant = (typeof TAG_VARIANTS)[number];

@element({
  tagName: "usa-tag",
  shadow: [
    css`
      :host {
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        font-size: 0.93rem;
        color: #fff;
        text-transform: uppercase;
        background-color: #fff;
        border-radius: 2px;
        margin-right: 0.25rem;
        padding: 1px 0.5rem;
      }

      :host([variant="big"]) {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 1.06rem;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USATagElement extends HTMLElement {
  @attr()
  accessor variant: TagVariant = "default";
}
