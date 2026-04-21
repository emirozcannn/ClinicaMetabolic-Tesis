"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { useLanguage } from "@/lib/i18n";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const { copy, language, toggleLanguage } = useLanguage();

  const links = [
    { href: "/", label: copy.nav.home },
    { href: "/predict", label: copy.nav.classify },
    { href: "/insights", label: copy.nav.insights },
    { href: "/phenotypes", label: copy.nav.phenotypes },
    { href: "/about", label: copy.nav.about },
  ];

  return (
    <header className="no-print sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-teal-900 text-white shadow-sm shadow-teal-900/10" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-teal-300 hover:text-teal-900"
            aria-label={language === "en" ? copy.locale.turkish : copy.locale.english}
          >
            <span className={language === "en" ? "text-teal-900" : "text-slate-400"}>EN</span>
            <span className="text-slate-300">/</span>
            <span className={language === "tr" ? "text-teal-900" : "text-slate-400"}>TR</span>
          </button>
        </nav>

        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" />}>
            <Menu />
            <span className="sr-only">{copy.nav.openMenu}</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-slate-200 bg-white/95 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle>{copy.nav.navigate}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 p-4">
              <button
                type="button"
                onClick={toggleLanguage}
                className="mb-2 inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"
              >
                <span>{copy.locale.english}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-teal-900">
                  {language === "en" ? copy.locale.turkish : copy.locale.english}
                </span>
              </button>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm ${
                    pathname === link.href ? "bg-teal-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
