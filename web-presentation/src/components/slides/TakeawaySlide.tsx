import type { NormalizedBullet } from "../../lib/bulletItems";
import { SlideIcon } from "../icons/SlideIcon";
import { isSlideIconId } from "../../lib/slideIconKeys";

type TakeawaySlideProps = {
  bullets: NormalizedBullet[] | string[];
  reflectionQuestion?: string;
};

function normalizeEntry(entry: NormalizedBullet | string): NormalizedBullet {
  if (typeof entry === "string") return { text: entry };
  return entry;
}

const TAKEAWAY_ICONS = ["check", "idea", "target"] as const;

export function TakeawaySlide({ bullets, reflectionQuestion }: TakeawaySlideProps) {
  const topThree = bullets.slice(0, 3).map(normalizeEntry);

  return (
    <div className="takeaway-slide">
      <header className="takeaway-head">
        <p className="takeaway-eyebrow">TAKEAWAYS</p>
        <h2 className="takeaway-title">3 Ideas to Keep</h2>
      </header>
      <ol className="takeaway-list">
        {topThree.map((item, index) => {
          const icon = item.icon && isSlideIconId(item.icon) ? item.icon : TAKEAWAY_ICONS[index];
          return (
            <li key={`${index}-${item.text.slice(0, 24)}`} className="takeaway-item">
              <span className="takeaway-number">{index + 1}</span>
              {icon ? (
                <span className="takeaway-icon" aria-hidden="true">
                  <SlideIcon id={icon} size="sm" />
                </span>
              ) : null}
              <span className="takeaway-text">{item.text}</span>
            </li>
          );
        })}
      </ol>
      {reflectionQuestion ? (
        <div className="takeaway-reflection">
          <p className="takeaway-reflection-label">Think about it</p>
          <p className="takeaway-reflection-question">{reflectionQuestion}</p>
        </div>
      ) : null}
    </div>
  );
}
