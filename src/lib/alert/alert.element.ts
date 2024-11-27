import { attr, css, element, html, query } from "@joist/element";

import { USA_ALERT_CONFIG, USAAlertType } from "./alert-types.js";
import { USAIconElement } from "../icon/icon.element.js";

declare global {
  interface HTMLElementTagNameMap {
    "usa-alert": USAAlertElement;
  }
}

@element({
  tagName: "usa-alert",
  shadowDom: [
    css`
      :host {
        display: block;
        border-left: 0.5rem solid #adadad;
        padding: 1rem 1.2rem;
        color: #1b1b1b;
      }

      :host([type="info"]) {
        border-left-color: #00bde3;
        background-color: #e7f6f8;
      }

      :host([type="warning"]) {
        background-color: #faf3d1;
        border-left-color: #ffbe2e;
      }

      :host([type="success"]) {
        background-color: #ecf3ec;
        border-left-color: #00a91c;
      }

      :host([type="error"]) {
        background-color: #f4e3db;
        border-left-color: #d54309;
      }

      :host([type="emergency"]) {
        background-color: #9c3d10;
        border-left-color: #9c3d10;
        color: #fff;
      }

      :host([type="emergency"]) ::slotted(usa-link) {
        color: #fff !important;
      }

      .alert-heading {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
      }

      usa-icon {
        margin: -0.28rem 0.75rem 0 0;
      }

      #heading::slotted(*) {
        font-family:
          Source Sans Pro Web,
          Helvetica Neue,
          Helvetica,
          Roboto,
          Arial,
          sans-serif;
        font-size: 1.33rem;
        line-height: 0.9;
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
    `,
    html`
      <div class="alert-heading">
        <usa-icon icon="check_circle"></usa-icon>

        <div>
          <slot id="heading" name="heading"></slot>
        </div>

        <div class="spacer"></div>

        <div>
          <slot></slot>
        </div>
      </div>
    `,
  ],
})
export class USAAlertElement extends HTMLElement {
  @attr()
  accessor type: USAAlertType = "info";

  #icon = query<USAIconElement>("usa-icon");

  attributeChangedCallback() {
    const icon = this.#icon();

    icon.icon = USA_ALERT_CONFIG[this.type].icon;
  }
}
