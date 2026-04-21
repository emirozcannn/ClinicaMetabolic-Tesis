"use client";

import { ResultCard } from "@/components/ResultCard";
import { useLanguage } from "@/lib/i18n";

export default function ResultPage() {
  const { copy } = useLanguage();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black tracking-tight">{copy.result.title}</h1>
      <ResultCard />
    </div>
  );
}
