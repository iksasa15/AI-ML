# Day 1 — Introduction to Natural Language Processing (NLP)

> **Level:** Beginner → Intermediate
> **Estimated Time:** 4–6 hours
> **Prerequisites:** Basic Python + basic understanding of data structures

---

## 📌 What You'll Learn Today

By the end of this day, you will be able to:

- ✅ Explain what NLP is and why it's hard
- ✅ Apply a full NLP pipeline to any raw text
- ✅ Use SpaCy and NLTK for text processing
- ✅ Understand the difference between Stemming and Lemmatization
- ✅ Extract named entities from real-world text
- ✅ Build a complete text analysis project from scratch

---

## 1. What Is NLP and Why Is It Hard?

### 1.1 Definition

**Natural Language Processing (NLP)** is a subfield of Artificial Intelligence that enables computers to understand, generate, and interact with human language.

Human language is not just data — it carries:
- **Meaning** (Semantics): What does the word mean?
- **Context** (Pragmatics): What does the word mean *here*?
- **Intent**: What does the speaker want?
- **Emotion** (Sentiment): How does the speaker feel?

### 1.2 Why Is Language Hard for Computers?

**Ambiguity** — the biggest challenge in NLP:

```
Sentence: "I saw the man with the telescope"

Interpretation 1: I used a telescope to see the man
Interpretation 2: I saw a man who was carrying a telescope
```

Both interpretations are grammatically valid — humans resolve this instantly using context. Computers struggle enormously.

**Types of Ambiguity:**

| Type | Example | Interpretations |
|------|---------|----------------|
| Lexical Ambiguity | "bank" | financial bank OR river bank? |
| Syntactic Ambiguity | "Flying planes can be dangerous" | planes that fly OR the act of flying them? |
| Semantic Ambiguity | "Every child loves a parent" | one specific parent OR any parent? |
| Pragmatic Ambiguity | "Can you pass the salt?" | a question OR a request? |

**More challenges:**

```
✗ Sarcasm:       "Oh great, another Monday." (means the opposite)
✗ Idioms:        "It's raining cats and dogs." (not literally)
✗ Coreference:   "Sarah told Mary she was late." (who is "she"?)
✗ Misspellings:  "artifical inteligence" → "artificial intelligence"
✗ Slang/Dialects: "That's fire" = "That's great" in modern slang
✗ Negation:      "not bad" ≠ "bad" and ≠ "good" — it's nuanced
```

### 1.3 Real-World NLP Applications

```
🔍 Google Search          → Understanding search intent
💬 ChatGPT / Claude       → Text generation and dialogue
📧 Gmail                  → Spam filtering + Smart Reply
🎙️ Siri / Alexa          → Speech recognition + understanding
🌍 Google Translate       → Machine translation
📊 Bloomberg Terminal     → Financial sentiment analysis
🏥 Healthcare             → Extracting info from medical records
🛒 Amazon                 → Product review analysis
🔒 Twitter/X              → Fake news and hate speech detection
📞 Call Centers           → Automated customer intent detection
```

---

## 2. The Full NLP Pipeline

The pipeline is a series of transformation steps that turn raw text into structured data that models can understand.

```
Raw Text
    │
    ▼
┌─────────────────────┐
│  1. Text Cleaning   │  ← Remove HTML, URLs, special chars
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  2. Tokenization    │  ← Split into words/subwords
└─────────────────────┘
    │
    ▼
┌──────────────────────────┐
│  3. Stop Words Removal   │  ← Remove low-value words
└──────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  4. Normalization        │  ← Lowercase, unicode fix
└─────────────────────────┘
    │
    ▼
┌──────────────────────────────────┐
│  5. Stemming / Lemmatization     │  ← Reduce to root form
└──────────────────────────────────┘
    │
    ▼
┌─────────────────────┐
│  6. POS Tagging     │  ← Label each word's grammar role
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  7. NER             │  ← Extract entities (names, places...)
└─────────────────────┘
    │
    ▼
  Structured Data ready for models
```

---

## 3. Text Cleaning

Before any processing, raw text needs to be cleaned. Text from the internet is messy.

### 3.1 What Makes Raw Text Messy?

```python
# Typical raw text from the web
raw_text = """
    <p>John said: "AI is amazing!!!! 🤖🔥"</p>
    Posted: 2024-01-15 | Source: @tech_blog
    Read more: https://example.com/article?id=123&ref=twitter
    Contact: +1-800-000-0000 | #ArtificialIntelligence #ML
"""
```

### 3.2 Step-by-Step Cleaning

```python
import re
import html
import unicodedata

def clean_text(text: str) -> str:
    """
    Comprehensive text cleaning pipeline.
    """
    # Step 1: Decode HTML entities (&amp; → &, &lt; → <)
    text = html.unescape(text)
    
    # Step 2: Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Step 3: Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
    # Step 4: Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)
    
    # Step 5: Remove phone numbers
    text = re.sub(r'\+?[\d\-\(\)\s]{9,}', '', text)
    
    # Step 6: Remove @mentions and #hashtags
    text = re.sub(r'@\w+|#\w+', '', text)
    
    # Step 7: Remove emojis and non-ASCII symbols
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    # Step 8: Remove extra punctuation (keep sentence-ending ones)
    text = re.sub(r'[^\w\s\.\!\?]', ' ', text)
    
    # Step 9: Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text


# --- Test it ---
raw = '<p>John said: "AI is amazing!!!! " Visit: https://ai.com @john #AI Contact: +1-800-000-0000</p>'
clean = clean_text(raw)

print(f"Before: {raw}")
print(f"After:  {clean}")

# Before: <p>John said: "AI is amazing!!!!" Visit: https://ai.com @john #AI Contact: +1-800-000-0000</p>
# After:  John said AI is amazing  Visit
```

