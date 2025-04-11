import { attr, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-process-list-item": USAProcessListItemElement;
  }
}

@element({
  tagName: "usa-process-list-item",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        gap: .5rem;
        flex-direction: column;
        position: relative;
        padding-left: 3rem;
      }

      .number {
        background: #fff;
        box-shadow:  0 0 0 .25rem #fff;
        border: .25rem solid #1b1b1b;
        position: absolute;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        left: 0;
        top: -11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        z-index: 1;
      }

      .line {
        background: #d9e8f6;
        width: 0.5rem;
        position: absolute;
        top: 0;
        bottom: -2rem;
        left: calc(2.5rem / 2 - .25rem);
      }
      
      #title::slotted(*) {
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
      }

      :host(:last-child) .line {
        display: none;
      }
    `,
    html`
      <div class="number">
        <slot name="count">1</slot>
      </div>

      <div class="line"></div>
      
      <slot id="title" name="title"></slot>
      
      <div class="content">
        <slot></slot>
      </div>
    `,
  ],
})
export class USAProcessListItemElement extends HTMLElement {
  @attr()
  accessor role = "list-item";
}
