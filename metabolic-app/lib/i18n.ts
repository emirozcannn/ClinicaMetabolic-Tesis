"use client";

import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { PhenotypeInfo } from "@/lib/types";

export type Language = "en" | "tr";

type PhenotypeCopy = Record<
  PhenotypeInfo["code"],
  {
    fullName: string;
    bmiRange: string;
    metabolicStatus: string;
    clinicalNote: string;
  }
>;

type Copy = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    home: string;
    classify: string;
    insights: string;
    phenotypes: string;
    about: string;
    openMenu: string;
    navigate: string;
  };
  locale: {
    english: string;
    turkish: string;
  };
  footer: string;
  home: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    cards: {
      phenotypes: { title: string; description: string };
      accuracy: { title: string; description: string };
      clinician: { title: string; description: string };
    };
    disclaimer: string;
  };
  predict: {
    title: string;
    description: string;
    unavailable: string;
  };
  form: {
    step: string;
    of: string;
    back: string;
    next: string;
    submit: string;
    loading: string;
    reviewStep: string;
    age: string;
    years: string;
    gender: string;
    male: string;
    female: string;
    ethnicity: string;
    education: string;
    smoking: string;
    no: string;
    yes: string;
    selectEthnicity: string;
    selectEducation: string;
    incomeToPovertyRatio: string;
    sedentaryTime: string;
    minPerDay: string;
    fieldLabels: Record<string, { label: string; unit: string; hint?: string }>;
  };
  result: {
    title: string;
    classificationResult: string;
    probabilityDistribution: string;
    derivedMetrics: string;
    riskFactors: string;
    clinicalNote: string;
    newPatient: string;
    printReport: string;
  };
  phenotypes: {
    title: string;
    description: string;
    bmi: string;
    metabolicStatus: string;
    prevalence: string;
  };
  about: {
    title: string;
    description: string;
    performance: string;
    dataset: string;
    features: string;
    authors: string;
  };
  insights: {
    title: string;
    description: string;
    accuracy: string;
    f1Score: string;
    kappa: string;
    patients: string;
    featureImportance: string;
    featureDescription: string;
    modelComparison: string;
    modelDescription: string;
    confusionMatrix: string;
    confusionDescription: string;
    performanceTable: string;
    performanceDescription: string;
    rocSummary: string;
    rocDescription: string;
    footerNotes: string;
  };
  risk: {
    low: string;
    moderate: string;
    high: string;
  };
  phenotypeText: PhenotypeCopy;
};

