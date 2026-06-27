import { COURSE_WEEKS } from "../../lib/courseWeeks";

export function BootcampTimelineSlide() {
  return (
    <div className="bootcamp-timeline-slide">
      <header className="bootcamp-timeline-head">
        <p className="bootcamp-timeline-eyebrow">BOOTCAMP TIMELINE</p>
      </header>

      <div className="bootcamp-timeline" role="img" aria-label="Bootcamp timeline by theme">
        <div className="bootcamp-timeline-track" aria-hidden="true">
          <div className="bootcamp-timeline-line" />
          {COURSE_WEEKS.map((week, index) => (
            <span
              key={week.id}
              className="bootcamp-timeline-tick"
              style={{ left: `${(index / (COURSE_WEEKS.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        <div className="bootcamp-timeline-columns">
          {COURSE_WEEKS.map((week) => (
            <div
              key={week.id}
              className="bootcamp-timeline-column"
              style={
                {
                  "--week-color": week.color,
                  "--week-color-dark": week.colorDark,
                } as React.CSSProperties
              }
            >
              <p className="bootcamp-timeline-column-theme">{week.theme}</p>
              <p className="bootcamp-timeline-column-sections">{week.sections}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
