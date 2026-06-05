# خطة تطوير عرض AI & ML Bootcamp — نسخة شاملة

> **الجمهور:** مزيج من طلاب جامعيين ومهندسين محترفين  
> **المدة:** 4 أسابيع — 20 جلسة × ساعتين  
> **الـ vibe التصميمي:** Academic / Clean — أبيض + ألوان محايدة راقية  
> **الأولوية العليا:** التصميم أولاً، ثم التفاعلات، ثم الأداء

---

## رؤية التصوير الكاملة (The Vision)

العرض الحالي يعمل لكن يبدو "مجرد تطبيق React" — الهدف التحويل إلى **تجربة تعليمية احترافية** تليق بدكتور متخصص يقدم أمام جمهور مختلط.

### المنهج التصميمي الجديد: "Academic Precision"
- **الخط الرئيسي:** `Playfair Display` للعناوين (وقار أكاديمي) + `Source Serif 4` للمحتوى  
- **الألوان:** Warm White `#FAFAF8` + Slate `#1E293B` + Accent Blue `#2563EB` + Gold `#D4A853` للتمييز
- **الشبكة:** 8pt grid system — كل شيء محاذي ومدروس  
- **التباعد:** Generous whitespace — المحتوى يتنفس ولا يُخنق

---

## الهيكل المقترح للمحتوى (إعادة ترتيب الأقسام)

### المشكلة الحالية
330 شريحة بدون تدرّج واضح في الصعوبة — الطالب المبتدئ يضيع والمتخصص يمل.

### الهيكل الجديد المقترح

```
Week 1 — الأساسيات (للجميع)
├── Day 1:  ما هو ML؟ — المشكلة، البيانات، النموذج (Sections 1)
├── Day 2:  الانحدار — OLS، R²، Overfitting (Section 2)
├── Day 3:  التصنيف — Logistic، K-NN، Evaluation (Sections 3-4)
├── Day 4:  SVM + Clustering + PCA (Sections 5-6)
└── Day 5:  المراجعة + مشروع تطبيقي مصغّر

Week 2 — التعلم العميق
├── Day 6:  الشبكات العصبية — من صفر (Section 7 Part 1)
├── Day 7:  CNN + Computer Vision (Section 7 Part 2)
├── Day 8:  RNN + Sequence Models (Section 7 Part 3)
├── Day 9:  Regularization + Optimization
└── Day 10: مشروع: Image Classifier

Week 3 — NLP
├── Day 11: أساسيات NLP + Preprocessing (Sections 8-9)
├── Day 12: Language Models + N-grams (Section 10)
├── Day 13: Word Embeddings + RNN for NLP (Section 11)
├── Day 14: Seq2Seq + Attention (Section 12)
└── Day 15: مشروع: Text Classifier

Week 4 — Generative AI (المستوى المتقدم)
├── Day 16: Transformers + BERT + T5 (Section 13 Part 1)
├── Day 17: GPT + LLMs + Prompting (Section 13 Part 2)
├── Day 18: RAG + Agents (إضافة جديدة مقترحة)
├── Day 19: MLOps + Deployment (إضافة جديدة مقترحة)
└── Day 20: مشاريع نهائية + Closing Ceremony
```

---

## خطة التطوير اليومية (14 يوماً)

---

### 🎨 المرحلة 1: التصميم والبنية التحتية (اليوم 1-3)

---

#### اليوم 1 — Design System & Typography

**الهدف:** إنشاء نظام تصميم كامل يُطبَّق على كل مكوّن

**المهام:**

