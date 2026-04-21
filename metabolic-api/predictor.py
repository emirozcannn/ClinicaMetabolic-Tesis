from __future__ import annotations

from pathlib import Path
from typing import Any, Final

import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

from models import PatientInput, PredictionResponse

MODEL: Any | None = None
MODEL_PATH: str | None = None
SCALER: StandardScaler | None = None

CLASS_LABELS: Final[dict[int, tuple[str, str]]] = {
    0: ("MHNW", "Metabolically Healthy Normal Weight"),
    1: ("MUNW", "Metabolically Unhealthy Normal Weight"),
    2: ("MHOW", "Metabolically Healthy Overweight"),
    3: ("MUOW", "Metabolically Unhealthy Overweight"),
    4: ("MHO", "Metabolically Healthy Obese"),
    5: ("MUO", "Metabolically Unhealthy Obese"),
}

TRAINING_FEATURE_ORDER: Final[list[str]] = [
    "BMXBMI",
    "BMXWAIST",
    "BMXHT",
    "BMXWT",
    "Bel_Kalca_Orani",
    "Bel_Boy_Orani",
    "BPXOSY1",
    "BPXODI1",
    "Nabiz_Basinci",
    "LBXGLU",
    "LBDHDD",
    "LBXTLG",
    "TG_HDL_Orani",
    "LBXIN",
    "LBXGH",
    "LBXHSCRP",
    "HOMA_IR",
    "RIDAGEYR",
    "RIAGENDR",
    "RIDRETH3",
    "PAD680",
    "SMQ020",
    "DMDEDUC2",
    "INDFMPIR",
]

SCALER_SOURCE_COLUMNS: Final[list[str]] = [
    "BMXBMI",
    "BMXWAIST",
    "BMXHT",
    "BMXWT",
    "BMXHIP",
    "BPXOSY1",
    "BPXODI1",
    "LBXGLU",
    "LBDHDD",
    "LBXTLG",
    "LBXIN",
    "LBXGH",
    "LBXHSCRP",
    "RIDAGEYR",
    "RIAGENDR",
    "RIDRETH3",
    "PAD680",
    "SMQ020",
    "DMDEDUC2",
    "INDFMPIR",
]

ETHNICITY_TO_RIDRETH3: Final[dict[int, int]] = {
    1: 1,  # Mexican American
    2: 2,  # Other Hispanic
    3: 3,  # White
    4: 4,  # Black
    5: 6,  # Asian (RIDRETH3=6)
    6: 7,  # Multiracial (RIDRETH3=7)
}

SMOKING_TO_SMQ020: Final[dict[int, int]] = {
    0: 2,  # No
    1: 1,  # Yes
}


def get_default_model_path() -> Path:
    return Path(__file__).resolve().parents[1] / "best_model_xgboost_6sinif_80-20.pkl"


def get_default_dataset_path() -> Path | None:
    search_roots = [Path(__file__).resolve().parent, Path(__file__).resolve().parents[1]]

    for root in search_roots:
        matches = sorted(root.glob("VER*.csv"))
        if matches:
          return matches[0]

    return None


def round_float(value: float) -> float:
    return round(float(value), 4)


def load_model(model_path: str) -> Any:
    global MODEL, MODEL_PATH

    if MODEL is not None and MODEL_PATH == model_path:
        return MODEL

    loaded_model = joblib.load(model_path)
    MODEL = loaded_model
    MODEL_PATH = model_path
    return loaded_model


def is_model_loaded() -> bool:
    return MODEL is not None


def print_model_verification(model: Any) -> None:
    feature_names_in = getattr(model, "feature_names_in_", None)
    booster_feature_names = None
    get_booster = getattr(model, "get_booster", None)
    if callable(get_booster):
        booster = get_booster()
        booster_feature_names = getattr(booster, "feature_names", None)

    print("Loaded model type:", type(model).__name__)
    print("model.feature_names_in_:", feature_names_in)
    print("model.booster_.feature_names:", booster_feature_names)
    print("Expected training feature order (24 features):")
    print(TRAINING_FEATURE_ORDER)