### 3.3 Lowercase Normalization

```python
def normalize_case(text: str) -> str:
    return text.lower()

examples = [
    "Natural Language Processing",
    "ARTIFICIAL INTELLIGENCE",
    "iPhone vs Android",
    "NASA launched SpaceX",
]

for ex in examples:
    print(f"Original: {ex:<30} → Normalized: {normalize_case(ex)}")

# Original: Natural Language Processing      → Normalized: natural language processing
# Original: ARTIFICIAL INTELLIGENCE          → Normalized: artificial intelligence
# Original: iPhone vs Android                → Normalized: iphone vs android
# Original: NASA launched SpaceX             → Normalized: nasa launched spacex
```

> ⚠️ **Important:** Don't always lowercase. For NER tasks, capitalization is a key signal — "Apple" (company) vs "apple" (fruit).

---

## 4. Tokenization

**Tokenization** is the process of splitting text into smaller units called **tokens**.

### 4.1 Types of Tokenization

```
Text: "I'm running to the store!"

Word Tokenization    → ["I", "'m", "running", "to", "the", "store", "!"]
Character Tokenization → ["I", "'", "m", " ", "r", "u", "n", "n", "i", "n", "g", ...]
Subword Tokenization → ["I", "'m", "run", "##ning", "to", "the", "store", "!"]
Sentence Tokenization → ["I'm running to the store!"]
```

### 4.2 Word Tokenization with NLTK

```python
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize, TweetTokenizer

nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)

text = "I'm running to the store! It's a beautiful day, isn't it?"

# Basic word tokenization
word_tokens = word_tokenize(text)
print("Word tokens:", word_tokens)
# ['I', "'m", 'running', 'to', 'the', 'store', '!', 'It', "'s", 'a',
#  'beautiful', 'day', ',', 'is', "n't", 'it', '?']

# Sentence tokenization
sent_tokens = sent_tokenize(text)
print("Sentences:", sent_tokens)
# ["I'm running to the store!", "It's a beautiful day, isn't it?"]

# Tweet tokenizer (handles hashtags, mentions, emoticons)
tweet_tok = TweetTokenizer()
tweet = "OMG!! @john just said #AI will replace us all :) LOL"
print("Tweet tokens:", tweet_tok.tokenize(tweet))
# ['OMG', '!', '!', '@john', 'just', 'said', '#AI', 'will', 'replace', 'us', 'all', ':)', 'LOL']
```

### 4.3 Subword Tokenization — Most Important for LLMs

Modern LLMs (GPT, BERT, Claude) all use subword tokenization. Here's why:

**The Problem with Word Tokenization:**
```
Vocabulary size: 50,000+ words just for English
New words: "COVID-19", "GPT-4", "selfie" → unknown tokens
Morphology: "running", "runs", "runner" treated as completely different
```

**The Subword Solution:**
```
"unbelievably" → ["un", "believ", "ably"]    (break rare words into known pieces)
"running"      → ["run", "##ning"]            (preserve common roots)
"GPT-4"        → ["G", "PT", "-", "4"]        (no unknown tokens)
```

```python
from transformers import AutoTokenizer

# Compare different tokenizers
models = {
    "GPT-2 (BPE)":        "gpt2",
    "BERT (WordPiece)":   "bert-base-uncased",
}

test_words = [
    "running",
    "unbelievably",
    "ChatGPT",
    "COVID-19",
    "antidisestablishmentarianism",
]

for model_name, model_id in models.items():
    tok = AutoTokenizer.from_pretrained(model_id)
    print(f"\n{'='*50}")
    print(f"Tokenizer: {model_name}")
    print(f"{'='*50}")
    for word in test_words:
        tokens = tok.tokenize(word)
        print(f"  {word:<35} → {tokens}")

# Tokenizer: GPT-2 (BPE)
# ==================================================
#   running                             → ['running']
#   unbelievably                        → ['unbelievably']
#   ChatGPT                             → ['Chat', 'G', 'PT']
#   COVID-19                            → ['COV', 'ID', '-', '19']
#   antidisestablishmentarianism        → ['anti', 'dis', 'establishment', 'arian', 'ism']

# Tokenizer: BERT (WordPiece)
# ==================================================
#   running                             → ['running']
#   unbelievably                        → ['un', '##believe', '##ably']
#   ChatGPT                             → ['chat', '##g', '##pt']
#   COVID-19                            → ['covid', '-', '19']
#   antidisestablishmentarianism        → ['anti', '##dis', '##establishment', '##arian', '##ism']
```

### 4.4 Token Counting — Why It Matters

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Token count affects API cost and context length!
texts = [
    ("Simple sentence",    "The cat sat on the mat."),
    ("Technical text",     "The transformer architecture uses multi-head self-attention mechanisms."),
    ("Code snippet",       "def hello_world(): print('Hello, World!')"),
    ("Repeated content",   "blah " * 20),
]

print(f"{'Description':<20} {'Text':<55} {'Tokens'}")
print("-" * 85)
for desc, text in texts:
    n = len(tokenizer.encode(text))
    preview = text[:50] + "..." if len(text) > 50 else text
    print(f"{desc:<20} {preview:<55} {n}")