1. **إنشاء `src/styles/design-tokens.css`**
```css
:root {
  /* Colors */
  --color-bg:          #FAFAF8;
  --color-bg-subtle:   #F1F0EE;
  --color-surface:     #FFFFFF;
  --color-border:      #E2E0DC;
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;
  --color-accent:      #2563EB;
  --color-accent-light:#DBEAFE;
  --color-gold:        #D4A853;
  --color-success:     #059669;
  --color-warning:     #D97706;
  --color-danger:      #DC2626;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Source Serif 4', 'Georgia', serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
  --font-ui:      'DM Sans', system-ui, sans-serif;

  /* Scale */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.25rem;
  --text-xl:   1.5rem;
  --text-2xl:  2rem;
  --text-3xl:  2.75rem;
  --text-4xl:  3.5rem;

  /* Spacing (8pt grid) */
  --space-1:  0.5rem;
  --space-2:  1rem;
  --space-3:  1.5rem;
  --space-4:  2rem;
  --space-6:  3rem;
  --space-8:  4rem;
  --space-12: 6rem;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

2. **تحديث `index.html`** — استيراد خطوط Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

3. **إعادة كتابة `index.css` بالكامل** بناءً على التوكنز الجديدة

**الناتج:** كل عنصر في التطبيق يصبح أجمل تلقائياً

---

#### اليوم 2 — Slide Layout System (إعادة تصميم الشريحة)

**الهدف:** تحويل كل نوع شريحة إلى تصميم احترافي

**المهام:**

1. **إنشاء `src/components/slides/SlideFrame.tsx`** — الإطار الموحّد لكل شريحة:
   - Header bar بسيط: رقم القسم + اسمه على اليسار، رقم الشريحة على اليمين
   - Content area مع max-width `860px` وتوسيط أوتوماتيكي
   - Footer: شريط تقدم رفيع (Progress bar) في الأسفل

2. **إعادة تصميم أنواع الشرائح في `slideMarkup.ts`:**

| النوع | التصميم الجديد |
|-------|---------------|
| `title` | عنوان Playfair Display كبير + خط ذهبي تزييني تحته |
| `bullets` | نقاط بدوائر صغيرة أنيقة، تظهر بـ fade-in |
| `table` | جدول بـ alternating rows + header مميّز |
| `formula` | بكسل KaTeX على خلفية subtle gray مع padding |
| `section-divider` | شريحة كاملة بلون داكن مع رقم القسم كبير |
| `three-columns` | 3 أعمدة بفاصل رفيع بينها |
| `code` | Code block بـ JetBrains Mono + syntax highlight |

3. **تصميم `SectionDivider` جديد:**
```
╔══════════════════════════════╗
║  WEEK 2 · SESSION 3          ║
║                              ║
║  Deep Learning               ║
║  Neural Networks             ║
║                              ║
║  ▸ 56 slides · ~90 min       ║
╚══════════════════════════════╝
```

**الناتج:** كل شريحة تبدو وكأنها صُمّمت يدوياً

---

#### اليوم 3 — Navigation & Progress System

**الهدف:** واجهة تنقّل احترافية تخدم المدرّب والمتدرب

**المهام:**

1. **Top Navigation Bar (إعادة تصميم كاملة):**
```
[◀ السابق]  [Week 2 · Deep Learning]  [12 / 330]  [التالي ▶]
           [━━━━━━━━░░░░░░░░░░░░░]  37%
