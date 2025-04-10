declare global {
  interface HTMLElementEventMap {
    "usa::search": USASearchEvent;
  }
}

export class USASearchEvent extends Event {
  value: string;

  constructor(value: string) {
    super("usa::search", { bubbles: true, composed: true });

    this.value = value;
  }
}
