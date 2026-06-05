import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuestionsForSection } from "../../lib/quiz";
import type { QuizSectionResult } from "../../lib/quizResults";
import type { UiStrings } from "../../lib/uiStrings";

type QuizModalProps = {
  open: boolean;
  sectionId: number;
  sectionLabel: string;
  ui: UiStrings;
  onClose: () => void;
  onComplete: (result: QuizSectionResult) => void;
};

type Phase = "question" | "summary";

export function QuizModal({
  open,
  sectionId,
  sectionLabel,
  ui,
  onClose,
  onComplete,
}: QuizModalProps) {
  const t = ui.quizModal;
  const questions = useMemo(() => getQuestionsForSection(sectionId), [sectionId]);

  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [result, setResult] = useState<QuizSectionResult | null>(null);

  const reset = useCallback(() => {
    setQIndex(0);
    setAnswers([]);
    setSelected(null);
    setPhase("question");
    setResult(null);
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, sectionId, reset]);

  if (!open || questions.length === 0) return null;

  const current = questions[qIndex];
  const answered = selected !== null;

  const handleSelect = (optionIndex: number) => {
    if (answered || !current) return;
    setSelected(optionIndex);
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  };

  const finishQuiz = (finalAnswers: number[]) => {
    const finalScore = finalAnswers.filter((a, i) => a === questions[i]?.correct).length;
    const payload: QuizSectionResult = {
      sectionId,
      score: finalScore,
      total: questions.length,
      answers: finalAnswers,
      completedAt: new Date().toISOString(),
    };
    setResult(payload);
    setPhase("summary");
    onComplete(payload);
  };

  const handleNext = () => {
    if (selected === null) return;
    const finalAnswers = [...answers];
    finalAnswers[qIndex] = selected;

    if (qIndex < questions.length - 1) {
      setAnswers(finalAnswers);
      setQIndex((i) => i + 1);
      setSelected(null);
      return;
    }

    finishQuiz(finalAnswers);
  };

  const summary = result ?? {
    score: answers.filter((a, i) => a === questions[i]?.correct).length,
    total: questions.length,
  };

  return (
    <div
      className="quiz-modal-backdrop is-open"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="quiz-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
        dir={ui.direction}
        lang={ui.docLang}
      >
        <header className="quiz-modal-head">
          <div>
            <h2 id="quiz-modal-title">{t.title}</h2>
            <p className="quiz-modal-sub" dir="auto">
              {sectionLabel}
            </p>
          </div>
          <button type="button" className="quiz-modal-close" onClick={onClose} aria-label={ui.close}>
            ✕
          </button>
        </header>

        {phase === "question" && current ? (
          <div className="quiz-modal-body">
            <p className="quiz-progress-label">{t.questionOf(qIndex + 1, questions.length)}</p>
            <p className="quiz-question" dir="ltr" lang="en">
              {current.question}
            </p>
            <ul className="quiz-options">
              {current.options.map((option, optionIndex) => {
                let stateClass = "";
                if (answered) {
                  if (optionIndex === current.correct) stateClass = " is-correct";
                  else if (optionIndex === selected) stateClass = " is-wrong";
                }
                return (
                  <li key={option}>
                    <button
                      type="button"
                      className={`quiz-option-btn${stateClass}`}
                      onClick={() => handleSelect(optionIndex)}
                      disabled={answered}
                      dir="ltr"
                      lang="en"
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                      <span>{option}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {answered ? (
              <div className={`quiz-feedback${selected === current.correct ? " is-correct" : " is-wrong"}`}>
                <strong>{selected === current.correct ? t.correct : t.incorrect}</strong>
                <p dir="ltr" lang="en">
                  {current.explanation}
                </p>
              </div>
            ) : null}
            <footer className="quiz-modal-foot">
              <button
                type="button"
                className="quiz-btn quiz-btn--primary"
                disabled={!answered}
                onClick={handleNext}
              >
                {qIndex < questions.length - 1 ? t.nextQuestion : t.seeResults}
              </button>
            </footer>
          </div>
        ) : (
          <div className="quiz-modal-body quiz-modal-summary">
            <p className="quiz-summary-score">{t.scoreSummary(summary.score, summary.total)}</p>
            <p className="quiz-summary-pct">{Math.round((summary.score / summary.total) * 100)}%</p>
            <p className="quiz-summary-msg">{t.completedMsg}</p>
            <footer className="quiz-modal-foot">
              <button type="button" className="quiz-btn quiz-btn--primary" onClick={onClose}>
                {t.closeQuiz}
              </button>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
