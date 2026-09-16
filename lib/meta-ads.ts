import type { CampaignMetric, ChannelSeries, DailyMetric } from "./types";

const LEAD_ACTION_TYPES = new Set([
  "lead",
  "onsite_conversion.lead_grouped",
  "offsite_conversion.fb_pixel_lead",
  "onsite_conversion.messaging_conversation_started_7d",
  "leadgen.other",
  "onsite_web_lead",
  "onsite_app_lead",
]);

interface MetaAction {
  action_type: string;
  value: string;
}

interface MetaInsightRow {
  campaign_id: string;
  campaign_name: string;
  date_start: string;
  impressions?: string;
  clicks?: string;
  spend?: string;
  actions?: MetaAction[];
}

function leadsFromActions(actions: MetaAction[] | undefined): number {
  if (!actions) return 0;
  return actions
    .filter((a) => LEAD_ACTION_TYPES.has(a.action_type))
    .reduce((sum, a) => sum + Number(a.value || 0), 0);
}

export function isMetaConfigured(): boolean {
  return Boolean(process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID);
}

/** Fetches Meta (Facebook/Instagram) Ads insights for the given date range using the Marketing API. */
export async function fetchMetaAdsSeries(start: string, end: string): Promise<ChannelSeries> {
  if (!isMetaConfigured()) {
    return { channel: "meta", mode: "error", error: "META_ACCESS_TOKEN o META_AD_ACCOUNT_ID no configurados", daily: [], campaigns: [] };
  }

  const accessToken = process.env.META_ACCESS_TOKEN!;
  const rawAccountId = process.env.META_AD_ACCOUNT_ID!.trim();
  const accountId = rawAccountId.startsWith("act_") ? rawAccountId : `act_${rawAccountId}`;
  const apiVersion = process.env.META_API_VERSION || "v21.0";

  const url = new URL(`https://graph.facebook.com/${apiVersion}/${accountId}/insights`);
  url.searchParams.set("level", "campaign");
  url.searchParams.set("time_increment", "1");
  url.searchParams.set("fields", "campaign_id,campaign_name,impressions,clicks,spend,actions,date_start");
  url.searchParams.set("time_range", JSON.stringify({ since: start, until: end }));
  url.searchParams.set("limit", "500");
  url.searchParams.set("access_token", accessToken);

  const rows: MetaInsightRow[] = [];
  let nextUrl: string | null = url.toString();

  while (nextUrl) {
    const res: Response = await fetch(nextUrl, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Meta Graph API ${res.status}: ${body.slice(0, 500)}`);
    }
    const json: { data: MetaInsightRow[]; paging?: { next?: string } } = await res.json();
    rows.push(...json.data);
    nextUrl = json.paging?.next ?? null;
  }

  const dailyMap = new Map<string, DailyMetric>();
  const campaignMap = new Map<string, CampaignMetric>();

  for (const row of rows) {
    const impressions = Number(row.impressions || 0);
    const clicks = Number(row.clicks || 0);
    const spend = Number(row.spend || 0);
    const leads = leadsFromActions(row.actions);

    const day = dailyMap.get(row.date_start) ?? { date: row.date_start, impressions: 0, clicks: 0, spend: 0, leads: 0 };
    day.impressions += impressions;
    day.clicks += clicks;
    day.spend += spend;
    day.leads += leads;
    dailyMap.set(row.date_start, day);

    const camp = campaignMap.get(row.campaign_id) ?? {
      id: row.campaign_id,
      name: row.campaign_name,
      channel: "meta" as const,
      status: "",
      impressions: 0,
      clicks: 0,
      spend: 0,
      leads: 0,
    };
    camp.impressions += impressions;
    camp.clicks += clicks;
    camp.spend += spend;
    camp.leads += leads;
    campaignMap.set(row.campaign_id, camp);
  }

  return {
    channel: "meta",
    mode: "live",
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
    campaigns: [...campaignMap.values()].sort((a, b) => b.leads - a.leads),
  };
}
