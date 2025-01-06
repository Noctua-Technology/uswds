import { attr, css, element, html, query } from "@joist/element";

declare global {
  interface HTMLElementTagNameMap {
    "usa-radio-option": USARadioOptionElement;
  }
}

@element({
  tagName: "usa-radio-option",
  shadowDom: [
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-top: 0.05rem;
      }
    `,
    html`
      <!-- This label will be moved to the shadow dom of its parent -->
      <label>
        <input type="radio" />
        <slot name="reserved"></slot>
      </label>

      <slot></slot>
    `,
  ],
})
export class USARadioOptionElement extends HTMLElement {
  @attr()
  accessor value = "";

  @attr()
  accessor name = "";

  @attr()
  accessor checked = false;

  #label = query("label");
  #input = query("input");
  #slot = query("slot");

  #observer = new MutationObserver((records) => {
    for (const { target, attributeName } of records) {
      if (target instanceof Element) {
        switch (attributeName) {
          case "value": {
            this.checked = target.getAttribute("value") === this.value;
            break;
          }

          case "name": {
            this.name = target.getAttribute("name") ?? this.name;
            break;
          }
        }
      }
    }
  });

  attributeChangedCallback() {
    const input = this.#input();
    const slot = this.#slot();

    this.slot = this.value;

    input.name = this.name;
    input.value = this.value;
    input.checked = this.checked;

    slot.name = this.value;
  }

  connectedCallback() {
    const parent = this.parentElement;

    if (parent) {
      this.#observer.observe(parent, {
        attributes: true,
        attributeFilter: ["value", "name"],
      });

      this.name = parent.getAttribute("name") ?? this.name;
      this.checked = parent.getAttribute("value") === this.value;

      if (parent.shadowRoot) {
        parent.shadowRoot.append(this.#label());
      }
    }
  }

  disconnectedCallback() {
    this.#label().remove();

    this.#observer.disconnect();
  }
}
