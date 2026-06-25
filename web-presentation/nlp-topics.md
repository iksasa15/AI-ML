# مواضيع NLP — الأسبوع الثالث

**المصدر:** الأقسام S8–S13 في معسكر AI & Machine Learning  
**المدة المقترحة:** 5 أيام (6 جلسات)  
**العرض المباشر:** [iksasa15.github.io/AI-ML/web-presentation/#week3-nlp](https://iksasa15.github.io/AI-ML/web-presentation/#week3-nlp)

---

## نظرة عامة على الجلسات الست

| الجلسة | القسم | السؤال الذي تجيب عنه | Lab |
|---------|-------|----------------------|-----|
| **1** | S8 | كيف نُنظّف النص الخام قبل أي نموذج؟ | [`1- Text Cleaning`](../code/16-%20NLP/1-%20Text%20Cleaning/) |
| **2** | S9 | كيف نقسّم النص إلى tokens ونُطبّع الكلمات؟ | [`2- Tokenization`](../code/16-%20NLP/2-%20Tokenization/) |
| **3** | S10 | كيف نستخرج المعنى (POS/NER) من النص؟ | [`3- Text Analysis`](../code/16-%20NLP/3-%20Text%20Analysis/) |
| **4** | S11 | كيف نُمثّل اللغة كاحتمالات تسلسلية؟ | [`4- Language Modeling`](../code/16-%20NLP/4-%20Language%20Modeling/) |
| **5** | S12 | كيف نُمثّل الكلمات سياقياً ونُعالج التسلسلات؟ | [`5- RNN Text Classification`](../code/15-%20Deep%20Learning/5-%20RNN%20Text%20Classification/) |
| **6** | S13 | كيف نربط Seq2Seq والانتباه بـ Transformers؟ | شرائح S13 (نظري) + جسر S14 |

> **نقاط توقف مقترحة:** بعد كل lab، راجع مخرجات الخلية الأخيرة مع المتدربين (~5 دقائق).

---

## الجلسة 1 — تنظيف النص (S8)

**الفكرة:** النص من الويب فوضوي — HTML، روابط، mentions، emoji — يجب تنظيفه قبل التوكننة.

**نقاط رئيسية:**
- Regex لأنماط البريد والروابط والهاشتاق
- `html.unescape` لفك كيانات HTML
- Lowercase ليس دائماً صحيحاً (مهم لـ NER: Apple ≠ apple)

**Lab:** [`NLP_Text_Cleaning.ipynb`](../code/16-%20NLP/1-%20Text%20Cleaning/NLP_Text_Cleaning.ipynb)

```bash
# لا تبعيات إضافية — مكتبة Python القياسية فقط
```

---

## الجلسة 2 — Tokenization (S9)

**الفكرة:** تقسيم النص إلى وحدات (كلمات / جمل / subwords) حسب المهمة والنموذج.

**نقاط رئيسية:**
- Word vs sentence vs subword tokenization
- Stop words: مفيدة لـ TF-IDF، ضارة لـ LLMs وترجمة
- Stemming (سريع، تقريبي) vs Lemmatization (دقيق، يحتاج قاموس/POS)
- Tokenizer يجب أن يطابق النموذج المُدرَّب (BERT ≠ GPT)

**Lab:** [`NLP_Tokenization.ipynb`](../code/16-%20NLP/2-%20Tokenization/NLP_Tokenization.ipynb)

```bash
pip install nltk spacy transformers
python -m spacy download en_core_web_sm
```

---

## الجلسة 3 — تحليل نصي (S10)

**الفكرة:** POS و dependency و NER يحوّلون النص إلى بيانات منظمة قابلة للتطبيق.

**نقاط رئيسية:**
- POS: دور كل كلمة نحوياً (NOUN, VERB, ADJ…)
- NER: أشخاص، منظمات، أماكن، تواريخ، مبالغ
- مشروع المراجعات: clean → tokenize → tag → استخراج جوانب (aspects)

**Lab:** [`NLP_Text_Analysis.ipynb`](../code/16-%20NLP/3-%20Text%20Analysis/NLP_Text_Analysis.ipynb) + [`product_reviews.csv`](../code/16-%20NLP/3-%20Text%20Analysis/product_reviews.csv)

---

## الجلسة 4 — نمذجة اللغة (S11)

**الفكرة:** اللغة = توزيع احتمالي على تسلسلات كلمات؛ N-grams نموذج بسيط وقابل للتفسير.

**نقاط رئيسية:**
- Unigram / bigram / trigram
- Smoothing (Laplace) لتجنب احتمال صفر
- Perplexity: كلما انخفضت، النموذج «أقل مفاجأة» للنص
- N-grams تفشل في التبعيات بعيدة المدى → neural LMs

**Lab:** [`NLP_Language_Modeling.ipynb`](../code/16-%20NLP/4-%20Language%20Modeling/NLP_Language_Modeling.ipynb)

---

## الجلسة 5 — Embeddings و RNN (S12)

**الفكرة:** تمثيلات سياقية + شبكات تسلسلية للنص.

**نقاط رئيسية:**
- Static embeddings (Word2Vec) vs contextual (BERT)
- RNN / LSTM / GRU لحفظ السياق الزمني
- Lab الأسبوع الثاني: تصنيف مشاعر بالنص

**Lab:** [`RNN_Text_Classification.ipynb`](../code/15-%20Deep%20Learning/5-%20RNN%20Text%20Classification/RNN_Text_Classification.ipynb)

```bash
pip install tensorflow pandas scikit-learn
```

---

## الجلسة 6 — Seq2Seq و Attention (S13)

**الفكرة:** Encoder-decoder للترجمة والتوليد؛ Attention يحلّ عنق الزجاجة.

**نقاط رئيسية:**
- Encoder يضغط المصدر؛ Decoder يولّد هدفاً كلمة بكلمة
- Greedy vs beam search
- BLEU/ROUGE مقاييس تقريبية — الحكم البشري مهم
- جسر إلى Transformers (الأسبوع 4 — GenAI)

**Lab:** نظري في الشرائح — راجع [`section12-nlp-seq2seq.js`](src/data/slides/section12-nlp-seq2seq.js)

---

## ملحق

### جدول ربط Labs (code/16- NLP)

| Lab | مجلد code | القسم | الجلسة |
|-----|-----------|-------|--------|
| 1 — Text Cleaning | [`1- Text Cleaning`](../code/16-%20NLP/1-%20Text%20Cleaning/) | S8 | 1 |
| 2 — Tokenization | [`2- Tokenization`](../code/16-%20NLP/2-%20Tokenization/) | S9 | 2 |
| 3 — Text Analysis | [`3- Text Analysis`](../code/16-%20NLP/3-%20Text%20Analysis/) | S10 | 3 |
| 4 — Language Modeling | [`4- Language Modeling`](../code/16-%20NLP/4-%20Language%20Modeling/) | S11 | 4 |
| 5 — RNN Text (مرجع) | [`15- Deep Learning/5`](../code/15-%20Deep%20Learning/5-%20RNN%20Text%20Classification/) | S12 | 5 |

### تثبيت سريع (بيئة واحدة لكل الأسبوع)

```bash
pip install nltk spacy pandas transformers tensorflow scikit-learn
python -m spacy download en_core_web_sm
python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab'); nltk.download('stopwords')"
```

### مراجع إضافية
- **دليل NLP يوم 1:** [`Day01_NLP_Introduction_EN.md`](../Day01_NLP_Introduction_EN.md)
- **شرائح الأسبوع 3:** `#week3-nlp` في العرض التقديمي
- **دليل التعلم العميق (الأسبوع 2):** [`deep-learning-topics.md`](deep-learning-topics.md)
