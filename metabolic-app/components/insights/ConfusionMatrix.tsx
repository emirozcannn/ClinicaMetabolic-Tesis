import { Fragment } from "react";

import { CONFUSION_MATRIX } from "@/lib/insightsData";
import { useLanguage } from "@/lib/i18n";

function getHeatColor(value: number, max: number, isDiagonal: boolean): string {
  const intensity = value / max;
  if (isDiagonal) {
    return `rgba(34, 197, 94, ${0.15 + intensity * 0.7})`;
  }
  return value === 0 ? "transparent" : `rgba(239, 68, 68, ${0.1 + intensity * 0.6})`;
}

export function ConfusionMatrix() {
  const { copy, language } = useLanguage();
  const maxValue = Math.max(...CONFUSION_MATRIX.matrix.flat());

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{copy.insights.confusionMatrix}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.insights.confusionDescription}</p>
      </div>

      <div className="overflow-auto">
        <div className="grid min-w-180 grid-cols-[120px_repeat(6,minmax(84px,1fr))] gap-1">
          <div />
          {CONFUSION_MATRIX.labels.map((label) => (
            <div key={label} className="rounded-md bg-slate-100 px-2 py-3 text-center text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {language === "en" ? `Predicted ${label}` : `Tahmin ${label}`}
            </div>
          ))}

          {CONFUSION_MATRIX.labels.map((actualLabel, rowIndex) => (
            <Fragment key={actualLabel}>
              <div key={`${actualLabel}-row`} className="flex items-center justify-end pr-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                {language === "en" ? `Actual ${actualLabel}` : `Gerçek ${actualLabel}`}
              </div>
              {CONFUSION_MATRIX.labels.map((predictedLabel, columnIndex) => {
                const value = CONFUSION_MATRIX.matrix[rowIndex]?.[columnIndex] ?? 0;
                const isDiagonal = rowIndex === columnIndex;
                return (
                  <div
                    key={`${actualLabel}-${predictedLabel}`}
                    title={
                      language === "en"
                        ? `Actual: ${actualLabel}, Predicted: ${predictedLabel}, Count: ${value}`
                        : `Gerçek: ${actualLabel}, Tahmin: ${predictedLabel}, Sayı: ${value}`
                    }
                    className="flex min-h-16 items-center justify-center rounded-md border border-slate-200 text-lg font-bold text-slate-900 transition hover:scale-[1.02] dark:border-slate-700 dark:text-slate-50"
                    style={{ backgroundColor: getHeatColor(value, maxValue, isDiagonal) }}
                  >
                    {value}
                  </div>
                );
              })}
              </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
