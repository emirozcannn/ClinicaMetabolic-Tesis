export interface PatientInput {
  bmi: number;
  waist_cm: number;
  hip_cm: number;
  height_cm: number;
  weight_kg: number;
  systolic_bp: number;
  diastolic_bp: number;
  fasting_glucose: number;
  hdl: number;
  triglycerides: number;
  serum_insulin: number;
  hba1c: number;
  hs_crp: number;
  age: number;
  gender: number;
  ethnicity: number;
  education: number;
  income_poverty_ratio: number;
  sedentary_minutes: number;
  smoking: number;
}

export interface DerivedFeatures {
  whr: number;
  whtr: number;
  tg_hdl_ratio: number;
  pulse_pressure: number;
  homa_ir: number;
}

export interface PredictionResponse {
  predicted_class: number;
  predicted_label: PhenotypeInfo["code"];
  predicted_label_full: string;
  probabilities: Record<string, number>;
  risk_level: "low" | "moderate" | "high";
  top_risk_factors: string[];
  derived_features: DerivedFeatures;
}

export interface PhenotypeInfo {
  code: "MHNW" | "MUNW" | "MHOW" | "MUOW" | "MHO" | "MUO";
  full_name: string;
  bmi_range: string;
  metabolic_status: string;
  clinical_note: string;
  risk_level: "low" | "moderate" | "high";
  color: string;
  percentage: number;
}
