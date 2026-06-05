import { BOOTCAMP_MAP_SECTIONS, getBootcampWeeks } from "../../lib/bootcampMap";

type BigPictureSlideProps = {
  sectionId: number;
  focus?: string;
};

export function BigPictureSlide({ sectionId, focus }: BigPictureSlideProps) {
  const weeks = getBootcampWeeks();

  return (
    <div className="big-picture-slide">
      <header className="big-picture-head">
        <p className="big-picture-eyebrow">BIG PICTURE</p>
        <h2 className="big-picture-title">Where Are We in the Bootcamp?</h2>
        {focus ? <p className="big-picture-focus">{focus}</p> : null}
      </header>
      <div className="bootcamp-map" role="img" aria-label={`Bootcamp map with section ${sectionId} highlighted`}>
        {weeks.map((week) => {
          const sections = BOOTCAMP_MAP_SECTIONS.filter((s) => s.week === week);
          return (
            <div key={week} className="bootcamp-map-week">
              <p className="bootcamp-map-week-label">Week {week}</p>
              <ul className="bootcamp-map-sections">
                {sections.map((section) => {
                  const isCurrent = section.id === sectionId;
                  const isPast = section.id < sectionId;
                  return (
                    <li
                      key={section.id}
                      className={`bootcamp-map-card${isCurrent ? " is-current" : ""}${isPast ? " is-past" : ""}`}
                    >
                      <span className="bootcamp-map-card-id">{section.shortLabel}</span>
                      <span className="bootcamp-map-card-title">{section.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="big-picture-legend">
        <span className="legend-item legend-item--current">■ Current section</span>
        <span className="legend-item legend-item--past">■ Completed</span>
        <span className="legend-item">□ Upcoming</span>
      </p>
    </div>
  );
}
