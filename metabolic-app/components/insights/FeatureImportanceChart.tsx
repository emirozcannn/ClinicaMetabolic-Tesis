"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { FEATURE_IMPORTANCE } from "@/lib/insightsData";
import { useLanguage } from "@/lib/i18n";

export function FeatureImportanceChart() {
  const { copy, language } = useLanguage();
  const data = [...FEATURE_IMPORTANCE].sort((left, right) => right.importance - left.importance);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{copy.insights.featureImportance}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.insights.featureDescription}</p>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 40, left: 24, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={(value: number) => `${value.toFixed(0)}%`} />
          <YAxis
            type="category"
            dataKey="feature"
            width={170}
            tickFormatter={(value: string) => (value.length > 24 ? `${value.slice(0, 24)}…` : value)}
          />
          <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Importance"]} />
          <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
            {data.map((item) => (
              <Cell key={item.feature} fill={item.derived ? "#4f46e5" : "#475569"} />
            ))}
            <LabelList dataKey="importance" position="right" formatter={(value) => `${Number(value).toFixed(2)}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          {language === "en" ? "Derived Feature" : "Türetilmiş özellik"}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          {language === "en" ? "Raw Feature" : "Ham özellik"}
        </span>
      </div>
    </div>
  );
}
