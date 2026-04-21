"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { DerivedFeatures as DerivedFeaturesType } from "@/lib/types";

export function DerivedFeatures({ data }: { data: DerivedFeaturesType }) {
  const { language } = useLanguage();

  const items =
    language === "en"
      ? [
          { key: "WHR", value: data.whr },
          { key: "WHtR", value: data.whtr },
          { key: "TG/HDL", value: data.tg_hdl_ratio },
          { key: "Pulse Pressure", value: data.pulse_pressure },
          { key: "HOMA-IR", value: data.homa_ir },
        ]
      : [
          { key: "WHR · Bel/Kalça", value: data.whr },
          { key: "WHtR · Bel/Boy", value: data.whtr },
          { key: "TG/HDL", value: data.tg_hdl_ratio },
          { key: "Nabız Basıncı", value: data.pulse_pressure },
          { key: "HOMA-IR", value: data.homa_ir },
        ];

  return (
    <div className="grid gap-3 rounded-lg border-y border-(--border-subtle) bg-(--surface-inset) py-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
      {items.map((item) => (
        <Card key={item.key} className="border-0 bg-transparent p-3 shadow-none">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-(--text-muted)">{item.key}</p>
          <p className="clinical-value text-[18px] font-medium text-(--brand-700)">{item.value.toFixed(4)}</p>
        </Card>
      ))}
    </div>
  );
}
