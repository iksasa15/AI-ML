/** تحميل سكربت Google Translate مرة واحدة وتهيئة القائمة المنسدلة */

type TranslateConstructor = new (options: Record<string, unknown>, elementId: string) => unknown;

let loadPromise: Promise<void> | null = null;

function getTranslateConstructor(): (TranslateConstructor & { InlineLayout?: { SIMPLE: number } }) | null {
  const tr = (window as unknown as { google?: { translate?: { TranslateElement?: TranslateConstructor & { InlineLayout?: { SIMPLE: number } } } } })
    .google?.translate;
  const T = tr?.TranslateElement;
  if (typeof T !== "function") return null;
  return T as TranslateConstructor & { InlineLayout?: { SIMPLE: number } };
}

export function loadGoogleTranslateScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (getTranslateConstructor()) return Promise.resolve();

  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[src*="translate_a/element.js"]');
    if (existing) {
      const t = window.setInterval(() => {
        if (getTranslateConstructor()) {
          window.clearInterval(t);
          resolve();
        }
      }, 80);
      window.setTimeout(() => {
        window.clearInterval(t);
        reject(new Error("Google Translate script timeout"));
      }, 20000);
      return;
    }

    (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit =
      () => resolve();
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.onerror = () => reject(new Error("Failed to load Google Translate"));
    document.head.appendChild(s);
  });

  return loadPromise;
}

/** يُستدعى مرة واحدة بعد وجود عنصر الحاوية في DOM */
export function initGoogleTranslateElement(containerId: string): boolean {
  const el = document.getElementById(containerId);
  if (!el || el.dataset.gtInit === "1") return Boolean(el?.dataset.gtInit);

  const T = getTranslateConstructor();
  if (!T) return false;

  const simple = T.InlineLayout?.SIMPLE ?? 0;

  try {
    new T(
      {
        pageLanguage: "en",
        includedLanguages: "ar,en,fr,de,es,hi,ur",
        layout: simple,
        autoDisplay: false,
      },
      containerId
    );
    el.dataset.gtInit = "1";
    return true;
  } catch {
    return false;
  }
}
