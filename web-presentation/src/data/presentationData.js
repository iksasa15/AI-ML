/** Compatibility shim — slides load lazily via presentationLoader. */
import { presentationLoader } from "../lib/presentationLoader";

export const presentationData = {
  title: presentationLoader.getTitle(),
  get slides() {
    return presentationLoader.getSlides();
  },
  get _structureAdded() {
    return presentationLoader.isStructureReady();
  },
};
