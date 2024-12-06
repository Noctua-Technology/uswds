import { attr, css, element, html, listen, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-accordion": USAAccordionElement;
  }
}

class USAAccordionToggleEvent extends Event {
  open;

  get target() {
    return super.target as USAAccordionElement;
  }

  constructor(open: boolean) {
    super("usa::accordion::toggle", { bubbles: true });

    this.open = open;
  }
}

@element({
  tagName: "usa-accordion",
  shadowDom: [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
      }

      :host(:not(:first-child)) summary {
        margin-top: 0.5rem;
      }

      summary {
        align-items: center;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        justify-content: normal;
        text-align: left;
        padding: 0;
        color: #1b1b1b;
        background-color: #f0f0f0;
        cursor: pointer;
        display: flex;
        font-weight: 700;
        margin: 0;
        padding: 1rem 1.25rem 1rem 1.25rem;
        text-decoration: none;
        width: 100%;
      }

      slot[name="heading"] {
        display: block;
        flex: 1 1 auto;
      }

      slot[name="heading"]::slotted(*) {
        margin: 0;
      }

      .content {
        padding-bottom: 1.5rem;
        padding-left: 1rem;
        padding-top: 1.5rem;
      }

      usa-icon[icon="remove"] {
        display: none;
      }

      details[open] usa-icon[icon="add"] {
        display: none;
      }

      details[open] usa-icon[icon="remove"] {
        display: block;
      }

      summary:hover {
        background-color: #e6e6e6;
      }

      summary:focus {
        outline: 0.25rem solid #2491ff;
        outline-offset: 0;
      }
    `,
    html`
      <details>
        <summary>
          <slot name="heading"></slot>

          <usa-icon icon="add"></usa-icon>
          <usa-icon icon="remove"></usa-icon>
        </summary>

        <div class="content">
          <slot></slot>
        </div>
      </details>
    `,
  ],
})
export class USAAccordionElement extends HTMLElement {
  @attr()
  accessor name = "";

  @attr()
  accessor open = false;

  #details = query("details");
  #summary = query("summary");

  attributeChangedCallback() {
    const details = this.#details();
    details.open = this.open;
  }

  @listen("click", "summary")
  onClick(e: Event) {
    e.preventDefault();

    const summary = this.#summary();

    summary.focus();

    this.dispatchEvent(new USAAccordionToggleEvent(!this.open));
  }

  @listen("usa::accordion::toggle", () => document.body)
  onAccordionToggle(e: USAAccordionToggleEvent) {
    if (e.target.name === this.name) {
      this.open = e.target === this && e.open;
    } else if (e.target === this) {
      this.open = e.open;
    }
  }
}
