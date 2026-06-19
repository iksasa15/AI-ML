# مواضيع التعلم العميق

**المصدر:** القسم 7 في معسكر AI & Machine Learning — ملف الشرائح [`src/data/slides/section07-deep-learning.js`](src/data/slides/section07-deep-learning.js)  
**المدة المقترحة:** ~3 ساعات (48 موضوعاً / شريحة)  
**العرض المباشر:** [iksasa15.github.io/AI-ML/web-presentation/](https://iksasa15.github.io/AI-ML/web-presentation/)

---

## نظرة عامة على المراحل الأربع

| المرحلة | السؤال الذي تجيب عنه | الوقت التقريبي |
|---------|----------------------|----------------|
| **1** — الأساسيات والنواة العصبية | لماذا العمق؟ ماذا يحسب العصبون؟ كيف يعمل الانتشار الأمامي والخلفي؟ | ~45 دقيقة |
| **2** — التحسين واستراتيجية التدريب | كيف نُدرّب بثبات؟ كيف نُعمّم ونتجنب overfitting؟ | ~40 دقيقة |
| **3** — معماريات متخصصة | أي معمارية تناسب الصور مقابل التسلسلات؟ | ~40 دقيقة |
| **4** — النماذج التوليدية والنشر | كيف نُولّد بيانات؟ كيف نُنشر على الأجهزة الحقيقية؟ | ~40 دقيقة |

> **نقاط توقف مقترحة:** توقّف عند نهاية كل مرحلة لمراجعة مختصرة أو تمرين عملي (lab checkpoint).

---

## المرحلة 1 — الأساسيات والنواة العصبية

### 1. مقدمة التعلم العميق
**الفكرة:** القسم مقسّم إلى أربع مراحل متتابعة: أساسيات → تحسين → معماريات → نشر وتوليد.  
**نقاط رئيسية:**
- كل مرحلة تجيب عن سؤال مختلف في رحلة بناء نموذج عميق
- المرحلة 1 تركز على «لماذا العمق» وآليات العصبون الواحد قبل التوسع
- المدة الكلية ~3 ساعات مع فواصل مقصودة بين المراحل

### 2. المرحلة 1: الأساسيات والنواة العصبية
**الفكرة:** بناء الحدس قبل الحجم — فهم ما يحسبه العصبون ولماذا تكديس الطبقات يُنتج ميزات هرمية.  
**نقاط رئيسية:**
- البيرسبترون، دوال التفعيل، MLP، الانتشار الأمامي، دوال الخسارة
- نقطة خروج: شرح z = w·x + b ولماذا نحتاج عدم خطية بين الطبقات
- خريطة: Perceptron & MLP → Forward pass → Loss & gradients

### 3. ما هو التعلم العميق؟
**الفكرة:** التعلم العميق يتعلّم تحويلاً معاملاً (parameterized mapping) من المدخلات إلى المخرجات عبر طبقات غير خطية متعددة.  
**نقاط رئيسية:**
- «عميق» = عدة تحويلات غير خطية متتالية → ميزات هرمية وليس قاعدة خطية واحدة
- التدريب = اختيار دالة خسارة ثم تعديل الأوزان بالتدرجات لتقليل الخطأ على البيانات
- ثلاث مكوّنات دائماً: **المعمارية**، **الخسارة** (MSE، cross-entropy…)، **المُحسِّن + البيانات**
- يختلف عن pipelines الميزات اليدوية: الشبكة تتعلّم تمثيلات مُخصّصة للمهمة

### 4. تاريخ مختصر: عصور شكّلت التعلم العميق
**الفكرة:** أفكار كثيرة قديمة — الحجم (بيانات + حوسبة) وجعل التدريب مستقراً هما ما غيّرا اللعبة.  
**نقاط رئيسية:**
- 1950s–60s: البيرسبترون ثم حدود XOR للطبقة الواحدة
- 1980s–90s: Backprop و MLPs على بيانات صغيرة
- 2012+: AlexNet و ImageNet — CNNs عميقة على GPUs
- 2017+: Transformers؛ 2020+: نماذج توليدية كبيرة و multimodal pre-training

### 5. لماذا يعجز ML الكلاسيكي: لعنة الأبعاد
**الفكرة:** في فضاءات عالية الأبعاد، البيانات تبدو متفرقة والمسافات تفقد معناها — ML التقليدي يتأثر بشدة.  
**نقاط رئيسية:**
- حجم الفضاء ينمو أسياً مع الأبعاد → عينات ثابتة تغطي جزءاً أصغر
- k-NN والطرق المحلية تحتاج جيراناً في كل اتجاه — غير متوفر بسهولة في أبعاد عالية
- تركيز المسافات: المسافات بين النقاط تتشابه → الاستدلال بالمسافة يضعف
- DL يستغل البنية (محلية، تركيبية) بدلاً من استكشاف كل اتجاه في ℝᵈ

### 6. لعنة الأبعاد: لمحة كمية
**الفكرة:** إضافة ميزات خام دون بيانات كافية ليس مجانياً — حجم كرة في d أبعاد ∝ r^d.  
**نقاط رئيسية:**
- للحفاظ على نفس كثافة العينات مع نمو الأبعاد، حجم العينة المطلوب قد ينمو أسياً
- PCA أو تمثيلات مضغوطة (deep nets) ضرورية عملياً
- DL لا يلغي اللعنة — يستغل smoothness و locality و compositionality

### 7. الذكاء الاصطناعي، تعلم الآلة، والتعلم العميق
**الفكرة:** علاقات احتواء — DL ⊂ ML ⊂ AI؛ المصطلحات ليست متبادلة.  
**نقاط رئيسية:**
- **AI:** مجال واسع (قواعد، بحث، تخطيط، تعلم…)
- **ML:** فرع يتحسّن من البيانات
- **DL:** شبكات عصبية عميقة — CNN، RNN، Transformers، GANs، VAEs…
- «استخدمنا AI» غامض؛ «CNN مع supervised DL» دقيق

### 8. متى يلمع التعلم العميق — ومتى نتجنبه
**الفكرة:** مطابقة الأداة مع البيانات والمخاطر والميزانية.  
**نقاط رئيسية:**
- **قوي عند:** بيانات كبيرة، مدخلات خام عالية الأبعاد (صور، نص، صوت)، تركيبية end-to-end
- **فكّر مرتين عند:** جداول tabular صغيرة، تفسيرية صارمة، latency على CPU، baseline بسيط يكفي
- قارن دائماً مع logistic regression، gradient boosting، k-NN على ميزات مُهندسة

### 9. البيرسبترون: الرياضيات والأوزان والانحياز
**الفكرة:** أبسط وحدة عصبية: z = w·x + b ثم a = f(z).  
**نقاط رئيسية:**
- w يحدد حساسية كل ميزة؛ b يزيح حد الفصل (لا يدوره)
- بدون طبقة مخفية: حد قرار خطي (hyperplane)
- التدريب يعدّل w و b لتقليل الخسارة على البيانات المُوسومة

### 10. تهيئة الأوزان: لماذا الأصفار تُعطّل التدريب
**الفكرة:** التماثل يجب أن يُكسر — أوزان متساوية (خصوصاً صفر) → وحدات مخفية متطابقة للأبد.  
**نقاط رئيسية:**
- تهيئة عشوائية → كل وحدة تتخصص كـ feature detector
- scale كبير → activations منفجرة؛ scale صغير → إشارات ضعيفة
- Xavier و He يختاران التباين حسب fan-in (وأحياناً fan-out)

### 11. تهيئة Xavier (Glorot) و He (Kaiming)
**الفكرة:** صيغ جاهزة في الإطارات للحفاظ على تباين الإشارة عبر الطبقات عند البداية.  
**نقاط رئيسية:**
- **Xavier:** σ² = 2/(n_in + n_out) — مناسب لـ sigmoid/tanh
- **He:** σ² = 2/n_in — يعوّض أن ReLU يصفّر نصف التفعيلات
- تهيئة سيئة قد تُوقف أو تُفجّر التدريب قبل انتهاء epoch الأول

### 12. دوال التفعيل: Sigmoid و Tanh
**الفكرة:** دوال كلاسيكية محدودة وناعمة — انتبه للـ saturation والتدرجات المتلاشية.  
**نقاط رئيسية:**
- **Sigmoid:** (0, 1) — احتمال ثنائي؛ |z| كبير → gradient ≈ 0
- **Tanh:** (-1, 1) — متمركز حول الصفر؛ أفضل للطبقات المخفية من sigmoid
- مفيدة في بوابات LSTM/GRU؛ للطبقات العميقة ReLU غالباً أسرع

### 13. دوال التفعيل: ReLU و Swish و GELU
**الفكرة:** defaults حديثة للعمق — sparsity، سرعة، وتدرجات أفضل.  
**نقاط رئيسية:**
- **ReLU:** max(0,z) — dead ReLUs ممكنة؛ leaky ReLU / ELU mitigation
- **Swish/SiLU:** ناعم وغير monotonic — غالباً يطابق أو يتفوق ReLU
- **GELU:** في Transformers (BERT، ViT) — gating ناعم
- **Softmax:** طبقة مخرجات multi-class
- طبقات خطية متتالية = طبقة خطية واحدة — العمق يحتاج nonlinearity

### 14. مشكلة XOR: لماذا الطبقات المخفية ضرورية منطقياً
**الفكرة:** XOR غير linearly separable — خط واحد لا يكفي؛ طبقة مخفية تعيد تمثيل المدخلات.  
**نقاط رئيسية:**
- بيرسبترون واحد = نصف فضاء؛ XOR يحتاج mixing غير خطي
- الوحدات المخفية تحوّل المدخلات إلى فضاء يصبح فيه XOR خطياً قابلاً للفصل
- هذا جوهر **representation learning**

### 15. من البيرسبترون إلى MLP
**الفكرة:** العمق = تركيب ميزات غير خطية: h = φ(W₁x+b₁)، ŷ = τ(W₂h+b₂).  
**نقاط رئيسية:**
- **العرض (width)** و **العمق (depth)** يتبادلان مع السعة والبيانات والحوسبة
- Universal approximation: طبقة مخفية عريضة كافية نظرياً — عملياً العمق + inductive bias أفضل
- Residual connections (لاحقاً) تسهّل optimization للشبكات العميقة جداً

### 16. الانتشار الأمامي: محرك الاستدلال
**الفكرة:** تمرير x طبقةً طبقةً عبر computational graph حتى logits أو scores.  
**نقاط رئيسية:**
- Linear → Activation → تكرار → رأس التصنيف/الانحدار
- التدريب يكرر forward passes على mini-batches (كفاءة + gradient noise مفيد)
- كل op (matmul، ReLU…) يعرف كيف ينقل القيم للأمام

### 17. دوال الخسارة: MSE مقابل Cross-Entropy
**الفكرة:** اختر الخسارة لتطابق المخرج والمهمة.  
**نقاط رئيسية:**
- **MSE:** انحدار — يعاقب الأخطاء الكبيرة بقوة؛ حساس لل outliers (Huber بديل)
- **Cross-entropy:** تصنيف — مع softmax/logits؛ gradients مستقرة في log-space
- ثنائي: sigmoid + BCE؛ multi-class: softmax + CE

### 18. Backpropagation: قاعدة السلسلة على الرسم البياني
**الفكرة:** ∂L/∂w = ∂L/∂z · ∂z/∂w — reverse-mode autodiff فعّال عندما parameters كثيرة و loss scalar.  
**نقاط رئيسية:**
- adjoints تُحسب من المخرجات للخلف
- PyTorch/JAX/TensorFlow يبنون الرسم وينفّذون backprop — أنت تصحح shapes و stability
- فهم backprop = معرفة أي مسارات تحمل gradient وأي activations تشبع

---

## المرحلة 2 — التحسين واستراتيجية التدريب

### 19. المرحلة 2: التحسين واستراتيجية التدريب
**الفكرة:** فن التدريب — تشخيص fit، gradients، optimizers، normalization، regularization، جداول LR.  
**نقاط رئيسية:**
- النموذج الجيد يطابق السعة مع البيانات ويراقب validation
- طبقات التحكم: Optimization | Stabilization | Generalization | Schedules
- ~40 دقيقة للمرحلة

### 20. تشخيص التدريب: Underfitting، Good Fit، Overfitting
**الفكرة:** اقرأ سلوك train مقابل validation — لا تُدرّب أعمى.  
**نقاط رئيسية:**
- **Underfitting:** train و val مرتفعان — نموذج بسيط أو LR منخفض أو features ناقصة
- **Good fit:** كلاهما منخفض ومتقاربان
- **Overfitting:** train ↓ و val ↑ — حفظ noise/idiosyncrasies
- استجابات: سعة أكبر، بيانات أكثر، dropout، wd، early stop

### 21. منحنيات التعلم: ماذا تخبرنا
**الفكرة:** رسم loss/metrics عبر epochs أو steps — أنماط تشخيصية.  
**نقاط رئيسية:**
- train ينزل و val ثابت → يمكن تدريب أطول أو سعة أكبر
- train ↓ و val ↑ → overfitting — regularize فوراً
- val noisy → val set أكبر، moving average، seeds متعددة

### 22. اختفاء وانفجار التدرجات
**الفكرة:** العمق يضرب Jacobians طبقةً طبقةً — عوامل <1 تتلاشى، >1 تنفجر.  
**نقاط رئيسية:**
- **Vanishing:** sigmoid/tanh مشبعة، init سيء — طبقات مبكرة لا تتعلّم
- **Exploding:** NaNs، loss spikes
- إصلاحات: residuals، ReLU، He/Xavier، BN/LN، gradient clipping

### 23. محسّنات متقدمة: beyond SGD
**الفكرة:** momentum، adaptive steps، weight decay مُفصول.  
**نقاط رئيسية:**
- **SGD + momentum:** velocity — أسرع في الاتجاهات المتسقة
- **RMSProp:** scale per-parameter بـ running avg of g²
- **Adam:** m + v — default سريع للنماذج الأولية
- **AdamW:** weight decay مُفصول عن adaptive preconditioner — generalization أفضل غالباً

### 24. التطبيع: Batch Norm مقابل Layer Norm
**الفكرة:** stabilize activations → تدريب أعمق وأسرع.  
**نقاط رئيسية:**
- **Batch Norm:** normalize عبر batch+spatial per channel؛ γ, β learnable؛ moving avg عند eval
- **Layer Norm:** normalize عبر features لكل مثال — default في Transformers
- **Group Norm:** batches صغيرة في CV

### 25. التنظيم (Regularization): Dropout و L1/L2 و Early Stopping
**الفكرة:** قيّد السعة دون تغيير المعمارية نهائياً.  
**نقاط رئيسية:**
- **Dropout:** صفر عشوائي للوحدات أثناء التدريب — ensemble ضمني؛ rates ~0.1–0.5
- **L2 (weight decay):** shrink weights؛ مع Adam استخدم AdamW
- **L1:** sparsity — أقل شيوعاً في deep nets
- **Early stopping:** توقف عند plateau في val؛ restore best weights

### 26. جداول معدل التعلم، Warm-up، وحجم الدفعة
**الفكرة:** LR يتغير مع الزمن؛ batch size = noise vs throughput.  
**نقاط رئيسية:**
- **Warm-up:** LR يرتفع تدريجياً — مهم لـ Transformers و large batch
- **Decay:** step، exponential، cosine (+ restarts)
- **Batch size:** أكبر = gradient أقل noise؛ linear LR scaling heuristic — تحقق empirically

### 27. ضبط Hyperparameters: استراتيجيات عملية
**الفكرة:** LR أعلى leverage؛ random search أفضل من grid؛ ثبّت seeds عند المقارنة.  
**نقاط رئيسية:**
- LR على log grid (1e-4 … 1e-1)
- dropout + wd مع width — nets أعرض تحتاج regularization أقوى
- Bayesian optimization عندما التقييم مكلف

---

## المرحلة 3 — معماريات متخصصة (رؤية وتسلسلات)

### 28. المرحلة 3: معماريات متخصصة
**الفكرة:** الصور لها locality و translation symmetry؛ التسلسلات لها order — اختر inductive bias صحيح.  
**نقاط رئيسية:**
- **صور:** Conv2D، pooling، residual blocks
- **تسلسلات:** RNN/GRU/LSTM، causal conv، self-attention
- المعمارية الخاطئة + scale أعمى = هدر

### 29. بيانات الصور: كيف «يرى» الحاسوب البكسلات
**الفكرة:** tensor H×W×3 (RGB)؛ معنى في الجيران المحليين → تركيب هرمي.  
**نقاط رئيسية:**
- intensities 0–255 ثم normalization (مثلاً ImageNet mean/std)
- augmentation (crop، flip، jitter) → invariance
- pipeline: raw → preprocess → Batch×C×H×W

### 30. Convolution: Kernels، Edge Filters، Feature Maps
**الفكرة:** kernel صغير (3×3) يتعلّم أنماطاً محلية؛ stacks = feature maps.  
**نقاط رئيسية:**
- Sobel = kernel ثابت؛ CNN يتعلّم filters من البيانات
- طبقات عميقة → receptive field أوسع: edges → textures → parts → semantics
- hyperparameters: kernel size، stride، padding، dilation

### 31. كتل CNN: من AlexNet إلى ResNet
**الفكرة:** y = F(x) + x — residual يحمل gradient عبر identity.  
**نقاط رئيسية:**
- **AlexNet (2012):** ReLU + dropout + GPU scale
- **VGG:** 3×3 متكررة — بسيط لكن parameters كثيرة
- **ResNet:** skip connections — optimize شبكات عميقة جداً

### 32. مهام رؤية حاسوبية: تصنيف، كشف، تقسيم
**الفكرة:** مخرجات مختلفة → رؤوس (heads) مختلفة.  
**نقاط رئيسية:**
- **Classification:** global pooling + linear
- **Detection:** boxes + scores + scales متعددة
- **Segmentation:** per-pixel class — U-Net، DeepLab، Mask R-CNN

### 33. كشف الأشياء: Boxes، IoU، YOLO vs Faster R-CNN
**الفكرة:** IoU = intersection/union — threshold 0.5 أو 0.75 يحدد positives.  
**نقاط رئيسية:**
- صيغ boxes: (cx,cy,w,h) أو corners — consistency في loss/decode
- **Single-stage (YOLO):** سريع، dense predictions
- **Two-stage (Faster R-CNN):** propose ثم refine — أدق، أثقل

### 34. تقسيم الصور ومعمارية U-Net
**الفكرة:** encoder يضغط context؛ decoder + skip connections يستعيد resolution وحدوداً حادة.  
**نقاط رئيسية:**
- semantic segmentation: H×W labels
- طبقات encoder/decoder/bottleneck/skips
- شائع في imaging طبي و satellite

### 35. Transfer Learning مع ImageNet Pretraining
**الفكرة:** filters عامة (edges، textures) قابلة للنقل — استبدل الرأس و fine-tune.  
**نقاط رئيسية:**
- dataset صغير: freeze backbone، train head
- متوسط: unfreeze تدريجي + discriminative LR
- domain shift كبير: full fine-tune + augmentation قوي
- self-supervised pretraining يقلل اعتماد labels

### 36. البيانات التسلسلية: لماذا الترتيب مهم
**الفكرة:** خلط tokens/frames يدمّر العلاقة مع label — causal masking في كثير من التطبيقات.  
**نقاط رئيسية:**
- لغة، صوت، time series، video frames
- ثلاث عائلات: recurrence، temporal conv، attention
- MT، speech، wearables sensors

### 37. RNNs الكلاسيكية: معمارية وحدود الذاكرة
**الفكرة:** h_t = φ(W_hh h_{t-1} + W_xh x_t + b) — نفس weights كل timestep.  
**نقاط رئيسية:**
- h_t ملخص lossy للماضي
- dependencies بعيدة → vanishing/exploding → LSTM/GRU/attention
- sequential forward — parallelization أصعب من conv/attention

### 38. LSTM: بوابات للذاكرة طويلة المدى
**الفكرة:** cell state c_t مسار additive — forget/input/output gates.  
**نقاط رئيسية:**
- f_t يمحو history؛ i_t + candidate يكتب جديد
- o_t يُظهر جزءاً من cell كـ h_t
- mitigates vanishing vs tanh RNN

### 39. GRU: بوابات أقل، جودة مشابهة غالباً
**الفكرة:** reset + update بدل cell منفصل في LSTM — parameters أقل.  
**نقاط رئيسية:**
- reset gate يتحكم في تأثير الماضي على candidate
- update gate يمزج قديم وجديد
- غالباً يطابق LSTM مع runtime أسرع

### 40. Encoder–Decoder (Seq2Seq)
**الفكرة:** encoder يضغط source؛ decoder autoregressive للهدف — attention يحل bottleneck vector واحد.  
**نقاط رئيسية:**
- teacher forcing أثناء التدريب
- تطبيقات: ترجمة، speech، summarization
- context: fixed vector (قديم) أو attention-weighted mix

---

## المرحلة 4 — النماذج التوليدية والنشر

### 41. المرحلة 4: النماذج التوليدية والنشر
**الفكرة:** من latent spaces (AE/VAE) و GANs إلى compression و edge deployment.  
**نقاط رئيسية:**
- نموذج يتدرب في المختبر فقط = غير مكتمل
- AE/VAE | GANs | Quantization/pruning | Edge & DL-Ops
- ~40 دقيقة للمرحلة

### 42. Autoencoders (AE): ضغط وإعادة بناء
**الفكرة:** encoder: x → z؛ decoder: z → x̂ ≈ x — bottleneck يفرض.  
**نقاط رئيسية:**
- denoising AE، sparse AE، contractive AE
- anomaly detection: recon error عالي = شاذ
- linear AE + MSE ≈ PCA عند constraints مناسبة

### 43. VAE: فضاء latent قابل للعيّن
**الفكرة:** q(z|x) بدل z ثابت؛ KL إلى prior؛ reparameterization trick.  
**نقاط رئيسية:**
- z = μ + σε، ε ~ N(0,1) — sampling differentiable
- generation: sample z ~ p(z)
- reconstruction + KL term

### 44. GANs: Generator vs Discriminator
**الفكرة:** minimax game — D يعلّم G عبر إشارة تعلّمية.  
**نقاط رئيسية:**
- mode collapse، instability — Wasserstein، spectral norm، progressive growing
- G(z) fake؛ D(real) vs D(fake)

### 45. ضغط النموذج: Quantization (FP32 → INT8)
**الفكرة:** PTQ calibration batches؛ QAT أثناء التدريب يستعيد accuracy.  
**نقاط رئيسية:**
- FP32 reference؛ FP16/bf16 tensor cores؛ INT8 4× weights
- trade-off: سرعة/حجم vs دقة

### 46. ضغط النموذج: Pruning و Distillation
**الفكرة:** unstructured vs structured؛ student يقلّد teacher logits/features.  
**نقاط رئيسية:**
- unstructured prune → sparse runtime مطلوب
- structured prune (channels) → fine-tune بعد
- distillation + temperature على softmax

### 47. تحسين Inference و Edge AI (DL-Ops)
**الفكرة:** من checkpoint إلى runtime على الجهاز — fuse ops، اختر engine، راقب drift.  
**نقاط رئيسية:**
- TensorRT، ONNX Runtime، OpenVINO، Core ML، TFLite
- MobileNet-style + quant + prune + distill للـ edge
- SLOs: latency p99، memory، fallback، versioning (model + preprocessing hash)

### 48. قائمة تحقق عملية قبل الإطلاق
**الفكرة:** هندسة التجارب غالباً تتفوق على tweak معمارية هامشي.  
**نقاط رئيسية:**
- reproducibility: seeds، hashes، config + git commit
- metrics: calibration، per-class، worst cohorts
- data: versioning، leakage checks (duplicates across splits)
- deployment: shadow traffic، dashboards (latency، errors، drift)

---

## ملحق

### جدول ربط Labs (code/15- Deep Learning)

| Lab | مجلد code | مواضيع العرض المرتبطة |
|-----|-----------|------------------------|
| 1 — MLP XOR | [`1- MLP XOR`](../code/15-%20Deep%20Learning/1-%20MLP%20XOR/) | #14–15 XOR، Perceptron vs MLP |
| 2 — MLP Classification | [`2- MLP Classification`](../code/15-%20Deep%20Learning/2-%20MLP%20Classification/) | #9–18 MLP، cross-entropy |
| 3 — MLP Dropout | [`3- MLP Dropout Regularization`](../code/15-%20Deep%20Learning/3-%20MLP%20Dropout%20Regularization/) | #20–25 regularization |
| 4 — CNN | [`4- CNN Image Classification`](../code/15-%20Deep%20Learning/4-%20CNN%20Image%20Classification/) | #28–31 Conv، CNN |
| 5 — RNN Text | [`5- RNN Text Classification`](../code/15-%20Deep%20Learning/5-%20RNN%20Text%20Classification/) | #36–39 LSTM/GRU |
| 6 — Transfer Learning | [`6- Transfer Learning`](../code/15-%20Deep%20Learning/6-%20Transfer%20Learning/) | #35 Transfer Learning |
| 7 — Autoencoder | [`7- Autoencoder`](../code/15-%20Deep%20Learning/7-%20Autoencoder/) | #41–42 AE |

### جدول مرجعي سريع (48 موضوعاً)

| # | الموضوع | المرحلة |
|---|---------|---------|
| 1–18 | أساسيات ونواة عصبية | 1 |
| 19–27 | تحسين وتدريب | 2 |
| 28–40 | معماريات (CV + sequences) | 3 |
| 41–48 | توليد ونشر | 4 |

### نقاط توقف Lab (من الشرائح)

| بعد الموضوع | نقطة توقف | المدة المقترحة |
|-------------|-----------|----------------|
| نهاية المرحلة 1 (بعد #18) | راجع z = w·x + b و XOR | ~5 دقائق |
| نهاية المرحلة 2 (بعد #27) | تشخيص under/overfit على منحنيات loss | ~5 دقائق |
| نهاية المرحلة 3 (بعد #40) | قارن Conv vs RNN/LSTM | ~10 دقائق |
| نهاية المرحلة 4 (بعد #48) | AE/VAE/GAN + quant/prune + edge checklist | ~5 دقائق |

### مراجع إضافية
- **ملف الشرائح:** [`src/data/slides/section07-deep-learning.js`](src/data/slides/section07-deep-learning.js)
- **تدقيق المحتوى:** [`CONTENT_AUDIT.md`](CONTENT_AUDIT.md) — القسم 7 (48/48 🟢)
- **README المعسكر:** [`README.md`](README.md) — جدول الأقسام
