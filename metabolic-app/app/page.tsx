"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { copy } = useLanguage();

  return (
    <div className="space-y-10 py-4">
      <section className="hero-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,var(--brand-900)_0%,#0f4d3a_60%,#1a6b50_100%)] p-8 md:p-12">
        <div className="absolute -top-20 -right-12 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-14 h-56 w-56 rounded-full bg-(--brand-400)/20 blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <BrandMark className="text-white" />
          <p className="font-mono text-[11px] font-medium tracking-[0.12em] text-(--brand-400) uppercase">{copy.home.kicker}</p>
          <h1 className="text-5xl leading-tight tracking-tight text-white md:text-7xl md:font-light">{copy.home.title}</h1>
          <p className="max-w-2xl text-base font-normal text-white/75 md:text-lg">{copy.home.subtitle}</p>
          <p className="max-w-2xl text-white/70">{copy.home.description}</p>
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 rounded-md bg-(--brand-400) px-7 py-3 text-sm font-semibold text-(--brand-900) transition-all duration-200 hover:bg-(--brand-500) hover:-translate-y-px"
          >
            {copy.home.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card-hover rounded-xl border border-(--border-subtle) bg-(--surface-card) p-6 shadow-[0_1px_3px_rgba(10,46,37,0.06),0_4px_12px_rgba(10,46,37,0.04)]">
          <h2 className="text-base font-semibold text-(--brand-800)">{copy.home.cards.phenotypes.title}</h2>
          <p className="mt-2 text-sm leading-6 text-(--text-secondary)">{copy.home.cards.phenotypes.description}</p>
        </article>
        <article className="card-hover rounded-xl border border-(--border-subtle) bg-(--surface-card) p-6 shadow-[0_1px_3px_rgba(10,46,37,0.06),0_4px_12px_rgba(10,46,37,0.04)]">
          <h2 className="text-base font-semibold text-(--brand-800)">{copy.home.cards.accuracy.title}</h2>
          <p className="accuracy-value mt-3 text-3xl font-medium text-(--brand-600)">92.56%</p>
          <p className="mt-2 text-sm leading-6 text-(--text-secondary)">{copy.home.cards.accuracy.description}</p>
        </article>
        <article className="card-hover rounded-xl border border-(--border-subtle) bg-(--surface-card) p-6 shadow-[0_1px_3px_rgba(10,46,37,0.06),0_4px_12px_rgba(10,46,37,0.04)]">
          <h2 className="text-base font-semibold text-(--brand-800)">{copy.home.cards.clinician.title}</h2>
          <p className="mt-2 text-sm leading-6 text-(--text-secondary)">{copy.home.cards.clinician.description}</p>
        </article>
      </section>

      <p className="font-mono text-xs text-(--text-muted)">{copy.home.disclaimer}</p>
    </div>
  );
}
