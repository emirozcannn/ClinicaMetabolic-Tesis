export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  derived: boolean;
}

export interface ConfusionMatrixData {
  labels: string[];
  matrix: number[][];
}

export interface ModelComparisonItem {
  model: string;
  shortLabel: string;
  accuracy: number;
  f1: number | null;
  kappa: number | null;
  time_s: number | null;
}

export interface ClassMetricItem {
  class: string;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export interface PsoConvergenceItem {
  iteration: number;
  accuracy: number;
}

export const FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  { feature: "WHtR (Waist-to-Height Ratio)", importance: 16.57, derived: true },
  { feature: "Waist Circumference", importance: 11.23, derived: false },
  { feature: "BMI", importance: 9.84, derived: false },
  { feature: "Triglycerides", importance: 8.12, derived: false },
  { feature: "TG/HDL Ratio", importance: 5.55, derived: true },
  { feature: "Fasting Glucose", importance: 5.31, derived: false },
  { feature: "HDL Cholesterol", importance: 4.98, derived: false },
  { feature: "HOMA-IR", importance: 3.56, derived: true },
  { feature: "Serum Insulin", importance: 3.21, derived: false },
  { feature: "Hip Circumference", importance: 2.87, derived: false },
];

export const CONFUSION_MATRIX: ConfusionMatrixData = {
  labels: ["MHNW", "MUNW", "MHOW", "MUOW", "MHO", "MUO"],
  matrix: [
    [198, 1, 8, 0, 1, 0],
    [2, 6, 1, 0, 0, 0],
    [7, 0, 172, 6, 2, 0],
    [1, 0, 5, 43, 2, 0],
    [2, 0, 3, 2, 155, 6],
    [0, 0, 0, 0, 7, 142],
  ],
};

export const MODEL_COMPARISON: ModelComparisonItem[] = [
  { model: "PSO-LightGBM", shortLabel: "PSO-LGBM", accuracy: 92.56, f1: 0.9234, kappa: 0.9041, time_s: 3131 },
  { model: "Optuna-LightGBM", shortLabel: "Opt-LGBM", accuracy: 92.33, f1: 0.9233, kappa: null, time_s: 771 },
  { model: "GridSearch-XGBoost", shortLabel: "GS-XGB", accuracy: 92.05, f1: 0.9187, kappa: null, time_s: 5000 },
  { model: "PSO-CatBoost", shortLabel: "PSO-CB", accuracy: 90.89, f1: null, kappa: null, time_s: null },
  { model: "PSO-RandomForest", shortLabel: "PSO-RF", accuracy: 88.68, f1: null, kappa: null, time_s: null },
];

export const CLASS_METRICS: ClassMetricItem[] = [
  { class: "MHNW", precision: 0.94, recall: 0.95, f1: 0.945, support: 208 },
  { class: "MUNW", precision: 0.75, recall: 0.67, f1: 0.707, support: 9 },
  { class: "MHOW", precision: 0.91, recall: 0.92, f1: 0.915, support: 187 },
  { class: "MUOW", precision: 0.84, recall: 0.84, f1: 0.840, support: 51 },
  { class: "MHO", precision: 0.93, recall: 0.92, f1: 0.925, support: 168 },
  { class: "MUO", precision: 0.96, recall: 0.95, f1: 0.955, support: 149 },
];

export const PSO_CONVERGENCE: PsoConvergenceItem[] = [
  { iteration: 10, accuracy: 88.0 },
  { iteration: 20, accuracy: 88.6 },
  { iteration: 30, accuracy: 89.1 },
  { iteration: 40, accuracy: 89.4 },
  { iteration: 50, accuracy: 89.9 },
  { iteration: 60, accuracy: 90.3 },
  { iteration: 70, accuracy: 90.6 },
  { iteration: 80, accuracy: 90.9 },
  { iteration: 90, accuracy: 91.1 },
  { iteration: 100, accuracy: 91.4 },
  { iteration: 110, accuracy: 91.6 },
  { iteration: 120, accuracy: 91.8 },
  { iteration: 130, accuracy: 92.0 },
  { iteration: 140, accuracy: 92.1 },
  { iteration: 150, accuracy: 92.2 },
  { iteration: 160, accuracy: 92.3 },
  { iteration: 170, accuracy: 92.4 },
  { iteration: 180, accuracy: 92.45 },
  { iteration: 190, accuracy: 92.5 },
  { iteration: 200, accuracy: 92.56 },
];
