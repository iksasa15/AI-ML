const AMP_SPLIT = /\s*&\s*/;

export function hasAmpersand(text: string): boolean {
  return AMP_SPLIT.test(text);
}

export function splitOnAmpersand(text: string): string[] {
  return text.split(AMP_SPLIT);
}

export function formatAmpersandHTML(
  raw: string,
  escape: (value: string) => string,
  ampClass = "text-amp"
): string {
  if (!hasAmpersand(raw)) return escape(raw);

  return splitOnAmpersand(raw)
    .map((part, index) => {
      const escaped = escape(part);
      if (index === 0) return escaped;
      return ` <span class="${ampClass}" aria-label=" and ">&amp;</span> ${escaped}`;
    })
    .join("");
}
