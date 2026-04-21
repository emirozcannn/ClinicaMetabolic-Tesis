from __future__ import annotations

import warnings

from pydantic import BaseModel, ConfigDict, Field, model_validator


class PatientInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    bmi: float = Field(..., ge=10.0, le=70.0)
    waist_cm: float = Field(..., ge=40.0, le=200.0)
    hip_cm: float = Field(..., ge=40.0, le=200.0)
    height_cm: float = Field(..., ge=100.0, le=250.0)
    weight_kg: float = Field(..., ge=20.0, le=300.0)
    systolic_bp: float = Field(..., ge=60.0, le=250.0)
    diastolic_bp: float = Field(..., ge=40.0, le=150.0)
    fasting_glucose: float = Field(..., ge=50.0, le=600.0)
    hdl: float = Field(..., ge=10.0, le=150.0)
    triglycerides: float = Field(..., ge=20.0, le=2000.0)
    serum_insulin: float = Field(..., ge=1.0, le=300.0)
    hba1c: float = Field(..., ge=3.0, le=20.0)
    hs_crp: float = Field(..., ge=0.01, le=200.0)
    age: int = Field(..., ge=18, le=65)
    gender: int = Field(..., ge=1, le=2)
    ethnicity: int = Field(..., ge=1, le=6)
    education: int = Field(..., ge=1, le=4)
    income_poverty_ratio: float = Field(..., ge=0.0, le=5.0)
    sedentary_minutes: float = Field(..., ge=0.0, le=1440.0)
    smoking: int = Field(..., ge=0, le=1)

    @model_validator(mode="after")
    def warn_on_extreme_waist_to_height_ratio(self) -> PatientInput:
        if self.waist_cm > self.height_cm * 2:
            warnings.warn(
                "waist_cm exceeds 2x height_cm; please verify the measurement units",
                stacklevel=2,
            )
        return self


class PredictionResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    predicted_class: int
    predicted_label: str
    predicted_label_full: str
    probabilities: dict[str, float]
    risk_level: str
    top_risk_factors: list[str]
    derived_features: dict[str, float]