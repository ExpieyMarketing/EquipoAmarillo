"use client";

import { useEffect, useMemo, useState } from "react";
import { KpiCard } from "@/components/KpiCard";
import { GoalProgress } from "@/components/GoalProgress";
import { TrendChart } from "@/components/TrendChart";
import { ChannelBreakdown } from "@/components/ChannelBreakdown";
import { FunnelChart } from "@/components/FunnelChart";
import { CampaignTable } from "@/components/CampaignTable";
import { DateRangeControl } from "@/components/DateRangeControl";
import { DemoBanner } from "@/components/DemoBanner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { allCampaigns, combinedTotals, mergeDailyByChannel, totalsForChannel } from "@/lib/aggregate";
import { daysBetween, previousRange, resolveRange, toISODate } from "@/lib/date-range";
import { formatCurrencyPrecise, formatNumber, formatPercent, safeDiv } from "@/lib/format";
import type { DashboardResponse } from "@/lib/types";

const GOAL_STORAGE_KEY = "leads-dashboard-goal";
const DEFAULT_GOAL = 200;

async function loadDashboard(start: string, end: string): Promise<DashboardResponse> {
  const res = await fetch(`/api/dashboard?start=${start}&end=${end}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo cargar el panel (${res.status})`);
  return res.json();
}

export default function DashboardPage() {
  const [preset, setPreset] = useState("30d");
  const [current, setCurrent] = useState<DashboardResponse | null>(null);
  const [previous, setPrevious] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Lazy initializer: reads localStorage only on the client mount. Safe from
  // hydration mismatches because the goal is never part of the initial (loading) render.
  const [goal, setGoal] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(GOAL_STORAGE_KEY);
      return stored ? Number(stored) || DEFAULT_GOAL : DEFAULT_GOAL;
    } catch {
      return DEFAULT_GOAL;
    }
  });

  function updateGoal(value: number) {
    setGoal(value);
    try {
      localStorage.setItem(GOAL_STORAGE_KEY, String(value));
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    let cancelled = false;
    // Resets the async lifecycle state (loading/error) for the new preset before
    // the fetch starts; this is standard for a data-fetching effect, not derivable state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    const { start, end } = resolveRange(preset);
    const prev = previousRange(start, end);

    Promise.all([loadDashboard(start, end), loadDashboard(prev.start, prev.end)])
      .then(([curr, prevData]) => {
        if (cancelled) return;
        setCurrent(curr);
        setPrevious(prevData);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Error desconocido");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [preset]);

  const merged = useMemo(() => (current ? mergeDailyByChannel(current.channels) : []), [current]);
  const totals = useMemo(() => (current ? combinedTotals(current.channels) : null), [current]);
  const prevTotals = useMemo(() => (previous ? combinedTotals(previous.channels) : null), [previous]);
  const campaigns = useMemo(() => (current ? allCampaigns(current.channels) : []), [current]);

  const metaTotals = useMemo(
    () => (current ? totalsForChannel(current.channels.find((c) => c.channel === "meta")!) : null),
    [current],
  );
  const googleTotals = useMemo(
    () => (current ? totalsForChannel(current.channels.find((c) => c.channel === "google")!) : null),
    [current],
  );

  const cpl = totals ? safeDiv(totals.spend, totals.leads) : 0;
  const prevCpl = prevTotals ? safeDiv(prevTotals.spend, prevTotals.leads) : 0;
  const convRate = totals ? safeDiv(totals.leads, totals.clicks) : 0;
  const prevConvRate = prevTotals ? safeDiv(prevTotals.leads, prevTotals.clicks) : 0;

  function delta(curr: number, prev: number): number | null {
    if (!prevTotals) return null;
    if (prev === 0) return curr > 0 ? 1 : 0;
    return (curr - prev) / prev;
  }

  const daysElapsed = current ? daysBetween(current.range.start, toISODate(new Date())) : 0;
  const daysTotal = current ? current.range.days : 1;

  return (
    <div className="min-h-full mx-auto w-full max-w-6xl px-4 py-6 flex flex-col gap-5">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold text-ink">Captación de leads · Publicidad</h1>
          <p className="text-xs text-ink-muted mt-0.5">Meta Ads + Google Ads</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeControl value={preset} onChange={setPreset} />
          <ThemeToggle />
        </div>
      </header>

      {error && (
        <div className="rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: "var(--status-critical)", color: "var(--status-critical)" }}>
          {error}
        </div>
      )}

      {current && <DemoBanner channels={current.channels} />}

      {loading && !current ? (
        <div className="text-sm text-ink-muted py-12 text-center">Cargando datos…</div>
      ) : (
        current &&
        totals && (
          <>
            <GoalProgress currentLeads={totals.leads} goal={goal} onGoalChange={updateGoal} daysElapsed={Math.max(daysElapsed, 1)} daysTotal={daysTotal} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiCard label="Leads totales" value={formatNumber(totals.leads)} delta={delta(totals.leads, prevTotals?.leads ?? 0)} goodDirection="up" />
              <KpiCard label="Coste por lead" value={formatCurrencyPrecise(cpl)} delta={delta(cpl, prevCpl)} goodDirection="down" />
              <KpiCard label="Inversión total" value={formatCurrencyPrecise(totals.spend)} delta={delta(totals.spend, prevTotals?.spend ?? 0)} goodDirection="up" hint="vs. periodo anterior (inversión)" />
              <KpiCard label="Tasa de conversión" value={formatPercent(convRate)} delta={delta(convRate, prevConvRate)} goodDirection="up" hint="leads / clics" />
            </div>

            <TrendChart data={merged} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {metaTotals && googleTotals && <ChannelBreakdown meta={metaTotals} google={googleTotals} />}
              <FunnelChart impressions={totals.impressions} clicks={totals.clicks} leads={totals.leads} />
            </div>

            <CampaignTable campaigns={campaigns} />
          </>
        )
      )}
    </div>
  );
}
