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
    <header className="no-print sticky top-0 z-30 border-b border-white/10 bg-(--brand-900)/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="shrink-0 text-white">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-none border-b-2 px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-(--brand-400) text-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-(--brand-400)"
            aria-label={language === "en" ? copy.locale.turkish : copy.locale.english}
          >
            <span className={language === "en" ? "text-white" : "text-white/40"}>EN</span>
            <span className="text-white/30">/</span>
            <span className={language === "tr" ? "text-white" : "text-white/40"}>TR</span>
          </button>
        </nav>

        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="icon" className="border-white/20 bg-white/5 text-white md:hidden" />}
          >
            <Menu />
            <span className="sr-only">{copy.nav.openMenu}</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-white/10 bg-(--brand-900) text-white">
            <SheetHeader>
              <SheetTitle>{copy.nav.navigate}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 p-4">
              <button
                type="button"
                onClick={toggleLanguage}
                className="mb-2 inline-flex items-center justify-between rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-(--brand-400) hover:bg-white/5"
              >
                <span>{copy.locale.english}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-(--brand-400)">
                  {language === "en" ? copy.locale.turkish : copy.locale.english}
                </span>
              </button>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm ${
                    pathname === link.href ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
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
