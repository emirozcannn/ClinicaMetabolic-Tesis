import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-(--brand-400) shadow-sm">
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <defs>
            <linearGradient id="brandMarkGradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="32" height="32" rx="12" fill="url(#brandMarkGradient)" />
          <path
            d="M16 24h4.5l2.2-4.4 3.3 8.6 2.4-4.2H32"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 15v18M15 24h18"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-[0.04em] text-current uppercase">ClinicaMetabolic</p>
        <p className="text-xs font-medium tracking-wide text-current/70">Clinical phenotype engine</p>
      </div>
    </div>
  );
}
