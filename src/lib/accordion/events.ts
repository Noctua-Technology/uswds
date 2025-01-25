import type { USAAccordionElement } from "./accordion.element.js";

export class USAAccordionToggleEvent extends Event {
  open;

  get target() {
    return super.target as USAAccordionElement;
  }

  constructor(open: boolean) {
    super("usa::accordion::toggle", { bubbles: true });

    this.open = open;
  }
}
