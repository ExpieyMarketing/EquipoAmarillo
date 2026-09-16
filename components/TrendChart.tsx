"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MergedDay } from "@/lib/aggregate";
import { formatCurrency, formatDateShort, formatNumber } from "@/lib/format";
import { chrome, seriesColor } from "@/lib/palette";
import { useColorScheme } from "@/lib/use-color-scheme";

type Metric = "leads" | "spend";

interface TrendChartProps {
  data: MergedDay[];
}

interface TooltipPayloadItem {
  color: string;
  dataKey: string;
  value: number;
}

function ChartTooltip({
  active,
  payload,
  label,
  metric,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  metric: Metric;
}) {
  if (!active || !payload?.length) return null;
  const format = metric === "leads" ? formatNumber : formatCurrency;

  return (
    <div className="rounded-lg border bg-surface px-3 py-2 text-xs shadow-sm">
      <div className="font-medium text-ink mb-1">{label ? formatDateShort(label) : ""}</div>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex items-center gap-1.5 text-ink-secondary">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
          <span>{item.dataKey.startsWith("meta") ? "Meta" : "Google"}</span>
          <span className="ml-auto tabular-nums font-medium text-ink">{format(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function TrendChart({ data }: TrendChartProps) {
  const [metric, setMetric] = useState<Metric>("leads");
  const scheme = useColorScheme();
  const c = chrome[scheme];
  const metaColor = seriesColor.meta[scheme];
  const googleColor = seriesColor.google[scheme];

  const metaKey = metric === "leads" ? "meta_leads" : "meta_spend";
  const googleKey = metric === "leads" ? "google_leads" : "google_spend";

  return (
    <div className="rounded-xl border bg-surface p-4">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <h3 className="text-sm font-semibold text-ink">Evolución diaria</h3>
        <div className="flex gap-1 rounded-lg border p-0.5">
          {(["leads", "spend"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
              style={{
                background: metric === m ? "var(--seq-400)" : "transparent",
                color: metric === m ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              {m === "leads" ? "Leads" : "Inversión"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-2 text-xs text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: metaColor }} />
          Meta Ads
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: googleColor }} />
          Google Ads
        </span>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={c.gridline} vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d: string) => formatDateShort(d)}
              stroke={c.baseline}
              tick={{ fill: c.muted, fontSize: 11 }}
              tickLine={false}
              minTickGap={24}
            />
            <YAxis
              stroke={c.baseline}
              tick={{ fill: c.muted, fontSize: 11 }}
              tickLine={false}
              width={metric === "spend" ? 56 : 40}
              tickFormatter={(v: number) => (metric === "spend" ? formatCurrency(v) : formatNumber(v))}
            />
            <Tooltip content={<ChartTooltip metric={metric} />} />
            <Line type="monotone" dataKey={metaKey} name="Meta" stroke={metaColor} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line
              type="monotone"
              dataKey={googleKey}
              name="Google"
              stroke={googleColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
