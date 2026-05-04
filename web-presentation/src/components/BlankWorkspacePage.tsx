import { getUiStrings, type UiLang } from "../lib/uiStrings";

type Props = {
  onBack: () => void;
  uiLang: UiLang;
  onOpenSettings?: () => void;
};

export function BlankWorkspacePage({ onBack, uiLang, onOpenSettings }: Props) {
  const strings = getUiStrings(uiLang);
  const t = strings.blankWorkspacePage;
  const dir = uiLang === "ar" ? "rtl" : "ltr";
  const lang = uiLang === "ar" ? "ar" : "en";

  return (
    <div className="outline-page blank-workspace-page" dir={dir} lang={lang}>
      <header className="outline-header">
        <div className="outline-header-text">
          <h1 className="outline-title">{t.title}</h1>
          <p className="outline-subtitle">{t.subtitle}</p>
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

      <div className="blank-workspace-canvas" aria-label={t.canvasLabel}>
        <p className="blank-workspace-hint">{t.hint}</p>
      </div>
    </div>
  );
}
