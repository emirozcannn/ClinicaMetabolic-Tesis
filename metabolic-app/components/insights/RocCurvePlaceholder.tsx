"use client";

import { useLanguage } from "@/lib/i18n";

export function RocCurvePlaceholder() {
  const { copy, language } = useLanguage();

  const rows = [
    ["MHNW", "0.98"],
    ["MUNW", "0.95 (small class)"],
    ["MHOW", "0.97"],
    ["MUOW", "0.96"],
    ["MHO", "0.97"],
    ["MUO", "0.99"],
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{copy.insights.rocSummary}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.insights.rocDescription}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">{language === "en" ? "Class" : "Sınıf"}</th>
              <th className="px-4 py-3">AUC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, auc]) => (
              <tr key={label} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{label}</td>
                <td className="px-4 py-3">{auc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
