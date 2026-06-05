import type { ReactNode } from "react";

type ConceptDiagramCardProps = {
  title: string;
  subtitle?: string;
  caption?: string;
  wrapClass?: string;
  children: ReactNode;
};

/** Static concept diagram — visible immediately, no play controls. */
export function ConceptDiagramCard({
  title,
  subtitle,
  caption,
  wrapClass = "",
  children,
}: ConceptDiagramCardProps) {
  return (
    <div className="concept-card concept-card--static">
      <div className="concept-card-head">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className={`concept-svg-wrap ${wrapClass}`.trim()}>{children}</div>
      {caption ? <p className="concept-caption">{caption}</p> : null}
    </div>
  );
}
