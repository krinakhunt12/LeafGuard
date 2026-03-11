from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from PIL import Image
import tensorflow as tf
import os
import io

app = FastAPI(title="Plant Disease Detection API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and class names
MODEL_PATH = "plant_disease_model.h5"
CLASS_NAMES_PATH = "class_names.txt"

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
        "description": "北方叶斑病 (Northern Leaf Blight) is a fungal disease caused by Exserohilum turcicum.",
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

@app.on_event("startup")
async def startup_event():
    load_data()

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(io.BytesIO(data)).convert('RGB')
    image = image.resize((128, 128))
    return np.array(image)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please train it first.")
    
    # Read image
    try:
        image = read_file_as_image(await file.read())
        # Rescale the image like in the training process
        image = image / 255.0
        # Add batch dimension
        image_batch = np.expand_dims(image, 0)
        
        predictions = model.predict(image_batch)
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = class_names[predicted_class_index]
        confidence = float(np.max(predictions[0]))
        
        info = DISEASE_INFO.get(predicted_class, {
            "description": f"No detailed information available for {predicted_class}.",
            "treatments": ["No treatment info found."],
            "isHealthy": "healthy" in predicted_class.lower()
        })
        
        return {
            "diseaseName": predicted_class.replace("___", " ").replace("_", " "),
            "confidence": round(confidence * 100, 2),
            "description": info["description"],
            "treatments": info["treatments"],
            "isHealthy": info["isHealthy"]
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Invalid image format or prediction error: {e}")

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)