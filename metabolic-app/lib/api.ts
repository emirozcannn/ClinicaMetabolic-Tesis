import axios from "axios";

import { PatientInput, PhenotypeInfo, PredictionResponse } from "@/lib/types";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export async function predict(data: PatientInput): Promise<PredictionResponse> {
  const response = await api.post<PredictionResponse>("/predict", data);
  return response.data;
}

export async function getPhenotypes(): Promise<PhenotypeInfo[]> {
  const response = await api.get<PhenotypeInfo[]>("/phenotypes");
  return response.data;
}

export async function getHealth(): Promise<{ status: string; model_loaded: boolean }> {
  const response = await api.get<{ status: string; model_loaded: boolean }>("/health");
  return response.data;
}