```

2. **Section Navigator (Sidebar جديد):**
   - زر `☰` يفتح sidebar من اليمين
   - كل قسم يظهر مع: الاسم + عدد الشرائح + نسبة الإكمال
   - القسم الحالي مُظلّل

3. **Progress Tracker للمتدرب** (ميزة جديدة):
   - يُحفظ في `localStorage`
   - يظهر كـ circular progress في الزاوية
   - يمكن تصفير عند بداية كل جلسة

4. **Keyboard shortcuts محسّنة:**
```
→ / ← : التنقّل
Space  : التالي
F      : Fullscreen
N      : Speaker Notes
Q      : Quiz للشريحة الحالية
Esc    : إغلاق
```

---

### ⚡ المرحلة 2: التفاعلات والمحتوى (اليوم 4-7)

---

#### اليوم 4 — Animations System

**الهدف:** animations هادفة تشرح المفاهيم لا مجرد زينة

**المهام:**

1. **Slide Transitions** — 3 أنواع حسب نوع الانتقال:
   - بين شرائح عادية: `slide` خفيف (300ms)
   - بين أقسام مختلفة: `fade + scale` (500ms)
   - Section divider: `full-screen wipe` (600ms)

2. **Animated Concept Cards** — أولوية عالية:

   **Neural Network Visualizer** (للقسم 7):
   - شبكة تفاعلية SVG: Input → Hidden → Output
   - الأوزان تتغير عند الضغط
   - Forward pass يُظهر تدفق البيانات بلون

   **Gradient Descent Animator** (للقسم 2):
   - منحنى خطأ متحرك
   - نقطة تنزل تدريجياً نحو الـ minimum
   - زر Play/Pause

   **Attention Heatmap** (للقسم 13):
   - matrix تفاعلية تُظهر كيف يرى Transformer الجملة

3. **Bullet Reveal Animation:**
   - النقاط تظهر واحدة واحدة عند الضغط (→) بدل ظهورها دفعة واحدة
   - التحكم: عدد النقاط المكشوفة يُحفظ مع الشريحة

---

#### اليوم 5 — Live Code Snippets

**الهدف:** code قابل للتشغيل مباشرة داخل الشريحة

**المهام:**

1. **إنشاء `CodeRunner` component:**
   - Editor صغير (Monaco Editor أو CodeMirror)
   - زر ▶ Run — يُشغّل Python عبر **Pyodide** (WebAssembly)
   - Output يظهر تحت الكود
   - زر Reset يرجع للكود الأصلي

2. **أمثلة Code مُعدّة مسبقاً لكل قسم:**
```python
# القسم 1 — Linear Regression
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])
y = np.array([2, 4, 5, 4, 5])

