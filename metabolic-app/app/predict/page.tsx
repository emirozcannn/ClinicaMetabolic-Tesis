"use client";

import { useEffect, useState } from "react";

import { PatientForm } from "@/components/PatientForm";
import { getHealth } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function PredictPage() {
  const [backendAvailable, setBackendAvailable] = useState(true);
  const { copy } = useLanguage();

  useEffect(() => {
    const check = async () => {
      try {
        const health = await getHealth();
        setBackendAvailable(health.status === "ok" && health.model_loaded);
      } catch {
        setBackendAvailable(false);
      }
    };

    void check();
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">{copy.predict.title}</h1>
        <p className="text-slate-600">{copy.predict.description}</p>
      </header>

      {!backendAvailable ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {copy.predict.unavailable}
        </div>
      ) : null}

      <PatientForm />
    </div>
  );
}
