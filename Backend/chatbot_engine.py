import json
import os
import re
import pickle
import string
from pathlib import Path

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

# ─────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────
BASE_DIR  = Path(__file__).parent
DATA_PATH  = str(BASE_DIR / "chatbot_data.json")
INDEX_PATH = str(BASE_DIR / "faiss_index.bin")
META_PATH  = str(BASE_DIR / "faiss_meta.pkl")

EMBED_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

# ── HuggingFace LLM config ────────────────────────────────────────
HF_TOKEN = os.getenv("HF_TOKEN") or os.getenv("HF_API_KEY")
HF_MODEL = "meta-llama/Llama-3.1-8B-Instruct:cerebras"

_hf_client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN,
) if HF_TOKEN else None

if _hf_client:
    print(f"🤖 HF LLM ready → {HF_MODEL}")
else:
    print("⚠️  HF_TOKEN missing — fallback canned responses will be used")

BASE_SIMILARITY_THRESHOLD = 0.35
KEYWORD_BONUS_WEIGHT      = 0.15

# ─────────────────────────────────────────────────────────────────
# UNICODE RANGES
# ─────────────────────────────────────────────────────────────────
GUJARATI_RE      = re.compile(r"[\u0A80-\u0AFF]")
DEVANAGARI_RE    = re.compile(r"[\u0900-\u097F]")
GUJARATI_WORD_RE = re.compile(r"[\u0A80-\u0AFF]+")
HINDI_WORD_RE    = re.compile(r"[\u0900-\u097F]+")

def detect_language(text: str) -> str:
    guj = len(GUJARATI_RE.findall(text))
    dev = len(DEVANAGARI_RE.findall(text))
    if guj == 0 and dev == 0:
        return "english"
    return "gujarati" if guj >= dev else "hindi"

def filter_responses(responses: list, lang: str) -> list:
    if lang == "gujarati":
        out = [r for r in responses if GUJARATI_RE.search(r)]
    elif lang == "hindi":
        out = [r for r in responses
               if DEVANAGARI_RE.search(r) and not GUJARATI_RE.search(r)]
    else:
        out = [r for r in responses
               if not GUJARATI_RE.search(r) and not DEVANAGARI_RE.search(r)]
    return out if out else responses

# ─────────────────────────────────────────────────────────────────
# FALLBACK MESSAGES
# ─────────────────────────────────────────────────────────────────
FALLBACK = {
    "english" : "Sorry, I don't have correct information for your question.",
    "gujarati": "માફ કરશો, તમારા પ્રશ્ન માટે મારી પાસે સાચી માહિતી નથી.",
    "hindi"   : "माफ करें, आपके प्रश्न के लिए मेरे पास सही जानकारी नहीं है।",
}

# ─────────────────────────────────────────────────────────────────
# LLM LANGUAGE INSTRUCTIONS
# ─────────────────────────────────────────────────────────────────
LANG_INSTR = {
    "english" : "Answer ONLY in English.",
    "gujarati": "Answer ONLY in Gujarati (ગુજરાતી). Do NOT use English or Hindi.",
    "hindi"   : "Answer ONLY in Hindi (हिंदी). Do NOT use English or Gujarati.",
}

# ─────────────────────────────────────────────────────────────────
# TAG DESCRIPTIONS
# ─────────────────────────────────────────────────────────────────
TAG_DESCRIPTIONS = {
    "wheat_farming"        : "ઘઉ ઘઉં ખેતી गेहूं खेती | wheat farming",
    "pest_control"         : "જીવાત कीट | pest management",
    "greeting"             : "नमस्ते | hello hi welcome",
}

def load_and_chunk(data_path: str) -> list:
    if not os.path.exists(data_path):
        return []
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    seen:   set  = set()
    chunks: list = []

    for intent in data["intents"]:
        tag       = intent["tag"]
        patterns  = intent["patterns"]
        responses = intent["responses"]

        description  = TAG_DESCRIPTIONS.get(tag, tag.replace("_", " "))
        tag_readable = tag.replace("_", " ")

        chunk_text = f"{tag_readable} {description} {' '.join(patterns)}"

        if tag in seen:
            continue

        seen.add(tag)
        chunks.append({
            "tag"       : tag,
            "patterns"  : patterns,
            "responses" : responses,
            "chunk_text": chunk_text,
            "keywords"  : extract_keywords(chunk_text),
        })
    return chunks

def extract_keywords(text: str) -> set:
    kw = set()
    en = re.findall(r"[a-zA-Z]{3,}", text.lower())
    kw |= {t for t in en}
    kw |= set(GUJARATI_WORD_RE.findall(text))
    kw |= set(HINDI_WORD_RE.findall(text))
    return kw

def embed_chunks(chunks: list, model: SentenceTransformer) -> np.ndarray:
    texts = [c["chunk_text"] for c in chunks]
    emb = model.encode(texts, convert_to_numpy=True)
    faiss.normalize_L2(emb)
    return emb.astype("float32")

def build_index(embeddings: np.ndarray, chunks: list) -> faiss.IndexFlatIP:
    dim   = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(embeddings)
    faiss.write_index(index, INDEX_PATH)
    with open(META_PATH, "wb") as f:
        pickle.dump(chunks, f)
    return index

def load_index():
    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def _embed_single(text: str, model: SentenceTransformer) -> np.ndarray:
    v = model.encode([text], convert_to_numpy=True).astype("float32")
    faiss.normalize_L2(v)
    return v

def retrieve(query: str, index, chunks: list, model: SentenceTransformer, top_k: int = 3):
    q_vec = _embed_single(query, model)
    scores, idx = index.search(q_vec, top_k)
    if idx[0][0] == -1: return None, 0.0
    return chunks[idx[0][0]], float(scores[0][0])

def generate_answer(query: str, chunk: dict, lang: str) -> str:
    lang_responses = filter_responses(chunk["responses"], lang)
    context        = "\n".join(f"- {r}" for r in lang_responses)
    lang_instr     = LANG_INSTR.get(lang, LANG_INSTR["english"])

    system_prompt = (
        "You are LeafGuard AI, a helpful agricultural assistant. "
        "Answer the user's question using the provided context. "
        "Be concise and professional. " + lang_instr
    )
    user_msg = f"Context:\n{context}\n\nQuestion: {query}"

    if not _hf_client:
        return lang_responses[0] if lang_responses else FALLBACK[lang]

    try:
        response = _hf_client.chat.completions.create(
            model=HF_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_msg},
            ],
            max_tokens=500,
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"LLM Error: {e}")
        return lang_responses[0] if lang_responses else FALLBACK[lang]

class AgroChatbot:
    def __init__(self):
        if not os.path.exists(INDEX_PATH):
            chunks = load_and_chunk(DATA_PATH)
            model = SentenceTransformer(EMBED_MODEL)
            embeddings = embed_chunks(chunks, model)
            build_index(embeddings, chunks)
        
        self.index, self.chunks = load_index()
        self.model = SentenceTransformer(EMBED_MODEL)

    def get_response(self, query: str) -> dict:
        lang = detect_language(query)
        chunk, score = retrieve(query, self.index, self.chunks, self.model)
        
        if chunk and score >= BASE_SIMILARITY_THRESHOLD:
            response = generate_answer(query, chunk, lang)
            return {"response": response, "intent": chunk["tag"]}
        
        return {"response": FALLBACK[lang], "intent": "fallback"}