# Description          Text                                                    Tokens
# -------------------------------------------------------------------------------------
# Simple sentence      The cat sat on the mat.                                 7
# Technical text       The transformer architecture uses multi-head self-att   11
# Code snippet         def hello_world(): print('Hello, World!')               12
# Repeated content     blah blah blah blah blah blah blah blah blah blah bl   21
```

---

## 5. Stop Words — Removing the Noise

**Stop words** are extremely common words that carry little meaningful information on their own.

### 5.1 Why Remove Stop Words?

```
Sentence: "This is the book that talks about artificial intelligence"

With stop words   → ["This","is","the","book","that","talks","about","artificial","intelligence"]
Without stop words → ["book", "talks", "artificial", "intelligence"]

Result: Fewer tokens, focused on actual meaning
```

### 5.2 Applying Stop Words with NLTK

```python
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords', quiet=True)

# English stop words
stop_words = set(stopwords.words('english'))
print(f"Total English stop words: {len(stop_words)}")
print(f"Examples: {sorted(list(stop_words))[:20]}")
# Examples: ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', ...]

# Apply to text
text = "Natural language processing is a fascinating subfield of artificial intelligence and computer science"
tokens = word_tokenize(text.lower())
filtered = [w for w in tokens if w not in stop_words and w.isalpha()]

print(f"\nOriginal  ({len(tokens):2d} tokens): {tokens}")
print(f"Filtered  ({len(filtered):2d} tokens): {filtered}")
print(f"Reduction: {(1 - len(filtered)/len(tokens)):.0%}")

# Original  (17 tokens): ['natural', 'language', 'processing', 'is', 'a', 'fascinating',
#                          'subfield', 'of', 'artificial', 'intelligence', 'and', 'computer', 'science']
# Filtered  (7 tokens):  ['natural', 'language', 'processing', 'fascinating', 'subfield',
#                          'artificial', 'intelligence', 'computer', 'science']
# Reduction: 47%
```

### 5.3 Custom Stop Words

```python
from sklearn.feature_extraction.text import TfidfVectorizer

# Domain-specific stop words for a tech blog
tech_stop_words = {
    'click', 'read', 'article', 'learn', 'more', 'please', 'note',
    'example', 'following', 'used', 'using', 'use', 'let', 'see'
}

# Combine with standard stop words
all_stop_words = list(stop_words.union(tech_stop_words))

vectorizer = TfidfVectorizer(stop_words=all_stop_words, max_features=1000)
print(f"Total stop words: {len(all_stop_words)}")
```

### 5.4 When NOT to Remove Stop Words

```
❌ Do NOT remove stop words for:

  Language Models (GPT, BERT)
    → "I do NOT like this" ≠ "I like this"
    → Context from every word matters

  Machine Translation
    → Every word has a role in grammar

  Sentiment Analysis (nuanced)
    → "not bad" ≠ "bad"
    → "barely good" ≠ "good"

  Question Answering
    → "Who is the president?" — "who" IS the question

  Chatbots
    → Conversational flow needs all words

✅ DO remove stop words for:

  TF-IDF based classification
  Topic Modeling (LDA)
  Document similarity
  Keyword extraction
  Search engine indexing
```

---

## 6. Stemming vs Lemmatization

Both aim to reduce words to their base form — but in very different ways.

### 6.1 The Core Difference

```
                    Stemming            Lemmatization
Method:             Rule-based cutting  Dictionary lookup
Speed:              Fast                Slower
Accuracy:           Lower               Higher
Output:             May not be a word   Always a real word
Needs POS:          No                  Yes (for accuracy)

Example:
  "studies"   →   "studi" ✗          "study" ✓
  "better"    →   "better" ✗         "good" ✓
  "running"   →   "run" ✓            "run" ✓
  "mice"      →   "mice" ✗           "mouse" ✓
  "are"       →   "are" ✗            "be" ✓
```

### 6.2 Stemming with NLTK

```python
from nltk.stem import PorterStemmer, LancasterStemmer, SnowballStemmer

porter    = PorterStemmer()
lancaster = LancasterStemmer()
snowball  = SnowballStemmer("english")

words = [
    "running", "runs", "ran",
    "studies", "studying", "studied",
    "better", "good", "best",
    "beautiful", "beautifully",
    "organization", "organize", "organizational",
    "caring", "cared", "cares",
]

print(f"{'Word':<20} {'Porter':<15} {'Lancaster':<15} {'Snowball'}")
print("=" * 65)
for word in words:
    p = porter.stem(word)
    l = lancaster.stem(word)
    s = snowball.stem(word)
    print(f"{word:<20} {p:<15} {l:<15} {s}")

# Word                 Porter          Lancaster       Snowball
# =================================================================
# running              run             run             run
# runs                 run             run             run
# ran                  ran             ran             ran       ← all fail!
# studies              studi           study           studi
# studying             studi           study           studi
# studied              studi           study           studi
# better               better          bet             better    ← all fail!
# good                 good            good            good
# best                 best            best            best      ← all fail!
# beautiful            beauti          beauty          beauti
# beautifully          beauti          beauty          beauti
# organization         organ           org             organ
# organize             organ           org             organ
# organizational       organ           org             organ
# caring               care            car             care
```

### 6.3 Lemmatization with SpaCy

```python
import spacy

nlp = spacy.load("en_core_web_sm")

sentences = [
    "I am running faster than I ran yesterday",
    "She studies harder than her brother studied",
    "The better option is to organize organizational documents",
    "Mice are better than rats at navigating mazes",
    "These geese are flying over the oxen in the field",
]

