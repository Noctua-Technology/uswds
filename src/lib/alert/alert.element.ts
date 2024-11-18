import { css, element, html } from "@joist/element";

@element({
  tagName: "usa-alert",
  shadow: [
    css`
      :host {
        display: flex;
        border-left: 0.5rem solid #adadad;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
      }

      :host([type="info"]) {
        border-left-color: #00bde3;
        background-color: #e7f6f8;
        color: #1b1b1b;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `,
    html`
      <span class="alert-icon"></span>

      <div class="alert-body">
        <slot name="title"></slot>

        <slot></slot>
      </div>
    `,
  ],
})
export class USWDSAlertElement extends HTMLElement {}
