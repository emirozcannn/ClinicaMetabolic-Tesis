"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { predict } from "@/lib/api";
import { PatientInput, PredictionResponse } from "@/lib/types";

export function usePrediction() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const runPrediction = async (payload: PatientInput): Promise<PredictionResponse | null> => {
    setIsLoading(true);
    try {
      const result = await predict(payload);
      sessionStorage.setItem("lastPrediction", JSON.stringify(result));
      sessionStorage.setItem("lastInput", JSON.stringify(payload));
      router.push("/result");
      return result;
    } catch {
      toast.error("Classification failed. Check if the server is running.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, runPrediction };
}