model = LinearRegression().fit(X, y)
print(f"R² = {model.score(X, y):.3f}")
```

3. **Code Snippets Library** في ملف `src/data/codeExamples.js` — كود لكل قسم

4. **تحذير للمدرّب:** Pyodide يحتاج ~10MB تحميل أوّل مرة — يُنبّه المستخدم

---

#### اليوم 6 — Quiz System

**الهدف:** تقييم سريع بعد كل قسم يُشغّل الجمهور

**المهام:**

1. **إنشاء `QuizModal` component:**
   - يفتح تلقائياً عند الوصول لآخر شريحة في القسم
   - أو يدوياً بـ `Q`
   - 3-5 أسئلة MCQ لكل قسم
   - تصحيح فوري مع شرح

2. **ملف الأسئلة `src/data/quizData.js`** — 5 أسئلة × 14 قسم = 70 سؤال

   مثال على سؤال:
```javascript
{
  sectionId: 2,
  question: "What does R² = 0.95 mean?",
  options: [
    "The model is 95% accurate",
    "95% of variance in y is explained by X",  // ✓
    "Error rate is 5%",
    "We need more data"
  ],
  correct: 1,
  explanation: "R² measures explained variance, not accuracy. 0.95 means the model captures 95% of the data's variability."
}
```

3. **نتائج Quiz تُحفظ** في localStorage وتظهر في Progress Tracker

---

#### اليوم 7 — Speaker Notes Mode

**الهدف:** واجهة مدرّب منفصلة تُشبه Presenter View في PowerPoint

**المهام:**

1. **Presenter Mode** يُفتح بـ `window.open()` في نافذة ثانية:
```
┌─────────────────────────────────────────┐
│ CURRENT SLIDE          │  NEXT SLIDE    │
│                        │                │
│  [معاينة الشريحة       │  [شريحة        │
│   الحالية]             │   قادمة]       │
│                        │                │
├────────────────────────┴────────────────┤
│ 📝 Speaker Notes                        │
│ "اشرح هنا الفرق بين bias وvariance..."  │
├─────────────────────────────────────────┤
│ ⏱️  00:23:45  │  Slide 47/330  │ Week 2  │
└─────────────────────────────────────────┘
```

2. **Timer** يُعدّ من بداية الجلسة — قابل للإيقاف والتصفير

3. **إضافة `speakerNote` field** لكل شريحة في ملفات الـ sections

4. **Notes Editor** — يمكن تعديل الملاحظات مباشرة أثناء العرض وتُحفظ محلياً

---

### 🔧 المرحلة 3: الأداء والجودة (اليوم 8-10)

---

#### اليوم 8 — Performance & Lazy Loading

**الهدف:** الانتقال بين 330 شريحة يكون فوري

**المهام:**

1. **Virtual Rendering** — عرض 5 شرائح فقط في الـ DOM (الحالية + 2 قبل + 2 بعد)
2. **Code Splitting** — كل قسم يُحمّل lazy عند الحاجة:
```typescript
const section07 = await import('./data/slides/section07-deep-learning');
```
3. **تحسين KaTeX** — pre-render المعادلات عند التحميل لا عند الظهور
4. **Image Lazy Loading** — الصور تُحمّل عند الاقتراب منها
5. **Service Worker** للـ offline support (اختياري لكن مهم للقاعة)

**الهدف:** الانتقال بين الشرائح < 16ms (60fps)

---

#### اليوم 9 — Content Improvements

**الهدف:** تحسين الشرائح الضعيفة وتوحيد المستوى

**المهام:**

1. **تدقيق كل قسم وتصنيف الشرائح:**
   - 🔴 تحتاج إعادة كتابة (محتوى ضعيف أو مكرر)
   - 🟡 تحتاج تحسين (تصميم فقط)
   - 🟢 جيدة (لا تحتاج تعديل)

2. **إضافة "Big Picture" slides** في بداية كل قسم:
   - شريحة واحدة تُظهر: "أين نحن في المنهج؟"
   - Map كاملة للبوتكامب مع تظليل القسم الحالي

3. **إضافة "Takeaway" slide** في نهاية كل قسم:
   - 3 نقاط أساسية يجب حفظها
   - سؤال للتفكير

4. **إضافة القسم 15 و16 الجديدين** (RAG + MLOps)

---

#### اليوم 10 — Accessibility & RTL Polish

**الهدف:** عرض يعمل ممتاز مع الجمهور العربي والإنجليزي

**المهام:**

1. **إصلاح RTL/LTR** — حالياً الانتقال غير متّسق:
   - `→` في واجهة عربية يجب أن يذهب للخلف (إصلاح bug موجود)
   - الجداول تنعكس صحيح في RTL

2. **Font Fallbacks** للعربية:
```css
--font-body-ar: 'Cairo', 'Noto Kufi Arabic', 'Amiri', serif;
```

3. **Keyboard Accessibility** — كل عنصر يعمل بلوحة المفاتيح

4. **Print/PDF تحسين** — كل شريحة تطبع في صفحة مستقلة بشكل صحيح

---

### 🚀 المرحلة 4: الميزات المتقدمة (اليوم 11-14)

---

#### اليوم 11 — Course Agenda & Timeline Redesign

**الهدف:** تحويل شرائح المقدمة إلى تحفة بصرية

**المهام:**

1. **Interactive Course Map** — بدل قائمة نصية:
   - 4 أعمدة (Week 1-4) كبطاقات
   - كل بطاقة: اسم الأسبوع + عدد الأيام + الموضوع الرئيسي
   - لون مختلف لكل أسبوع (تدرّج من أزرق فاتح → أزرق داكن)

2. **Timeline Visualization:**
```
W1          W2          W3          W4
├──────────┼──────────┼──────────┼──────────┤
│ ML Core  │ Deep     │ NLP      │ GenAI   │
│ 5 days   │ Learning │ 5 days   │ 5 days  │
│          │ 5 days   │          │         │
```

3. **Animated intro** للشريحة الأولى — عنوان يظهر حرفاً حرفاً

---

#### اليوم 12 — Section Dividers & Visual Identity

**الهدف:** كل قسم له هوية بصرية خاصة

**Color Coding للأقسام:**

| الأقسام | اللون | المعنى |
|---------|-------|--------|
| 1-2 (Foundations) | Teal `#0D9488` | الأساس |
| 3-6 (Classical ML) | Blue `#2563EB` | الكلاسيكي |
| 7 (Deep Learning) | Purple `#7C3AED` | العمق |
| 8-12 (NLP) | Orange `#EA580C` | اللغة |
| 13+ (GenAI) | Gold `#D97706` | المستقبل |

