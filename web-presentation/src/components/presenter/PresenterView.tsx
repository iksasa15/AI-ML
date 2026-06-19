import { useCallback, useEffect, useMemo, useState } from "react";
import { usePresenterTimer } from "../../hooks/usePresenterTimer";
import { getActiveSectionTag, getNavContextLabel } from "../../lib/slideMeta";
import { getActiveSectionLabel, type SlideRecord } from "../../lib/slideMarkup";
import {
  readSpeakerNoteOverrides,
  getSpeakerNote,
  writeSpeakerNoteOverride,
} from "../../lib/speakerNotes";
import type { PresenterState } from "../../lib/presenterSync";
import { subscribePresenter } from "../../lib/presenterSync";
import type { DeckScope } from "../../lib/traineeProgress";
import { filterSlidesForScope } from "../../lib/deckScopeConfig";
import { getUiStrings, readStoredUiLang } from "../../lib/uiStrings";
import { PresenterSlidePreview } from "./PresenterSlidePreview";

type PresenterViewProps = {
  allSlides: SlideRecord[];
  day01Slides: SlideRecord[];
  initialState?: PresenterState | null;
};

function slidesForScope(scope: DeckScope, allSlides: SlideRecord[], day01Slides: SlideRecord[]) {
  return filterSlidesForScope(allSlides, scope, day01Slides);
}

export function PresenterView({ allSlides, day01Slides, initialState }: PresenterViewProps) {
  const [state, setState] = useState<PresenterState>(
    initialState ?? {
      currentIndex: 0,
      deckScope: "all",
      uiLang: readStoredUiLang(),
      totalSlides: allSlides.length,
    }
  );
  const [noteOverrides, setNoteOverrides] = useState(() =>
    readSpeakerNoteOverrides(initialState?.deckScope ?? "all")
  );
  const [draftNote, setDraftNote] = useState("");

  const slides = useMemo(
    () => slidesForScope(state.deckScope, allSlides, day01Slides),
    [state.deckScope, allSlides, day01Slides]
  );
  const total = slides.length;
  const currentIndex = Math.min(Math.max(0, state.currentIndex), Math.max(0, total - 1));
  const currentSlide = slides[currentIndex];
  const nextSlide = currentIndex < total - 1 ? slides[currentIndex + 1] : undefined;

  const ui = useMemo(() => getUiStrings(state.uiLang), [state.uiLang]);
  const t = ui.presenter;
  const timer = usePresenterTimer();

  const contextLabel = useMemo(
    () => getNavContextLabel(slides, currentIndex),
    [slides, currentIndex]
  );
  const sectionTag = useMemo(() => getActiveSectionTag(slides, currentIndex), [slides, currentIndex]);
  const sectionLabel = useMemo(
    () => getActiveSectionLabel(slides, currentIndex),
    [slides, currentIndex]
  );
  const nextSectionTag = useMemo(
    () => (nextSlide ? getActiveSectionTag(slides, currentIndex + 1) : sectionTag),
    [nextSlide, slides, currentIndex, sectionTag]
  );
  const nextSectionLabel = useMemo(
    () => (nextSlide ? getActiveSectionLabel(slides, currentIndex + 1) : sectionLabel),
    [nextSlide, slides, currentIndex, sectionLabel]
  );

  const resolvedNote = useMemo(
    () => getSpeakerNote(currentSlide, state.deckScope, currentIndex, noteOverrides),
    [currentSlide, state.deckScope, currentIndex, noteOverrides]
  );

  useEffect(() => {
    setDraftNote(resolvedNote);
  }, [resolvedNote, currentIndex]);

  useEffect(() => {
    return subscribePresenter(
      (next) => {
        setState(next);
        setNoteOverrides(readSpeakerNoteOverrides(next.deckScope));
      },
      (patch) => {
        if (patch.deckScope !== state.deckScope) return;
        setNoteOverrides(readSpeakerNoteOverrides(patch.deckScope));
        if (patch.slideIndex === currentIndex) {
          setDraftNote(patch.text);
        }
      }
    );
  }, [state.deckScope, currentIndex]);

  const saveNote = useCallback(() => {
    writeSpeakerNoteOverride(state.deckScope, currentIndex, draftNote);
    setNoteOverrides(readSpeakerNoteOverrides(state.deckScope));
  }, [state.deckScope, currentIndex, draftNote]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (draftNote !== resolvedNote) saveNote();
    }, 600);
    return () => window.clearTimeout(id);
  }, [draftNote, resolvedNote, saveNote]);

  return (
    <div className="presenter-root" dir={ui.direction} lang={ui.docLang}>
      <header className="presenter-header">
        <h1>{t.title}</h1>
        <p className="presenter-header-hint">{t.syncHint}</p>
      </header>

      <div className="presenter-stage">
        <PresenterSlidePreview
          slide={currentSlide}
          slides={slides}
          slideIndex={currentIndex}
          sectionTag={sectionTag}
          sectionLabel={sectionLabel}
          totalSlides={total}
          label={t.currentSlide}
          uiLang={state.uiLang}
        />
        <PresenterSlidePreview
          slide={nextSlide}
          slides={slides}
          slideIndex={currentIndex + 1}
          sectionTag={nextSectionTag}
          sectionLabel={nextSectionLabel}
          totalSlides={total}
          label={t.nextSlide}
          uiLang={state.uiLang}
        />
      </div>

      <section className="presenter-notes" aria-label={t.notesTitle}>
        <div className="presenter-notes-head">
          <span className="presenter-notes-icon" aria-hidden="true">
            📝
          </span>
          <h2>{t.notesTitle}</h2>
          <span className="presenter-notes-slide" dir="ltr" lang="en">
            {String(currentSlide?.title || "")}
          </span>
        </div>
        <textarea
          className="presenter-notes-editor"
          value={draftNote}
          onChange={(e) => setDraftNote(e.target.value)}
          onBlur={saveNote}
          placeholder={t.notesPlaceholder}
          dir="auto"
          rows={6}
        />
        <p className="presenter-notes-save-hint">{t.notesAutoSave}</p>
      </section>

      <footer className="presenter-footer">
        <div className="presenter-timer">
          <span className="presenter-timer-icon" aria-hidden="true">
            ⏱️
          </span>
          <span className="presenter-timer-value">{timer.formatted}</span>
          <button type="button" className="presenter-timer-btn" onClick={timer.togglePause}>
            {timer.paused ? t.timerResume : t.timerPause}
          </button>
          <button type="button" className="presenter-timer-btn" onClick={timer.reset}>
            {t.timerReset}
          </button>
        </div>
        <span className="presenter-footer-slide">
          {t.slideCounter(currentIndex + 1, total)}
        </span>
        <span className="presenter-footer-context" dir="ltr" lang="en">
          {contextLabel}
        </span>
      </footer>
    </div>
  );
}
