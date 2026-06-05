import { ConceptAnimationSlot } from "../animations/ConceptAnimationSlot";
import { LiveCodeSlot } from "../code/LiveCodeSlot";
import { highlightCode } from "../../lib/highlightCode";
import {
  getSlideBulletGroups,
  getVisibleCounts,
} from "../../lib/bulletReveal";
import {
  buildMediaBadgeMarkup,
  buildTableMarkup,
  getImageSources,
  renderDisplayFormula,
  type SlideRecord,
} from "../../lib/slideMarkup";
import type { UiLang } from "../../lib/uiStrings";
import { getUiStrings } from "../../lib/uiStrings";
import { BigPictureSlide } from "./BigPictureSlide";
import { BootcampTimelineSlide } from "./BootcampTimelineSlide";
import { CourseMapSlide } from "./CourseMapSlide";
import { IntroHeroSlide } from "./IntroHeroSlide";
import { SectionDivider } from "./SectionDivider";
import { TakeawaySlide } from "./TakeawaySlide";

type SlideContentProps = {
  slide: SlideRecord;
  slides: SlideRecord[];
  slideIndex: number;
  /** Total bullets revealed (progressive). Omit to show all. */
  revealedBullets?: number;
  uiLang?: UiLang;
  /** Active slide loads images eagerly; cached window slides use lazy loading. */
  isActive?: boolean;
};