const fieldLabels = {
  en: {
    bmi: { label: "BMI", unit: "kg/m²", hint: "Body Mass Index" },
    waist_cm: { label: "Waist Circumference", unit: "cm" },
    hip_cm: { label: "Hip Circumference", unit: "cm" },
    height_cm: { label: "Height", unit: "cm" },
    weight_kg: { label: "Weight", unit: "kg" },
    systolic_bp: { label: "Systolic Blood Pressure", unit: "mmHg" },
    diastolic_bp: { label: "Diastolic Blood Pressure", unit: "mmHg" },
    fasting_glucose: { label: "Fasting Glucose", unit: "mg/dL" },
    hdl: { label: "HDL Cholesterol", unit: "mg/dL", hint: "Good cholesterol" },
    triglycerides: { label: "Triglycerides", unit: "mg/dL" },
    serum_insulin: { label: "Fasting Insulin", unit: "uU/mL" },
    hba1c: { label: "HbA1c", unit: "%", hint: "Glycated hemoglobin" },
    hs_crp: { label: "hs-CRP", unit: "mg/L", hint: "Inflammation marker" },
    age: { label: "Age", unit: "years" },
    income_poverty_ratio: { label: "Income-to-Poverty Ratio", unit: "0-5" },
    sedentary_minutes: { label: "Sedentary Time", unit: "min/day" },
  },
  tr: {
    bmi: { label: "VKI", unit: "kg/m²", hint: "Vücut Kitle İndeksi" },
    waist_cm: { label: "Bel Çevresi", unit: "cm" },
    hip_cm: { label: "Kalça Çevresi", unit: "cm" },
    height_cm: { label: "Boy", unit: "cm" },
    weight_kg: { label: "Kilo", unit: "kg" },
    systolic_bp: { label: "Sistolik Kan Basıncı", unit: "mmHg" },
    diastolic_bp: { label: "Diastolik Kan Basıncı", unit: "mmHg" },
    fasting_glucose: { label: "Açlık Glukozu", unit: "mg/dL" },
    hdl: { label: "HDL Kolesterol", unit: "mg/dL", hint: "İyi kolesterol" },
    triglycerides: { label: "Trigliserid", unit: "mg/dL" },
    serum_insulin: { label: "Açlık İnsülini", unit: "uU/mL" },
    hba1c: { label: "HbA1c", unit: "%", hint: "Glikozillenmiş hemoglobin" },
    hs_crp: { label: "hs-CRP", unit: "mg/L", hint: "İnflamasyon belirteci" },
    age: { label: "Yaş", unit: "yıl" },
    income_poverty_ratio: { label: "Gelir-Yoksulluk Oranı", unit: "0-5" },
    sedentary_minutes: { label: "Sedanter Süre", unit: "dk/gün" },
  },
} satisfies Record<Language, Record<string, { label: string; unit: string; hint?: string }>>;

const phenotypeText = {
  en: {
    MHNW: {
      fullName: "Metabolically Healthy Normal Weight",
      bmiRange: "BMI < 25",
      metabolicStatus: "No metabolic risk factors",
      clinicalNote: "Reference group. Maintain current lifestyle.",
    },
    MUNW: {
      fullName: "Metabolically Unhealthy Normal Weight",
      bmiRange: "BMI < 25",
      metabolicStatus: ">=3 metabolic risk factors",
      clinicalNote: "Skinny fat phenotype. Normal BMI can hide metabolic risk.",
    },
    MHOW: {
      fullName: "Metabolically Healthy Overweight",
      bmiRange: "25 <= BMI < 30",
      metabolicStatus: "No metabolic risk factors",
      clinicalNote: "Overweight paradox phenotype. Continue lifestyle follow-up.",
    },
    MUOW: {
      fullName: "Metabolically Unhealthy Overweight",
      bmiRange: "25 <= BMI < 30",
      metabolicStatus: ">=3 metabolic risk factors",
      clinicalNote: "Pre-obesity risk group and key early intervention target.",
    },
    MHO: {
      fullName: "Metabolically Healthy Obese",
      bmiRange: "BMI >= 30",
      metabolicStatus: "No metabolic risk factors",
      clinicalNote: "Obesity paradox phenotype. Monitor carefully over time.",
    },
    MUO: {
      fullName: "Metabolically Unhealthy Obese",
      bmiRange: "BMI >= 30",
      metabolicStatus: ">=3 metabolic risk factors",
      clinicalNote: "Classic high-risk phenotype requiring intensive intervention.",
    },
  },
  tr: {
    MHNW: {
      fullName: "Metabolik Olarak Sağlıklı Normal Kilo",
      bmiRange: "VKI < 25",
      metabolicStatus: "Metabolik risk faktörü yok",
      clinicalNote: "Referans grup. Mevcut yaşam tarzını sürdürün.",
    },
    MUNW: {
      fullName: "Metabolik Olarak Sağlıksız Normal Kilo",
      bmiRange: "VKI < 25",
      metabolicStatus: ">=3 metabolik risk faktörü",
      clinicalNote: "Zayıf ama metabolik risk taşıyan fenotip. Normal VKI riski gizleyebilir.",
    },
    MHOW: {
      fullName: "Metabolik Olarak Sağlıklı Fazla Kilo",
      bmiRange: "25 <= VKI < 30",
      metabolicStatus: "Metabolik risk faktörü yok",
      clinicalNote: "Fazla kilolu paradoks fenotipi. Yaşam tarzı takibini sürdürün.",
    },
    MUOW: {
      fullName: "Metabolik Olarak Sağlıksız Fazla Kilo",
      bmiRange: "25 <= VKI < 30",
      metabolicStatus: ">=3 metabolik risk faktörü",
      clinicalNote: "Obezite öncesi risk grubu ve erken müdahale hedefi.",
    },
    MHO: {
      fullName: "Metabolik Olarak Sağlıklı Obez",
      bmiRange: "VKI >= 30",
      metabolicStatus: "Metabolik risk faktörü yok",
      clinicalNote: "Obezite paradoksu fenotipi. Zaman içinde yakından izleyin.",
    },
    MUO: {
      fullName: "Metabolik Olarak Sağlıksız Obez",
      bmiRange: "VKI >= 30",
      metabolicStatus: ">=3 metabolik risk faktörü",
      clinicalNote: "Yoğun müdahale gerektiren klasik yüksek risk fenotipi.",
    },
  },
} satisfies Record<Language, PhenotypeCopy>;

