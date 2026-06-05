import type { UiStrings } from "../../lib/uiStrings";

type QuizSummary = {
  completedSections: number;
  totalSections: number;
  averagePercent: number;
};

type TraineeProgressRingProps = {
  ui: UiStrings;
  percent: number;
  quizSummary: QuizSummary;
  open: boolean;
  onToggle: () => void;
  onReset: () => void;
};

const SIZE = 52;
const STROKE = 4;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export function TraineeProgressRing({
  ui,
  percent,
  quizSummary,
  open,
  onToggle,
  onReset,
}: TraineeProgressRingProps) {
  const offset = C - (percent / 100) * C;

  return (
    <div className={`trainee-progress${open ? " is-open" : ""}`}>
      {open ? (
        <div className="trainee-progress-popover">
          <p className="trainee-progress-title">{ui.nav.traineeProgressTitle}</p>
          <p className="trainee-progress-value">{percent}%</p>
          {quizSummary.totalSections > 0 ? (
            <p className="trainee-progress-quiz">
              {ui.quizModal.quizProgress(
                quizSummary.completedSections,
                quizSummary.totalSections,
                quizSummary.averagePercent
              )}
            </p>
          ) : null}
          <button type="button" className="trainee-progress-reset" onClick={onReset}>
            {ui.nav.resetProgress}
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className="trainee-progress-ring-btn"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${ui.nav.deckProgress}: ${percent}%`}
        title={ui.nav.deckProgress}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <circle
            className="trainee-progress-ring-bg"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
          />
          <circle
            className="trainee-progress-ring-fill"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeDasharray={C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </svg>
        <span className="trainee-progress-ring-label">{percent}</span>
      </button>
    </div>
  );
}
