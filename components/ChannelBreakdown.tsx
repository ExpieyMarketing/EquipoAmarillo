"use client";

import { formatCurrencyPrecise, formatNumber, safeDiv } from "@/lib/format";
import { seriesColor } from "@/lib/palette";
import { useColorScheme } from "@/lib/use-color-scheme";
import type { Totals } from "@/lib/aggregate";

interface ChannelBreakdownProps {
  meta: Totals;
  google: Totals;
}

function BarRow({ label, value, max, color, formatted }: { label: string; value: number; max: number; color: string; formatted: string }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 3 : 0) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-xs text-ink-secondary">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-page overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-24 shrink-0 text-right text-xs font-medium tabular-nums text-ink">{formatted}</span>
    </div>
  );
}

export function ChannelBreakdown({ meta, google }: ChannelBreakdownProps) {
  const scheme = useColorScheme();
  const metaColor = seriesColor.meta[scheme];
  const googleColor = seriesColor.google[scheme];

  const metaCpl = safeDiv(meta.spend, meta.leads);
  const googleCpl = safeDiv(google.spend, google.leads);

  const rows: { title: string; max: number; metaVal: number; googleVal: number; format: (n: number) => string }[] = [
    { title: "Leads", max: Math.max(meta.leads, google.leads), metaVal: meta.leads, googleVal: google.leads, format: formatNumber },
    { title: "Inversión", max: Math.max(meta.spend, google.spend), metaVal: meta.spend, googleVal: google.spend, format: formatCurrencyPrecise },
    { title: "Coste / lead", max: Math.max(metaCpl, googleCpl), metaVal: metaCpl, googleVal: googleCpl, format: formatCurrencyPrecise },
  ];

  return (
    <div className="rounded-xl border bg-surface p-4">
      <h3 className="text-sm font-semibold text-ink mb-4">Comparativa por canal</h3>
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.title} className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wide">{row.title}</span>
            <BarRow label="Meta" value={row.metaVal} max={row.max} color={metaColor} formatted={row.format(row.metaVal)} />
            <BarRow label="Google" value={row.googleVal} max={row.max} color={googleColor} formatted={row.format(row.googleVal)} />
          </div>
        ))}
      </div>
    </div>
  );
}
