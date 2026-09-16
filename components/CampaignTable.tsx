"use client";

import { useMemo, useState } from "react";
import type { CampaignMetric } from "@/lib/types";
import { formatCurrencyPrecise, formatNumber, formatPercent, safeDiv } from "@/lib/format";
import { seriesColor } from "@/lib/palette";
import { useColorScheme } from "@/lib/use-color-scheme";

interface CampaignTableProps {
  campaigns: CampaignMetric[];
}

type SortKey = "name" | "impressions" | "clicks" | "spend" | "leads" | "cpl" | "ctr";

const COLUMNS: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "name", label: "Campaña", align: "left" },
  { key: "impressions", label: "Impresiones", align: "right" },
  { key: "clicks", label: "Clics", align: "right" },
  { key: "ctr", label: "CTR", align: "right" },
  { key: "spend", label: "Inversión", align: "right" },
  { key: "leads", label: "Leads", align: "right" },
  { key: "cpl", label: "Coste / lead", align: "right" },
];

export function CampaignTable({ campaigns }: CampaignTableProps) {
  const scheme = useColorScheme();
  const [sortKey, setSortKey] = useState<SortKey>("leads");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const rows = useMemo(() => {
    const withComputed = campaigns.map((c) => ({
      ...c,
      cpl: safeDiv(c.spend, c.leads),
      ctr: safeDiv(c.clicks, c.impressions),
    }));

    return withComputed.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
  }, [campaigns, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-xl border bg-surface p-4">
        <h3 className="text-sm font-semibold text-ink mb-2">Campañas</h3>
        <p className="text-sm text-ink-muted">No hay campañas para el periodo seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-surface p-4 overflow-x-auto">
      <h3 className="text-sm font-semibold text-ink mb-3">Campañas</h3>
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b text-xs text-ink-muted">
            <th className="py-2 pr-2 text-left font-medium w-8">Canal</th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className={`py-2 px-2 font-medium cursor-pointer select-none hover:text-ink transition-colors ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
                {sortKey === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-b last:border-0">
              <td className="py-2 pr-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: seriesColor[c.channel][scheme] }}
                  title={c.channel === "meta" ? "Meta Ads" : "Google Ads"}
                />
              </td>
              <td className="py-2 px-2 text-ink">
                {c.name}
                {c.status && c.status !== "ACTIVE" && (
                  <span className="ml-2 text-xs text-ink-muted">({c.status.toLowerCase()})</span>
                )}
              </td>
              <td className="py-2 px-2 text-right tabular-nums text-ink-secondary">{formatNumber(c.impressions)}</td>
              <td className="py-2 px-2 text-right tabular-nums text-ink-secondary">{formatNumber(c.clicks)}</td>
              <td className="py-2 px-2 text-right tabular-nums text-ink-secondary">{formatPercent(c.ctr)}</td>
              <td className="py-2 px-2 text-right tabular-nums text-ink-secondary">{formatCurrencyPrecise(c.spend)}</td>
              <td className="py-2 px-2 text-right tabular-nums font-medium text-ink">{formatNumber(c.leads)}</td>
              <td className="py-2 px-2 text-right tabular-nums text-ink-secondary">{formatCurrencyPrecise(c.cpl)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
