import { StaticToken } from "@joist/di";

export interface ComboBoxContainer extends Node {
  addOption(el: HTMLLIElement): void;
  removeOption(el: HTMLLIElement): void;
}

export const COMBO_BOX_CTX = new StaticToken<ComboBoxContainer>(
  "COMBO_BOX_CTX",
);
