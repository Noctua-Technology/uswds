import { StaticToken } from "@joist/di";

export interface RadioContainer extends Node {
  name: string;
  value: string;
  addRadioOption(el: HTMLElement): void;
}

export const RADIO_CTX = new StaticToken<RadioContainer>("RADIO_CTX");
