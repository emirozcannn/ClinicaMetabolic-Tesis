"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DerivedFeatures } from "@/components/DerivedFeatures";
import { ProbabilityChart } from "@/components/ProbabilityChart";
import { RiskBadge } from "@/components/RiskBadge";
import { PredictionResponse } from "@/lib/types";
import { getPhenotypeCopy, useLanguage } from "@/lib/i18n";

export function ResultCard() {
  const router = useRouter();
  const { language, copy } = useLanguage();
  const [result, setResult] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastPrediction");
    if (!raw) {
      router.replace("/predict");
      return;
    }
    try {
      setResult(JSON.parse(raw) as PredictionResponse);
    } catch {
      router.replace("/predict");
    }
  }, [router]);

  const phenotypeNote = useMemo(() => {
    if (!result) {
      return "";
    }
    return getPhenotypeCopy(language, result.predicted_label).clinicalNote;
  }, [language, result]);

  if (!result) {
    return null;
  }

  const borderByRisk: Record<PredictionResponse["risk_level"], string> = {
    low: "border-l-[var(--risk-low)]",
    moderate: "border-l-[var(--risk-moderate)]",
    high: "border-l-[var(--risk-high)]",
  };

  return (
    <Card className={`mx-auto w-full max-w-5xl border border-(--border-subtle) border-l-4 bg-white shadow-sm ${borderByRisk[result.risk_level]}`}>
      <CardHeader className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-(--text-muted)">{copy.result.classificationResult}</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="clinical-value text-5xl font-medium tracking-[-0.02em] text-(--brand-800) md:text-7xl">
              {result.predicted_label}
            </CardTitle>
            <p className="text-lg font-normal text-(--text-secondary)">{result.predicted_label_full}</p>
          </div>
          <RiskBadge riskLevel={result.risk_level} />
        </div>
        <p className="text-sm text-(--text-secondary)">
          {copy.result.clinicalNote}: {phenotypeNote}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <section>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{copy.result.probabilityDistribution}</h3>
          <div className="mt-3 rounded-lg border border-(--border-subtle) p-3">
            <ProbabilityChart probabilities={result.probabilities} predictedLabel={result.predicted_label} />
          </div>
        </section>

        <Separator />

        <section className="space-y-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{copy.result.derivedMetrics}</h3>
          <DerivedFeatures data={result.derived_features} />
        </section>

        <Separator />

        <section className="space-y-2" role="alert" aria-live="polite">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{copy.result.riskFactors}</h3>
          <ul className="space-y-1 text-sm text-(--text-secondary)">
            {result.top_risk_factors.map((risk) => (
              <li key={risk}>- {risk}</li>
            ))}
          </ul>
        </section>

        <div className="no-print flex flex-wrap gap-3">
          <Button onClick={() => router.push("/predict")}>{copy.result.newPatient}</Button>
          <Button variant="outline" onClick={() => window.print()}>
            {copy.result.printReport}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
