"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ConfusionMatrix } from "@/components/insights/ConfusionMatrix";
import { FeatureImportanceChart } from "@/components/insights/FeatureImportanceChart";
import { ModelComparisonChart } from "@/components/insights/ModelComparisonChart";
import { PerformanceTable } from "@/components/insights/PerformanceTable";
import { RocCurvePlaceholder } from "@/components/insights/RocCurvePlaceholder";
import { useLanguage } from "@/lib/i18n";

export default function InsightsPage() {
  const { copy } = useLanguage();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-(--text-primary)">{copy.insights.title}</h1>
        <p className="text-(--text-secondary)">{copy.insights.description}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: copy.insights.accuracy, value: "92.56%" },
          { label: copy.insights.f1Score, value: "0.9234" },
          { label: copy.insights.kappa, value: "0.9041" },
          { label: copy.insights.patients, value: "n=3,899" },
        ].map((item) => (
          <Card key={item.label} className="border border-(--border-subtle) bg-white shadow-sm">
            <CardContent className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-(--text-muted)">{item.label}</p>
              <p className="stat mt-2 text-[2.5rem] font-medium text-(--brand-700)">{item.value}</p>
            </CardContent>
            <div className="h-0.75 w-full bg-(--brand-500)" />
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <FeatureImportanceChart />
        <ModelComparisonChart />
      </section>

      <ConfusionMatrix />

      <section className="grid gap-6 xl:grid-cols-2">
        <PerformanceTable />
        <RocCurvePlaceholder />
      </section>

      <div className="rounded-2xl border border-dashed border-(--border-strong) bg-(--surface-inset) p-5 text-sm text-(--text-secondary)">
        <p>{copy.insights.footerNotes}</p>
        <p className="mt-2">{copy.insights.confusionDescription}</p>
      </div>
    </div>
  );
}