for sentence in sentences:
    doc = nlp(sentence)
    print(f"\nSentence: {sentence}")
    print(f"{'Token':<15} {'Lemma':<15} {'POS':<8} {'Correct?'}")
    print("-" * 50)
    for token in doc:
        if not token.is_stop and not token.is_punct:
            # Check if lemmatization changed the word
            changed = "✓ changed" if token.text.lower() != token.lemma_ else ""
            print(f"{token.text:<15} {token.lemma_:<15} {token.pos_:<8} {changed}")

# Sentence: I am running faster than I ran yesterday
# Token           Lemma           POS      Correct?
# --------------------------------------------------
# running         run             VERB     ✓ changed
# faster          fast            ADV      ✓ changed
# ran             run             VERB     ✓ changed   ← Lemmatization handles irregular!
# yesterday       yesterday       NOUN

# Sentence: Mice are better than rats at navigating mazes
# Token           Lemma           POS      Correct?
# --------------------------------------------------
# Mice            mouse           NOUN     ✓ changed   ← Handles irregular plurals!
# better          good            ADJ      ✓ changed   ← Knows better = good!
# rats            rat             NOUN     ✓ changed
# navigating      navigate        VERB     ✓ changed
# mazes           maze            NOUN     ✓ changed
```

### 6.4 When to Use Which?

```python
# Practical decision guide

def choose_approach(task: str) -> str:
    stemming_tasks = {
        "search engine indexing",
        "fast text classification",
        "large scale document processing",
        "information retrieval",
    }
    lemmatization_tasks = {
        "high accuracy classification",
        "text generation features",
        "linguistic analysis",
        "chatbot preprocessing",
        "question answering",
    }
    
    if task.lower() in stemming_tasks:
        return "Use STEMMING — speed matters more than precision"
    elif task.lower() in lemmatization_tasks:
        return "Use LEMMATIZATION — accuracy matters more than speed"
    else:
        return "Default to LEMMATIZATION — it's almost always better"

# Test
tasks = [
    "search engine indexing",
    "high accuracy classification",
    "building a chatbot",
    "processing 10 million documents quickly",
]
for task in tasks:
    print(f"Task: {task:<45} → {choose_approach(task)}")
```

---

## 7. Part-of-Speech (POS) Tagging

**POS Tagging** assigns a grammatical label to each word in a sentence.

### 7.1 The Tag Set

| Tag | Full Name | Meaning | Examples |
|-----|-----------|---------|---------|
| `NOUN` | Noun | Person, place, thing, idea | dog, city, love, happiness |
| `VERB` | Verb | Action or state | run, is, think, became |
| `ADJ` | Adjective | Describes noun | big, smart, red, beautiful |
| `ADV` | Adverb | Modifies verb/adj | quickly, very, now, almost |
| `PRON` | Pronoun | Replaces noun | he, she, they, it |
| `DET` | Determiner | Specifies noun | the, a, an, this, those |
| `ADP` | Adposition | Preposition | in, on, at, by, for |
| `CONJ` | Conjunction | Connects clauses | and, or, but, because |
| `PROPN` | Proper Noun | Specific name | London, Tesla, John |
| `NUM` | Numeral | Number | 42, three, 2024 |
| `PUNCT` | Punctuation | Punctuation mark | ., !, ?, ; |
| `INTJ` | Interjection | Exclamation | oh, wow, uh, hey |

### 7.2 POS Tagging with SpaCy

```python
import spacy

nlp = spacy.load("en_core_web_sm")

sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Apple is looking at buying a U.K. startup for $1 billion.",
    "She quickly ran to the nearest store and bought fresh apples.",
]

for sentence in sentences:
    doc = nlp(sentence)
    print(f"\n{'='*60}")
    print(f"Sentence: {sentence}")
    print(f"{'='*60}")
    print(f"{'Token':<15} {'POS':<8} {'Tag':<8} {'Dep':<12} {'Explanation'}")
    print("-" * 65)
    for token in doc:
        print(f"{token.text:<15} {token.pos_:<8} {token.tag_:<8} {token.dep_:<12} {spacy.explain(token.tag_)}")
```

```
======================================================================
Sentence: Apple is looking at buying a U.K. startup for $1 billion.
======================================================================
Token           POS      Tag      Dep          Explanation
-----------------------------------------------------------------
Apple           PROPN    NNP      nsubj        noun, proper singular
is              AUX      VBZ      aux          verb, 3rd person singular present
looking         VERB     VBG      ROOT         verb, gerund or present participle
at              ADP      IN       prep         conjunction, subordinating or preposition
buying          VERB     VBG      pcomp        verb, gerund or present participle
a               DET      DT       det          determiner
U.K.            PROPN    NNP      compound     noun, proper singular
startup         NOUN     NN       dobj         noun, singular or mass
for             ADP      IN       prep         conjunction, subordinating or preposition
$               SYM      $        quantmod     symbol, currency
1               NUM      CD       compound     cardinal number
billion         NUM      CD       pobj         cardinal number
```

### 7.3 Practical Use: Extracting Noun Phrases and Key Verbs

```python
import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")

text = """
Tesla reported record quarterly revenue of $25 billion on Wednesday.
CEO Elon Musk announced aggressive expansion plans for the Gigafactory
in Texas. The company's stock surged 8% following the announcement.
Analysts at Goldman Sachs raised their price target to $300.
"""

doc = nlp(text)

