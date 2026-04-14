import katex from "katex";

export type SlideRecord = Record<string, unknown> & { title?: string };

export function escapeHTML(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** Display math via KaTeX (avoid \\[…\\] + auto-render: findEndOfMath breaks on nested \\frac/\\text). */
function renderDisplayFormula(tex: string): string {
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

function buildTableMarkup(table: {
  title?: string;
  headers?: string[];
  rows?: string[][];
}) {
  if (!table) return "";
  return `
    <div class="table-wrap">
      ${table.title ? `<h3>${escapeHTML(table.title)}</h3>` : ""}
      <table>
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

function getImageSources(slide: SlideRecord) {
  if (!slide) return [];
  if (Array.isArray(slide.imageUrls)) return slide.imageUrls as string[];
  if (typeof slide.imageUrl === "string") return [slide.imageUrl];
  return [];
}

function buildMediaBadgeMarkup(slide: SlideRecord) {
  const imageSources = getImageSources(slide);
  if (!imageSources.length) return "";

  const hasAnimated = imageSources.some((src) => /\.gif($|\?)/i.test(String(src)));
  const hasStatic = imageSources.some((src) => !/\.gif($|\?)/i.test(String(src)));

  if (hasAnimated && hasStatic) {
    return `
      <span class="media-badge media-badge-static" title="تحتوي الشريحة صور ثابتة">🖼️ صورة ثابتة</span>
      <span class="media-badge media-badge-animated" title="تحتوي الشريحة صور متحركة">🎞️ صورة متحركة</span>
    `;
  }

  if (hasAnimated) {
    return `<span class="media-badge media-badge-animated" title="تحتوي الشريحة صور متحركة">🎞️ صورة متحركة</span>`;
  }

  return `<span class="media-badge media-badge-static" title="تحتوي الشريحة صور ثابتة">🖼️ صورة ثابتة</span>`;
}

export function buildSlideMarkup(slide: SlideRecord) {
  if (slide.type === "section-divider") {
    return `
      <div class="section-divider-box">
        <p class="section-tag">${escapeHTML(String(slide.title || ""))}</p>
        <h2>${escapeHTML(String(slide.subtitle || ""))}</h2>
      </div>
    `;
  }

  if (slide.type === "three-columns") {
    const columns = (slide.columns || []) as Array<{
      heading?: string;
      bullets?: string[];
    }>;
    const columnsHTML = columns
      .map((col) => {
        const colBullets = (col.bullets || [])
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join("");
        return `
          <article class="step-card">
            <h3>${escapeHTML(col.heading || "")}</h3>
            <ul>${colBullets}</ul>
          </article>
        `;
      })
      .join("");

    const mediaBadgeHTML = buildMediaBadgeMarkup(slide);
    return `
      <h2>${escapeHTML(String(slide.title))}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}</h2>
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
      <div class="steps-grid">${columnsHTML}</div>
    `;
  }

  const bullets = (slide.bullets || []) as string[];
  const bulletsHTML = bullets.map((item) => `<li>${escapeHTML(item)}</li>`).join("");

  const sections = (slide.sections || []) as Array<{
    heading?: string;
    body?: string;
    formula?: string;
    bullets?: string[];
    table?: { title?: string; headers?: string[]; rows?: string[][] };
  }>;
  const sectionsHTML = sections
    .map((section) => {
      const sectionBullets = (section.bullets || [])
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("");
      return `
        <article class="content-card">
          <h3>${escapeHTML(section.heading || "")}</h3>
          ${section.body ? `<p>${escapeHTML(section.body)}</p>` : ""}
          ${section.formula ? `<div class="formula notranslate" translate="no">${renderDisplayFormula(String(section.formula))}</div>` : ""}
          ${sectionBullets ? `<ul>${sectionBullets}</ul>` : ""}
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
    <h2>${escapeHTML(String(slide.title))}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}</h2>
    ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(String(slide.subtitle))}</p>` : ""}
    ${slide.body ? `<p class="slide-body">${escapeHTML(String(slide.body))}</p>` : ""}
    ${slide.formula ? `<div class="formula notranslate" translate="no">${renderDisplayFormula(String(slide.formula))}</div>` : ""}
    ${imageHTML}
    ${bulletsHTML ? `<ul>${bulletsHTML}</ul>` : ""}
    ${sectionsHTML ? `<div class="content-sections">${sectionsHTML}</div>` : ""}
    ${tableHTML}
    ${tablesHTML}
    ${slide.note ? `<p class="note-box">${escapeHTML(String(slide.note))}</p>` : ""}
  `;
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
