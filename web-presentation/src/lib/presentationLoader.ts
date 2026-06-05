import {
  computeSectionStartIndices,
  computeTotalSlideCount,
  CONCLUSION_SLIDE,
  DECK_TITLE,
  INTRO_SLIDES,
  SECTION_DEFINITIONS,
  sectionIdForSlideIndex,
} from "./deckStructure";
import { prerenderSlideMathFields, prerenderSlidesBatch } from "./katexPrerender";
import { getBigPictureSlide, getTakeawaySlide } from "./sectionBookends";
import type { SlideRecord } from "./slideMarkup";

export const LOADING_SLIDE_TYPE = "loading";

function createLoadingSlide(sectionId: number): SlideRecord {
  return {
    type: LOADING_SLIDE_TYPE,
    title: "Loading section…",
    _pendingSection: sectionId,
  };
}

function buildSkeletonDeck(): SlideRecord[] {
  const deck: SlideRecord[] = prerenderSlidesBatch([...INTRO_SLIDES]);

  for (const section of SECTION_DEFINITIONS) {
    deck.push(prerenderSlideMathFields({ ...section.divider }));
    deck.push(prerenderSlideMathFields(getBigPictureSlide(section.id)));
    for (let i = 0; i < section.contentSlideCount; i += 1) {
      deck.push(createLoadingSlide(section.id));
    }
    deck.push(prerenderSlideMathFields(getTakeawaySlide(section.id)));
  }

  deck.push(prerenderSlideMathFields({ ...CONCLUSION_SLIDE }));
  return deck;
}

class PresentationLoader {
  private slides: SlideRecord[] = [];
  private loadedSections = new Set<number>();
  private listeners = new Set<() => void>();
  private initPromise: Promise<void> | null = null;
  private structureReady = false;
  private readonly sectionStarts = computeSectionStartIndices();
  readonly totalSlides = computeTotalSlideCount();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) listener();
  }

  getTitle() {
    return DECK_TITLE;
  }

  getSlides(): SlideRecord[] {
    return this.slides;
  }

  isReady() {
    return this.structureReady;
  }

  isStructureReady() {
    return this.structureReady;
  }

  isSectionLoaded(sectionId: number) {
    return this.loadedSections.has(sectionId);
  }

  async init(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      this.slides = buildSkeletonDeck();
      this.structureReady = true;
      this.notify();
      await this.ensureSection(1);
      this.schedulePrefetch(2);
    })();

    return this.initPromise;
  }

  private schedulePrefetch(sectionId: number) {
    const run = () => void this.ensureSection(sectionId);
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(run, { timeout: 2500 });
    } else {
      window.setTimeout(run, 400);
    }
  }

  async ensureForIndex(index: number): Promise<void> {
    const sectionId = sectionIdForSlideIndex(index);
    if (sectionId) {
      await this.ensureSection(sectionId);
      const nextSection = SECTION_DEFINITIONS.find((s) => s.id === sectionId + 1);
      if (nextSection) this.schedulePrefetch(nextSection.id);
      return;
    }

    if (!this.loadedSections.has(1)) {
      await this.ensureSection(1);
    }
  }

  async ensureSection(sectionId: number): Promise<void> {
    if (this.loadedSections.has(sectionId)) return;

    const definition = SECTION_DEFINITIONS.find((s) => s.id === sectionId);
    if (!definition) return;

    const mod = await definition.importSlides();
    const prerendered = prerenderSlidesBatch(mod.slides as SlideRecord[]);
    const start = this.sectionStarts[sectionId];

    this.slides[start] = prerenderSlideMathFields({ ...definition.divider });
    this.slides[start + 1] = prerenderSlideMathFields(getBigPictureSlide(sectionId));
    for (let i = 0; i < prerendered.length; i += 1) {
      this.slides[start + 2 + i] = prerendered[i];
    }
    this.slides[start + 2 + prerendered.length] = prerenderSlideMathFields(
      getTakeawaySlide(sectionId)
    );

    this.loadedSections.add(sectionId);
    this.notify();
  }

  async ensureAllForPrint(): Promise<SlideRecord[]> {
    await this.init();
    await Promise.all(SECTION_DEFINITIONS.map((s) => this.ensureSection(s.id)));
    return this.getSlides();
  }
}

export const presentationLoader = new PresentationLoader();
