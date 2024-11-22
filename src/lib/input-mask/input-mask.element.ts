import { attr, css, element, html } from "@joist/element";

export enum PatternChar {
  Any = "*",
  Number = "9",
  Letter = "A",
}

export const PATTERN_CHARS = Object.values(PatternChar);

const REG_EXPS = {
  Letters: /^[a-z]/i,
  Numbers: /^[0-9]/i,
};

export interface FormattedResult {
  raw: string;
  formatted: string;
}

export function format(value: string, pattern: string): FormattedResult {
  const raw = value.replace(/[^a-z0-9]/gi, ""); // remove all special chars
  const chars = raw.split("");

  let count = 0;
  let formatted = "";

  for (var i = 0; i < pattern.length; i++) {
    const patternChar = pattern[i];
    const char = chars[count];

    if (char && patternChar) {
      if (patternChar === PatternChar.Any) {
        // Any letter or number
        formatted += char;
        count++;
      } else if (patternChar === PatternChar.Number) {
        // Numbers only
        if (/^[0-9]/i.test(char)) {
          formatted += char;
        }

        count++;
      } else if (patternChar === PatternChar.Letter) {
        // Letters only
        if (/^[a-z]/i.test(char)) {
          formatted += char;
        }

        count++;
      } else {
        formatted += patternChar;
      }
    }
  }

  return { raw, formatted };
}

function applyFormatting(input: HTMLInputElement, result: FormattedResult) {
  input.value = result.formatted;
  input.setAttribute("value", result.raw);
}

@element({
  tagName: "usa-input-mask",
  shadow: [
    css`
      :host {
        display: contents;
      }
    `,
    html`<slot></slot>`,
  ],
})
export class USAInputMaskElement extends HTMLElement {
  @attr()
  accessor mask = "";

  private removeInputMask: () => void = () => void 0;

  connectedCallback() {
    // Format the default value
    this.querySelectorAll<HTMLInputElement>("input,[input-mask]").forEach(
      (input) => {
        applyFormatting(input, format(input.value, this.mask));
      }
    );

    this.removeInputMask = applyInputMask(this, this.mask);
  }

  attributeChangedCallback() {
    this.removeInputMask();

    this.removeInputMask = applyInputMask(this, this.mask);
  }
}

export class InputMaskChangeEvent extends Event {
  constructor(public readonly value: string) {
    super("inputmaskchange", { bubbles: true });
  }
}

export function applyInputMask(container: HTMLElement, mask: string) {
  container.addEventListener("input", onInput);
  container.addEventListener("keydown", onKeyDown);

  function onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const selectionStart = input.selectionStart || 0;
    const prev = input.value;

    applyFormatting(input, format(input.value, mask));

    const offset = input.value.length - prev.length;
    const maskChar = mask[selectionStart - 1] as PatternChar | undefined;

    // check if the current value is not a space for characters and has an offset greater then 0
    if (maskChar && !PATTERN_CHARS.includes(maskChar) && offset > 0) {
      input.setSelectionRange(selectionStart + offset, selectionStart + offset);
    } else {
      input.setSelectionRange(selectionStart, selectionStart);
    }

    if (prev !== input.value) {
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new InputMaskChangeEvent(input.value));
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    const patternChar = mask[input.selectionStart || 0];

    if (e.key.length === 1 && /^[a-z0-9]/i.test(e.key)) {
      // check that the key is a single character and that it is a letter or number

      if (input.value.length >= mask.length) {
        // prevent default once value is the same as the mask length
        e.preventDefault();
      } else if (patternChar === PatternChar.Number) {
        if (!REG_EXPS.Numbers.test(e.key)) {
          // if pattern char specifies number and is not
          e.preventDefault();
        }
      } else if (patternChar === PatternChar.Letter) {
        if (!REG_EXPS.Letters.test(e.key)) {
          // if pattern char specifies letter and is not
          e.preventDefault();
        }
      }
    }
  }

  return () => {
    container.removeEventListener("input", onInput);
    container.removeEventListener("keydown", onKeyDown);
  };
}
