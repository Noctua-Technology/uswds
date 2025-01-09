export interface RadioContainer extends Node {
  name: string;
  value: string;
  addRadioOption: (el: HTMLElement) => void;
}

export class RadioContextRequestEvent extends Event {
  callback: (container: RadioContainer, unsubscribe: () => void) => void;

  constructor(
    callback: (container: RadioContainer, unsubscribe: () => void) => void,
  ) {
    super("radio-context-request", { bubbles: true, composed: true });

    this.callback = callback;
  }
}

declare global {
  interface HTMLElementEventMap {
    "radio-context-request": RadioContextRequestEvent;
  }
}
