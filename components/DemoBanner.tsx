import type { ChannelSeries } from "@/lib/types";

interface DemoBannerProps {
  channels: ChannelSeries[];
}

const CHANNEL_LABEL: Record<string, string> = { meta: "Meta Ads", google: "Google Ads" };

export function DemoBanner({ channels }: DemoBannerProps) {
  const issues = channels.filter((c) => c.mode !== "live");
  if (issues.length === 0) return null;

  return (
    <div
      className="rounded-lg border px-3 py-2.5 text-xs flex flex-col gap-1"
      style={{ background: "color-mix(in srgb, var(--status-warning) 12%, var(--surface-1))", borderColor: "var(--status-warning)" }}
    >
      {issues.map((c) => (
        <div key={c.channel} className="flex items-start gap-1.5">
          <span aria-hidden style={{ color: "var(--status-warning)" }}>
            {"⚠"}
          </span>
          <span className="text-ink-secondary">
            <strong className="text-ink">{CHANNEL_LABEL[c.channel]}:</strong>{" "}
            {c.mode === "mock"
              ? "mostrando datos de ejemplo — configura las variables de entorno para ver datos reales."
              : `no se pudieron obtener datos reales${c.error ? ` (${c.error})` : ""}.`}
          </span>
        </div>
      ))}
    </div>
  );
}