**Section Divider Redesign:**
- خلفية بلون القسم
- رقم القسم كـ Large decorative number (Playfair)
- أيقونة SVG معبّرة عن الموضوع
- قائمة الـ key topics

---

#### اليوم 13 — AI-Powered Features

**الهدف:** استخدام Claude API لتحسين تجربة المتدرب

**المهام (اختياري — advanced):**

1. **Slide Explainer** — زر "اشرح هذه الشريحة بأسلوب أبسط":
   - يبعث محتوى الشريحة لـ Claude API
   - يرجع شرح بلغة أسهل
   - مناسب للمبتدئين في الجمهور المختلط

2. **Q&A Mode** — المتدرب يكتب سؤالاً والـ AI يجيب في السياق

3. **Code Generator** — "أعطني مثال كود آخر على هذا المفهوم"

---

#### اليوم 14 — Final Polish & Testing

**الهدف:** اختبار شامل + إصلاح الأخطاء + GitHub Pages

**المهام:**

1. **Testing Checklist:**
   - [ ] التنقّل يعمل بالكيبورد
   - [ ] RTL/LTR يتبدّل صح
   - [ ] Quiz يُحفظ ويُقرأ من localStorage
   - [ ] Speaker Notes تُزامن مع الشاشة الرئيسية
   - [ ] Print/PDF يطبع صح
   - [ ] الأداء: < 16ms بين الشرائح
   - [ ] الأنيميشن لا تسبب jank
   - [ ] Pyodide يعمل offline

2. **Browser Testing:**
   - Chrome ✓ (primary)
   - Safari ✓ (مهم للمُدرّس على Mac)
   - Firefox ✓

3. **GitHub Pages Deploy + URL مختصر**

4. **README update** — دليل جديد للمدرّب

---

## ملخص الأولويات

```
Priority 1 (Must): Days 1-3  → التصميم والتنقّل
Priority 2 (Should): Days 4-7 → التفاعلات الأربع
Priority 3 (Nice): Days 8-10  → الأداء والجودة
Priority 4 (Bonus): Days 11-14 → المتقدم
```

---

## Stack التقنيات المضافة

| الأداة | الاستخدام | الحجم |
|--------|-----------|-------|
| Pyodide | تشغيل Python في المتصفح | ~10MB |
| Monaco Editor | Code editor داخل الشريحة | ~2MB |
| Framer Motion | Animations محكومة | ~50KB |
| KaTeX (موجود) | المعادلات — تحسين الأداء | موجود |
| Google Fonts | Playfair + DM Sans + JetBrains | ~200KB |

---

## ملاحظة للمدرّب

العرض الحالي جيد في المحتوى — التحدي الأساسي مرئي وليس أكاديمياً. مع هذا التطوير، العرض سيكون:
- **أجمل** مما يُعطي المتدرب انطباعاً باحترافية المادة
- **أسهل تصفّحاً** للمدرّب أمام الجمهور
- **أكثر تفاعلاً** مما يرفع انتباه المتدربين خصوصاً في الساعة الثانية

ابدأ من اليوم 1 (Design System) — التأثير سيكون فورياً وعلى كل الشرائح تلقائياً.
