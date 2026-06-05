import { presentationLoader } from "./presentationLoader";

/** Deck structure is assembled in presentationLoader (intro, dividers, conclusion). */
export function addPresentationStructure() {
  void presentationLoader.init();
}
