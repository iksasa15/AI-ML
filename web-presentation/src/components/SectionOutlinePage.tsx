import { AmpersandText } from "./ui/AmpersandText";
import type { SectionJump } from "../lib/sectionNav";
import { getUiStrings, type UiLang } from "../lib/uiStrings";

type Props = {
  deckTitle: string;
  jumps: SectionJump[];
  activeJumpId: string | null;
  onJump: (slideIndex: number) => void;
  onBack: () => void;
  uiLang: UiLang;
  onOpenSettings?: () => void;
};

export function SectionOutlinePage({
  deckTitle,
  jumps,
  activeJumpId,
  onJump,
  onBack,
  uiLang,
  onOpenSettings,
}: Props) {
  const strings = getUiStrings(uiLang);
  const t = strings.outlinePage;
  const dir = uiLang === "ar" ? "rtl" : "ltr";
  const lang = uiLang === "ar" ? "ar" : "en";

  return (
    <div className="outline-page" dir={dir} lang={lang}>
      <header className="outline-header">
        <div className="outline-header-text">
          <h1 className="outline-title">{t.title}</h1>
          <p className="outline-subtitle">
            <span dir="ltr" lang="en">
              <AmpersandText text={deckTitle} />
            </span>
          </p>
        </div>
        <div className="outline-header-actions">
          <button type="button" className="nav-btn topbar-btn outline-back-btn" onClick={onBack}>
            {t.back}
          </button>
          {onOpenSettings ? (
            <button type="button" className="nav-btn topbar-btn" onClick={onOpenSettings}>
              {strings.settings}
            </button>
          ) : null}
        </div>
      </header>

      <div className="outline-table-wrap table-wrap">
        <table className="outline-table">
          <thead>
            <tr>
              <th scope="col">{t.colSlide}</th>
              <th scope="col">{t.colSection}</th>
              <th scope="col">{t.colTopic}</th>
              <th scope="col">{t.colGo}</th>
            </tr>
          </thead>
          <tbody>
            {jumps.map((j) => {
              const isActive = activeJumpId === j.id;
              return (
                <tr key={j.id} className={isActive ? "outline-row is-current" : "outline-row"}>
                  <td>{j.slideIndex + 1}</td>
                  <td>{j.tag}</td>
                  <td>{j.label}</td>
                  <td>
                    <button
                      type="button"
                      className="nav-btn topbar-btn outline-go-btn"
                      onClick={() => onJump(j.slideIndex)}
                    >
                      {t.go}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