# Extract noun phrases (what the text is about)
print("📌 Noun Phrases (key topics):")
for chunk in doc.noun_chunks:
    if len(chunk.text.split()) > 1:  # Only multi-word phrases
        print(f"  → '{chunk.text}' (root: {chunk.root.text})")

# Extract main verbs (key actions)
print("\n⚡ Main Actions (verbs):")
for token in doc:
    if token.pos_ == "VERB" and token.dep_ in ["ROOT", "conj"]:
        # Get subject
        subj = [child.text for child in token.children if child.dep_ in ["nsubj", "nsubjpass"]]
        obj  = [child.text for child in token.children if child.dep_ in ["dobj", "attr"]]
        print(f"  Subject: {subj} | Action: '{token.lemma_}' | Object: {obj}")
```

```
📌 Noun Phrases (key topics):
  → 'record quarterly revenue' (root: revenue)
  → 'aggressive expansion plans' (root: plans)
  → 'the Gigafactory' (root: Gigafactory)
  → 'The company's stock' (root: stock)
  → 'the announcement' (root: announcement)
  → 'their price target' (root: target)

⚡ Main Actions (verbs):
  Subject: ['Tesla'] | Action: 'report' | Object: ['revenue']
  Subject: ['Musk'] | Action: 'announce' | Object: ['plans']
  Subject: ['stock'] | Action: 'surge' | Object: []
  Subject: ['Analysts'] | Action: 'raise' | Object: ['target']
```

---

## 8. Named Entity Recognition (NER)

**NER** identifies and classifies named entities in text — people, organizations, locations, dates, monetary values, etc.

### 8.1 Entity Types

| Label | Type | Examples |
|-------|------|---------|
| `PERSON` | People, fictional | Elon Musk, Harry Potter |
| `ORG` | Companies, agencies, institutions | Tesla, NASA, WHO |
| `GPE` | Countries, cities, states | Saudi Arabia, New York, Texas |
| `LOC` | Non-GPE locations | Mount Everest, the Pacific |
| `DATE` | Absolute or relative dates | January 2024, last Tuesday |
| `TIME` | Times smaller than a day | 3:00 PM, noon, morning |
| `MONEY` | Monetary values | $1 billion, €500 |
| `PERCENT` | Percentages | 80%, fifty percent |
| `PRODUCT` | Products | iPhone 15, Model S |
| `EVENT` | Named events | the Olympics, World War II |
| `LAW` | Named legal documents | the Constitution, GDPR |
| `LANGUAGE` | Named languages | English, Mandarin |

### 8.2 Basic NER with SpaCy

```python
import spacy

nlp = spacy.load("en_core_web_sm")

text = """
Apple CEO Tim Cook announced on Tuesday that the company will invest
$430 billion in the United States over the next five years.
The investment will create 20,000 jobs across cities like Austin, Texas
and New York City. Apple's stock rose 3.5% following the announcement.
"""

doc = nlp(text)

print("🔍 Extracted Entities:")
print(f"{'Label':<12} {'Entity':<35} {'Position'}")
print("-" * 65)
for ent in doc.ents:
    print(f"{ent.label_:<12} {ent.text:<35} chars {ent.start_char}–{ent.end_char}")

# 🔍 Extracted Entities:
# Label        Entity                              Position
# -----------------------------------------------------------------
# ORG          Apple                               chars 1–6
# PERSON       Tim Cook                            chars 11–19
# DATE         Tuesday                             chars 33–40
# MONEY        $430 billion                        chars 72–84
# GPE          United States                       chars 92–105
# DATE         the next five years                 chars 109–127
# CARDINAL     20,000                              chars 149–155
# GPE          Austin                              chars 178–184
# GPE          Texas                               chars 186–191
# GPE          New York City                       chars 196–209
# ORG          Apple                               chars 212–217
# PERCENT      3.5%                                chars 230–234
```

### 8.3 Grouping Entities

```python
from collections import defaultdict
import spacy

nlp = spacy.load("en_core_web_sm")

news = """
NVIDIA's stock surged 12% after CEO Jensen Huang unveiled the new H200 GPU
at the GTC conference in San Jose, California. Microsoft, Google, and Amazon
immediately announced orders worth billions. The Santa Clara company reported
that quarterly revenue hit $22 billion, up 122% year-over-year.
Analysts from Morgan Stanley and JPMorgan Chase raised price targets.
"""

doc = nlp(news)

# Group by entity type
entities = defaultdict(set)
for ent in doc.ents:
    entities[ent.label_].add(ent.text)

print("📰 News Analysis Summary:")
print("=" * 45)
for label, ents in sorted(entities.items()):
    print(f"\n{label}:")
    for e in sorted(ents):
        print(f"  • {e}")

# 📰 News Analysis Summary:
# =============================================
# CARDINAL:
#   • 12%
#   • 122%
#   • 22 billion
#   • billions
#
# EVENT:
#   • GTC
#
# GPE:
#   • California
#   • San Jose
#
# ORG:
#   • Amazon
#   • Google
#   • JPMorgan Chase
#   • Microsoft
#   • Morgan Stanley
#   • NVIDIA
#
# PERSON:
#   • Jensen Huang
#
# PRODUCT:
#   • H200
```

### 8.4 Evaluating NER Performance

```python
import spacy
from spacy.scorer import Scorer
from spacy.training import Example

nlp = spacy.load("en_core_web_sm")

