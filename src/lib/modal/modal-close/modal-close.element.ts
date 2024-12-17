import { css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-modal-close": USAModalCloseElement;
  }
}

@element({
  tagName: "usa-modal-close",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
        border-radius: 100%;
        padding: 0;
        margin: 0;
      }

      button:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }
    `,
    html`
      <button aria-label="close modal">
        <usa-icon icon="close"></usa-icon>
      </button>
    `,
  ],
})
export class USAModalCloseElement extends HTMLElement {}
