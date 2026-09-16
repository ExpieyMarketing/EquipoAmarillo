interface KpiCardProps {
  label: string;
  value: string;
  delta?: number | null; // fractional change vs previous period, e.g. 0.12 = +12%
  goodDirection?: "up" | "down";
  hint?: string;
}

export function KpiCard({ label, value, delta, goodDirection = "up", hint }: KpiCardProps) {
  const hasDelta = delta !== undefined && delta !== null && Number.isFinite(delta);
  const isUp = hasDelta && (delta as number) > 0;
  const isFlat = hasDelta && Math.abs(delta as number) < 0.001;
  const isGood = hasDelta && !isFlat && (goodDirection === "up" ? isUp : !isUp);

  return (
    <div className="rounded-xl border bg-surface p-4 flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="text-2xl font-semibold tabular-nums text-ink">{value}</span>
      <div className="flex items-center gap-2 min-h-[1.25rem]">
        {hasDelta && !isFlat && (
          <span
            className="inline-flex items-center gap-1 text-xs font-medium tabular-nums"
            style={{ color: isGood ? "var(--status-good)" : "var(--status-critical)" }}
          >
            <span aria-hidden>{isUp ? "▲" : "▼"}</span>
            {Math.abs((delta as number) * 100).toFixed(1)}%
          </span>
        )}
        {hasDelta && isFlat && <span className="text-xs font-medium text-ink-muted">sin cambios</span>}
        <span className="text-xs text-ink-muted">{hint ?? "vs. periodo anterior"}</span>
      </div>
    </div>
  );
}
