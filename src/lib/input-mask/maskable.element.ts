export interface MaskableElement extends HTMLElement {
  value: string;
  selectionStart: number | null;
  selectionEnd: number | null;
}
