"use client";

import { PhenotypeCard } from "@/components/PhenotypeCard";
import { PHENOTYPES } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

export default function PhenotypesPage() {
  const { copy } = useLanguage();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight">{copy.phenotypes.title}</h1>
        <p className="text-slate-600">{copy.phenotypes.description}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PHENOTYPES.map((phenotype) => (
          <PhenotypeCard key={phenotype.code} phenotype={phenotype} />
        ))}
      </section>
    </div>
  );
}
