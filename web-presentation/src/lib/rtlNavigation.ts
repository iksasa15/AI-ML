/** Map physical arrow keys to deck navigation based on UI direction. */
export function arrowKeyToAction(
  key: "ArrowLeft" | "ArrowRight",
  rtl: boolean
): "prev" | "next" {
  if (!rtl) {
    return key === "ArrowRight" ? "next" : "prev";
  }
  return key === "ArrowRight" ? "prev" : "next";
}

/** Arrow glyph shown in hints for “reveal next bullet” / forward in reading direction. */
export function forwardArrowGlyph(rtl: boolean): string {
  return rtl ? "←" : "→";
}

/** Arrow glyph for “back” in keyboard hints. */
export function backArrowGlyph(rtl: boolean): string {
  return rtl ? "→" : "←";
}
