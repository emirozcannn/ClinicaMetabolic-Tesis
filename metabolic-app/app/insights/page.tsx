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
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">{copy.insights.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">{copy.insights.description}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: copy.insights.accuracy, value: "92.56%" },
          { label: copy.insights.f1Score, value: "0.9234" },
          { label: copy.insights.kappa, value: "0.9041" },
          { label: copy.insights.patients, value: "n=3,899" },
        ].map((item) => (
          <Card key={item.label} className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">{item.value}</p>
            </CardContent>
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

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
        <p>{copy.insights.footerNotes}</p>
        <p className="mt-2">{copy.insights.confusionDescription}</p>
      </div>
    </div>
  );
}
