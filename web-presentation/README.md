# عرض AI & Machine Learning Bootcamp

عرض تفاعلي ويب لمنهج **معسكر الذكاء الاصطناعي وتعلّم الآلة** — مبني بـ **React + Vite**، ويُعرض كشرائح (Slides) قابلة للتنقّل مع دعم عربي للواجهة وترجمة المحتوى.

---

## ما هذا المشروع؟

تطبيق ويب يعرض شرائح تعليمية تغطي مساراً كاملاً من أساسيات تعلّم الآلة إلى **NLP** و**الذكاء التوليدي (GenAI)**. المحتوى بالإنجليزية؛ أزرار الواجهة والتنقل بالعربية أو الإنجليزية حسب إعداداتك.

| البند | التفاصيل |
|--------|----------|
| **العنوان** | AI & Machine Learning Bootcamp |
| **المدة المقترحة** | 4 أسابيع — 20 جلسة × ساعتين |
| **عدد الشرائح** | ~350 شريحة (مقدمة تفاعلية + 16 قسماً + خاتمة) |
| **النشر المباشر** | [iksasa15.github.io/AI-ML/web-presentation/](https://iksasa15.github.io/AI-ML/web-presentation/) |
| **لغة الشرائح** | الإنجليزية |
| **لغة الواجهة** | العربية (افتراضي) أو الإنجليزية |

---

## محتويات العرض (الأقسام)

يُجمَع المحتوى من **16 ملفاً** داخل `src/data/slides/`، مع شرائح إضافية تُضاف تلقائياً عند التشغيل (جدول الأعمال، الجدول الزمني، فواصل الأقسام، والخاتمة).

### الشرائح الافتتاحية (تُضاف تلقائياً)

1. **Intro Hero** — عنوان متحرك حرفاً حرفاً
2. **Course Map** — خريطة تفاعلية بأربعة أسابيع (بطاقات ملوّنة)
3. **Bootcamp Timeline** — خط زمني W1–W4 (ML Core → GenAI)

### الأقسام الرئيسية

| القسم | الملف | الموضوع | عدد الشرائح التقريبي |
|-------|-------|---------|----------------------|
| **1** | `section01-foundations.js` | أساسيات ML ومعالجة البيانات (تقسيم، تحجيم، ترميز، قيم مفقودة) | 18 |
| **2** | `section02-regression.js` | الانحدار الخطي، OLS، R²، افتراضات النموذج، بناء النماذج | 35 |
| **3** | `section03-classification-intro.js` | مقدمة التصنيف، Logistic Regression، K-NN | 11 |
| **4** | `section04-naive-bayes-trees.js` | Naive Bayes، أشجار القرار، Random Forest، التقييم | 12 |
| **5** | `section05-svm.js` | SVM، الهامش، النواة (Kernel) | 9 |
| **6** | `section06-clustering-pca.js` | التجميع (K-Means، Hierarchical) و PCA | 9 |
| **7** | `section07-deep-learning.js` | التعلّم العميق، الشبكات العصبية، CNN، RNN | 48 |
| **8** | `section08-nlp-fundamentals.js` | أساسيات NLP، regex، تنظيف النص (عملي) | 19 |
| **9** | `section09-nlp-tokenization.js` | Tokenization + labs (NLTK/SpaCy) | 32 |
| **14** | `section14-day01-nlp-intro.js` | **تحليل نصي** — POS، NER، مشروع | 14 |
| **10** | `section10-nlp-language-modeling.js` | نمذجة اللغة بـ N-grams والتقييم | 15 |
| **11** | `section11-nlp-contextual-rnn.js` | التضمينات السياقية و RNN | 10 |
| **12** | `section12-nlp-seq2seq.js` | Seq2Seq، BLEU/ROUGE، جسر Transformers | 12 |
| **13** | `section13-generative-ai.js` | GenAI: BERT، T5، GPT، Attention، LLMs | 20 |
| **15** | `section15-rag.js` | RAG — Retrieval-Augmented Generation | 12 |
| **16** | `section16-mlops.js` | MLOps — إنتاج ونشر النماذج | 12 |

### شريحة الخاتمة

- **Conclusion** — ملخص النقاط الرئيسية ودعوة للأسئلة

### Week 3 — مسار NLP المتسلسل (6 جلسات)

| جلسة | القسم | المحتوى |
|------|-------|---------|
| 1 | S8 | مقدمة NLP، regex، **labs تنظيف النص** |
| 2 | S9 | tokenization + stop words + stemming + **labs NLTK/SpaCy** |
| 3 | S14 | POS، dependency، NER، **مشروع Product Review** |
| 4 | S10 | n-grams، perplexity |
| 5 | S11 | contextual embeddings، RNN/LSTM |
| 6 | S12 | Seq2Seq، attention، BLEU/ROUGE، جسر Transformers |

**ترتيب العرض:** S8 → S9 → **S14** → S10 → S11 → S12 (مثل Week 1: نظري+عملي متداخل).

- أسبوع NLP كامل: `#week3-nlp`
- القفز لتحليل نصي (S14): `#day1-nlp-slides`

---

## أنواع الشرائح المدعومة

كل شريحة كائن JSON يدعم حقولاً مثل:

- `title` / `subtitle` — العنوان والعنوان الفرعي
- `body` — فقرة نصية
- `bullets` — نقاط
- `table` — جداول (عناوين + صفوف)
- `sections` — أقسام فرعية داخل الشريحة
- `columns` / `type: "three-columns"` — تخطيط ثلاثي الأعمدة
- `formula` — معادلات رياضية تُعرض بـ **KaTeX**
- `imageUrl` / `imageUrls` — صور توضيحية
- `note` — ملاحظة للمدرّب في أسفل الشريحة
- `type: "section-divider"` — فاصل بين الأقسام

---

## طريقة التشغيل

### المتطلبات

- **Node.js** 18 أو أحدث (يُفضّل 20)
- **npm**

### التشغيل المحلي (وضع التطوير)

```powershell
cd web-presentation
npm install
npm run dev
```

ثم افتح المتصفح على: **http://localhost:5173/**

### بناء نسخة الإنتاج

```powershell
npm run build
```

الملفات الجاهزة تُحفظ في مجلد `dist/`.

### معاينة النسخة المبنية

```powershell
npm run preview
```

---

## طريقة العرض (للمدرّب)

### التنقّل بين الشرائح

| الإجراء | الطريقة |
|---------|---------|
| الشريحة التالية | زر **التالي** أو سهم اليمين ← (في الواجهة العربية: سهم اليسار →) |
| الشريحة السابقة | زر **السابق** أو السهم المعاكس |
| الانتقال لشريحة محددة | انقر على رقم الشريحة في الأعلى (مثال: `12 / 330`) وأدخل الرقم |
| القفز السريع | النقاط (Dots) أسفل الشريحة |
| جدول الأقسام | زر **جدول الأقسام** — يعرض كل قسم مع رقم شريحته |

### اختصارات لوحة المفاتيح

- `→` / `←` — التنقّل (يُعكس الاتجاه عند اختيار الواجهة العربية)
- `Space` — الشريحة التالية (بعد إظهار كل النقاط)
- `F` — ملء الشاشة · `N` — ملاحظات المدرّب · `P` — وضع المقدّم · `Q` — اختبار القسم
- `Esc` — إغلاق النوافذ المنبثقة

### أزرار الشريط العلوي

| الزر | الوظيفة |
|------|---------|
| **تحليل نصي (S14)** | القفز للجلسة 3 — POS/NER/مشروع (~14 شريحة) |
| **رقم الشريحة** | الانتقال المباشر لشريحة |
| **الوضع: ليلي / نهاري** | تبديل الثيم (يُحفظ في المتصفح) |
| **جدول الأقسام** | فهرس الأقسام والانتقال السريع |
| **الإعدادات** | لغة واتجاه الواجهة + **مسار العرض** (كامل / أسبوع 1–4 / NLP مكثّف) |
| **نموذج المنهج** | نافذة فيها معلومات البرنامج الكاملة (المدة، الأهداف، المختبرات، المراجع) |
| **تحميل PDF** | طباعة / حفظ كل الشرائح كـ PDF عبر `Ctrl+P` |
| **ترجمة الشرائح** | ترجمة المحتوى عبر Google Translate (الصيغ الرياضية تُستثنى قدر الإمكان) |
| **مساعد AI** | شرح مبسّط / سؤال وجواب عبر Claude API (مفتاحك في الإعدادات) |
| **وضع المقدّم** | نافذة ثانية متزامنة مع ملاحظات ومؤقت |

### نصائح للعرض أمام المتدربين

1. ابدأ من **الشريحة الافتتاحية** ثم **خريطة المنهج** و**الخط الزمني** لإعطاء صورة عامة.
2. استخدم **جدول الأقسام** للقفز بين الموضوعات دون التمرير شريحة بشريحة.
3. فعّل **الوضع الليلي** في القاعات المظلمة.
4. **أسبوع NLP (Week 3):** S8→S9→S14→S10→S11→S12 — `#week3-nlp` (6 جلسات متتابعة).
5. **تعلم عميق (S7):** من **جدول الأقسام** → مراحل Phase 1–4 + روابط labs في [`code/15- Deep Learning/`](../code/15-%20Deep%20Learning/).
6. لجمهور عربي، فعّل **ترجمة الشرائح** — قد تحتاج إعادة اختيار اللغة بعد كل شريحة.
7. للمشاركة أو الأرشفة، استخدم **تحميل PDF** ثم «حفظ كـ PDF» من نافذة الطباعة.

---

## أي أقسام أتخطى؟ (دليل المدرب)

| الموقف | المسار المقترح |
|--------|----------------|
| معسكر 4 أسابيع كامل | S1–S16 (استخدم **مسار العرض الكامل** في الإعدادات) |
| أسبوع ML فقط | S1–S6 — `#week1-ml` |
| أسبوع DL فقط | S7 + labs — `#week2-dl` |
| أسبوع NLP كامل | S8→S9→S14→S10→S11→S12 — `#week3-nlp` |
| تحليل نصي فقط (S14) | `#day1-nlp-slides` |
| أسبوع GenAI | S13, S15, S16 — `#week4-genai` |
| Section 2 طويل (35 شريحة) | ركّز على OLS + R² + بناء النموذج؛ الباقي للمراجعة الذاتية |

**روابط hash للمسارات:** `#week1-ml` · `#week2-dl` · `#week3-nlp` · `#week4-genai` · `#day1-nlp-slides`

---

## هيكل المشروع

```
web-presentation/
├── index.html                 # نقطة الدخول
├── package.json               # التبعيات والأوامر
├── vite.config.ts             # إعداد Vite
├── src/
│   ├── App.tsx                # الواجهة الرئيسية والتنقّل
│   ├── main.tsx               # تشغيل React
│   ├── index.css              # التنسيق والثيمات
│   ├── components/
│   │   ├── MentorshipTemplate.tsx   # نموذج المنهج التدريبي
│   │   └── SectionOutlinePage.tsx   # صفحة جدول الأقسام
│   ├── data/
│   │   ├── presentationData.js      # تجميع كل الأقسام
│   │   └── slides/                  # ملفات الشرائح (16 قسماً)
│   └── lib/
│       ├── addPresentationStructure.ts  # إضافة المقدمة والفواصل والخاتمة
│       ├── slideMarkup.ts               # تحويل JSON إلى HTML
│       ├── renderMath.ts                # عرض KaTeX
│       ├── sectionNav.ts                # تنقّل الأقسام
│       ├── uiStrings.ts                 # نصوص الواجهة (عربي/إنجليزي)
│       ├── googleTranslate.ts           # تكامل Google Translate
│       └── day01Anchor.ts               # مرساة قسم اليوم الأول
└── dist/                      # مخرجات البناء (بعد npm run build)
```

---

## النشر على Cloudflare Workers / Pages

ملفان في جذر المستودع (لا يمكن دمجهما في ملف واحد — `assets` يُبطل إعداد Pages):

| الملف | المشروع | الغرض |
|-------|---------|--------|
| [`wrangler.jsonc`](../wrangler.jsonc) | **web-presentation** (Pages) | `pages_build_output_dir` فقط |
| [`wrangler.worker.jsonc`](../wrangler.worker.jsonc) | **ai** (Workers) | `assets.directory` + `build.command` |

على Cloudflare يُبنى العرض بـ `base: /` (على GitHub Pages يبقى `/AI-ML/web-presentation/`).

### Workers → مشروع **ai** → Settings → Builds

| الحقل | القيمة |
|-------|--------|
| Root directory | `/` |
| **Build command** | `npm run build:cloudflare` |
| **Deploy command** | `npm run deploy:workers` |

بديل: `npm run deploy:cloudflare` (بناء + نشر). **لا تستخدم** `npx wrangler deploy` وحده — يقرأ `wrangler.jsonc` الخاص بـ Pages وليس Worker.

### Cloudflare Pages → مشروع **web-presentation**

يقرأ [`wrangler.jsonc`](../wrangler.jsonc) لمجلد الإخراج. **يجب** ضبط أمر البناء في اللوحة (لا يُقرأ من Wrangler):

| الحقل | القيمة |
|-------|--------|
| Root directory | `/` |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | *(اتركه فارغاً — يُقرأ من `wrangler.toml`)* |

ملفات PDF في `docs/archive/` **لا تُنشر** — النشر من `web-presentation/dist` فقط.

محلياً:

```powershell
cd ..
npm run build:cloudflare
npm run deploy:workers
```

## النشر على GitHub Pages

عند الدمج في فرع `main` مع تغييرات داخل `web-presentation/`، يعمل workflow تلقائي (`.github/workflows/deploy-web-presentation.yml`) يبني المشروع وينشره على GitHub Pages.

**الرابط المباشر:** https://iksasa15.github.io/AI-ML/web-presentation/

**إعداد مرة واحدة:** في إعدادات المستودع → **Pages** → اختر **Source: GitHub Actions**.

البناء يستخدم `base: /AI-ML/web-presentation/` في الإنتاج حتى تعمل الروابط والأصول على Pages.

## ما قبل النشر

```powershell
cd web-presentation
npm run prepublish:check   # polish + audit:content + audit:math + build
```

| الأمر | الغرض |
|-------|--------|
| `npm run polish:content` | إثراء الشرائح الضعيفة وملاحظات المقدم |
| `npm run audit:content` | تقرير `CONTENT_AUDIT.md` (تصنيف 🟢🟡🔴 + ملاحظات) |
| `npm run audit:math` | فحص حقول LaTeX في بيانات الشرائح |
| `npm run audit:images` | قائمة صور Wikimedia الخارجية (PDF يحتاج شبكة) |

## قائمة الاختبار

راجع `TESTING_CHECKLIST.md` قبل الجلسة الحية — تنقّل، RTL، اختبارات، مقدّم، طباعة، PWA، ومتصفحات Chrome/Safari/Firefox.

---

## تعديل المحتوى

1. افتح الملف المناسب في `src/data/slides/` (مثلاً `section01-foundations.js`).
2. أضف أو عدّل كائن شريحة داخل مصفوفة `slides`.
3. احفظ الملف — في وضع `npm run dev` يُحدَّث العرض تلقائياً.

لإضافة قسم جديد:

1. أنشئ ملفاً جديداً في `src/data/slides/`.
2. صدِّر مصفوفة `slides`.
3. استورده في `src/data/presentationData.js`.
4. أضف فاصل قسم في `src/lib/addPresentationStructure.ts` إن لزم.

---

## التقنيات المستخدمة

- **React 19** — واجهة المستخدم
- **Vite 6** — بناء وتشغيل محلي
- **TypeScript** — أجزاء من الكود
- **KaTeX** — عرض المعادلات الرياضية
- **Google Translate Widget** — ترجمة المحتوى اختيارياً
- **Claude API** (اختياري) — مساعد AI للمتدربين
- **vite-plugin-pwa** — دعم offline للعرض

---

## استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| `'vite' is not recognized` | نفّذ `npm install` داخل مجلد `web-presentation` |
| المنفذ 5173 مشغول | أغلق العملية الأخرى أو شغّل `npx vite --port 5174` |
| الصور لا تظهر | تحقق من الاتصال بالإنترنت (بعض الصور من روابط خارجية) |
| الترجمة لا تعمل | تأكد من الاتصال بالإنترنت؛ أعد اختيار اللغة بعد تغيير الشريحة |

---

## ملخص سريع

```powershell
cd web-presentation
npm install
npm run dev
# افتح http://localhost:5173/
# لليوم الأول فقط: http://localhost:5173/#day1-nlp-slides
```

عرض تفاعلي كامل لمنهج **AI & ML Bootcamp** — من معالجة البيانات إلى GenAI — جاهز للتقديم في القاعة أو المشاركة كـ PDF.
