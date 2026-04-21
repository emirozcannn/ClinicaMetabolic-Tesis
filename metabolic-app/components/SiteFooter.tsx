"use client";

import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { copy } = useLanguage();

  return (
    <footer className="no-print border-t border-slate-200 bg-white/80 px-4 py-6 text-center text-sm text-slate-600">
      {copy.footer}
    </footer>
  );
}
