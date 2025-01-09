import { StaticToken } from "@joist/di";

export interface SelectContainer extends Node {
  value: string;
  addSelectOption: (el: HTMLOptionElement) => void;
}

export const SELECT_CONTEXT = new StaticToken<SelectContainer>(
  "SELECT_CONTEXT",
);
