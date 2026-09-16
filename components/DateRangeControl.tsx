"use client";

const PRESETS: { key: string; label: string }[] = [
  { key: "7d", label: "7 días" },
  { key: "30d", label: "30 días" },
  { key: "90d", label: "90 días" },
  { key: "mtd", label: "Mes en curso" },
];

interface DateRangeControlProps {
  value: string;
  onChange: (preset: string) => void;
}

export function DateRangeControl({ value, onChange }: DateRangeControlProps) {
  return (
    <div className="flex gap-1 rounded-lg border p-0.5" role="group" aria-label="Rango de fechas">
      {PRESETS.map((p) => (
        <button
          key={p.key}
          type="button"
          onClick={() => onChange(p.key)}
          className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
          style={{
            background: value === p.key ? "var(--seq-400)" : "transparent",
            color: value === p.key ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
