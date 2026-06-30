import os
import json
import re

def clean_comment(comment):
    # Remove #, Step X, Cell X, and leading/trailing whitespace
    comment = re.sub(r'^#\s*', '', comment)
    comment = re.sub(r'^(Step|Cell)\s*\d+[\):\s-]*', '', comment, flags=re.IGNORECASE)
    # Remove Arabic/English dual titles like "استيراد المكتبات / Import libraries" to get clean terms
    if '/' in comment:
        parts = [p.strip() for p in comment.split('/')]
        return parts
    return [comment.strip()]

def get_arabic_explanation(cell_source, file_path):
    source_str = "".join(cell_source)
    lines = [line.strip() for line in cell_source if line.strip()]
    if not lines:
        return None

    # Try to extract the main comment/header from the first line
    header_comment = ""
    first_line = lines[0]
    if first_line.startswith('#'):
        header_comment = first_line

    # Collect other comment lines
    all_comments = []
    for line in lines:
        if line.startswith('#'):
            cleaned = re.sub(r'^#\s*', '', line).strip()
            if cleaned:
                all_comments.append(cleaned)

    # 1. IMPORT LIBRARIES CELL
    if any("import " in line or "from " in line for line in lines):
        libraries = []
        if "numpy" in source_str:
            libraries.append("- **`numpy` (المستوردة كـ `np`):** للعمليات الحسابية والتعامل مع المصفوفات الرياضية.")
        if "pandas" in source_str:
            libraries.append("- **`pandas` (المستوردة كـ `pd`):** لقراءة البيانات وإدارة الجداول البرمجية (DataFrames).")
        if "matplotlib" in source_str:
            libraries.append("- **`matplotlib.pyplot` (المستوردة كـ `plt`):** للرسم البياني وتصور البيانات بصرياً.")
        if "seaborn" in source_str:
            libraries.append("- **`seaborn` (المستوردة كـ `sns`):** لإنشاء رسومات بيانية إحصائية جذابة ومتقدمة.")
        if "train_test_split" in source_str:
            libraries.append("- **`train_test_split`:** لتقسيم البيانات إلى مجموعة تدريب ومجموعة اختبار بشكل عشوائي ومنظم.")
        if "StandardScaler" in source_str:
            libraries.append("- **`StandardScaler`:** لتقييس وتوحيد نطاق الخصائص (Feature Scaling) ليكون المتوسط صفر والانحراف المعياري واحد.")
        if "LinearRegression" in source_str:
            libraries.append("- **`LinearRegression`:** لبناء وتدريب نموذج الانحدار الخطي (البسيط أو المتعدد).")
        if "PolynomialFeatures" in source_str:
            libraries.append("- **`PolynomialFeatures`:** لتحويل الخصائص إلى خصائص متعددة الحدود لبناء نموذج انحدار غير خطي.")
        if "SVR" in source_str or "SVC" in source_str:
            libraries.append("- **`SVR` / `SVC` (من مكتبة SVM):** لبناء نموذج متجهات الدعم (للتعامل مع الانحدار أو التصنيف).")
        if "DecisionTreeRegressor" in source_str or "DecisionTreeClassifier" in source_str:
            libraries.append("- **`DecisionTree`:** لبناء شجرة القرار (سواء للتنبؤ بالقيم المستمرة أو التصنيف الفئوي).")
        if "RandomForestRegressor" in source_str or "RandomForestClassifier" in source_str:
            libraries.append("- **`RandomForest`:** لبناء الغابة العشوائية (أسلوب تجميعي يعتمد على أشجار قرار متعددة لتحسين الدقة).")
        if "LogisticRegression" in source_str:
            libraries.append("- **`LogisticRegression`:** لبناء نموذج الانحدار اللوجستي المستخدم في مهام التصنيف الثنائي أو المتعدد.")
        if "KNeighborsClassifier" in source_str:
            libraries.append("- **`KNeighborsClassifier` (KNN):** خوارزمية الجار الأقرب للتصنيف بناءً على تشابه البيانات.")
        if "GaussianNB" in source_str:
            libraries.append("- **`GaussianNB` (Naive Bayes):** مصنف نايف بايز الاحتمالي القائم على نظرية بايز.")
        if "statsmodels" in source_str:
            libraries.append("- **`statsmodels.api` (المستوردة كـ `sm`):** لإجراء التحليلات الإحصائية المتقدمة والحصول على تقرير مفصل للنموذج (OLS Summary).")
        if "tensorflow" in source_str or "keras" in source_str:
            libraries.append("- **`tensorflow / keras`:** لبناء وتدريب الشبكات العصبية الاصطناعية ونماذج التعلم العميق.")

        lib_explanation = "\n".join(libraries)
        return [
            "### أولاً: استيراد المكتبات البرمجية المطلوبة (Import Libraries)\n",
            "نقوم في هذه الخطوة باستيراد الأدوات والمكتبات اللازمة لمعالجة البيانات، بناء وتدريب النموذج، وتقييم النتائج:\n\n",
            lib_explanation
        ]

    # 2. LOAD DATASET CELL
    if "read_csv" in source_str or "load_data" in source_str or "urlretrieve" in source_str:
        file_desc = ""
        if "Salary_dataset" in source_str:
            file_desc = "الخاصة بالرواتب وسنوات الخبرة (`Salary_dataset.csv`)"
        elif "50_Startups" in source_str:
            file_desc = "الخاصة بالشركات الناشئة وأرباحها (`50_Startups.csv`)"
        elif "Position_Salaries" in source_str:
            file_desc = "الخاصة بالرواتب والمستويات الوظيفية (`Position_Salaries.csv`)"
        elif "california" in source_str:
            file_desc = "الخاصة بأسعار المنازل في كاليفورنيا"
        elif "Social_Network_Ads" in source_str:
            file_desc = "الخاصة بالإعلانات عبر شبكات التواصل الاجتماعي (`Social_Network_Ads.csv`)"

        return [
            "### ثانياً: تحميل وقراءة البيانات (Load Dataset)\n",
            f"في هذه الخطوة، نقوم بقراءة ملف البيانات {file_desc}. \n",
            "1. نتحقق من وجود الملف محلياً، وإذا لم يكن موجوداً نقوم بتحميله برمجياً من الإنترنت.\n",
            "2. نستخدم مكتبة Pandas لقراءة الملف وعرض البيانات للتأكد من سلامتها."
        ]

    # 3. VISUAL EXPLORATORY ANALYSIS (EDA)
    if "pairplot" in source_str or "heatmap" in source_str or "corr()" in source_str:
        extra = ""
        if "pairplot" in source_str:
            extra += "- **`pairplot`:** لرسم العلاقات الثنائية وتوزيع البيانات لكل الأعمدة.\n"
        if "heatmap" in source_str:
            extra += "- **`heatmap` (خريطة الارتباط):** لتوضيح معامل الارتباط بين المتغيرات رقمياً ولونياً وملاحظة أي تداخل خطي (Multicollinearity).\n"
        return [
            "### ثالثاً: استكشاف البيانات بصرياً وإحصائياً (Exploratory Data Analysis - EDA)\n",
            "نقوم بتحليل البيانات لمعرفة العلاقات والارتباط بين المتغيرات المختلفة:\n\n",
            extra,
            "- يساعدنا هذا التحليل البصري في فهم العلاقات الخطية أو غير الخطية بين المتغيرات قبل إدخالها للنموذج."
        ]

    # 4. ONE-HOT ENCODING / CATEGORICAL CONVERSION
    if "get_dummies" in source_str or "OneHotEncoder" in source_str or "LabelEncoder" in source_str:
        return [
            "### رابعاً: معالجة البيانات الفئوية (Encoding Categorical Data)\n",
            "الخوارزميات الرياضية تتعامل فقط مع الأرقام، لذلك نقوم بترميز النصوص أو الفئات (Categorical Data):\n",
            "- نستخدم تقنية الترميز الأحادي (One-Hot Encoding) مثل `pd.get_dummies` لتحويل الأعمدة النصية إلى أعمدة رقمية (0 و 1).\n",
            "- نستخدم `drop_first=True` لتجنب مشكلة التعدد الخطي العشوائي (Dummy Variable Trap)."
        ]

    # 5. OUTLIERS / MULTICOLLINEARITY (VIF)
    if "variance_inflation_factor" in source_str or "VIF" in source_str:
        return [
            "### خامساً: فحص التعدد الخطي باستخدام عامل تضخم التباين (VIF)\n",
            "نقوم بحساب **عامل تضخم التباين (Variance Inflation Factor - VIF)** للتأكد من عدم وجود ارتباط قوي جداً بين المتغيرات مستقلة (Multicollinearity):\n",
            "- قيمة VIF أكبر من 5 أو 10 تشير عادة إلى ارتباط قوي قد يضر بدقة وتفسير نموذج الانحدار الخطي المتعدد.\n",
            "- نقوم بحساب هذه القيم لكل ميزة لمساعدتنا في اتخاذ قرار الإبقاء عليها أو حذفها."
        ]
    
    if "quantile" in source_str or "IQR" in source_str:
        return [
            "### سادساً: اكتشاف القيم الشاذة (Outliers Detection)\n",
            "نقوم بفحص البيانات للبحث عن أي قيم شاذة (Outliers) قد تؤثر سلباً على تدريب النموذج ودقته:\n",
            "- نستخدم طريقة النطاق الربيعي (IQR - Interquartile Range) لحساب الحدود الدنيا والعليا للبيانات الطبيعية.\n",
            "- أي قيمة تقع خارج هذه الحدود تعتبر شاذة ويتم رصدها لاتخاذ القرار المناسب بشأنها."
        ]

    # 6. FEATURE & TARGET SELECTION
    if "iloc" in source_str and ("X =" in source_str or "y =" in source_str):
        return [
            "### سابعاً: تحديد المتغيرات المستقلة والتابعة (Features and Target)\n",
            "نقوم بفصل البيانات المدخلة:\n",
            "- **المتغيرات المستقلة ($X$):** الميزات والخصائص التي يستخدمها النموذج للتعلم والتنبؤ.\n",
            "- **المتغير التابع ($y$):** الهدف أو المخرج الذي نريد من النموذج أن يتعلم توقعه."
        ]

    # 7. TRAIN/TEST SPLIT
    if "train_test_split" in source_str:
        test_size_match = re.search(r'test_size\s*=\s*([^\s,]+)', source_str)
        test_pct = "محددة"
        if test_size_match:
            val = test_size_match.group(1)
            try:
                # convert fraction or float to percentage
                if '/' in val:
                    num, denom = val.split('/')
                    test_pct = f"{int(float(num)/float(denom)*100)}%"
                else:
                    test_pct = f"{int(float(val)*100)}%"
            except:
                test_pct = f"{val}"
        return [
            "### ثامناً: تقسيم البيانات إلى مجموعتي تدريب واختبار (Train/Test Split)\n",
            f"نقسم البيانات بنسبة {test_pct} لمجموعة الاختبار وبقية البيانات لمجموعة التدريب:\n",
            "- **بيانات التدريب (Training Set):** لتعليم النموذج وضبط أوزانه ومعاملاته.\n",
            "- **بيانات الاختبار (Test Set):** لتقييم النموذج واختبار قدرته على التنبؤ ببيانات جديدة كلياً."
        ]

    # 8. FEATURE SCALING
    if "StandardScaler" in source_str or "MinMaxScaler" in source_str:
        return [
            "### تاسعاً: تقييس الخصائص (Feature Scaling)\n",
            "نقوم بعملية التقييس أو المعايرة للبيانات:\n",
            "- نستخدم `fit_transform` على مجموعة التدريب ليتعلم المتوسط والانحراف المعياري ويطبق التحويل.\n",
            "- نستخدم `transform` فقط على مجموعة الاختبار لمنع تسرب البيانات (Data Leakage).\n",
            "- هذه الخطوة ضرورية جداً للخوارزميات الحساسة للمقاييس مثل متجهات الدعم (SVM)، الجار الأقرب (KNN)، والشبكات العصبية."
        ]

    # 9. TRAIN MODEL
    model_name = ""
    if "LinearRegression()" in source_str:
        model_name = "الانحدار الخطي (Linear Regression)"
    elif "SVR(" in source_str:
        model_name = "انحدار متجهات الدعم (Support Vector Regression - SVR)"
    elif "DecisionTreeRegressor" in source_str:
        model_name = "شجرة القرار للانحدار (Decision Tree Regressor)"
    elif "RandomForestRegressor" in source_str:
        model_name = "الغابة العشوائية للانحدار (Random Forest Regressor)"
    elif "LogisticRegression" in source_str:
        model_name = "الانحدار اللوجستي (Logistic Regression)"
    elif "KNeighborsClassifier" in source_str:
        model_name = "الجار الأقرب للتصنيف (K-Nearest Neighbors - KNN)"
    elif "SVC" in source_str:
        model_name = "مصنف متجهات الدعم (Support Vector Classifier - SVC)"
    elif "GaussianNB" in source_str:
        model_name = "نايف بايز (Naive Bayes)"
    elif "DecisionTreeClassifier" in source_str:
        model_name = "شجرة القرار للتصنيف (Decision Tree Classifier)"
    elif "RandomForestClassifier" in source_str:
        model_name = "الغابة العشوائية للتصنيف (Random Forest Classifier)"
    elif "Sequential()" in source_str or "Dense(" in source_str:
        model_name = "الشبكة العصبية الاصطناعية (Neural Network)"

    if model_name:
        return [
            f"### عاشراً: بناء وتدريب نموذج {model_name}\n",
            "1. نقوم بإنشاء كائن من النموذج بالمعاملات المناسبة.\n",
            "2. نستخدم الدالة `.fit(X_train, y_train)` لتدريب النموذج على بيانات التدريب لكي يتعلم العلاقات والأنماط."
        ]

    # 10. PREDICT
    if "predict" in source_str and ("y_pred =" in source_str or "y_pred_poly" in source_str or "y_pred_linear" in source_str):
        return [
            "### الحادي عشر: التنبؤ بقيم مجموعة الاختبار (Make Predictions)\n",
            "نستخدم النموذج المدرب للتنبؤ بالنتائج للمدخلات الموجودة في مجموعة الاختبار للتأكد من قدرة النموذج على التعميم على بيانات جديدة لم يتدرب عليها من قبل."
        ]

    # 11. METRICS
    if "r2_score" in source_str or "mean_squared_error" in source_str or "accuracy_score" in source_str or "confusion_matrix" in source_str:
        metrics_list = []
        if "r2_score" in source_str:
            metrics_list.append("- **معامل التحديد ($R^2$):** يقيس جودة ملاءمة النموذج للبيانات (كلما اقترب من 1 كان أفضل).")
        if "mean_squared_error" in source_str:
            metrics_list.append("- **متوسط مربع الخطأ (MSE) وجذره (RMSE):** يقيس حجم الخطأ في التوقعات (يفضل أن يكون أقل ما يمكن).")
        if "mean_absolute_error" in source_str:
            metrics_list.append("- **متوسط الخطأ المطلق (MAE):** متوسط الفروق المطلقة بين التوقع والواقع.")
        if "accuracy_score" in source_str:
            metrics_list.append("- **دقة التصنيف (Accuracy):** نسبة الحالات التي تم تصنيفها بشكل صحيح من إجمالي الحالات.")
        if "confusion_matrix" in source_str:
            metrics_list.append("- **مصفوفة الارتباك (Confusion Matrix):** جدول يوضح التوقعات الصحيحة والخاطئة لكل فئة بالتفصيل.")
        if "classification_report" in source_str:
            metrics_list.append("- **تقرير التصنيف الشامل:** يوضح قيم الدقة (Precision)، الاستدعاء (Recall)، ومقياس F1-score لكل فئة.")

        metrics_desc = "\n".join(metrics_list)
        return [
            "### الثاني عشر: تقييم أداء النموذج (Evaluation Metrics)\n",
            "نقوم بحساب عدة مقاييس إحصائية لتقييم كفاءة ودقة النموذج المستعمل:\n\n",
            metrics_desc
        ]

    # 12. MODEL INTERPRETATION (summary, coefficients)
    if "coef_" in source_str or "summary()" in source_str or "intercept_" in source_str:
        return [
            "### الثالث عشر: تفسير النموذج والتحليلات الإحصائية (Model Interpretation)\n",
            "نقوم باستخراج المعاملات الرياضية للنموذج:\n",
            "- **المعاملات (Coefficients/Slope):** توضح مدى تأثير كل متغير مستقل على المتغير التابع.\n",
            "- **الجزء المقطوع (Intercept):** القيمة المتوقعة عندما تكون جميع المدخلات صفراً.\n",
            "- **ملخص التحليل (Summary):** يعطي تفاصيل إحصائية شاملة (مثل قيم P-value) لمعرفة الأهمية الإحصائية لكل ميزة."
        ]

    # 13. PLOTTING / VISUALIZATION OF RESULTS
    if "scatter" in source_str or "plot" in source_str:
        return [
            "### الرابع عشر: رسم النتائج بيانيا (Visualization of Results)\n",
            "نقوم برسم النقاط الحقيقية (الحمراء عادة) والخط أو المنحنى الممثل للنموذج (الأزرق) بصرياً:\n",
            "- يساعدنا الرسم البياني في التحقق البصري المباشر من مدى دقة التوقعات وملاءمة النموذج للبيانات الحقيقية."
        ]

    # Fallback to general explanation based on comment line
    if all_comments:
        combined = " و ".join(all_comments[:2])
        return [
            f"### خطوة: {combined}\n",
            "نقوم بتشغيل هذا الجزء من الكود لتنفيذ العمليات البرمجية الموضحة في التعليقات أعلاه لتجهيز البيانات أو تهيئة النموذج."
        ]

    return None

