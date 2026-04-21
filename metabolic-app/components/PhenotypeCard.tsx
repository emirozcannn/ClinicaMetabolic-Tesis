"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskBadge } from "@/components/RiskBadge";
import { PhenotypeInfo } from "@/lib/types";
import { getPhenotypeCopy, useLanguage } from "@/lib/i18n";

export function PhenotypeCard({ phenotype }: { phenotype: PhenotypeInfo }) {
  const { language, copy } = useLanguage();
  const text = getPhenotypeCopy(language, phenotype.code);
  const accentClass =
    phenotype.risk_level === "low"
      ? "bg-[var(--risk-low)]"
      : phenotype.risk_level === "moderate"
        ? "bg-[var(--risk-moderate)]"
        : "bg-[var(--risk-high)]";

  return (
    <Card className="h-full overflow-hidden rounded-xl border border-(--border-subtle) bg-white">
      <div className={`h-2 w-full ${accentClass}`} />
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="clinical-value text-2xl font-medium text-(--brand-800)">{phenotype.code}</CardTitle>
          <RiskBadge riskLevel={phenotype.risk_level} />
        </div>
        <p className="text-sm font-medium text-(--text-secondary)">{text.fullName}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-(--text-secondary)">
        <p>
          <span className="font-semibold">{copy.phenotypes.bmi}:</span> {text.bmiRange}
        </p>
        <p>
          <span className="font-semibold">{copy.phenotypes.metabolicStatus}:</span> {text.metabolicStatus}
        </p>
        <p>{text.clinicalNote}</p>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-(--text-muted)">{copy.phenotypes.prevalence}</p>
          <Progress value={phenotype.percentage} />
          <p className="clinical-value text-xs text-(--text-muted)">{phenotype.percentage.toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