def _build_scaler_from_dataset(dataset_path: Path) -> StandardScaler:
    df = pd.read_csv(dataset_path, low_memory=False)

    missing_columns = [col for col in SCALER_SOURCE_COLUMNS if col not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing columns for scaler reconstruction: {missing_columns}")

    work = df[SCALER_SOURCE_COLUMNS].copy()
    for column in work.columns:
        work[column] = pd.to_numeric(work[column], errors="coerce")
        work[column] = work[column].replace([np.inf, -np.inf], np.nan)
        work[column] = work[column].fillna(work[column].median())

    work["Bel_Kalca_Orani"] = work["BMXWAIST"] / work["BMXHIP"]
    work["Bel_Boy_Orani"] = work["BMXWAIST"] / work["BMXHT"]
    work["Nabiz_Basinci"] = work["BPXOSY1"] - work["BPXODI1"]
    work["TG_HDL_Orani"] = work["LBXTLG"] / work["LBDHDD"]
    work["HOMA_IR"] = (work["LBXIN"] * work["LBXGLU"]) / 405.0

    scaler_matrix = work[TRAINING_FEATURE_ORDER].replace([np.inf, -np.inf], np.nan).dropna()
    scaler = StandardScaler()
    scaler.fit(scaler_matrix.values)
    return scaler


def load_runtime_scaler(dataset_path: str | None = None) -> StandardScaler | None:
    global SCALER

    if SCALER is not None:
        return SCALER

    resolved_path = Path(dataset_path) if dataset_path else get_default_dataset_path()
    if resolved_path is None or not resolved_path.exists():
        print("Runtime scaler dataset not found. Inference will continue without scaling.")
        return None

    SCALER = _build_scaler_from_dataset(resolved_path)
    print(f"Runtime scaler loaded from: {resolved_path}")
    return SCALER


def is_scaler_loaded() -> bool:
    return SCALER is not None


def compute_derived_features(raw: PatientInput) -> dict[str, float]:
    whr = raw.waist_cm / raw.hip_cm
    whtr = raw.waist_cm / raw.height_cm
    tg_hdl_ratio = raw.triglycerides / raw.hdl
    pulse_pressure = raw.systolic_bp - raw.diastolic_bp
    homa_ir = (raw.serum_insulin * raw.fasting_glucose) / 405.0

    return {
        "whr": round_float(whr),
        "whtr": round_float(whtr),
        "tg_hdl_ratio": round_float(tg_hdl_ratio),
        "pulse_pressure": round_float(pulse_pressure),
        "homa_ir": round_float(homa_ir),
    }


def engineer_features(raw: PatientInput) -> np.ndarray:
    derived = compute_derived_features(raw)
    encoded_ethnicity = ETHNICITY_TO_RIDRETH3[raw.ethnicity]
    encoded_smoking = SMOKING_TO_SMQ020[raw.smoking]

    feature_vector = np.array(
        [
            raw.bmi,
            raw.waist_cm,
            raw.height_cm,
            raw.weight_kg,
            derived["whr"],
            derived["whtr"],
            raw.fasting_glucose,
            raw.hdl,
            raw.triglycerides,
            raw.systolic_bp,
            raw.diastolic_bp,
            derived["tg_hdl_ratio"],
            derived["pulse_pressure"],
            raw.serum_insulin,
            raw.hba1c,
            raw.hs_crp,
            derived["homa_ir"],
            raw.age,
            raw.gender,
            encoded_ethnicity,
            raw.sedentary_minutes,
            encoded_smoking,
            raw.education,
            raw.income_poverty_ratio,
        ],
        dtype=float,
    )

    return feature_vector


def get_risk_level(predicted_class: int, probabilities: list[float]) -> str:
    del probabilities

    if predicted_class in {0, 2, 4}:
        return "low"
    if predicted_class in {1, 3}:
        return "moderate"
    return "high"


def get_risk_factors(raw: PatientInput, derived: dict[str, float]) -> list[str]:
    risk_factors: list[str] = []

    waist_threshold = 102.0 if raw.gender == 1 else 88.0
    hdl_threshold = 40.0 if raw.gender == 1 else 50.0

    if raw.waist_cm >= waist_threshold:
        risk_factors.append(
            f"Waist circumference exceeds threshold (Male >=102 cm / Female >=88 cm); measured {round_float(raw.waist_cm)} cm"
        )

    if raw.fasting_glucose >= 100.0:
        risk_factors.append(
            f"Fasting glucose is elevated ({round_float(raw.fasting_glucose)} mg/dL); diabetes risk"
        )

    if raw.hdl < hdl_threshold:
        risk_factors.append(
            f"HDL cholesterol is below threshold for sex ({round_float(raw.hdl)} mg/dL)"
        )

    if raw.triglycerides >= 150.0:
        risk_factors.append(
            f"Triglycerides are elevated ({round_float(raw.triglycerides)} mg/dL)"
        )

    if raw.systolic_bp >= 130.0 or raw.diastolic_bp >= 85.0:
        risk_factors.append(
            f"Blood pressure is elevated ({round_float(raw.systolic_bp)}/{round_float(raw.diastolic_bp)} mmHg)"
        )

    if derived["whtr"] > 0.5:
        risk_factors.append(
            f"WHtR is above 0.5 ({derived['whtr']:.4f}); elevated cardiometabolic risk"
        )

    if derived["homa_ir"] >= 2.5:
        risk_factors.append(
            f"HOMA-IR is elevated ({derived['homa_ir']:.4f}); insulin resistance likely"
        )

    if not risk_factors:
        return [
            "No major ATP-III threshold flags were triggered by the entered values.",
            "Continue routine cardiometabolic monitoring in clinical follow-up.",
        ]

    if len(risk_factors) == 1:
        risk_factors.append("No additional major ATP-III threshold flags were triggered.")

    return risk_factors[:3]


def predict(raw: PatientInput) -> PredictionResponse:
    if MODEL is None:
        load_model(str(get_default_model_path()))
    if SCALER is None:
        load_runtime_scaler()

    assert MODEL is not None

    model = MODEL
    feature_vector = engineer_features(raw).reshape(1, -1)
    if SCALER is not None:
        feature_vector = SCALER.transform(feature_vector)
    predicted_class = int(model.predict(feature_vector)[0])
    probability_values = model.predict_proba(feature_vector)[0]

    classes = [int(class_id) for class_id in getattr(model, "classes_", range(len(probability_values)))]
    probability_by_class = {
        class_id: round_float(probability)
        for class_id, probability in zip(classes, probability_values, strict=False)
    }
    probabilities = {
        CLASS_LABELS[class_id][0]: probability_by_class[class_id]
        for class_id in sorted(probability_by_class)
    }

    derived_features = compute_derived_features(raw)

    return PredictionResponse(
        predicted_class=predicted_class,
        predicted_label=CLASS_LABELS[predicted_class][0],
        predicted_label_full=CLASS_LABELS[predicted_class][1],
        probabilities=probabilities,
        risk_level=get_risk_level(predicted_class, list(probability_values)),
        top_risk_factors=get_risk_factors(raw, derived_features),
        derived_features=derived_features,
    )