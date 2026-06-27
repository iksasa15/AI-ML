import katex from "katex";
import { formatAmpersandHTML } from "./ampersandText";
import { normalizeBullets } from "./bulletItems";
import { ETRA_LOGO_URL } from "./brandAssets";
import { buildConceptPrintMarkup, buildIllustrationPrintMarkup } from "./printVisuals";
import { isSlideIconId } from "./slideIconKeys";
import { BOOTCAMP_MAP_SECTIONS } from "./bootcampMap";
import { COURSE_WEEKS } from "./courseWeeks";
import {
  getChapterTheme,
  getSectionKeyTopics,
  getSectionTheme,
  parseSectionIdFromDivider,
} from "./sectionTheme";
import {
  getDividerTopicsFromSlide,
  isChapterDivider,
  isDeckDivider,
  parseChapterNumber,
} from "./slideDividers";
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

type TableInput = {
  title?: string;
  headers?: string[];
  rows?: string[][];
  _titleHtml?: string;
  _headersHtml?: string[];
  _rowsHtml?: string[][];
};

function renderTableCell(cell: string, html?: string) {
  if (html) {
    return `<td class="notranslate" translate="no">${html}</td>`;
  }
  return `<td>${escapeHTML(cell)}</td>`;
}

export function buildTableMarkup(table: TableInput) {
  if (!table) return "";
  const titleHtml =
    typeof table._titleHtml === "string"
      ? table._titleHtml
      : table.title
        ? escapeHTML(table.title)
        : "";
  const headers = table.headers || [];
  const headerHtml = table._headersHtml || [];
  const rows = table.rows || [];
  const rowsHtml = table._rowsHtml || [];

  return `
    <div class="table-wrap slide-table-wrap">
      ${titleHtml ? `<h3 class="slide-table-caption notranslate" translate="no">${titleHtml}</h3>` : ""}
      <table class="slide-table">
        <thead>
          <tr>
            ${headers
              .map(
                (header, index) =>
                  `<th class="notranslate" translate="no">${headerHtml[index] ?? escapeHTML(header)}</th>`
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row, rowIndex) =>
                `<tr>${row
                  .map((cell, cellIndex) =>
                    renderTableCell(cell, rowsHtml[rowIndex]?.[cellIndex])
                  )
                  .join("")}</tr>`
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

function buildTitleIconMarkup(iconId?: string) {
  if (!iconId || !isSlideIconId(iconId)) return "";
  return `<span class="slide-title-icon slide-title-icon--print" data-icon="${escapeHTML(iconId)}" aria-hidden="true"></span>`;
}

function buildTitleBlock(title: string, mediaBadgeHTML = "", titleIcon?: string) {
  const iconHTML = buildTitleIconMarkup(titleIcon);
  return `
    <header class="slide-title-block">
      <h2 class="slide-title">
        ${iconHTML ? `<span class="slide-title-row">${iconHTML}<span>${escapeHTML(title)}</span></span>` : escapeHTML(title)}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}
      </h2>
      <div class="slide-title-rule" aria-hidden="true"></div>
    </header>
  `;
}

function buildBulletContent(text: string, html?: string) {
  if (html) {
    return `<span class="notranslate" translate="no">${html}</span>`;
  }
  return escapeHTML(text);
}

function buildBulletsMarkup(
  items: unknown[] | undefined,
  className = "slide-bullet-list",
  itemsHtml?: string[]
) {
  const normalized = normalizeBullets(items);
  if (!normalized.length) return "";
  const itemsHTML = normalized
    .map((item, index) => {
      const content = buildBulletContent(item.text, itemsHtml?.[index]);
      return `<li style="animation-delay:${index * 60}ms">${content}</li>`;
    })
    .join("");
  return `<ul class="${className}">${itemsHTML}</ul>`;
}

function buildIllustrationMarkup(slide: SlideRecord) {
  const id = typeof slide.illustration === "string" ? slide.illustration : undefined;
  return buildIllustrationPrintMarkup(id);
}

function buildConceptMarkup(slide: SlideRecord) {
  return buildConceptPrintMarkup(slide);
}

function buildFormulaMarkup(tex: string) {
  return `<div class="slide-formula-block notranslate" translate="no">${renderDisplayFormula(tex)}</div>`;
}

function buildSectionDividerMarkup(
  slide: SlideRecord,
  slides: SlideRecord[],
  slideIndex: number
) {
  const isChapter = isChapterDivider(slide);
  const chapterId = parseChapterNumber(slide) ?? 0;
  const sectionId = parseSectionIdFromDivider(slide) ?? 0;
  const theme = isChapter ? getChapterTheme(chapterId) : getSectionTheme(sectionId);
  const slideTopics = getDividerTopicsFromSlide(slide);
  const keyTopics = slideTopics.length ? slideTopics : getSectionKeyTopics(sectionId);
  const displayNumber = isChapter ? chapterId : sectionId;
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
      <p class="print-section-number" aria-hidden="true">${displayNumber}</p>
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
        <h3>${escapeHTML(week.theme)}</h3>
        <p>${escapeHTML(week.sections)}</p>
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
        <p><strong>${escapeHTML(week.theme)}</strong></p>
        <p>${escapeHTML(week.sections)}</p>
      </div>
    `
  ).join("");

  return `
    <div class="print-bootcamp-timeline">
      <p class="print-intro-eyebrow">BOOTCAMP TIMELINE</p>
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
  const bullets = normalizeBullets(slide.bullets as unknown[] | undefined);
  const bulletsHtml = Array.isArray(slide._bulletsHtml)
    ? (slide._bulletsHtml as string[])
    : undefined;
  const items = bullets
    .slice(0, 3)
    .map((item, index) => {
      const content = buildBulletContent(item.text, bulletsHtml?.[index]);
      return `<li class="takeaway-item"><strong>${index + 1}.</strong> ${content}</li>`;
    })
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

  if (slide.type === "section-divider" || slide.type === "chapter-divider") {
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
    const columns = (slide.columns || []) as Array<{
      heading?: string;
      bullets?: unknown[];
      _bulletsHtml?: string[];
    }>;
    const columnsHTML = columns
      .map((col) => {
        const colBullets = buildBulletsMarkup(
          col.bullets || [],
          "slide-bullet-list slide-bullet-list--compact",
          col._bulletsHtml
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

    const titleIcon = typeof slide.titleIcon === "string" ? slide.titleIcon : undefined;
    const illustrationHTML = buildIllustrationMarkup(slide);
    const conceptHTML = buildConceptMarkup(slide);

    return `
      ${buildTitleBlock(String(slide.title || ""), mediaBadgeHTML, titleIcon)}
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
      ${illustrationHTML}
      ${conceptHTML}
      <div class="slide-columns-three">${columnsHTML}</div>
    `;
  }

  const bullets = slide.bullets as unknown[] | undefined;
  const sections = (slide.sections || []) as Array<{
    heading?: string;
    body?: string;
    _bodyHtml?: string;
    formula?: string;
    _formulaHtml?: string;
    bullets?: unknown[];
    _bulletsHtml?: string[];
    table?: TableInput;
  }>;
  const sectionsHTML = sections
    .map((section) => {
      const sectionBullets = buildBulletsMarkup(
        section.bullets || [],
        "slide-bullet-list slide-bullet-list--compact",
        section._bulletsHtml
      );
      const bodyHtml = section._bodyHtml
        ? `<p class="notranslate" translate="no">${section._bodyHtml}</p>`
        : section.body
          ? `<p>${escapeHTML(section.body)}</p>`
          : "";
      const formulaHtml =
        section._formulaHtml ||
        (section.formula ? buildFormulaMarkup(String(section.formula)) : "");
      return `
        <article class="content-card">
          <h3>${escapeHTML(section.heading || "")}</h3>
          ${bodyHtml}
          ${formulaHtml}
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
  const imageSizeClass =
    slide.imageSize === "featured" || slide.imageSize === "large"
      ? ` slide-image--${slide.imageSize}`
      : "";
  const imageHTML = imageSources
    .map(
      (src, index) => `
      <figure class="slide-image${imageSizeClass}">
        <img src="${escapeHTML(src)}" alt="${escapeHTML(String(slide.imageAlt || `slide image ${index + 1}`))}" />
      </figure>
    `
    )
    .join("");

  const titleIcon = typeof slide.titleIcon === "string" ? slide.titleIcon : undefined;
  const illustrationHTML = buildIllustrationMarkup(slide);
  const conceptHTML = buildConceptMarkup(slide);

  const subtitleHtml =
    typeof slide._subtitleHtml === "string"
      ? `<p class="slide-subtitle notranslate" translate="no">${slide._subtitleHtml}</p>`
      : slide.subtitle
        ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>`
        : "";
  const bodyHtml =
    typeof slide._bodyHtml === "string"
      ? `<p class="slide-body notranslate" translate="no">${slide._bodyHtml}</p>`
      : slide.body
        ? `<p class="slide-body">${escapeHTML(String(slide.body))}</p>`
        : "";
  const formulaHtml =
    typeof slide._formulaHtml === "string"
      ? `<div class="slide-formula-block notranslate" translate="no">${slide._formulaHtml}</div>`
      : slide.formula
        ? buildFormulaMarkup(String(slide.formula))
        : "";
  const noteHtml =
    typeof slide._noteHtml === "string"
      ? `<p class="note-box notranslate" translate="no">${slide._noteHtml}</p>`
      : slide.note
        ? `<p class="note-box">${escapeHTML(String(slide.note))}</p>`
        : "";

  return `
    ${buildTitleBlock(String(slide.title || ""), mediaBadgeHTML, titleIcon)}
    ${subtitleHtml}
    ${bodyHtml}
    ${illustrationHTML}
    ${conceptHTML}
    ${formulaHtml}
    ${imageHTML}
    ${buildBulletsMarkup(bullets, "slide-bullet-list", slide._bulletsHtml as string[] | undefined)}
    ${sectionsHTML ? `<div class="content-sections">${sectionsHTML}</div>` : ""}
    ${tableHTML}
    ${tablesHTML}
    ${noteHtml}
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
        <div class="slide-frame-logo-wrap" aria-hidden="true">
          <img src="${escapeHTML(ETRA_LOGO_URL)}" alt="" class="slide-frame-logo slide-frame-logo--divider" />
        </div>
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
        <div class="slide-frame-header-end">
          <span class="slide-frame-slide-num">
            ${meta.slideNumber}<span class="slide-frame-slide-total"> / ${meta.totalSlides}</span>
          </span>
        </div>
      </header>
      <div class="slide-frame-content">
        <div class="slide-content-logo" aria-hidden="true">
          <img src="${escapeHTML(ETRA_LOGO_URL)}" alt="" class="slide-content-logo-img" />
        </div>
        ${innerHTML}
      </div>
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
    slide.type === "section-divider" || slide.type === "chapter-divider"
  );
}

export function getActiveSectionLabel(slides: SlideRecord[], slideIndex: number) {
  for (let i = slideIndex; i >= 0; i -= 1) {
    const s = slides[i];
    if (s && isDeckDivider(s)) {
      return String(s.subtitle || s.title || "Overview");
    }
  }
  return "Overview";
}
