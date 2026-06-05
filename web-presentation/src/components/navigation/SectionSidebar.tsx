import type { MouseEvent } from "react";
import { AmpersandText } from "../ui/AmpersandText";
import type { SectionNavItem } from "../../lib/sectionNav";
import type { UiStrings } from "../../lib/uiStrings";

type SectionSidebarProps = {
  open: boolean;
  ui: UiStrings;
  deckTitle: string;
  items: SectionNavItem[];
  activeId: string | null;
  onOpen: () => void;
  onClose: () => void;
  onJump: (slideIndex: number) => void;
};

export function SectionSidebar({
  open,
  ui,
  deckTitle,
  items,
  activeId,
  onOpen,
  onClose,
  onJump,
}: SectionSidebarProps) {
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          className="nav-sidebar-reopen"
          onClick={onOpen}
          aria-label={ui.nav.openSections}
          title={ui.nav.openSections}
        >
          <span className="nav-sidebar-reopen-icon" aria-hidden="true">
            ☰
          </span>
          <span className="nav-sidebar-reopen-label">{ui.nav.sectionsTitle}</span>
        </button>
      ) : null}

      <div
        className={`nav-sidebar-backdrop${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`nav-sidebar${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={open ? undefined : true}
        aria-label={ui.nav.sectionsTitle}
      >
        <div className="nav-sidebar-head">
          <div>
            <h2 className="nav-sidebar-title">{ui.nav.sectionsTitle}</h2>
            <p className="nav-sidebar-deck" dir="ltr" lang="en">
              <AmpersandText text={deckTitle} />
            </p>
          </div>
          <button
            type="button"
            className="nav-sidebar-close"
            onClick={handleClose}
            aria-label={ui.nav.closeSections}
            title={ui.nav.closeSections}
          >
            <span aria-hidden="true">×</span>
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