function PrerenderedParagraph({
  className,
  html,
  fallback,
}: {
  className: string;
  html?: string;
  fallback?: string;
}) {
  if (html) {
    return (
      <p
        className={`${className} notranslate`}
        translate="no"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  if (!fallback) return null;
  return <p className={className}>{fallback}</p>;
}

function SlideTitle({
  title,
  mediaBadgeHtml,
}: {
  title: string;
  mediaBadgeHtml?: string;
}) {
  return (
    <header className="slide-title-block">
      <h2 className="slide-title">
        {title}
        {mediaBadgeHtml ? (
          <span
            className="media-badges"
            dangerouslySetInnerHTML={{ __html: mediaBadgeHtml }}
          />
        ) : null}
      </h2>
      <div className="slide-title-rule" aria-hidden="true" />
    </header>
  );
}

function RevealedBulletGroups({
  groups,
  revealedTotal,
  bulletsHtml,
}: {
  groups: ReturnType<typeof getSlideBulletGroups>;
  revealedTotal?: number;
  bulletsHtml?: string[];
}) {
  if (!groups.length) return null;

  const showAll = revealedTotal === undefined;
  const visibleCounts = showAll
    ? groups.map((g) => g.items.length)
    : getVisibleCounts(groups, revealedTotal);

  return (
    <>
      {groups.map((group, groupIndex) => {
        const visible = visibleCounts[groupIndex];
        if (!visible) return null;
        const className = group.className || "slide-bullet-list";
        return (
          <ul key={group.id} className={className}>
            {group.items.slice(0, visible).map((item, index) => {
              const html = group.id === "main" ? bulletsHtml?.[index] : undefined;
              return (
                <li
                  key={`${group.id}-${index}`}
                  className="slide-bullet-reveal"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {html ? (
                    <span
                      className="notranslate"
                      translate="no"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ) : (
                    item
                  )}
                </li>
              );
            })}
          </ul>
        );
      })}
    </>
  );
}

function FormulaBlock({ tex, html }: { tex?: string; html?: string }) {
  const content = html ?? (tex ? renderDisplayFormula(tex) : "");
  if (!content) return null;
  return (
    <div
      className="slide-formula-block notranslate"
      translate="no"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const lang = language || "python";
  return (
    <div className="slide-code-wrap">
      <div className="slide-code-lang">{lang}</div>
      <pre className="slide-code-block">
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
        />
      </pre>
    </div>
  );
}

function SlideImages({ slide, isActive = false }: { slide: SlideRecord; isActive?: boolean }) {
  const sources = getImageSources(slide);
  if (!sources.length) return null;

  return (
    <>
      {sources.map((src, index) => (
        <figure key={src} className="slide-image">
          <img
            src={src}
            alt={String(slide.imageAlt || `slide image ${index + 1}`)}
            loading={isActive ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={isActive ? "high" : "low"}
          />
        </figure>
      ))}
    </>
  );
}

export function SlideContent({
  slide,
  slides,
  slideIndex,
  revealedBullets,
  uiLang = "ar",
  isActive = false,
}: SlideContentProps) {
  const ui = getUiStrings(uiLang);
  const bulletGroups = getSlideBulletGroups(slide);
  const liveCode = <LiveCodeSlot slide={slide} ui={ui} />;

  if (slide.type === "intro-hero") {
    return (
      <IntroHeroSlide
        title={String(slide.title || "")}
        subtitle={slide.subtitle ? String(slide.subtitle) : undefined}
        isActive={isActive}
      />
    );
  }

  if (slide.type === "course-map") {
    return <CourseMapSlide />;
  }

  if (slide.type === "bootcamp-timeline") {
    return <BootcampTimelineSlide />;
  }

  if (slide.type === "section-divider") {
    return <SectionDivider slide={slide} slides={slides} slideIndex={slideIndex} />;
  }

  if (slide.type === "big-picture") {
    const sectionId = Number(slide.sectionId ?? 0);
    return (
      <BigPictureSlide
        sectionId={sectionId}
        focus={slide.subtitle ? String(slide.subtitle) : undefined}
      />
    );
  }

  if (slide.type === "takeaway") {
    const bullets = Array.isArray(slide.bullets) ? slide.bullets.map(String) : [];
    return (
      <TakeawaySlide
        bullets={bullets}
        reflectionQuestion={
          typeof slide.reflectionQuestion === "string" ? slide.reflectionQuestion : undefined
        }
      />
    );
  }

  if (slide.type === "three-columns") {
    const mediaBadgeHtml = buildMediaBadgeMarkup(slide);
    const columns = (slide.columns || []) as Array<{ heading?: string; bullets?: string[] }>;

    return (
      <>
        <SlideTitle title={String(slide.title || "")} mediaBadgeHtml={mediaBadgeHtml || undefined} />
        <PrerenderedParagraph
          className="slide-subtitle"
          html={typeof slide._subtitleHtml === "string" ? slide._subtitleHtml : undefined}
          fallback={slide.subtitle ? String(slide.subtitle) : undefined}
        />
        <ConceptAnimationSlot slide={slide} />
        {liveCode}
        <div className="slide-columns-three">
          {columns.map((col, index) => {
            const group = bulletGroups.find((g) => g.id === `col-${index}`);
            const groupIndex = bulletGroups.findIndex((g) => g.id === `col-${index}`);
            const visible =
              revealedBullets === undefined || !group
                ? col.bullets?.length ?? 0
                : getVisibleCounts(bulletGroups, revealedBullets)[groupIndex] ?? 0;
            const columnBulletsHtml = (col as { _bulletsHtml?: string[] })._bulletsHtml;

            return (
              <article key={`${col.heading}-${index}`} className="slide-column-card">
                <h3 className="slide-column-heading">{col.heading || ""}</h3>
                {visible > 0 && group ? (
                  <ul className="slide-bullet-list slide-bullet-list--compact">
                    {group.items.slice(0, visible).map((item, bi) => {
                      const html = columnBulletsHtml?.[bi];
                      return (
                        <li key={bi} className="slide-bullet-reveal">
                          {html ? (
                            <span
                              className="notranslate"
                              translate="no"
                              dangerouslySetInnerHTML={{ __html: html }}
                            />
                          ) : (
                            item
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </article>
            );
          })}
        </div>
      </>
    );
  }

  if (slide.type === "code") {
    return (
      <>
        <SlideTitle title={String(slide.title || "")} />
        {slide.subtitle ? <p className="slide-subtitle">{String(slide.subtitle)}</p> : null}
        <CodeBlock
          code={String(slide.code || "")}
          language={typeof slide.language === "string" ? slide.language : "python"}
        />
        {slide.note ? <p className="note-box">{String(slide.note)}</p> : null}
      </>
    );
  }

  const sections = (slide.sections || []) as Array<{
    heading?: string;
    body?: string;
    _bodyHtml?: string;
    formula?: string;
    _formulaHtml?: string;
    bullets?: string[];
    _bulletsHtml?: string[];
    table?: { title?: string; headers?: string[]; rows?: string[][] };
  }>;
  type TableShape = { title?: string; headers?: string[]; rows?: string[][] };
  const table = (slide.table || {}) as TableShape;
  const tables = (slide.tables || []) as TableShape[];
  const mediaBadgeHtml = buildMediaBadgeMarkup(slide);
  const visibleCounts =
    revealedBullets === undefined
      ? null
      : getVisibleCounts(bulletGroups, revealedBullets);

  return (
    <>
      <SlideTitle title={String(slide.title || "")} mediaBadgeHtml={mediaBadgeHtml || undefined} />
      <PrerenderedParagraph
        className="slide-subtitle"
        html={typeof slide._subtitleHtml === "string" ? slide._subtitleHtml : undefined}
        fallback={slide.subtitle ? String(slide.subtitle) : undefined}
      />
      <PrerenderedParagraph
        className="slide-body"
        html={typeof slide._bodyHtml === "string" ? slide._bodyHtml : undefined}
        fallback={slide.body ? String(slide.body) : undefined}
      />
      <ConceptAnimationSlot slide={slide} />
      {liveCode}
      {slide.formula || slide._formulaHtml ? (
        <FormulaBlock
          tex={slide.formula ? String(slide.formula) : undefined}
          html={typeof slide._formulaHtml === "string" ? slide._formulaHtml : undefined}
        />
      ) : null}
      {typeof slide.code === "string" ? (
        <CodeBlock
          code={slide.code}
          language={typeof slide.language === "string" ? slide.language : "python"}
        />
      ) : null}
      <SlideImages slide={slide} isActive={isActive} />
      <RevealedBulletGroups
        groups={bulletGroups.filter((g) => g.id === "main")}
        revealedTotal={revealedBullets}
        bulletsHtml={Array.isArray(slide._bulletsHtml) ? slide._bulletsHtml.map(String) : undefined}
      />
      {sections.length > 0 ? (
        <div className="content-sections">
          {sections.map((section, index) => {
            const group = bulletGroups.find((g) => g.id === `sec-${index}`);
            const groupIndex = bulletGroups.findIndex((g) => g.id === `sec-${index}`);
            const visible =
              revealedBullets === undefined || !group
                ? section.bullets?.length ?? 0
                : visibleCounts?.[groupIndex] ?? 0;

            return (
              <article key={`${section.heading}-${index}`} className="content-card">
                <h3>{section.heading || ""}</h3>
                {section._bodyHtml ? (
                  <p
                    className="notranslate"
                    translate="no"
                    dangerouslySetInnerHTML={{ __html: section._bodyHtml }}
                  />
                ) : section.body ? (
                  <p>{section.body}</p>
                ) : null}
                {section.formula || section._formulaHtml ? (
                  <FormulaBlock tex={section.formula} html={section._formulaHtml} />
                ) : null}
                {visible > 0 && group ? (
                  <ul className="slide-bullet-list slide-bullet-list--compact">
                    {group.items.slice(0, visible).map((item, bi) => {
                      const html = section._bulletsHtml?.[bi];
                      return (
                        <li key={bi} className="slide-bullet-reveal">
                          {html ? (
                            <span
                              className="notranslate"
                              translate="no"
                              dangerouslySetInnerHTML={{ __html: html }}
                            />
                          ) : (
                            item
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {section.table ? (
                  <div dangerouslySetInnerHTML={{ __html: buildTableMarkup(section.table) }} />
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}
      {table.headers?.length || table.rows?.length ? (
        <div dangerouslySetInnerHTML={{ __html: buildTableMarkup(table) }} />
      ) : null}
      {tables.map((t, index) => (
        <div key={`table-${index}`} dangerouslySetInnerHTML={{ __html: buildTableMarkup(t) }} />
      ))}
      {slide.note ? <p className="note-box">{String(slide.note)}</p> : null}
    </>
  );
}
