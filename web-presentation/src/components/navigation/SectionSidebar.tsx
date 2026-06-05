import type { SectionNavItem } from "../../lib/sectionNav";
import type { UiStrings } from "../../lib/uiStrings";

type SectionSidebarProps = {
  open: boolean;
  ui: UiStrings;
  deckTitle: string;
  items: SectionNavItem[];
  activeId: string | null;
  onClose: () => void;
  onJump: (slideIndex: number) => void;
};

export function SectionSidebar({
  open,
  ui,
  deckTitle,
  items,
  activeId,
  onClose,
  onJump,
}: SectionSidebarProps) {
  return (
    <>
      <div
        className={`nav-sidebar-backdrop${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`nav-sidebar${open ? " is-open" : ""}`}
        aria-hidden={!open}
        aria-label={ui.nav.sectionsTitle}
      >
        <div className="nav-sidebar-head">
          <div>
            <h2 className="nav-sidebar-title">{ui.nav.sectionsTitle}</h2>
            <p className="nav-sidebar-deck" dir="ltr" lang="en">
              {deckTitle}
            </p>
          </div>
          <button type="button" className="nav-sidebar-close" onClick={onClose} aria-label={ui.close}>
            ✕
          </button>
        </div>

        <ul className="nav-sidebar-list">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-sidebar-item${isActive ? " is-active" : ""}`}
                  onClick={() => {
                    onJump(item.slideIndex);
                    onClose();
                  }}
                >
                  <div className="nav-sidebar-item-top">
                    <span className="nav-sidebar-item-tag" dir="ltr" lang="en">
                      {item.tag}
                    </span>
                    <span className="nav-sidebar-item-count">{ui.nav.slidesCount(item.slideCount)}</span>
                  </div>
                  <span className="nav-sidebar-item-label" dir="auto">
                    {item.label}
                  </span>
                  <div className="nav-sidebar-item-progress">
                    <div className="nav-sidebar-item-progress-track" dir="ltr">
                      <div
                        className="nav-sidebar-item-progress-fill"
                        style={{ width: `${item.completionPercent}%` }}
                      />
                    </div>
                    <span className="nav-sidebar-item-pct">
                      {ui.nav.sectionComplete(item.completionPercent)}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
