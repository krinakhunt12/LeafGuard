from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn
import numpy as np
from PIL import Image
import tensorflow as tf
import os
import io
import uuid
import shutil
from dotenv import load_dotenv
from typing import List, Optional

# Load environment variables from .env file
load_dotenv()

from sqlalchemy.orm import Session
from fastapi import Depends
import models
import schemas
import auth
from database import engine, get_db
from fastapi.security import OAuth2PasswordBearer
from chatbot_engine import AgroChatbot

# Create database tables
try:
    print("Connecting to database...")
    models.Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")
except Exception as e:
    print(f"Error creating database tables: {e}")

# Load model and class names
MODEL_PATH = "plant_disease_model.h5"
CLASS_NAMES_PATH = "class_names.txt"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Initialize Chatbot Engine
chatbot = AgroChatbot()

model = None
class_names = []

DISEASE_INFO = {
    "Apple___Apple_scab": {
        "description": "Apple scab is a fungal disease caused by Venturia inaequalis, affecting apple trees and their fruit.",
        "treatments": ["Apply fungicides (captan, mancozeb).", "Prune trees to improve air circulation.", "Rake and destroy fallen leaves."],
        "isHealthy": False
    },
    "Apple___Black_rot": {
        "description": "Black rot is a common fungal disease of apples, caused by Diplodia seriata.",
        "treatments": ["Prune out cankers and dead wood.", "Apply fungicides.", "Maintain tree health."],
        "isHealthy": False
    },
    "Apple___Cedar_apple_rust": {
        "description": "A fungal disease that requires both apple and cedar trees to complete its life cycle.",
        "treatments": ["Remove cedar trees from the vicinity.", "Apply fungicides regularly.", "Plant resistant varieties."],
        "isHealthy": False
    },
    "Apple___healthy": {
        "description": "The apple leaf is healthy and showing no signs of disease.",
        "treatments": ["Continue regular monitoring.", "Maintain good cultivation practices."],
        "isHealthy": True
    },
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "description": "A significant fungal disease of corn worldwide, caused by Cercospora zeae-maydis.",
        "treatments": ["Use resistant hybrids.", "Crop rotation.", "Apply fungicides if necessary."],
        "isHealthy": False
    },
    "Corn_(maize)___Common_rust_": {
        "description": "Caused by the fungus Puccinia sorghi, appearing as reddish-brown pustules on leaves.",
        "treatments": ["Use resistant corn hybrids.", "Early planting.", "Apply fungicides during early stages."],
        "isHealthy": False
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "description": "Northern Leaf Blight is a fungal disease caused by Exserohilum turcicum.",
        "treatments": ["Resistant hybrids.", "Tillage to bury residue.", "Timely fungicide application."],
        "isHealthy": False
    },
    "Corn_(maize)___healthy": {
        "description": "The corn leaf appears healthy.",
        "treatments": ["Regular checkups.", "Ensure proper nutrition."],
        "isHealthy": True
    },
    "Pepper__bell___Bacterial_spot": {
        "description": "Bacterial spot is caused by Xanthomonas campestris pv. vesicatoria.",
        "treatments": ["Use disease-free seeds.", "Copper-based sprays.", "Avoiding overhead irrigation."],
        "isHealthy": False
    },
    "Pepper__bell___healthy": {
        "description": "The bell pepper leaf is healthy.",
        "treatments": ["Monitor for pests.", "Maintain consistent watering."],
        "isHealthy": True
    },
    "Potato___Early_blight": {
        "description": "Early blight is caused by the fungus Alternaria solani.",
        "treatments": ["Fungicide application.", "Crop rotation.", "Removal of infected debris."],
        "isHealthy": False
    },
    "Potato___Late_blight": {
        "description": "Late blight is caused by Phytophthora infestans and can be very destructive.",
        "treatments": ["Regular fungicide application.", "Destroying volunteer potatoes.", "Avoid excessive moisture."],
        "isHealthy": False
    },
    "Potato___healthy": {
        "description": "The potato leaf is healthy.",
        "treatments": ["Routine maintenance.", "Ensure good drainage."],
        "isHealthy": True
    },
    "Tomato_Bacterial_spot": {
        "description": "Bacterial spot of tomato is caused by several species of Xanthomonas.",
        "treatments": ["Seed treatment.", "Antibiotic sprays.", "Strict sanitation."],
        "isHealthy": False
    },
    "Tomato_Early_blight": {
        "description": "Tomato early blight is a common disease caused by Alternaria solani.",
        "treatments": ["Mulching around plants.", "Fungicides.", "Pruning lower leaves."],
        "isHealthy": False
    },
    "Tomato_Late_blight": {
        "description": "A devastating disease caused by Phytophthora infestans.",
        "treatments": ["Immediate removal of infected plants.", "Preventative fungicides.", "Ensure air flow."],
        "isHealthy": False
    },
    "Tomato_Leaf_Mold": {
        "description": "Leaf mold is a fungal disease that thrives in high humidity.",
        "treatments": ["Increase ventilation.", "Reduce humidity.", "Fungicides."],
        "isHealthy": False
    },
    "Tomato_Septoria_leaf_spot": {
        "description": "Caused by Septoria lycopersici, it starts on the lower leaves.",
        "treatments": ["Avoid splashing water.", "Fungicide application.", "Crop rotation."],
        "isHealthy": False
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "description": "Damage caused by tiny arachnids that suck plant juices.",
        "treatments": ["Miticides.", "Natural predators like ladybugs.", "Increase humidity."],
        "isHealthy": False
    },
    "Tomato__Target_Spot": {
        "description": "Caused by Corynespora cassiicola, forming target-like rings.",
        "treatments": ["Avoid overhead irrigation.", "Fungicides.", "Wider plant spacing."],
        "isHealthy": False
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "description": "A viral disease transmitted by whiteflies.",
        "treatments": ["Whitefly control using nets or insecticides.", "Removing infected plants.", "Using resistant varieties."],
        "isHealthy": False
    },
    "Tomato__Tomato_mosaic_virus": {
        "description": "A highly contagious virus causing mottling and distortion.",
        "treatments": ["Sanitize tools.", "Remove infected plants.", "Control aphids."],
        "isHealthy": False
    },
    "Tomato_healthy": {
        "description": "The tomato leaf is perfectly healthy.",
        "treatments": ["Periodic monitoring.", "Balanced fertilization."],
        "isHealthy": True
    }
}

