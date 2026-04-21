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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.key} className="p-3">
          <p className="text-xs text-muted-foreground">{item.key}</p>
          <p className="text-xl font-semibold">{item.value.toFixed(4)}</p>
        </Card>
      ))}
    </div>
  );
}
