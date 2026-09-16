"use client";

import { formatNumber, formatPercent, safeDiv } from "@/lib/format";
import { sequentialBlue } from "@/lib/palette";
import { useColorScheme } from "@/lib/use-color-scheme";

interface FunnelChartProps {
  impressions: number;
  clicks: number;
  leads: number;
}

export function FunnelChart({ impressions, clicks, leads }: FunnelChartProps) {
  const scheme = useColorScheme();
  const ramp = sequentialBlue[scheme];

  const stages = [
    { label: "Impresiones", value: impressions, color: ramp[250], rate: null as number | null },
    { label: "Clics", value: clicks, color: ramp[400], rate: safeDiv(clicks, impressions) },
    { label: "Leads", value: leads, color: ramp[700], rate: safeDiv(leads, clicks) },
  ];

  const max = impressions || 1;
  // A funnel's stages are typically orders of magnitude apart (impressions >> clicks
  // >> leads); a linear width would render clicks/leads as invisible slivers, so bar
  // width uses a power scale while labels keep showing the real numbers.
  const widthScale = (value: number) => Math.pow(value / max, 0.3) * 100;

  return (
    <div className="rounded-xl border bg-surface p-4">
      <h3 className="text-sm font-semibold text-ink mb-4">Embudo de conversión</h3>
      <div className="flex flex-col gap-3">
        {stages.map((stage) => {
          const pct = stage.value > 0 ? Math.max(widthScale(stage.value), 4) : 0;
          return (
            <div key={stage.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-ink-secondary">{stage.label}</span>
                <span className="tabular-nums text-ink">
                  {formatNumber(stage.value)}
                  {stage.rate !== null && (
                    <span className="text-ink-muted ml-1.5">({formatPercent(stage.rate)})</span>
                  )}
                </span>
              </div>
              <div className="h-5 rounded-md bg-page overflow-hidden">
                <div className="h-full rounded-md" style={{ width: `${pct}%`, background: stage.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
