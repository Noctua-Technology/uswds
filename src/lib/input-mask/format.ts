export const PATTERN_CHARS = ["*", "9", "A"] as const;

export type PatternChar = (typeof PATTERN_CHARS)[number];

export const REG_EXPS = {
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

  for (let i = 0; i < pattern.length; i++) {
    const patternChar = pattern[i];
    const char = chars[count];

    if (char && patternChar) {
      if (isPatternChar(patternChar)) {
        if (patternChar === "*") {
          // Any letter or number
          formatted += char;
          count++;
        } else if (patternChar === "9") {
          // Numbers only
          if (/^[0-9]/i.test(char)) {
            formatted += char;
          }

          count++;
        } else if (patternChar === "A") {
          // Letters only
          if (/^[a-z]/i.test(char)) {
            formatted += char;
          }

          count++;
        }
      } else {
        formatted += patternChar;
      }
    }
  }

  return { raw, formatted };
}

export function isPatternChar(char: unknown): char is PatternChar {
  return PATTERN_CHARS.some((c) => char === c);
}
