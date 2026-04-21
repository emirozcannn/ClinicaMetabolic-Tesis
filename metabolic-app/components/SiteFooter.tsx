"use client";

import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { copy } = useLanguage();

  return (
    <footer className="no-print border-t border-white/10 bg-(--brand-900) px-4 py-6 text-center text-xs tracking-[0.04em] text-white/45">
      {copy.footer}
    </footer>
  );
}