# Gold standard (correct annotations)
test_data = [
    (
        "Elon Musk founded SpaceX in 2002 in California.",
        {"entities": [(0, 9, "PERSON"), (18, 24, "ORG"), (28, 32, "DATE"), (36, 46, "GPE")]}
    ),
    (
        "Apple released the iPhone 15 in September 2023.",
        {"entities": [(0, 5, "ORG"), (18, 26, "PRODUCT"), (30, 44, "DATE")]}
    ),
]

# Score the model
examples = []
for text, annotations in test_data:
    doc = nlp.make_doc(text)
    example = Example.from_dict(doc, annotations)
    examples.append(example)

scorer = Scorer()
scores = scorer.score(examples)
print("NER Scores:")
print(f"  Precision: {scores['ents_p']:.2%}")
print(f"  Recall:    {scores['ents_r']:.2%}")
print(f"  F1 Score:  {scores['ents_f']:.2%}")
```

---

## 9. Full Pipeline with SpaCy

SpaCy lets you build a professional pipeline in just a few lines.

```python
import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def full_nlp_pipeline(text: str, verbose: bool = True) -> dict:
    """
    Complete NLP pipeline — from raw text to structured data.
    """
    doc = nlp(text)
    
    # 1. All tokens
    all_tokens = [token.text for token in doc]
    
    # 2. Clean tokens (no stop words, no punctuation, no spaces)
    clean_tokens = [
        token.text for token in doc
        if not token.is_stop
        and not token.is_punct
        and not token.is_space
        and token.is_alpha
    ]
    
    # 3. Lemmas of clean tokens
    lemmas = [
        token.lemma_.lower() for token in doc
        if not token.is_stop and not token.is_punct and token.is_alpha
    ]
    
    # 4. POS distribution
    pos_counts = Counter(token.pos_ for token in doc if not token.is_punct)
    
    # 5. Named entities
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    
    # 6. Noun phrases
    noun_phrases = [chunk.text for chunk in doc.noun_chunks]
    
    # 7. Key sentences (longest ones — rough importance heuristic)
    sentences = [sent.text.strip() for sent in doc.sents]
    key_sentence = max(sentences, key=len) if sentences else ""
    
    # 8. Statistics
    stats = {
        "char_count":      len(text),
        "word_count":      len([t for t in doc if not t.is_punct and not t.is_space]),
        "sentence_count":  len(sentences),
        "clean_tokens":    len(clean_tokens),
        "unique_lemmas":   len(set(lemmas)),
        "entity_count":    len(entities),
        "noun_phrases":    len(noun_phrases),
    }
    
    result = {
        "original":      text,
        "tokens":        all_tokens,
        "clean_tokens":  clean_tokens,
        "lemmas":        lemmas,
        "pos_counts":    dict(pos_counts),
        "entities":      entities,
        "noun_phrases":  noun_phrases,
        "key_sentence":  key_sentence,
        "stats":         stats,
    }
    
    if verbose:
        print("\n" + "="*65)
        print("🔬 FULL NLP PIPELINE ANALYSIS")
        print("="*65)
        print(f"\n📄 Original Text:\n   {text}")
        print(f"\n📊 Statistics:")
        for k, v in stats.items():
            print(f"   {k:<20}: {v}")
        print(f"\n🔤 Clean Tokens ({len(clean_tokens)}):\n   {clean_tokens}")
        print(f"\n📚 Lemmas:\n   {lemmas}")
        print(f"\n🏷️  POS Distribution:\n   {dict(pos_counts)}")
        print(f"\n🏷️  Named Entities:")
        for ent, label in entities:
            print(f"   [{label:<10}] {ent}")
        print(f"\n📌 Noun Phrases:\n   {noun_phrases}")
        print(f"\n💡 Key Sentence:\n   {key_sentence}")
    
    return result


# --- Run it ---
text = """
NVIDIA CEO Jensen Huang announced on Monday that the company's revenue
hit a record $22.1 billion last quarter, driven by surging demand for
AI chips. The Santa Clara company's stock jumped 9% to $495 following
the announcement. Microsoft and Google were cited as major customers.
"""

result = full_nlp_pipeline(text.strip())
```

---

## 10. Day Project: Product Review Analyzer

Apply everything from today to a real-world problem.

```python
import spacy
from collections import Counter, defaultdict
from typing import List, Dict

nlp = spacy.load("en_core_web_sm")

# Sample product reviews
REVIEWS = [
    {
        "product": "iPhone 15 Pro",
        "text": "This iPhone 15 Pro is absolutely amazing! The camera quality is incredible and battery life is fantastic. Best smartphone I've owned.",
        "rating": 5
    },
    {
        "product": "Samsung Galaxy S24",
        "text": "Terrible experience with the Samsung Galaxy. The screen cracked after just 2 weeks and customer service was completely useless.",
        "rating": 1
    },
    {
        "product": "MacBook Pro M3",
        "text": "Apple's new MacBook Pro with M3 chip is blazing fast. Compiles my code in seconds. The battery lasts all day. Absolutely worth it.",
        "rating": 5
    },
    {
        "product": "Sony WH-1000XM5",
        "text": "The Sony headphones have excellent noise cancellation and incredible sound quality. However, the price at $350 feels a bit high.",
        "rating": 4
    },
    {
        "product": "Microsoft Surface Pro",
        "text": "The Microsoft Surface Pro deeply disappointed me. The keyboard feels cheap, the screen is mediocre, and battery barely lasts 4 hours.",
        "rating": 2
    },
    {
        "product": "Google Pixel 8",
        "text": "Google Pixel 8 has an outstanding camera system. Night photography is phenomenal. Software is clean and fast. Very happy with this purchase.",
        "rating": 5
    },
]

