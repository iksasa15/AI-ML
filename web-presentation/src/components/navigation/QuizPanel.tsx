import type { SlideRecord } from "../../lib/slideMarkup";
import type { UiStrings } from "../../lib/uiStrings";

type QuizPanelProps = {
  open: boolean;
  ui: UiStrings;
  slide: SlideRecord | undefined;
  onClose: () => void;
};

function getQuizItems(slide: SlideRecord | undefined, ui: UiStrings): string[] {
  if (!slide) return [];

  if (Array.isArray(slide.quiz)) {
    return slide.quiz.map((q) => String(q));
  }

  if (typeof slide.quiz === "string" && slide.quiz.trim()) {
    return [slide.quiz];
  }

  const bullets = (slide.bullets || []) as string[];
  if (bullets.length > 0) {
    const topic = String(slide.title || "this topic");
    return [
      `Based on "${topic}", which point matters most and why?`,
      bullets.length > 1
        ? `Compare: "${bullets[0]}" vs "${bullets[1]}". When does each apply?`
        : ui.nav.quizReflect,
    ];
  }

  return [ui.nav.quizReflect];
}

export function QuizPanel({ open, ui, slide, onClose }: QuizPanelProps) {
  if (!open) return null;

  const items = getQuizItems(slide, ui);
  const hasExplicitQuiz = slide && (Array.isArray(slide.quiz) || typeof slide.quiz === "string");

  return (
    <div className="trainer-panel trainer-panel--quiz" role="dialog" aria-label={ui.nav.quiz}>
      <div className="trainer-panel-head">
        <div>
          <h3>{ui.nav.quiz}</h3>
          <p className="trainer-panel-sub" dir="ltr" lang="en">
            {String(slide?.title || "")}
          </p>
        </div>
        <button type="button" className="trainer-panel-close" onClick={onClose} aria-label={ui.close}>
          ✕
        </button>
      </div>
      <div className="trainer-panel-body">
        {!hasExplicitQuiz && items.length === 1 ? (
          <p className="trainer-panel-hint">{ui.nav.quizEmpty}</p>
        ) : null}
        <ol className="trainer-panel-quiz-list">
          {items.map((item, index) => (
            <li key={`${index}-${item.slice(0, 20)}`}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