const copy = {
  en: {
    brand: { name: "ClinicaMetabolic", tagline: "clinical phenotype engine" },
    nav: {
      home: "Home",
      classify: "Classify",
      insights: "Insights",
      phenotypes: "Phenotypes",
      about: "About",
      openMenu: "Open menu",
      navigate: "Navigate",
    },
    locale: { english: "English", turkish: "Turkish" },
    footer: "Aydin Adnan Menderes University · Computer Engineering · 2025",
    home: {
      kicker: "CLINICAL DECISION SUPPORT",
      title: "ClinicaMetabolic",
      subtitle: "Precision metabolic obesity phenotyping with a cleaner clinical interface.",
      description:
        "Built from NHANES data (n=3,899) and ATP-III criteria for primary care clinicians to rapidly assess metabolic obesity phenotypes.",
      cta: "Start Classification",
      cards: {
        phenotypes: {
          title: "6 Phenotypes",
          description: "From MHNW to MUO, each class has distinct metabolic implications.",
        },
        accuracy: {
          title: "92.56% Accuracy",
          description: "PSO-optimized model performance on thesis benchmark split.",
        },
        clinician: {
          title: "Clinician-First",
          description: "Designed for primary care workflows and transparent interpretation.",
        },
      },
      disclaimer: "For research and clinical decision support only. Not a substitute for professional medical judgment.",
    },
    predict: {
      title: "New Patient Classification",
      description: "Enter patient measurements to predict metabolic obesity phenotype.",
      unavailable: "Backend unavailable",
    },
    form: {
      step: "Step",
      of: "of",
      back: "Back",
      next: "Next",
      submit: "Get Classification",
      loading: "Classifying...",
      reviewStep: "Please review the current step values before continuing.",
      age: "Age",
      years: "years",
      gender: "Gender",
      male: "Male",
      female: "Female",
      ethnicity: "Ethnicity",
      education: "Education",
      smoking: "Smoking",
      no: "No",
      yes: "Yes",
      selectEthnicity: "Select ethnicity",
      selectEducation: "Select education",
      incomeToPovertyRatio: "Income-to-Poverty Ratio",
      sedentaryTime: "Sedentary Time",
      minPerDay: "min/day",
      fieldLabels: fieldLabels.en,
    },
    result: {
      title: "Prediction Summary",
      classificationResult: "Classification Result",
      probabilityDistribution: "Probability Distribution",
      derivedMetrics: "Derived Metrics",
      riskFactors: "Risk Factors Detected",
      clinicalNote: "Clinical note",
      newPatient: "New Patient",
      printReport: "Print Report",
    },
    phenotypes: {
      title: "Phenotype Catalog",
      description: "Clinical meaning and prevalence of all six metabolic phenotypes.",
      bmi: "BMI",
      metabolicStatus: "Metabolic status",
      prevalence: "NHANES prevalence",
    },
    about: {
      title: "About This Model",
      description: "Thesis-grade classifier for metabolic obesity phenotyping.",
      performance: "Performance",
      dataset: "Dataset",
      features: "Top 5 Features",
      authors: "Authors",
    },
    insights: {
      title: "Model Insights & Performance Analysis",
      description: "PSO-LightGBM · NHANES Dataset · Test Set Evaluation",
      accuracy: "Accuracy",
      f1Score: "F1-Score",
      kappa: "Cohen's Kappa",
      patients: "Patients",
      featureImportance: "Top 10 Feature Importances — PSO-LightGBM",
      featureDescription: "Derived features contributed 25.68% total importance.",
      modelComparison: "Model Performance Comparison",
      modelDescription: "PSO-LightGBM is highlighted as the thesis best model.",
      confusionMatrix: "Confusion Matrix — Test Set (20%)",
      confusionDescription: "Representative approximation. For exact values, refer to confusion_matrix.png in the project repository.",
      performanceTable: "Per-Class Performance — PSO-LightGBM",
      performanceDescription: "Weighted averages are computed from the held-out test set.",
      rocSummary: "ROC-AUC Summary",
      rocDescription: "One-vs-Rest ROC curves. Values are from the held-out 20% test set.",
      footerNotes:
        "All metrics computed on the held-out 20% test split (n=780). PSO optimization ran for 200 evaluations over 3,131 seconds. Cohen's Kappa κ=0.9041 indicates near-perfect agreement.",
    },
    risk: { low: "low", moderate: "moderate", high: "high" },
    phenotypeText: phenotypeText.en,
  },
  tr: {
    brand: { name: "ClinicaMetabolic", tagline: "klinik fenotip motoru" },
    nav: {
      home: "Ana Sayfa",
      classify: "Sınıflandır",
      insights: "İçgörüler",
      phenotypes: "Fenotipler",
      about: "Hakkında",
      openMenu: "Menüyü aç",
      navigate: "Gezin",
    },
    locale: { english: "İngilizce", turkish: "Türkçe" },
    footer: "Aydın Adnan Menderes Üniversitesi · Bilgisayar Mühendisliği · 2025",
    home: {
      kicker: "KLİNİK KARAR DESTEK",
      title: "ClinicaMetabolic",
      subtitle: "Daha temiz ve klinik odaklı bir arayüzle metabolik obezite fenotiplemesi.",
      description:
        "NHANES verisi (n=3.899) ve ATP-III kriterleri kullanılarak birinci basamak hekimlerin metabolik obezite fenotiplerini hızlıca değerlendirmesi için tasarlandı.",
      cta: "Sınıflandırmayı Başlat",
      cards: {
        phenotypes: {
          title: "6 Fenotip",
          description: "MHNW'den MUO'ya kadar her sınıfın klinik anlamı farklıdır.",
        },
        accuracy: {
          title: "%92,56 Başarı",
          description: "Tez benchmark ayrımında PSO ile optimize edilen model performansı.",
        },
        clinician: {
          title: "Hekim Odaklı",
          description: "Birinci basamak iş akışları ve şeffaf yorumlama için tasarlandı.",
        },
      },
      disclaimer: "Yalnızca araştırma ve klinik karar desteği içindir. Profesyonel tıbbi değerlendirmenin yerine geçmez.",
    },
    predict: {
      title: "Yeni Hasta Sınıflandırması",
      description: "Metabolik obezite fenotipini tahmin etmek için hasta ölçümlerini girin.",
      unavailable: "Arka uç kullanılamıyor",
    },
    form: {
      step: "Adım",
      of: "/",
      back: "Geri",
      next: "İleri",
      submit: "Sınıflandır",
      loading: "Sınıflandırılıyor...",
      reviewStep: "Lütfen devam etmeden önce mevcut adım değerlerini kontrol edin.",
      age: "Yaş",
      years: "yıl",
      gender: "Cinsiyet",
      male: "Erkek",
      female: "Kadın",
      ethnicity: "Etnisite",
      education: "Eğitim",
      smoking: "Sigara",
      no: "Hayır",
      yes: "Evet",
      selectEthnicity: "Etnisite seçin",
      selectEducation: "Eğitim seçin",
      incomeToPovertyRatio: "Gelir-Yoksulluk Oranı",
      sedentaryTime: "Sedanter Süre",
      minPerDay: "dk/gün",
      fieldLabels: fieldLabels.tr,
    },
    result: {
      title: "Tahmin Özeti",
      classificationResult: "Sınıflandırma Sonucu",
      probabilityDistribution: "Olasılık Dağılımı",
      derivedMetrics: "Türetilmiş Metrikler",
      riskFactors: "Saptanan Risk Faktörleri",
      clinicalNote: "Klinik not",
      newPatient: "Yeni Hasta",
      printReport: "Raporu Yazdır",
    },
    phenotypes: {
      title: "Fenotip Kataloğu",
      description: "Altı metabolik fenotipin klinik anlamı ve prevalansı.",
      bmi: "VKI",
      metabolicStatus: "Metabolik durum",
      prevalence: "NHANES prevalansı",
    },
    about: {
      title: "Bu Model Hakkında",
      description: "Metabolik obezite fenotiplemesi için tez düzeyinde sınıflandırıcı.",
      performance: "Başarım",
      dataset: "Veri Seti",
      features: "İlk 5 Özellik",
      authors: "Yazarlar",
    },
    insights: {
      title: "Model İçgörüleri ve Başarım Analizi",
      description: "PSO-LightGBM · NHANES Veri Seti · Test Seti Değerlendirmesi",
      accuracy: "Doğruluk",
      f1Score: "F1-Skoru",
      kappa: "Cohen Kappa",
      patients: "Hasta",
      featureImportance: "İlk 10 Özellik Önemi — PSO-LightGBM",
      featureDescription: "Türetilmiş özellikler toplam önemin %25,68'ini oluşturuyor.",
      modelComparison: "Model Başarım Karşılaştırması",
      modelDescription: "PSO-LightGBM tezde en iyi model olarak vurgulanmaktadır.",
      confusionMatrix: "Karmaşıklık Matrisi — Test Seti (%20)",
      confusionDescription: "Temsili yaklaşıktır. Kesin değerler için proje deposundaki confusion_matrix.png dosyasına bakın.",
      performanceTable: "Sınıf Bazlı Başarım — PSO-LightGBM",
      performanceDescription: "Ağırlıklı ortalamalar ayrılmış test setinden hesaplanmıştır.",
      rocSummary: "ROC-AUC Özeti",
      rocDescription: "One-vs-Rest ROC eğrileri. Değerler ayrılmış %20 test setinden alınmıştır.",
      footerNotes:
        "Tüm metrikler ayrılmış %20 test bölünmesinde (n=780) hesaplandı. PSO optimizasyonu 3.131 saniye boyunca 200 değerlendirme ile çalıştı. Cohen Kappa κ=0,9041, neredeyse kusursuz uyumu gösterir.",
    },
    risk: { low: "düşük", moderate: "orta", high: "yüksek" },
    phenotypeText: phenotypeText.tr,
  },
} satisfies Record<Language, Copy>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  copy: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("metabolic-language");
    if (stored === "en" || stored === "tr") {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("metabolic-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "tr" : "en");

  const currentCopy = language === "en" ? copy.en : copy.tr;

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, copy: currentCopy }),
    [language]
  );

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function getFieldLabels(language: Language) {
  return fieldLabels[language];
}

export function getPhenotypeCopy(language: Language, code: PhenotypeInfo["code"]) {
  return phenotypeText[language][code];
}
