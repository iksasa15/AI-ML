import renderMathInElement from "katex/dist/contrib/auto-render.mjs";

const DELIMITERS = [
  { left: "$$", right: "$$", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\[", right: "\\]", display: true },
];

/** Renders all TeX in a container (display \\[…\\] and inline \\(…\\)). */
export function renderSlideMath(target: HTMLElement | null) {
  if (!target?.isConnected) return;
  renderMathInElement(target, {
    delimiters: DELIMITERS,
    ignoredClasses: ["katex", "katex-display"],
    throwOnError: false,
    strict: "ignore",
    trust: false,
  });
}
