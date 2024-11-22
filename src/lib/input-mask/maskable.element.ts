export interface MaskableElement extends HTMLElement {
  value: string;
  selectionStart: number | null;
  setSelectionRange(start: number, end: number): void;
}
