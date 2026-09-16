"use client";

import { formatNumber } from "@/lib/format";

interface GoalProgressProps {
  currentLeads: number;
  goal: number;
  onGoalChange: (goal: number) => void;
  daysElapsed: number;
  daysTotal: number;
}

export function GoalProgress({ currentLeads, goal, onGoalChange, daysElapsed, daysTotal }: GoalProgressProps) {
  const pct = goal > 0 ? Math.min(currentLeads / goal, 1) : 0;
  const projected = daysElapsed > 0 ? (currentLeads / daysElapsed) * daysTotal : currentLeads;
  const projectedPct = goal > 0 ? projected / goal : 0;

  let status: { color: string; label: string; icon: string };
  if (goal <= 0) {
    status = { color: "var(--text-muted)", label: "Define un objetivo", icon: "●" };
  } else if (projectedPct >= 1) {
    status = { color: "var(--status-good)", label: "En camino de cumplir el objetivo", icon: "✓" };
  } else if (projectedPct >= 0.85) {
    status = { color: "var(--status-warning)", label: "Ligeramente por debajo del ritmo necesario", icon: "⚠" };
  } else {
    status = { color: "var(--status-critical)", label: "Por debajo del ritmo necesario", icon: "✕" };
  }

  return (
    <div className="rounded-xl border bg-surface p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Objetivo de leads del periodo</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold tabular-nums text-ink">{formatNumber(currentLeads)}</span>
            <span className="text-sm text-ink-muted">
              de
              <input
                type="number"
                min={0}
                value={goal}
                onChange={(e) => onGoalChange(Math.max(0, Number(e.target.value) || 0))}
                className="mx-1 w-24 rounded-md border bg-page px-2 py-1 text-sm tabular-nums text-ink"
                aria-label="Objetivo de leads"
              />
              leads
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: status.color }}>
          <span aria-hidden>{status.icon}</span>
          <span>{status.label}</span>
        </div>
      </div>

      <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: "var(--gridline)" }}>
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${Math.round(pct * 100)}%`, background: "var(--seq-400)" }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-ink-muted">
        <span>{goal > 0 ? `${Math.round(pct * 100)}% conseguido` : "—"}</span>
        <span>
          Proyección al ritmo actual: <span className="tabular-nums font-medium text-ink-secondary">{formatNumber(projected)}</span> leads
        </span>
      </div>
    </div>
  );
}
