import { useCallback, useEffect, useState } from "react";
import { presentationLoader } from "../lib/presentationLoader";
import type { SlideRecord } from "../lib/slideMarkup";

export function usePresentationDeck() {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const unsubscribe = presentationLoader.subscribe(() => setRevision((v) => v + 1));
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    void presentationLoader.init();
  }, []);

  const slides = presentationLoader.getSlides() as SlideRecord[];
  const ready = presentationLoader.isReady();

  const ensureForIndex = useCallback((index: number) => {
    void presentationLoader.ensureForIndex(index);
  }, []);

  return {
    revision,
    slides,
    ready,
    title: presentationLoader.getTitle(),
    totalSlides: presentationLoader.totalSlides,
    ensureForIndex,
    ensureAllForPrint: () => presentationLoader.ensureAllForPrint(),
  };
}
