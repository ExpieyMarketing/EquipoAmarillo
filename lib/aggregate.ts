import type { CampaignMetric, ChannelSeries } from "./types";

export interface Totals {
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
}

export function emptyTotals(): Totals {
  return { impressions: 0, clicks: 0, spend: 0, leads: 0 };
}

export function totalsForChannel(series: ChannelSeries): Totals {
  return series.daily.reduce(
    (acc, d) => ({
      impressions: acc.impressions + d.impressions,
      clicks: acc.clicks + d.clicks,
      spend: acc.spend + d.spend,
      leads: acc.leads + d.leads,
    }),
    emptyTotals(),
  );
}

export function combinedTotals(channels: ChannelSeries[]): Totals {
  return channels.reduce((acc, ch) => {
    const t = totalsForChannel(ch);
    return {
      impressions: acc.impressions + t.impressions,
      clicks: acc.clicks + t.clicks,
      spend: acc.spend + t.spend,
      leads: acc.leads + t.leads,
    };
  }, emptyTotals());
}

export interface MergedDay {
  date: string;
  meta_leads: number;
  google_leads: number;
  total_leads: number;
  meta_spend: number;
  google_spend: number;
  total_spend: number;
}

export function mergeDailyByChannel(channels: ChannelSeries[]): MergedDay[] {
  const byDate = new Map<string, MergedDay>();

  for (const ch of channels) {
    for (const d of ch.daily) {
      const row =
        byDate.get(d.date) ??
        ({ date: d.date, meta_leads: 0, google_leads: 0, total_leads: 0, meta_spend: 0, google_spend: 0, total_spend: 0 } as MergedDay);
      if (ch.channel === "meta") {
        row.meta_leads += d.leads;
        row.meta_spend += d.spend;
      } else {
        row.google_leads += d.leads;
        row.google_spend += d.spend;
      }
      row.total_leads = row.meta_leads + row.google_leads;
      row.total_spend = Number((row.meta_spend + row.google_spend).toFixed(2));
      byDate.set(d.date, row);
    }
  }

  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export function allCampaigns(channels: ChannelSeries[]): CampaignMetric[] {
  return channels.flatMap((c) => c.campaigns).sort((a, b) => b.leads - a.leads);
}
