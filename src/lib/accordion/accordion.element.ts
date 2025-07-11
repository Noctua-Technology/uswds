import '../templating.js';

import { attr, css, element, html, listen } from '@joist/element';
import { bind } from '@joist/templating';

import { USAAccordionToggleEvent } from './events.js';

declare global {
  interface HTMLElementTagNameMap {
    'usa-accordion': USAAccordionElement;
  }
}

@element({
  tagName: 'usa-accordion',
  shadowDomOpts: {
    mode: 'open',
    delegatesFocus: true,
  },
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

      summary::-webkit-details-marker {
        display: none;
      }

      slot[name='heading'] {
        display: block;
        flex: 1 1 auto;
      }

      slot[name='heading']::slotted(*) {
        margin: 0;
      }

      .content {
        padding-bottom: 1.5rem;
        padding-left: 1rem;
        padding-top: 1.5rem;
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
      <usa-bind props="open">
        <details>
          <summary>
            <slot name="heading"></slot>

            <usa-bind props="icon">
              <usa-icon></usa-icon>
            </usa-bind>
          </summary>

          <div class="content">
            <slot></slot>
          </div>
        </details>
      </usa-bind>
    `,
  ],
})
export class USAAccordionElement extends HTMLElement {
  @attr()
  accessor name = '';

  @attr()
  @bind()
  accessor open = false;

  @bind({
    compute: (i) => (i.open ? 'remove' : 'add'),
  })
  accessor icon: 'add' | 'remove' = 'add';

  @listen('click', 'summary')
  onClick(e: Event) {
    e.preventDefault();

    this.dispatchEvent(new USAAccordionToggleEvent(!this.open));
  }

  @listen('usa::accordion::toggle', () => document.body)
  onAccordionToggle(e: USAAccordionToggleEvent) {
    if (e.target.name === this.name) {
      this.open = e.target === this && e.open;
    } else if (e.target === this) {
      this.open = e.open;
    }
  }
}
