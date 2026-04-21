"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

type RiskLevel = "low" | "moderate" | "high";

const riskStyle: Record<RiskLevel, string> = {
  low: "bg-[#dcfce7] text-[#15803d] border-[#86efac]",
  moderate: "bg-[#fef9c3] text-[#a16207] border-[#fde047]",
  high: "bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]",
};

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  const { copy } = useLanguage();

  return (
    <Badge
      role="status"
      aria-label={`${copy.result.riskFactors}: ${copy.risk[riskLevel]}`}
      className={`${riskStyle[riskLevel]} border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em]`}
    >
      {copy.risk[riskLevel]}
    </Badge>
  );
}
