import { eachDate } from "./date-range";
import type { CampaignMetric, Channel, ChannelSeries, DailyMetric } from "./types";

// Deterministic pseudo-random generator so the demo data is stable across
// requests for the same date (no client/server hydration mismatch).
function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 1;
}

const MOCK_CAMPAIGNS: Record<Channel, { name: string; status: string; weight: number }[]> = {
  meta: [
    { name: "Meta | Leads - Formulario instantáneo", status: "ACTIVE", weight: 1.4 },
    { name: "Meta | Retargeting - Visitantes web", status: "ACTIVE", weight: 0.8 },
    { name: "Meta | Prospección - Lookalike 1%", status: "ACTIVE", weight: 1.0 },
    { name: "Meta | Stories - Oferta mensual", status: "PAUSED", weight: 0.4 },
  ],
  google: [
    { name: "Google | Search - Marca", status: "ACTIVE", weight: 0.9 },
    { name: "Google | Search - Genérico Leads", status: "ACTIVE", weight: 1.3 },
    { name: "Google | Performance Max - Captación", status: "ACTIVE", weight: 1.1 },
  ],
};

function generateChannelMock(channel: Channel, start: string, end: string): ChannelSeries {
  const dates = eachDate(start, end);
  const campaignsDef = MOCK_CAMPAIGNS[channel];

  const daily: DailyMetric[] = [];
  const campaignTotals = new Map<string, CampaignMetric>();
  campaignsDef.forEach((c, idx) => {
    const id = `${channel}-mock-${idx + 1}`;
    campaignTotals.set(id, { id, name: c.name, channel, status: c.status, impressions: 0, clicks: 0, spend: 0, leads: 0 });
  });

  const baseImpressions = channel === "meta" ? 9000 : 5000;
  const baseCpc = channel === "meta" ? 0.55 : 1.25;

  for (const date of dates) {
    const rand = seededRandom(hashString(`${channel}-${date}`));
    // Weekly seasonality: slightly lower on weekends.
    const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
    const weekendFactor = dow === 0 || dow === 6 ? 0.7 : 1;

    let dayImpressions = 0;
    let dayClicks = 0;
    let daySpend = 0;
    let dayLeads = 0;

    campaignsDef.forEach((c, idx) => {
      const id = `${channel}-mock-${idx + 1}`;
      if (c.status === "PAUSED") return;

      const noise = 0.75 + rand() * 0.5;
      const impressions = Math.round(baseImpressions * c.weight * weekendFactor * noise);
      const ctr = channel === "meta" ? 0.012 + rand() * 0.01 : 0.03 + rand() * 0.02;
      const clicks = Math.round(impressions * ctr);
      const spend = Number((clicks * baseCpc * (0.85 + rand() * 0.3)).toFixed(2));
      const leadRate = channel === "meta" ? 0.06 + rand() * 0.05 : 0.09 + rand() * 0.06;
      const leads = Math.round(clicks * leadRate);

      dayImpressions += impressions;
      dayClicks += clicks;
      daySpend += spend;
      dayLeads += leads;

      const camp = campaignTotals.get(id)!;
      camp.impressions += impressions;
      camp.clicks += clicks;
      camp.spend += spend;
      camp.leads += leads;
    });

    daily.push({ date, impressions: dayImpressions, clicks: dayClicks, spend: Number(daySpend.toFixed(2)), leads: dayLeads });
  }

  return {
    channel,
    mode: "mock",
    daily,
    campaigns: [...campaignTotals.values()]
      .map((c) => ({ ...c, spend: Number(c.spend.toFixed(2)) }))
      .sort((a, b) => b.leads - a.leads),
  };
}

export function generateMockSeries(channel: Channel, start: string, end: string): ChannelSeries {
  return generateChannelMock(channel, start, end);
}
