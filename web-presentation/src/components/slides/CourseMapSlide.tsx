import { COURSE_WEEKS } from "../../lib/courseWeeks";

export function CourseMapSlide() {
  return (
    <div className="course-map-slide">
      <header className="course-map-head">
        <p className="course-map-eyebrow">COURSE AGENDA</p>
        <h2 className="course-map-title">Interactive Roadmap</h2>
      </header>

      <div className="course-map-grid" role="list">
        {COURSE_WEEKS.map((week) => (
          <article
            key={week.id}
            className="course-map-card"
            role="listitem"
            style={
              {
                "--week-color": week.color,
                "--week-color-dark": week.colorDark,
              } as React.CSSProperties
            }
          >
            <h3 className="course-map-card-theme">{week.theme}</h3>
            <p className="course-map-card-topic">{week.topic}</p>
            <p className="course-map-card-sections">{week.sections}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
