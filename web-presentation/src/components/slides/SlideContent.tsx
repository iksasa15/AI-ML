import { useState } from "react";
import { ConceptAnimationSlot } from "../animations/ConceptAnimationSlot";
import { IllustrationSlot } from "../illustrations/IllustrationSlot";
import { SlideIcon } from "../icons/SlideIcon";
import {
  getSlideBulletGroups,
  getVisibleCounts,
} from "../../lib/bulletReveal";
import { isSlideIconId } from "../../lib/slideIconKeys";
import {
  buildMediaBadgeMarkup,
  buildTableMarkup,
  getImageSources,
  renderDisplayFormula,
  type SlideRecord,
} from "../../lib/slideMarkup";
import type { UiLang } from "../../lib/uiStrings";
import { normalizeBullets } from "../../lib/bulletItems";
import { BigPictureSlide } from "./BigPictureSlide";
import { BootcampTimelineSlide } from "./BootcampTimelineSlide";
import { BulletItem } from "./BulletItem";
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
  titleIcon,
  mediaBadgeHtml,
}: {
  title: string;
  titleIcon?: string;
  mediaBadgeHtml?: string;
}) {
  const showIcon = titleIcon && isSlideIconId(titleIcon);

  return (
    <header className="slide-title-block">
      <h2 className="slide-title">
        <span className="slide-title-row">
          {showIcon ? (
            <span className="slide-title-icon" aria-hidden="true">
              <SlideIcon id={titleIcon} size="lg" />
            </span>
          ) : null}
          <span>{title}</span>
        </span>
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
                <BulletItem
                  key={`${group.id}-${index}`}
                  text={item}
                  html={html}
                  icon={group.icons?.[index]}
                />
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

function getSlideImageSizeClass(imageSize: unknown): string {
  if (imageSize === "featured" || imageSize === "large") {
    return ` slide-image--${imageSize}`;
  }
  return "";
}

function SlideImageFigure({
  src,
  alt,
  isActive,
  sizeClass = "",
}: {
  src: string;
  alt: string;
  isActive: boolean;
  sizeClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <figure className={`slide-image slide-image-fallback${sizeClass}`} aria-label={alt}>
        <p className="slide-image-fallback-label">{alt}</p>
      </figure>
    );
  }

  return (
    <figure className={`slide-image${sizeClass}`}>
      <img
        src={src}
        alt={alt}
        loading={isActive ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isActive ? "high" : "low"}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function SlideImages({ slide, isActive = false }: { slide: SlideRecord; isActive?: boolean }) {
  const sources = getImageSources(slide);
  if (!sources.length) return null;

  const sizeClass = getSlideImageSizeClass(slide.imageSize);

  return (
    <>
      {sources.map((src, index) => (
        <SlideImageFigure
          key={src}
          src={src}
          alt={String(slide.imageAlt || `slide image ${index + 1}`)}
          isActive={isActive}
          sizeClass={sizeClass}
        />
      ))}
    </>
  );
}

export function SlideContent({
  slide,
  slides,
  slideIndex,
  revealedBullets,
  uiLang: _uiLang = "ar",
  isActive = false,
}: SlideContentProps) {
  void _uiLang;
  const bulletGroups = getSlideBulletGroups(slide);
  const titleIcon = typeof slide.titleIcon === "string" ? slide.titleIcon : undefined;

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

  if (slide.type === "section-divider" || slide.type === "chapter-divider") {
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
    const bullets = normalizeBullets(slide.bullets as unknown[] | undefined);
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
    const columns = (slide.columns || []) as Array<{ heading?: string; bullets?: unknown[] }>;

    return (
      <>
        <SlideTitle
          title={String(slide.title || "")}
          titleIcon={titleIcon}
          mediaBadgeHtml={mediaBadgeHtml || undefined}
        />
        <PrerenderedParagraph
          className="slide-subtitle"
          html={typeof slide._subtitleHtml === "string" ? slide._subtitleHtml : undefined}
          fallback={slide.subtitle ? String(slide.subtitle) : undefined}
        />
        <IllustrationSlot slide={slide} />
        <ConceptAnimationSlot slide={slide} />
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
                    {group.items.slice(0, visible).map((item, bi) => (
                      <BulletItem
                        key={bi}
                        text={item}
                        html={columnBulletsHtml?.[bi]}
                        icon={group.icons?.[bi]}
                      />
                    ))}
                  </ul>
                ) : null}
              </article>
            );
          })}
        </div>
      </>
    );
  }

  const sections = (slide.sections || []) as Array<{
    heading?: string;
    body?: string;
    _bodyHtml?: string;
    formula?: string;
    _formulaHtml?: string;
    bullets?: unknown[];
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
      <SlideTitle
        title={String(slide.title || "")}
        titleIcon={titleIcon}
        mediaBadgeHtml={mediaBadgeHtml || undefined}
      />
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
      <IllustrationSlot slide={slide} />
      <ConceptAnimationSlot slide={slide} />
      {slide.formula || slide._formulaHtml ? (
        <FormulaBlock
          tex={slide.formula ? String(slide.formula) : undefined}
          html={typeof slide._formulaHtml === "string" ? slide._formulaHtml : undefined}
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
                    {group.items.slice(0, visible).map((item, bi) => (
                      <BulletItem
                        key={bi}
                        text={item}
                        html={section._bulletsHtml?.[bi]}
                        icon={group.icons?.[bi]}
                      />
                    ))}
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
      {slide.note ? (
        typeof slide._noteHtml === "string" ? (
          <p
            className="note-box notranslate"
            translate="no"
            dangerouslySetInnerHTML={{ __html: slide._noteHtml }}
          />
        ) : (
          <p className="note-box">{String(slide.note)}</p>
        )
      ) : null}
    </>
  );
}