def load_data():
    global model, class_names
    if os.path.exists(MODEL_PATH):
        try:
            model = tf.keras.models.load_model(MODEL_PATH)
            print(f"Model loaded correctly from {MODEL_PATH}.")
        except Exception as e:
            print(f"Error loading model: {e}")
    else:
        print(f"Model '{MODEL_PATH}' not found. Please train the model first.")

    if os.path.exists(CLASS_NAMES_PATH):
        with open(CLASS_NAMES_PATH, 'r') as f:
            class_names = [line.strip() for line in f.readlines()]
        print(f"Class names loaded correctly from {CLASS_NAMES_PATH}.")
    else:
        print(f"'{CLASS_NAMES_PATH}' not found. Please train the model first.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load model and data
    load_data()
    yield
    # Shutdown: Clean up if needed
    pass

app = FastAPI(title="Plant Disease Detection API", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images as static files
UPLOAD_DIR = "forum_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/forum_uploads", StaticFiles(directory=UPLOAD_DIR), name="forum_uploads")

@app.post("/upload/forum-image")
async def upload_forum_image(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Upload a forum image and return its URL."""
    # Validate auth
    email = auth.get_current_user(db, token)
    if not email:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")
    
    # Validate file size (5MB max)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 5MB allowed.")
    
    # Validate it's a real image
    try:
        img = Image.open(io.BytesIO(content))
        img.verify()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file.")
    
    # Save with unique name
    ext = os.path.splitext(file.filename or "image.jpg")[1] or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    return {"url": f"http://127.0.0.1:8000/forum_uploads/{filename}"}

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(io.BytesIO(data)).convert('RGB')
    image = image.resize((128, 128))
    return np.array(image)

@app.post("/predict")
async def predict(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please train it first.")
    
    try:
        image = read_file_as_image(await file.read())
        image = image / 255.0
        image_batch = np.expand_dims(image, 0)
        
        predictions = model.predict(image_batch)
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = class_names[predicted_class_index]
        confidence = float(np.max(predictions[0]))
        
        current_user_email = auth.get_current_user(db, token)
        db_user = None
        if current_user_email:
            db_user = db.query(models.User).filter(models.User.email == current_user_email).first()

        info = DISEASE_INFO.get(predicted_class, {
            "description": f"No detailed information available for {predicted_class}.",
            "treatments": ["No treatment info found."],
            "isHealthy": "healthy" in predicted_class.lower()
        })
        
        db_diagnosis = models.Diagnosis(
            disease_name=predicted_class.replace("___", " ").replace("_", " "),
            confidence=round(confidence * 100, 2),
            description=info["description"],
            treatments=info["treatments"],
            is_healthy=info["isHealthy"],
            user_id=db_user.id if db_user else None
        )
        db.add(db_diagnosis)
        db.commit()
        db.refresh(db_diagnosis)
        
        return {
            "id": db_diagnosis.id,
            "diseaseName": db_diagnosis.disease_name,
            "confidence": db_diagnosis.confidence,
            "description": db_diagnosis.description,
            "treatments": db_diagnosis.treatments,
            "isHealthy": db_diagnosis.is_healthy,
            "timestamp": db_diagnosis.created_at
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Invalid image format or prediction error: {e}")

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

# Authentication Routes
@app.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        full_name=user.fullName,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not db_user or not auth.verify_password(user_credentials.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
def get_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = auth.get_current_user(db, token)
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(models.User).filter(models.User.email == email).first()
    return {
        "id": user.id,
        "email": user.email,
        "fullName": user.full_name,
        "isExpert": user.is_expert
    }

@app.get("/diagnoses")
def get_diagnoses(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = auth.get_current_user(db, token)
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(models.User).filter(models.User.email == email).first()
    diagnoses = db.query(models.Diagnosis).filter(models.Diagnosis.user_id == user.id).order_by(models.Diagnosis.created_at.desc()).all()
    
    return [
        {
            "id": d.id,
            "diseaseName": d.disease_name,
            "confidence": d.confidence,
            "description": d.description,
            "treatments": d.treatments,
            "isHealthy": d.is_healthy,
            "timestamp": d.created_at
        } for d in diagnoses
    ]

@app.post("/chat")
async def chat(request: dict):
    message = request.get("message")
    language = request.get("language", "en-IN")
    if not message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    try:
        response_data = chatbot.get_response(message, language=language)
        return {"response": response_data["response"]}
    except Exception as e:
        print(f"Chatbot error: {e}")
        return {"response": f"Chatbot Error: {str(e)}"}

# --- Community Forum Routes ---

@app.get("/forum/posts", response_model=List[schemas.Post])
def get_forum_posts(db: Session = Depends(get_db)):
    return db.query(models.ForumPost).order_by(models.ForumPost.created_at.desc()).all()

@app.post("/forum/posts", response_model=schemas.Post)
def create_forum_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    email = auth.get_current_user(db, token)
    user = db.query(models.User).filter(models.User.email == email).first()
    
    db_post = models.ForumPost(
        **post.model_dump(),
        user_id=user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/forum/posts/{post_id}", response_model=schemas.Post)
def get_forum_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.ForumPost).filter(models.ForumPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/verify-certificate/{diagnosis_id}")
def verify_certificate(diagnosis_id: int, db: Session = Depends(get_db)):
    """Public verification endpoint for insurance providers to verify certificates."""
    diagnosis = db.query(models.Diagnosis).filter(models.Diagnosis.id == diagnosis_id).first()
    if not diagnosis:
        raise HTTPException(status_code=404, detail="Certificate not found or invalid ID.")
    
    return {
        "certificateId": f"LG-{str(diagnosis.id).zfill(6)}",
        "issuedTo": diagnosis.owner.full_name if diagnosis.owner else "Guest User",
        "issueDate": diagnosis.created_at,
        "verificationTimestamp": datetime.utcnow().isoformat(),
        "status": "VERIFIED & AUTHENTIC",
        "data": {
            "diseaseName": diagnosis.disease_name,
            "confidence": diagnosis.confidence,
            "isHealthy": diagnosis.is_healthy,
            "treatmentsRecommended": len(diagnosis.treatments) if diagnosis.treatments else 0
        },
        "providerNote": "This certificate is digitally signed and verified by LeafGuard AI Systems."
    }

@app.post("/forum/comments", response_model=schemas.Comment)
def create_forum_comment(
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    email = auth.get_current_user(db, token)
    user = db.query(models.User).filter(models.User.email == email).first()
    
    db_comment = models.ForumComment(
        **comment.model_dump(),
        user_id=user.id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)