import {
  countSlidesInSection,
  estimateSectionMinutes,
  getDividerEyebrow,
  getDividerTitleLines,
} from "../../lib/slideMeta";
import {
  getSectionKeyTopics,
  getSectionTheme,
  parseSectionIdFromDivider,
} from "../../lib/sectionTheme";
import type { SlideRecord } from "../../lib/slideMarkup";
import { SectionDividerIcon } from "./SectionDividerIcon";

type SectionDividerProps = {
  slide: SlideRecord;
  slides: SlideRecord[];
  slideIndex: number;
};

export function SectionDivider({ slide, slides, slideIndex }: SectionDividerProps) {
  const sectionId = parseSectionIdFromDivider(slide) ?? 0;
  const theme = getSectionTheme(sectionId);
  const keyTopics = getSectionKeyTopics(sectionId);
  const eyebrow = getDividerEyebrow(slide);
  const titleLines = getDividerTitleLines(slide);
  const slideCount = countSlidesInSection(slides, slideIndex);
  const minutes = estimateSectionMinutes(slideCount);

  return (
    <div
      className="section-divider-hero section-divider-hero--themed"
      style={
        {
          "--section-accent": theme.color,
          "--section-accent-dark": theme.colorDark,
          "--section-accent-glow": theme.colorGlow,
        } as React.CSSProperties
      }
    >
      <div className="section-divider-hero-bg" aria-hidden="true" />

      <div className="section-divider-hero-content">
        <p className="section-divider-eyebrow">
          {eyebrow}
          <span className="section-divider-theme-badge">{theme.label}</span>
        </p>

        <div className="section-divider-main">
          <div className="section-divider-number-wrap" aria-hidden="true">
            <span className="section-divider-number">{sectionId || "·"}</span>
          </div>

          <div className="section-divider-copy">
            <div className="section-divider-icon-wrap">
              <SectionDividerIcon group={theme.group} />
            </div>
            <div className="section-divider-titles">
              {titleLines.map((line) => (
                <h2 key={line} className="section-divider-title-line">
                  {line}
                </h2>
              ))}
            </div>
          </div>
        </div>

        {keyTopics.length ? (
          <ul className="section-divider-topics">
            {keyTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        ) : null}

        <p className="section-divider-meta">
          <span className="section-divider-meta-icon" aria-hidden="true">
            ▸
          </span>
          {slideCount} slides · ~{minutes} min
        </p>
      </div>
    </div>
  );
}
