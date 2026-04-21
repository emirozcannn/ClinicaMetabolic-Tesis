"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

type RiskLevel = "low" | "moderate" | "high";

const riskStyle: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-800 border-emerald-300",
  moderate: "bg-amber-100 text-amber-800 border-amber-300",
  high: "bg-rose-100 text-rose-800 border-rose-300",
};

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  const { copy } = useLanguage();

  return (
    <Badge
      role="status"
      aria-label={`${copy.result.riskFactors}: ${copy.risk[riskLevel]}`}
      className={`${riskStyle[riskLevel]} capitalize border`}
    >
      {copy.risk[riskLevel]}
    </Badge>
  );
}
