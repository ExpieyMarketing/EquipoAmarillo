export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function daysBetween(start: string, end: string): number {
  const a = new Date(`${start}T00:00:00Z`).getTime();
  const b = new Date(`${end}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000) + 1;
}

export function eachDate(start: string, end: string): string[] {
  const out: string[] = [];
  const cursor = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cursor.getTime() <= last.getTime()) {
    out.push(toISODate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

/** Returns the immediately preceding period of the same length, for period-over-period comparisons. */
export function previousRange(start: string, end: string): { start: string; end: string } {
  const days = daysBetween(start, end);
  const prevEnd = new Date(`${start}T00:00:00Z`);
  prevEnd.setUTCDate(prevEnd.getUTCDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setUTCDate(prevStart.getUTCDate() - (days - 1));
  return { start: toISODate(prevStart), end: toISODate(prevEnd) };
}

/** Resolves a preset key into a concrete { start, end } ISO date range (inclusive). */
export function resolveRange(preset: string): { start: string; end: string } {
  const today = new Date();
  const end = toISODate(today);

  switch (preset) {
    case "7d": {
      const start = new Date(today);
      start.setUTCDate(start.getUTCDate() - 6);
      return { start: toISODate(start), end };
    }
    case "90d": {
      const start = new Date(today);
      start.setUTCDate(start.getUTCDate() - 89);
      return { start: toISODate(start), end };
    }
    case "mtd": {
      const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
      return { start: toISODate(start), end };
    }
    case "30d":
    default: {
      const start = new Date(today);
      start.setUTCDate(start.getUTCDate() - 29);
      return { start: toISODate(start), end };
    }
  }
}
