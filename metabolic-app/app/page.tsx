"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { copy } = useLanguage();

  return (
    <div className="space-y-10 py-4">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-teal-50 p-8 shadow-sm md:p-12">
        <div className="absolute -top-20 -right-12 h-52 w-52 rounded-full bg-teal-300/30 blur-3xl" />
        <div className="absolute -bottom-12 -left-14 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.06),transparent_26%)]" />

        <div className="relative max-w-3xl space-y-5">
          <BrandMark />
          <p className="text-xs font-semibold tracking-[0.25em] text-teal-900">{copy.home.kicker}</p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">{copy.home.title}</h1>
          <p className="max-w-2xl text-base font-medium text-slate-700 md:text-lg">{copy.home.subtitle}</p>
          <p className="max-w-2xl text-slate-700">{copy.home.description}</p>
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 rounded-full bg-teal-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-800"
          >
            {copy.home.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">{copy.home.cards.phenotypes.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.home.cards.phenotypes.description}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">{copy.home.cards.accuracy.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.home.cards.accuracy.description}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">{copy.home.cards.clinician.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.home.cards.clinician.description}</p>
        </article>
      </section>

      <p className="text-xs text-slate-500">{copy.home.disclaimer}</p>
    </div>
  );
}
