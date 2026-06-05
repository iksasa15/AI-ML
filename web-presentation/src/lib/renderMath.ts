import renderMathInElement from "katex/dist/contrib/auto-render.mjs";

const DELIMITERS = [
  { left: "$$", right: "$$", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\[", right: "\\]", display: true },
];

const RENDER_OPTIONS = {
  delimiters: DELIMITERS,
  ignoredClasses: ["katex", "katex-display"],
  throwOnError: false,
  strict: "ignore" as const,
  trust: false,
};

/** Render TeX inside any element (connected or detached). */
export function renderMathInContainer(target: HTMLElement | null) {
  if (!target) return;
  renderMathInElement(target, RENDER_OPTIONS);
}

/** Prerender TeX in a plain string to HTML (works on detached nodes). */
export function renderMathHtml(text: string): string {
  if (!text || typeof document === "undefined") return text;
  const el = document.createElement("div");
  el.textContent = text;
  renderMathInContainer(el);
  return el.innerHTML;
}

/** Renders all TeX in a live slide container (must be in the document). */
export function renderSlideMath(target: HTMLElement | null) {
  if (!target?.isConnected) return;
  renderMathInContainer(target);
}
