# 🌿 LeafGuard: AI-Powered Plant Disease Detection

![LeafGuard Banner](./leafguard_banner.png)

LeafGuard is a state-of-the-art deep learning application designed to help farmers and gardeners identify plant diseases instantly. By leveraging a Convolutional Neural Network (CNN) trained on thousands of leaf images, LeafGuard provides accurate diagnoses along with detailed descriptions and recommended treatments.

## ✨ Features

- **Instant Diagnosis**: High-accuracy detection for 23 different plant disease classes.
- **Detailed Insights**: Get descriptions of the disease and actionable treatment steps.
- **Premium UI/UX**: Built with a modern, responsive interface using React and Tailwind CSS.
- **Developer-Friendly**: Clean FastAPI backend with a clear separation of concerns.

## 🚀 Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Machine Learning**: TensorFlow / Keras
- **Image Processing**: Pillow, NumPy
- **Server**: Uvicorn

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS / Vanilla CSS
- **Animations**: CSS Transitions & Lucide Icons
- **State Management**: Hooks (useState, useEffect)

## 🛠️ Installation & Setup

### 1. Prerequisite
- Python 3.12+
- Node.js (v18+)
- Git

### 2. Backend Setup
```bash
cd Backend
# Create virtual environment
python -m venv venv
# Activate virtual environment (Windows)
.\venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
```

### 3. Model Training
If you want to retrain the model with your own dataset:
```bash
# Ensure your dataset is in the 'Dataset/' folder in the root
python train.py
```
*Note: This will generate `plant_disease_model.h5` and `class_names.txt`.*

### 4. Frontend Setup
```bash
cd Frontend
# Install dependencies
npm install
```

## 🏃 Running the Project

### Start the API
```bash
cd Backend
python main.py
```
The backend will be running at `http://localhost:8000`.

### Start the Web Studio
```bash
cd Frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```text
LeafGuard/
├── Backend/
│   ├── main.py                # FastAPI Application
│   ├── train.py               # Model Training Script
│   ├── requirements.txt       # Python Dependencies
│   └── class_names.txt        # Generated Class Mappings
│
├── Frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, and static files
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # UI utility components
│   │   │   ├── AboutSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageSkeleton.tsx
│   │   │   ├── ResultSection.tsx
│   │   │   └── UploadSection.tsx
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts       # Utility helper functions
│   │   │
│   │   ├── pages/             # Application pages
│   │   │   ├── AnalyzePage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── HowItWorksPage.tsx
│   │   │   └── TechnologyPage.tsx
│   │   │
│   │   ├── App.tsx            # Root React component
│   │   ├── App.css            # Global styles
│   │   ├── index.css          # Tailwind / base styles
│   │   └── main.tsx           # Vite entry point
│   │
│   ├── index.html             # HTML template
│   ├── eslint.config.js       # ESLint configuration
│   ├── package.json           # Node dependencies
│   ├── package-lock.json
│   └── .gitignore
│
├── Dataset/                   # Plant disease dataset
└── README.md
```

## 📝 License
This project is for educational purposes as part of an agriculture-focused AI initiative.

---
Built with ❤️ by **Krina**
