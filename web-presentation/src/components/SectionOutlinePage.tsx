import type { SectionJump } from "../lib/sectionNav";

type Props = {
  deckTitle: string;
  jumps: SectionJump[];
  activeJumpId: string | null;
  onJump: (slideIndex: number) => void;
  onBack: () => void;
};

export function SectionOutlinePage({ deckTitle, jumps, activeJumpId, onJump, onBack }: Props) {
  return (
    <div className="outline-page" dir="rtl">
      <header className="outline-header">
        <div className="outline-header-text">
          <h1 className="outline-title">جدول الأقسام</h1>
          <p className="outline-subtitle">{deckTitle}</p>
        </div>
        <button type="button" className="nav-btn topbar-btn outline-back-btn" onClick={onBack}>
          العودة للعرض
        </button>
      </header>

      <div className="outline-table-wrap table-wrap">
        <table className="outline-table">
          <thead>
            <tr>
              <th scope="col">رقم الشريحة</th>
              <th scope="col">القسم</th>
              <th scope="col">الموضوع</th>
              <th scope="col">انتقال</th>
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
                      انتقال
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
