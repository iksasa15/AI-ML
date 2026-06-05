import type { SlideRecord } from "./slideMarkup";

function lines(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => String(item)).filter(Boolean);
}

/** Flatten slide JSON into plain text for AI prompts. */
export function slideToPlainText(slide: SlideRecord | undefined, slideIndex: number): string {
  if (!slide) return "";

  const parts: string[] = [`Slide ${slideIndex + 1}`];

  if (slide.title) parts.push(`Title: ${slide.title}`);
  if (slide.subtitle) parts.push(`Subtitle: ${slide.subtitle}`);
  if (slide.body) parts.push(`Body: ${slide.body}`);

  const bullets = lines(slide.bullets);
  if (bullets.length) {
    parts.push("Bullets:");
    bullets.forEach((b) => parts.push(`- ${b}`));
  }

  const table = slide.table as { headers?: string[]; rows?: string[][] } | undefined;
  if (table?.headers?.length) {
    parts.push(`Table headers: ${table.headers.join(" | ")}`);
    (table.rows || []).forEach((row) => parts.push(`  ${row.join(" | ")}`));
  }

  if (slide.formula) parts.push(`Formula: ${slide.formula}`);
  if (slide.note) parts.push(`Trainer note: ${slide.note}`);

  const sections = slide.sections as Array<{ heading?: string; bullets?: string[] }> | undefined;
  if (sections?.length) {
    sections.forEach((section) => {
      if (section.heading) parts.push(`Section: ${section.heading}`);
      lines(section.bullets).forEach((b) => parts.push(`- ${b}`));
    });
  }

  return parts.join("\n");
}
