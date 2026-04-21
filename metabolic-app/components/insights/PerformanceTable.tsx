import { CLASS_METRICS } from "@/lib/insightsData";
import { useLanguage } from "@/lib/i18n";

function getF1Class(value: number): string {
  if (value >= 0.9) {
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
  }
  if (value >= 0.75) {
    return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
  }
  return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300";
}

export function PerformanceTable() {
  const { copy, language } = useLanguage();
  const weightedPrecision = CLASS_METRICS.reduce((sum, item) => sum + item.precision * item.support, 0) /
    CLASS_METRICS.reduce((sum, item) => sum + item.support, 0);
  const weightedRecall = CLASS_METRICS.reduce((sum, item) => sum + item.recall * item.support, 0) /
    CLASS_METRICS.reduce((sum, item) => sum + item.support, 0);
  const weightedF1 = CLASS_METRICS.reduce((sum, item) => sum + item.f1 * item.support, 0) /
    CLASS_METRICS.reduce((sum, item) => sum + item.support, 0);
  const totalSupport = CLASS_METRICS.reduce((sum, item) => sum + item.support, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{copy.insights.performanceTable}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.insights.performanceDescription}</p>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-800">
              <th className="py-2 pr-4">{language === "en" ? "Class" : "Sınıf"}</th>
              <th className="py-2 pr-4">{language === "en" ? "Precision" : "Kesinlik"}</th>
              <th className="py-2 pr-4">{language === "en" ? "Recall" : "Duyarlılık"}</th>
              <th className="py-2 pr-4">{language === "en" ? "F1-Score" : "F1-Skoru"}</th>
              <th className="py-2 pr-4">{language === "en" ? "Support" : "Destek"}</th>
            </tr>
          </thead>
          <tbody>
            {CLASS_METRICS.map((item) => (
              <tr
                key={item.class}
                className={`border-b border-slate-100 dark:border-slate-800 ${item.class === "MUNW" ? "bg-amber-50/70 dark:bg-amber-950/20" : ""}`}
              >
                <td className="py-3 pr-4 font-semibold">
                  {item.class}
                  {item.class === "MUNW" ? (
                    <span className="ml-2 text-xs text-amber-700 dark:text-amber-300">
                      ⚠ {language === "en" ? "Small class (n=9, 1.2%)" : "Küçük sınıf (n=9, %1,2)"}
                    </span>
                  ) : null}
                </td>
                <td className="py-3 pr-4">{item.precision.toFixed(3)}</td>
                <td className="py-3 pr-4">{item.recall.toFixed(3)}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getF1Class(item.f1)}`}>
                    {item.f1.toFixed(3)}
                  </span>
                </td>
                <td className="py-3 pr-4">{item.support}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-300 font-semibold dark:border-slate-700">
              <td className="py-3 pr-4">{language === "en" ? "Weighted average" : "Ağırlıklı ortalama"}</td>
              <td className="py-3 pr-4">{weightedPrecision.toFixed(3)}</td>
              <td className="py-3 pr-4">{weightedRecall.toFixed(3)}</td>
              <td className="py-3 pr-4">{weightedF1.toFixed(3)}</td>
              <td className="py-3 pr-4">{totalSupport}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
