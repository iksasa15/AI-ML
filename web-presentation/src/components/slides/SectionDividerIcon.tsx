import type { SectionThemeGroup } from "../../lib/sectionTheme";

type SectionDividerIconProps = {
  group: SectionThemeGroup;
};

export function SectionDividerIcon({ group }: SectionDividerIconProps) {
  switch (group) {
    case "foundations":
      return (
        <svg className="section-divider-icon" viewBox="0 0 48 48" aria-hidden="true">
          <rect x="8" y="28" width="32" height="8" rx="2" fill="currentColor" opacity="0.5" />
          <rect x="12" y="18" width="24" height="8" rx="2" fill="currentColor" opacity="0.75" />
          <rect x="16" y="8" width="16" height="8" rx="2" fill="currentColor" />
        </svg>
      );
    case "classical":
      return (
        <svg className="section-divider-icon" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="14" cy="34" r="5" fill="currentColor" opacity="0.6" />
          <circle cx="28" cy="22" r="5" fill="currentColor" opacity="0.8" />
          <circle cx="36" cy="12" r="5" fill="currentColor" />
          <path d="M14 34 L28 22 L36 12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7" />
        </svg>
      );
    case "deep":
      return (
        <svg className="section-divider-icon" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="10" cy="24" r="4" fill="currentColor" />
          <circle cx="24" cy="12" r="4" fill="currentColor" />
          <circle cx="24" cy="36" r="4" fill="currentColor" />
          <circle cx="38" cy="24" r="4" fill="currentColor" />
          <path d="M10 24 L24 12 M10 24 L24 36 M24 12 L38 24 M24 36 L38 24" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        </svg>
      );
    case "nlp":
      return (
        <svg className="section-divider-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M8 12h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H16l-8 6V16a4 4 0 0 1 4-4z"
            fill="currentColor"
            opacity="0.85"
          />
          <rect x="14" y="20" width="12" height="2" rx="1" fill="#0f172a" opacity="0.35" />
          <rect x="14" y="26" width="18" height="2" rx="1" fill="#0f172a" opacity="0.35" />
        </svg>
      );
    case "genai":
    default:
      return (
        <svg className="section-divider-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 6l3 9h9l-7 6 3 9-8-6-8 6 3-9-7-6h9z" fill="currentColor" />
          <circle cx="38" cy="14" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="10" cy="36" r="2.5" fill="currentColor" opacity="0.5" />
        </svg>
      );
  }
}