# Sentiment lexicon
POSITIVE_WORDS = {
    "amazing", "incredible", "fantastic", "excellent", "outstanding",
    "phenomenal", "blazing", "fast", "clean", "happy", "worth", "best"
}
NEGATIVE_WORDS = {
    "terrible", "useless", "cracked", "disappointing", "cheap",
    "mediocre", "useless", "high", "barely"
}

# Aspect keywords
ASPECTS = {
    "camera":   ["camera", "photo", "photography", "picture", "lens"],
    "battery":  ["battery", "charge", "charging", "power", "lasts"],
    "screen":   ["screen", "display", "resolution"],
    "price":    ["price", "cost", "expensive", "cheap", "worth", "value"],
    "performance": ["fast", "speed", "slow", "performance", "processor"],
    "software": ["software", "os", "updates", "clean", "smooth"],
}


def analyze_review(review: Dict) -> Dict:
    """Analyze a single review using NLP."""
    doc = nlp(review["text"])
    
    # Sentiment signals
    adj_words = [token.lemma_.lower() for token in doc if token.pos_ == "ADJ"]
    positive = [w for w in adj_words if w in POSITIVE_WORDS]
    negative = [w for w in adj_words if w in NEGATIVE_WORDS]
    
    # Aspect detection
    all_words = [token.lemma_.lower() for token in doc]
    mentioned_aspects = []
    for aspect, keywords in ASPECTS.items():
        if any(kw in all_words for kw in keywords):
            mentioned_aspects.append(aspect)
    
    # Entities
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    
    # Determine sentiment from rating
    if review["rating"] >= 4:
        sentiment = "POSITIVE 😊"
    elif review["rating"] == 3:
        sentiment = "NEUTRAL 😐"
    else:
        sentiment = "NEGATIVE 😞"
    
    return {
        "product":    review["product"],
        "rating":     review["rating"],
        "sentiment":  sentiment,
        "positive":   positive,
        "negative":   negative,
        "aspects":    mentioned_aspects,
        "entities":   entities,
    }


def analyze_all_reviews(reviews: List[Dict]) -> None:
    """Full analysis report."""
    all_aspects = Counter()
    all_positive = Counter()
    all_negative = Counter()
    sentiment_dist = Counter()
    
    print("\n" + "="*65)
    print("📦 PRODUCT REVIEW ANALYSIS REPORT")
    print("="*65)
    
    for review in reviews:
        result = analyze_review(review)
        
        print(f"\n{'─'*60}")
        print(f"📱 Product:   {result['product']}")
        print(f"⭐ Rating:    {result['rating']}/5")
        print(f"💬 Sentiment: {result['sentiment']}")
        print(f"✅ Positive words: {result['positive'] or ['none']}")
        print(f"❌ Negative words: {result['negative'] or ['none']}")
        print(f"🔍 Aspects mentioned: {result['aspects'] or ['none']}")
        
        # Aggregate
        all_positive.update(result["positive"])
        all_negative.update(result["negative"])
        all_aspects.update(result["aspects"])
        sentiment_dist[result["sentiment"]] += 1
    
    # Overall summary
    print(f"\n{'='*65}")
    print("📊 OVERALL SUMMARY")
    print(f"{'='*65}")
    
    avg_rating = sum(r["rating"] for r in reviews) / len(reviews)
    print(f"\n⭐ Average Rating: {avg_rating:.1f}/5.0")
    
    print(f"\n💬 Sentiment Distribution:")
    for sentiment, count in sentiment_dist.most_common():
        bar = "█" * count
        print(f"  {sentiment:<20} {bar} ({count})")
    
    print(f"\n✅ Most Common Positive Words:")
    for word, count in all_positive.most_common(5):
        print(f"  {word:<15} mentioned {count}x")
    
    print(f"\n❌ Most Common Negative Words:")
    for word, count in all_negative.most_common(5):
        print(f"  {word:<15} mentioned {count}x")
    
    print(f"\n🔍 Most Discussed Aspects:")
    for aspect, count in all_aspects.most_common():
        bar = "▓" * count
        print(f"  {aspect:<15} {bar} ({count} reviews)")


# --- Run the analysis ---
analyze_all_reviews(REVIEWS)
```

**Output:**
```
=================================================================
📦 PRODUCT REVIEW ANALYSIS REPORT
=================================================================

────────────────────────────────────────────────────────────
📱 Product:   iPhone 15 Pro
⭐ Rating:    5/5
💬 Sentiment: POSITIVE 😊
✅ Positive words: ['amazing', 'incredible', 'fantastic', 'best']
❌ Negative words: []
🔍 Aspects mentioned: ['camera', 'battery']

... (more reviews)

=================================================================
📊 OVERALL SUMMARY
=================================================================

⭐ Average Rating: 3.7/5.0

💬 Sentiment Distribution:
  POSITIVE 😊          ███ (3)
  NEGATIVE 😞          ██ (2)
  NEUTRAL 😐           █ (1)

✅ Most Common Positive Words:
  amazing         mentioned 1x
  incredible      mentioned 2x
  excellent       mentioned 1x
  outstanding     mentioned 1x
  fast            mentioned 2x

❌ Most Common Negative Words:
  terrible        mentioned 1x
  cheap           mentioned 1x
  mediocre        mentioned 1x

🔍 Most Discussed Aspects:
  battery         ▓▓▓ (3 reviews)
  camera          ▓▓▓ (3 reviews)
  price           ▓▓ (2 reviews)
  performance     ▓▓ (2 reviews)
  screen          ▓ (1 reviews)
  software        ▓ (1 reviews)
