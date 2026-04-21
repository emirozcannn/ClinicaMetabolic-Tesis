"use client";

import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { copy, language } = useLanguage();

  const performanceItems =
    language === "en"
      ? [
          "Model: PSO-optimized LightGBM",
          "Accuracy: 92.56%",
          "F1-score: 0.9234",
          "Cohen Kappa: 0.9041",
        ]
      : [
          "Model: PSO ile optimize edilmiş LightGBM",
          "Doğruluk: %92,56",
          "F1-Skoru: 0,9234",
          "Cohen Kappa: 0,9041",
        ];

  const datasetText =
    language === "en"
      ? "NHANES, n=3,899, ages 18-65, CDC USA."
      : "NHANES, n=3.899, 18-65 yaş aralığı, CDC ABD.";

  const featureItems =
    language === "en"
      ? ["WHtR (16.57%)", "Waist Circumference", "BMI", "Triglycerides", "TG/HDL Ratio"]
      : ["WHtR (%16,57)", "Bel Çevresi", "VKI", "Trigliserid", "TG/HDL Oranı"];

  const authorText =
    language === "en"
      ? [
          "Emir Ozcan (211805073) and Nazan Sonal (211805027)",
          "Aydin Adnan Menderes University, Computer Engineering",
        ]
      : [
          "Emir Ozcan (211805073) ve Nazan Sonal (211805027)",
          "Aydın Adnan Menderes Üniversitesi, Bilgisayar Mühendisliği",
        ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight">{copy.about.title}</h1>
        <p className="text-slate-600">{copy.about.description}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{copy.about.performance}</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700">
          {performanceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{copy.about.dataset}</h2>
        <p className="mt-3 text-slate-700">{datasetText}</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{copy.about.features}</h2>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-slate-700">
          {featureItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-slate-700">
        <h2 className="text-xl font-bold">{copy.about.authors}</h2>
        <p className="mt-2">{authorText[0]}</p>
        <p className="mt-1">{authorText[1]}</p>
      </section>
    </div>
  );
}
