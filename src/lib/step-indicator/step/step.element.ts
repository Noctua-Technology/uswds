import { attr, attrChanged, css, element, html } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-step": USAStepIndicatorStepElement;
  }
}

@element({
  tagName: "usa-step",
  shadowDom: [
    css`
      :host {
        color: #5c5c5c;
        display: block;
        flex: 1 1 0%;
        position: relative;
        counter-increment: usa-step-indicator;
      }

      :host([counter]):after {
        content: counter(usa-step-indicator);
        height: 2.5rem;
        border-radius: 99rem;
        width: 2.5rem;
        background-color: #fff;
        box-shadow:
          inset 0 0 0 0.25rem #919191,
          0 0 0 0.25rem #fff;
        color: #5c5c5c;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        left: 0;
        line-height: 0.9;
        padding: calc((2.5rem - 2ex * 0.9) * 0.5);
        position: absolute;
        z-index: 100;
        top: 0;
        transform: translateY(-40%);
        box-sizing: border-box;
      }

      :host([state="complete"]) {
        color: #162e51;
      }

      :host([state="complete"])::before {
        background-color: #162e51;
      }

      :host([state="current"]) {
        color: #005ea2;
        font-weight: bold;
      }

      :host([state="current"])::before {
        background-color: #005ea2;
      }

      :host:before {
        background-color: #919191;
        content: "";
        display: block;
        height: 0.5rem;
      }

      .label {
        display: block;
        font-size: 1.06rem;
        margin-top: 0.5rem;
        padding-right: 2rem;
        text-align: left;
      }

      :host([counter]) .label {
        margin-top: 1.5rem;
      }

      :host([counter][state="complete"]):after {
        background-color: #162e51;
        box-shadow: 0 0 0 0.25rem #fff;
        color: #fff;
      }

      :host([counter][state="current"]):after {
        background-color: #005ea2;
        box-shadow: 0 0 0 0.25rem #fff;
        color: #fff;
      }

      :host([counter="small"]):after {
        height: 1.5rem;
        width: 1.5rem;
        font-size: 0.93rem;
      }

      :host([counter]:last-child):before {
        width: 0;
      }
    `,
    html`
      <div class="label">
        <slot></slot>
      </div>
    `,
  ],
})
export class USAStepIndicatorStepElement extends HTMLElement {
  @attr()
  accessor state: "complete" | "current" | "" = "";

  @attr()
  accessor role = "listitem";

  @attrChanged("state")
  onStateAttrChanged() {
    if (this.state === "current") {
      this.ariaCurrent = "step";
    }
  }
}
