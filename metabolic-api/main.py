from __future__ import annotations

from contextlib import asynccontextmanager
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import predictor
from models import PatientInput, PredictionResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    model_path = predictor.get_default_model_path()
    model = predictor.load_model(str(model_path))
    predictor.load_runtime_scaler()
    predictor.print_model_verification(model)
    yield


app = FastAPI(
    title="MetabolicRisk API",
    description="6-class metabolic obesity phenotype classifier. The bundled pickle loads as an XGBClassifier and is aligned to the training order extracted from ML.py.",
    version="1.0.0",
    contact={"name": "Emir Özcan & Nazan Sonal", "url": "https://github.com/[REPO]"},
    lifespan=lifespan,
)

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,https://metabolic-app.vercel.app",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


PHENOTYPES: list[dict[str, str]] = [
    {
        "code": "MHNW",
        "full_name": "Metabolically Healthy Normal Weight",
        "bmi_range": "18.5-24.9",
        "metabolic_status": "healthy",
        "clinical_note": "Normal BMI with no major metabolic risk flags.",
        "risk_level": "low",
    },
    {
        "code": "MUNW",
        "full_name": "Metabolically Unhealthy Normal Weight",
        "bmi_range": "18.5-24.9",
        "metabolic_status": "unhealthy",
        "clinical_note": "Normal BMI but adverse metabolic markers are present.",
        "risk_level": "moderate",
    },
    {
        "code": "MHOW",
        "full_name": "Metabolically Healthy Overweight",
        "bmi_range": "25.0-29.9",
        "metabolic_status": "healthy",
        "clinical_note": "Overweight range with relatively favorable biomarkers.",
        "risk_level": "low",
    },
    {
        "code": "MUOW",
        "full_name": "Metabolically Unhealthy Overweight",
        "bmi_range": "25.0-29.9",
        "metabolic_status": "unhealthy",
        "clinical_note": "Overweight range with clear metabolic dysfunction.",
        "risk_level": "moderate",
    },
    {
        "code": "MHO",
        "full_name": "Metabolically Healthy Obese",
        "bmi_range": "30.0+",
        "metabolic_status": "healthy",
        "clinical_note": "Obesity by BMI but limited metabolic derangement.",
        "risk_level": "low",
    },
    {
        "code": "MUO",
        "full_name": "Metabolically Unhealthy Obese",
        "bmi_range": "30.0+",
        "metabolic_status": "unhealthy",
        "clinical_note": "Highest-risk phenotype with obesity and metabolic abnormalities.",
        "risk_level": "high",
    },
]


@app.get("/health")
def health() -> dict[str, object]:
    if not predictor.is_model_loaded():
        try:
            predictor.load_model(str(predictor.get_default_model_path()))
            predictor.load_runtime_scaler()
        except Exception:
            pass

    return {
        "status": "ok",
        "model_loaded": predictor.is_model_loaded(),
        "scaler_loaded": predictor.is_scaler_loaded(),
        "model_accuracy": 0.9256,
        "classes": 6,
    }


@app.get("/model-info")
def model_info() -> dict[str, object]:
    return {
        "model_type": "XGBClassifier",
        "feature_count": 24,
        "feature_names": predictor.TRAINING_FEATURE_ORDER,
        "runtime_scaler_loaded": predictor.is_scaler_loaded(),
        "class_labels": {str(class_id): labels[0] for class_id, labels in predictor.CLASS_LABELS.items()},
        "training_accuracy": 0.9256,
        "training_f1": 0.9234,
        "cohens_kappa": None,
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(payload: PatientInput) -> PredictionResponse:
    try:
        return predictor.predict(payload)
    except Exception as exc:  # pragma: no cover - defensive boundary for API errors
        raise HTTPException(status_code=500, detail="Model inference failed") from exc


@app.get("/phenotypes")
def phenotypes() -> list[dict[str, str]]:
    return PHENOTYPES