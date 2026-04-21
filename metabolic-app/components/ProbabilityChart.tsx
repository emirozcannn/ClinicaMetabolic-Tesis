"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ProbabilityChart({
  probabilities,
  predictedLabel,
}: {
  probabilities: Record<string, number>;
  predictedLabel: string;
}) {
  const chartData = Object.entries(probabilities)
    .map(([label, value]) => ({
      label,
      value: Number(value) * 100,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
        <XAxis type="number" hide />
        <YAxis dataKey="label" type="category" width={56} tickLine={false} axisLine={false} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={entry.label}
              fill={entry.label === predictedLabel ? "#0f766e" : "#94a3b8"}
              fillOpacity={entry.label === predictedLabel ? 1 : 0.45}
            />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(value) => `${Number(value).toFixed(1)}%`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
