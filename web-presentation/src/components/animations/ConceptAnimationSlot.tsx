import { getConceptAnimationId } from "../../lib/conceptAnimations";
import type { SlideRecord } from "../../lib/slideMarkup";
import { AttentionHeatmap } from "./AttentionHeatmap";
import { GradientDescentAnimator } from "./GradientDescentAnimator";
import { NeuralNetworkVisualizer } from "./NeuralNetworkVisualizer";

type ConceptAnimationSlotProps = {
  slide: SlideRecord;
};

export function ConceptAnimationSlot({ slide }: ConceptAnimationSlotProps) {
  const id = getConceptAnimationId(slide);
  if (!id) return null;

  switch (id) {
    case "gradient-descent":
      return <GradientDescentAnimator />;
    case "neural-network":
      return <NeuralNetworkVisualizer />;
    case "attention-heatmap":
      return <AttentionHeatmap />;
    default:
      return null;
  }
}
