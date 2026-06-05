import { useEffect, useMemo, useState } from "react";
import { PresenterView } from "./components/presenter/PresenterView";
import { usePresentationDeck } from "./hooks/usePresentationDeck";
import { DAY01_FIRST_SLIDE_TITLE } from "./lib/day01Anchor";
import {
  readPersistedPresenterState,
  subscribePresenter,
  type PresenterState,
} from "./lib/presenterSync";
import type { SlideRecord } from "./lib/slideMarkup";
import { applyDocumentUiLang, readStoredUiLang } from "./lib/uiStrings";

const CONCLUSION_TITLE = "Conclusion";

export default function PresenterApp() {
  const [booted, setBooted] = useState(false);
  const [initialState, setInitialState] = useState<PresenterState | null>(() =>
    readPersistedPresenterState()
  );
  const { slides: allSlides, ready, ensureForIndex } = usePresentationDeck();

  const day01Slides = useMemo(() => {
    const start = allSlides.findIndex((s) => String(s.title || "") === DAY01_FIRST_SLIDE_TITLE);
    if (start < 0) return [] as SlideRecord[];
    const end = allSlides.findIndex(
      (s, i) => i > start && String(s.title || "") === CONCLUSION_TITLE
    );
    return allSlides.slice(start, end >= 0 ? end : allSlides.length);
  }, [allSlides]);

  useEffect(() => {
    applyDocumentUiLang(readStoredUiLang());
    if (ready) setBooted(true);
  }, [ready]);

  useEffect(() => {
    if (!booted) return;
    const index = initialState?.currentIndex ?? 0;
    ensureForIndex(index);
  }, [booted, initialState?.currentIndex, ensureForIndex]);

  useEffect(() => {
    if (!booted) return;
    return subscribePresenter((state) => {
      setInitialState(state);
      ensureForIndex(state.currentIndex);
    });
  }, [booted, ensureForIndex]);

  if (!booted) return null;

  return (
    <PresenterView
      allSlides={allSlides}
      day01Slides={day01Slides}
      initialState={initialState}
    />
  );
}
