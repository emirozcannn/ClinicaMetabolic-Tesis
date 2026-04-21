"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskBadge } from "@/components/RiskBadge";
import { PhenotypeInfo } from "@/lib/types";
import { getPhenotypeCopy, useLanguage } from "@/lib/i18n";

export function PhenotypeCard({ phenotype }: { phenotype: PhenotypeInfo }) {
  const { language, copy } = useLanguage();
  const text = getPhenotypeCopy(language, phenotype.code);

  return (
    <Card className="h-full border-2 border-slate-200">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{phenotype.code}</CardTitle>
          <RiskBadge riskLevel={phenotype.risk_level} />
        </div>
        <p className="text-sm font-medium text-slate-700">{text.fullName}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-700">
        <p>
          <span className="font-semibold">{copy.phenotypes.bmi}:</span> {text.bmiRange}
        </p>
        <p>
          <span className="font-semibold">{copy.phenotypes.metabolicStatus}:</span> {text.metabolicStatus}
        </p>
        <p>{text.clinicalNote}</p>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">{copy.phenotypes.prevalence}</p>
          <Progress value={phenotype.percentage} />
          <p className="text-xs text-slate-500">{phenotype.percentage.toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