```

---

## 11. Visual Summary

```
Day 1 — Everything in One Flow:
═══════════════════════════════════════════════════════════════════

  Raw Text: "Apple CEO Tim Cook said iPhone sales rose 20% last quarter!"
      │
      ▼
  Text Cleaning
  "Apple CEO Tim Cook said iPhone sales rose 20 last quarter"
      │
      ▼
  Tokenization
  ["Apple","CEO","Tim","Cook","said","iPhone","sales","rose","20","last","quarter","!"]
      │
      ▼
  Stop Words Removal
  ["Apple","CEO","Tim","Cook","iPhone","sales","rose","20","quarter"]
      │
      ▼
  Lemmatization
  ["apple","ceo","tim","cook","iphone","sale","rise","20","quarter"]
      │
      ▼
  POS Tagging
  Apple(PROPN) CEO(NOUN) Tim(PROPN) Cook(PROPN) iPhone(PROPN) sales(NOUN) rose(VERB)
      │
      ▼
  Named Entity Recognition
  [PERSON: Tim Cook] [ORG: Apple] [PRODUCT: iPhone] [PERCENT: 20%] [DATE: last quarter]
      │
      ▼
  Structured, meaningful data ✓

═══════════════════════════════════════════════════════════════════
```

---

## 12. Practice Exercises

### Exercise 1 — Easy
```python
# Apply the full pipeline to this financial news text.
# Extract and print all entities grouped by type.

text = """
Saudi Aramco reported record profits of $161 billion in fiscal year 2022.
CEO Amin Nasser announced plans to invest $50 billion in expanding
production capacity over the next decade. The company, headquartered
in Dhahran, Saudi Arabia, expects global oil demand to remain strong.
"""
# Your code here:
```

### Exercise 2 — Medium
```python
# Write a function that computes the similarity between two sentences
# based on their shared lemmas (Jaccard Similarity).

def sentence_similarity(sent1: str, sent2: str) -> float:
    """
    Jaccard Similarity = |intersection| / |union|
    
    Steps:
    1. Lemmatize both sentences (remove stop words)
    2. Convert to sets
    3. Compute Jaccard: len(A ∩ B) / len(A ∪ B)
    """
    # Your code here:
    pass

# Test cases:
pairs = [
    ("I am running to the store", "She runs to the market"),
    ("The cat sat on the mat", "Dogs are better than cats"),
    ("Machine learning is a subset of AI", "Artificial intelligence includes machine learning"),
]
for s1, s2 in pairs:
    sim = sentence_similarity(s1, s2)
    print(f"Similarity: {sim:.2%}\n  → '{s1}'\n  → '{s2}'\n")
```

### Exercise 3 — Advanced
```python
# Build a simple information extraction system.
# Input: A news article
# Output: Structured JSON with who did what, when, and where.

def extract_events(text: str) -> list:
    """
    Extract events in the form:
    {
        "subject": "Tesla",
        "action": "announced",
        "object": "new factory",
        "location": "Texas",
        "date": "last Tuesday"
    }
    """
    # Hint: Use dependency parsing (token.dep_)
    # Subject → nsubj
    # Object  → dobj
    # Date    → look for DATE entities near the verb
    # Location → look for GPE entities
    
    # Your code here:
    pass

news = """
Tesla announced a new Gigafactory in Mexico last Monday.
Apple unveiled the Vision Pro headset at WWDC in California.
Amazon acquired MGM Studios for $8.45 billion in 2022.
"""
events = extract_events(news)
for e in events:
    print(e)
```

---

## 📚 Full Resources

| Resource | Type | Link | Priority |
|----------|------|------|----------|
| NLTK Book — Chapters 1 & 2 | Free book | https://www.nltk.org/book/ | ⭐⭐⭐ |
| SpaCy 101 | Interactive docs | https://spacy.io/usage/spacy-101 | ⭐⭐⭐ |
| Stanford CS224N (YouTube) | University lectures | https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ | ⭐⭐⭐ |
| Hugging Face NLP Course | Free course | https://huggingface.co/learn/nlp-course/chapter1 | ⭐⭐⭐ |
| SpaCy Linguistic Features | Docs | https://spacy.io/usage/linguistic-features | ⭐⭐ |
| Real Python — SpaCy Guide | Article | https://realpython.com/natural-language-processing-spacy-python/ | ⭐⭐ |
| Explosion AI Blog | Articles | https://explosion.ai/blog | ⭐ |

---

## ✅ Day 1 Checklist

Before moving to Day 2, make sure you can:

- [ ] Explain why language is hard for computers (with examples)
- [ ] Apply `clean_text()` to messy real-world text
- [ ] Tokenize text using both word-level and subword-level methods
- [ ] Explain the difference between BPE (GPT) and WordPiece (BERT)
- [ ] Remove stop words and explain when NOT to
- [ ] Demonstrate Stemming vs Lemmatization with a concrete example
- [ ] Extract POS tags and interpret the dependency tree
- [ ] Extract named entities from a news article
- [ ] Run the full pipeline on a new text you chose
- [ ] Complete at least Exercise 1 and Exercise 2

---

> **💡 Pro Tip:** Don't try to memorize everything — focus on *understanding why* each step exists. The code can be looked up later, but the conceptual understanding is what makes you a strong NLP engineer.

---

*Next up → Day 2: Text Representations — Bag of Words & TF-IDF — How do we turn words into numbers that machines can learn from?*
