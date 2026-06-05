import { renderSlideMath } from "./renderMath";
import { escapeHTML, renderDisplayFormula, type SlideRecord } from "./slideMarkup";

const TEX_HINT = /\\[\(\[]|\\begin\{|\\frac|\\sum|\\int|\$\$/;

function prerenderTextField(text: string): string {
  if (!text || !TEX_HINT.test(text)) return text;
  if (typeof document === "undefined") return text;

  const el = document.createElement("div");
  el.textContent = text;
  renderSlideMath(el);
  return el.innerHTML;
}

function prerenderStringArray(items: string[]): string[] {
  return items.map((item) => prerenderTextField(item));
}

function prerenderSections(
  sections: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  return sections.map((section) => {
    const next = { ...section };
    if (typeof next.body === "string") next._bodyHtml = prerenderTextField(next.body);
    if (typeof next.formula === "string") {
      next._formulaHtml = renderDisplayFormula(String(next.formula));
    }
    if (Array.isArray(next.bullets)) {
      next._bulletsHtml = prerenderStringArray(next.bullets.map(String));
    }
    return next;
  });
}

function prerenderColumns(
  columns: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  return columns.map((column) => {
    const next = { ...column };
    if (Array.isArray(next.bullets)) {
      next._bulletsHtml = prerenderStringArray(next.bullets.map(String));
    }
    return next;
  });
}

export function prerenderSlideMathFields(slide: SlideRecord): SlideRecord {
  if (slide._mathPrerendered) return slide;

  const next: SlideRecord = { ...slide, _mathPrerendered: true };

  if (typeof next.body === "string") next._bodyHtml = prerenderTextField(next.body);
  if (typeof next.subtitle === "string") next._subtitleHtml = prerenderTextField(next.subtitle);
  if (typeof next.formula === "string") {
    next._formulaHtml = renderDisplayFormula(String(next.formula));
  }
  if (Array.isArray(next.bullets)) {
    next._bulletsHtml = prerenderStringArray(next.bullets.map(String));
  }
  if (Array.isArray(next.sections)) {
    next.sections = prerenderSections(next.sections as Array<Record<string, unknown>>);
  }
  if (Array.isArray(next.columns)) {
    next.columns = prerenderColumns(next.columns as Array<Record<string, unknown>>);
  }

  return next;
}

export function prerenderSlidesBatch(slides: SlideRecord[]): SlideRecord[] {
  return slides.map((slide) => prerenderSlideMathFields(slide));
}

export function renderPrerenderedText(
  slide: SlideRecord,
  field: "_bodyHtml" | "_subtitleHtml",
  fallback: string | undefined
): { html: string; prerendered: boolean } {
  const cached = slide[field];
  if (typeof cached === "string") return { html: cached, prerendered: true };
  if (!fallback) return { html: "", prerendered: false };
  return { html: escapeHTML(fallback), prerendered: false };
}
