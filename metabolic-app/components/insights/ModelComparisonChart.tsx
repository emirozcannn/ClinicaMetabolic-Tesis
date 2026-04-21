"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { MODEL_COMPARISON } from "@/lib/insightsData";
import { useLanguage } from "@/lib/i18n";

export function ModelComparisonChart() {
  const { copy, language } = useLanguage();
  const data = MODEL_COMPARISON.map((item) => ({
    ...item,
    accuracyValue: item.accuracy,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{copy.insights.modelComparison}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.insights.modelDescription}</p>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data} margin={{ top: 16, right: 24, left: 12, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="shortLabel" />
          <YAxis domain={[85, 95]} tickFormatter={(value: number) => `${value.toFixed(0)}%`} />
          <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, language === "en" ? "Accuracy" : "Doğruluk"]} />
          <ReferenceLine
            y={92.56}
            strokeDasharray="6 6"
            stroke="#0f172a"
            label={{ value: language === "en" ? "Best (PSO-LightGBM)" : "En iyi (PSO-LightGBM)", position: "insideTopRight" }}
          />
          <Bar dataKey="accuracyValue" radius={[6, 6, 0, 0]}>
            {data.map((item) => (
              <Cell key={item.model} fill={item.model === "PSO-LightGBM" ? "#0f766e" : "#94a3b8"} />
            ))}
            <LabelList dataKey="accuracyValue" position="top" formatter={(value) => `${Number(value).toFixed(2)}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
