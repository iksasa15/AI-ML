import katex from "katex";
import { formatAmpersandHTML } from "./ampersandText";
import { BOOTCAMP_MAP_SECTIONS } from "./bootcampMap";
import { COURSE_WEEKS } from "./courseWeeks";
import {
  getSectionKeyTopics,
  getSectionTheme,
  parseSectionIdFromDivider,
} from "./sectionTheme";
import {
  countSlidesInSection,
  estimateSectionMinutes,
  getDividerEyebrow,
  getDividerTitleLines,
} from "./slideMeta";

export type SlideRecord = Record<string, unknown> & { title?: string };

export function escapeHTML(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderDisplayFormula(tex: string): string {
  try {
    return katex.renderToString(tex.trim(), {
      displayMode: true,
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  } catch {
    return `<span class="katex-error">${escapeHTML(tex)}</span>`;
  }
}

export function buildTableMarkup(table: {
  title?: string;
  headers?: string[];
  rows?: string[][];
}) {
  if (!table) return "";
  return `
    <div class="table-wrap slide-table-wrap">
      ${table.title ? `<h3 class="slide-table-caption">${escapeHTML(table.title)}</h3>` : ""}
      <table class="slide-table">
        <thead>
          <tr>
            ${(table.headers || [])
              .map((header) => `<th>${escapeHTML(header)}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${(table.rows || [])
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

export function getImageSources(slide: SlideRecord) {
  if (!slide) return [];
  if (Array.isArray(slide.imageUrls)) return slide.imageUrls as string[];
  if (typeof slide.imageUrl === "string") return [slide.imageUrl];
  return [];
}

export function buildMediaBadgeMarkup(slide: SlideRecord) {
  const imageSources = getImageSources(slide);
  if (!imageSources.length) return "";

  const hasAnimated = imageSources.some((src) => /\.gif($|\?)/i.test(String(src)));
  const hasStatic = imageSources.some((src) => !/\.gif($|\?)/i.test(String(src)));

  if (hasAnimated && hasStatic) {
    return `
      <span class="media-badge media-badge-static" title="Static image">🖼️ Static</span>
      <span class="media-badge media-badge-animated" title="Animated image">🎞️ Animated</span>
    `;
  }

  if (hasAnimated) {
    return `<span class="media-badge media-badge-animated" title="Animated image">🎞️ Animated</span>`;
  }

  return `<span class="media-badge media-badge-static" title="Static image">🖼️ Static</span>`;
}

function buildTitleBlock(title: string, mediaBadgeHTML = "") {
  return `
    <header class="slide-title-block">
      <h2 class="slide-title">
        ${escapeHTML(title)}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}
      </h2>
      <div class="slide-title-rule" aria-hidden="true"></div>
    </header>
  `;
}

function buildBulletsMarkup(items: string[], className = "slide-bullet-list") {
  if (!items.length) return "";
  const itemsHTML = items
    .map(
      (item, index) =>
        `<li style="animation-delay:${index * 60}ms">${escapeHTML(item)}</li>`
    )
    .join("");
  return `<ul class="${className}">${itemsHTML}</ul>`;
}

function buildFormulaMarkup(tex: string) {
  return `<div class="slide-formula-block notranslate" translate="no">${renderDisplayFormula(tex)}</div>`;
}

function buildSectionDividerMarkup(
  slide: SlideRecord,
  slides: SlideRecord[],
  slideIndex: number
) {
  const sectionId = parseSectionIdFromDivider(slide) ?? 0;
  const theme = getSectionTheme(sectionId);
  const keyTopics = getSectionKeyTopics(sectionId);
  const eyebrow = getDividerEyebrow(slide);
  const titleLines = getDividerTitleLines(slide);
  const slideCount = countSlidesInSection(slides, slideIndex);
  const minutes = estimateSectionMinutes(slideCount);
  const titlesHTML = titleLines
    .map((line) => `<h2 class="section-divider-title-line">${escapeHTML(line)}</h2>`)
    .join("");
  const topicsHTML = keyTopics
    .map((topic) => `<li>${formatAmpersandHTML(topic, escapeHTML)}</li>`)
    .join("");

  return `
    <div class="section-divider-hero section-divider-hero--themed print-section-divider" style="--section-accent:${theme.color}">
      <p class="section-divider-eyebrow">${escapeHTML(eyebrow)} · ${escapeHTML(theme.label)}</p>
      <p class="print-section-number" aria-hidden="true">${sectionId}</p>
      <div class="section-divider-titles">${titlesHTML}</div>
      ${topicsHTML ? `<ul class="section-divider-topics">${topicsHTML}</ul>` : ""}
      <p class="section-divider-meta">
        <span class="section-divider-meta-icon" aria-hidden="true">▸</span>
        ${slideCount} slides · ~${minutes} min
      </p>
    </div>
  `;
}

function buildIntroHeroPrintMarkup(slide: SlideRecord) {
  return `
    <div class="print-intro-hero">
      <p class="print-intro-eyebrow">${formatAmpersandHTML("AI & MACHINE LEARNING BOOTCAMP", escapeHTML)}</p>
      <h2>${formatAmpersandHTML(String(slide.title || ""), escapeHTML)}</h2>
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
    </div>
  `;
}

function buildCourseMapPrintMarkup() {
  const cards = COURSE_WEEKS.map(
    (week) => `
      <article class="print-course-map-card">
        <h3>${escapeHTML(week.label)} — ${escapeHTML(week.theme)}</h3>
        <p>${week.days} days · ${escapeHTML(week.sections)}</p>
        <p>${escapeHTML(week.topic)}</p>
      </article>
    `
  ).join("");

  return `
    <div class="print-course-map">
      <p class="print-intro-eyebrow">COURSE AGENDA</p>
      <h2>Interactive Roadmap</h2>
      <div class="print-course-map-grid">${cards}</div>
    </div>
  `;
}

function buildTimelinePrintMarkup() {
  const columns = COURSE_WEEKS.map(
    (week) => `
      <div class="print-timeline-col">
        <strong>W${week.id}</strong>
        <p>${escapeHTML(week.theme)}</p>
        <p>${week.days} days</p>
      </div>
    `
  ).join("");

  return `
    <div class="print-bootcamp-timeline">
      <p class="print-intro-eyebrow">BOOTCAMP TIMELINE</p>
      <h2>4-Week Arc</h2>
      <div class="print-timeline-grid">${columns}</div>
    </div>
  `;
}

function buildBigPicturePrintMarkup(slide: SlideRecord) {
  const sectionId = Number(slide.sectionId ?? 0);
  const items = BOOTCAMP_MAP_SECTIONS.map((section) => {
    const state =
      section.id === sectionId ? "current" : section.id < sectionId ? "past" : "upcoming";
    return `<li class="print-map-item print-map-item--${state}"><strong>${escapeHTML(section.shortLabel)}</strong> ${escapeHTML(section.title)}</li>`;
  }).join("");

  return `
    <div class="print-big-picture">
      <p class="print-big-picture-eyebrow">BIG PICTURE</p>
      <h2>${escapeHTML(String(slide.title || "Where Are We in the Bootcamp?"))}</h2>
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
      <ul class="print-map-list">${items}</ul>
    </div>
  `;
}

function buildTakeawayPrintMarkup(slide: SlideRecord) {
  const bullets = (slide.bullets || []) as string[];
  const items = bullets
    .slice(0, 3)
    .map((item, index) => `<li><strong>${index + 1}.</strong> ${escapeHTML(item)}</li>`)
    .join("");

  return `
    <div class="print-takeaway">
      <p class="print-takeaway-eyebrow">TAKEAWAYS</p>
      <h2>${escapeHTML(String(slide.title || "Section Takeaways"))}</h2>
      <ol class="print-takeaway-list">${items}</ol>
      ${
        slide.reflectionQuestion
          ? `<p class="print-takeaway-reflection"><strong>Think:</strong> ${escapeHTML(String(slide.reflectionQuestion))}</p>`
          : ""
      }
    </div>
  `;
}

function buildSlideInnerMarkup(slide: SlideRecord, slides: SlideRecord[], slideIndex: number) {
  if (slide.type === "intro-hero") {
    return buildIntroHeroPrintMarkup(slide);
  }

  if (slide.type === "course-map") {
    return buildCourseMapPrintMarkup();
  }

  if (slide.type === "bootcamp-timeline") {
    return buildTimelinePrintMarkup();
  }

  if (slide.type === "section-divider") {
    return buildSectionDividerMarkup(slide, slides, slideIndex);
  }

  if (slide.type === "big-picture") {
    return buildBigPicturePrintMarkup(slide);
  }

  if (slide.type === "takeaway") {
    return buildTakeawayPrintMarkup(slide);
  }

  if (slide.type === "loading") {
    return `<p class="slide-body">Loading…</p>`;
  }

  if (slide.type === "three-columns") {
    const columns = (slide.columns || []) as Array<{ heading?: string; bullets?: string[] }>;
    const columnsHTML = columns
      .map((col) => {
        const colBullets = buildBulletsMarkup(
          col.bullets || [],
          "slide-bullet-list slide-bullet-list--compact"
        );
        return `
          <article class="slide-column-card">
            <h3 class="slide-column-heading">${escapeHTML(col.heading || "")}</h3>
            ${colBullets}
          </article>
        `;
      })
      .join("");
    const mediaBadgeHTML = buildMediaBadgeMarkup(slide);

    return `
      ${buildTitleBlock(String(slide.title || ""), mediaBadgeHTML)}
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
      <div class="slide-columns-three">${columnsHTML}</div>
    `;
  }

  const bullets = (slide.bullets || []) as string[];
  const sections = (slide.sections || []) as Array<{
    heading?: string;
    body?: string;
    formula?: string;
    bullets?: string[];
    table?: { title?: string; headers?: string[]; rows?: string[][] };
  }>;
  const sectionsHTML = sections
    .map((section) => {
      const sectionBullets = buildBulletsMarkup(
        section.bullets || [],
        "slide-bullet-list slide-bullet-list--compact"
      );
      return `
        <article class="content-card">
          <h3>${escapeHTML(section.heading || "")}</h3>
          ${section.body ? `<p>${escapeHTML(section.body)}</p>` : ""}
          ${section.formula ? buildFormulaMarkup(String(section.formula)) : ""}
          ${sectionBullets}
          ${buildTableMarkup(section.table || {})}
        </article>
      `;
    })
    .join("");

  type TableShape = { title?: string; headers?: string[]; rows?: string[][] };
  const tableHTML = buildTableMarkup((slide.table || {}) as TableShape);
  const tables = (slide.tables || []) as TableShape[];
  const tablesHTML = tables.map((table) => buildTableMarkup(table)).join("");
  const imageSources = getImageSources(slide);
  const mediaBadgeHTML = buildMediaBadgeMarkup(slide);
  const imageHTML = imageSources
    .map(
      (src, index) => `
      <figure class="slide-image">
        <img src="${escapeHTML(src)}" alt="${escapeHTML(String(slide.imageAlt || `slide image ${index + 1}`))}" />
      </figure>
    `
    )
    .join("");

  return `
    ${buildTitleBlock(String(slide.title || ""), mediaBadgeHTML)}
    ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
    ${slide.body ? `<p class="slide-body">${escapeHTML(String(slide.body))}</p>` : ""}
    ${slide.formula ? buildFormulaMarkup(String(slide.formula)) : ""}
    ${imageHTML}
    ${buildBulletsMarkup(bullets)}
    ${sectionsHTML ? `<div class="content-sections">${sectionsHTML}</div>` : ""}
    ${tableHTML}
    ${tablesHTML}
    ${slide.note ? `<p class="note-box">${escapeHTML(String(slide.note))}</p>` : ""}
  `;
}

export type SlideFrameMeta = {
  sectionTag: string;
  sectionLabel: string;
  slideNumber: number;
  totalSlides: number;
  progressPercent: number;
};

export function buildSlideFrameMarkup(meta: SlideFrameMeta, innerHTML: string, isDivider = false) {
  if (isDivider) {
    return `
      <div class="slide-frame slide-frame--divider">
        <div class="slide-frame-divider-body">${innerHTML}</div>
        <footer class="slide-frame-footer slide-frame-footer--divider">
          <div class="slide-frame-progress">
            <div class="slide-frame-progress-fill" style="width:${meta.progressPercent}%"></div>
          </div>
        </footer>
      </div>
    `;
  }

  return `
    <div class="slide-frame">
      <header class="slide-frame-header">
        <div class="slide-frame-header-start">
          <span class="slide-frame-section-tag">${escapeHTML(meta.sectionTag)}</span>
          <span class="slide-frame-section-sep" aria-hidden="true">·</span>
          <span class="slide-frame-section-label">${escapeHTML(meta.sectionLabel)}</span>
        </div>
        <span class="slide-frame-slide-num">
          ${meta.slideNumber}<span class="slide-frame-slide-total"> / ${meta.totalSlides}</span>
        </span>
      </header>
      <div class="slide-frame-content">${innerHTML}</div>
      <footer class="slide-frame-footer">
        <div class="slide-frame-progress">
          <div class="slide-frame-progress-fill" style="width:${meta.progressPercent}%"></div>
        </div>
      </footer>
    </div>
  `;
}

export function buildSlideMarkup(
  slide: SlideRecord,
  options?: {
    slides?: SlideRecord[];
    slideIndex?: number;
    frame?: SlideFrameMeta;
  }
) {
  const slides = options?.slides ?? [];
  const slideIndex = options?.slideIndex ?? 0;
  const inner = buildSlideInnerMarkup(slide, slides, slideIndex);

  if (!options?.frame) return inner;

  return buildSlideFrameMarkup(
    options.frame,
    inner,
    slide.type === "section-divider"
  );
}

export function getActiveSectionLabel(slides: SlideRecord[], slideIndex: number) {
  for (let i = slideIndex; i >= 0; i -= 1) {
    const s = slides[i];
    if (s && s.type === "section-divider") {
      return String(s.subtitle || s.title || "Overview");
    }
  }
  return "Overview";
}