def process_notebook(filepath):
    print(f"Processing: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    new_cells = []
    for i, cell in enumerate(nb.get('cells', [])):
        if cell.get('cell_type') == 'code':
            source = cell.get('source', [])
            explanation_lines = get_arabic_explanation(source, filepath)
            if explanation_lines:
                # Add markdown explanation cell before the code cell
                md_cell = {
                    "cell_type": "markdown",
                    "metadata": {},
                    "source": [line + "\n" if not line.endswith("\n") else line for line in explanation_lines]
                }
                new_cells.append(md_cell)
            new_cells.append(cell)
        else:
            new_cells.append(cell)

    nb['cells'] = new_cells
    
    # Save to _explained.ipynb
    dir_name = os.path.dirname(filepath)
    base_name = os.path.basename(filepath)
    name_part, ext_part = os.path.splitext(base_name)
    output_name = f"{name_part}_explained{ext_part}"
    output_path = os.path.join(dir_name, output_name)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(nb, f, indent=2, ensure_ascii=False)
    print(f"Saved explained version to: {output_path}")
    return output_path

def main():
    root_dir = r"d:\AI-ML\code"
    processed_files = []
    
    for root, dirs, files in os.walk(root_dir):
        # Skip instructor folders and checkpoint folders
        if "Instructor" in root or ".ipynb_checkpoints" in root:
            continue
            
        for file in files:
            if file.endswith(".ipynb") and not file.endswith("_explained.ipynb") and "Instructor" not in file:
                full_path = os.path.join(root, file)
                try:
                    out_path = process_notebook(full_path)
                    processed_files.append(out_path)
                except Exception as e:
                    print(f"Failed to process {full_path}: {e}")
                    
    print(f"\nSuccessfully generated {len(processed_files)} explained notebooks!")

if __name__ == "__main__":
    main()
