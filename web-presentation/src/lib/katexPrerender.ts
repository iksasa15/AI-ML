import { bulletTexts, normalizeBullets } from "./bulletItems";
import { renderMathHtml } from "./renderMath";
import { escapeHTML, renderDisplayFormula, type SlideRecord } from "./slideMarkup";

const TEX_HINT =
  /\\[\(\[]|\\begin\{|\\frac|\\sum|\\int|\\hat|\\bar|\\beta|\\alpha|\\mathcal|\\operatorname|\\partial|\\sqrt|\\cdot|\\leq|\\geq|\\neq|\\lambda|\\theta|\\sigma|\\min|\\max|\\arg|\\text|\\tau|\\phi|\\xi|\\epsilon|\\infty|\$\$|_\{?[a-zA-Z0-9]|\\^|[a-zA-Z]_[a-zA-Z0-9]/;

/** Wrap bare subscripts/superscripts (e.g. y_i) so KaTeX can render them. */
export function normalizeMathText(text: string): string {
  if (!text || /\\[\(\[]|\$\$/.test(text)) return text;

  return text.replace(
    /\b([A-Za-z](?:_\{[a-zA-Z0-9]+\}|_[a-zA-Z0-9]+|\^\{?[a-zA-Z0-9]+\}?)+)\b/g,
    (match) => `\\(${match}\\)`
  );
}

function prerenderTextField(text: string): string {
  if (!text) return text;
  const normalized = normalizeMathText(text);
  if (!TEX_HINT.test(normalized)) return normalized;
  if (typeof document === "undefined") return normalized;
  return renderMathHtml(normalized);
}

function prerenderBulletTexts(entries: unknown[] | undefined): string[] {
  return prerenderStringArray(bulletTexts(entries));
}

function prerenderStringArray(items: string[]): string[] {
  return items.map((item) => prerenderTextField(item));
}

function prerenderTable(table: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  if (!table || typeof table !== "object") return table;

  const next: Record<string, unknown> = { ...table };

  if (typeof next.title === "string") {
    next._titleHtml = prerenderTextField(next.title);
  }
  if (Array.isArray(next.headers)) {
    next._headersHtml = next.headers.map((header) => prerenderTextField(String(header)));
  }
  if (Array.isArray(next.rows)) {
    next._rowsHtml = (next.rows as unknown[]).map((row) =>
      Array.isArray(row) ? row.map((cell) => prerenderTextField(String(cell))) : row
    );
  }

  return next;
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
      next._bulletsHtml = prerenderBulletTexts(next.bullets);
    }
    if (next.table) {
      next.table = prerenderTable(next.table as Record<string, unknown>);
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
      next._bulletsHtml = prerenderBulletTexts(next.bullets);
    }
    return next;
  });
}

export function prerenderSlideMathFields(slide: SlideRecord): SlideRecord {
  if (slide._mathPrerendered) return slide;

  const next: SlideRecord = { ...slide, _mathPrerendered: true };

  if (typeof next.body === "string") next._bodyHtml = prerenderTextField(next.body);
  if (typeof next.subtitle === "string") next._subtitleHtml = prerenderTextField(next.subtitle);
  if (typeof next.note === "string") next._noteHtml = prerenderTextField(next.note);
  if (typeof next.formula === "string") {
    next._formulaHtml = renderDisplayFormula(String(next.formula));
  }
  if (Array.isArray(next.bullets)) {
    next._bulletsHtml = prerenderBulletTexts(next.bullets);
    if (next.type === "takeaway") {
      next.bullets = normalizeBullets(next.bullets).map((b) =>
        b.icon ? { text: b.text, icon: b.icon } : b.text
      );
    }
  }
  if (next.table) {
    next.table = prerenderTable(next.table as Record<string, unknown>);
  }
  if (Array.isArray(next.tables)) {
    next.tables = (next.tables as Array<Record<string, unknown>>).map((table) =>
      prerenderTable(table)
    );
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
