import type { CampaignMetric, ChannelSeries, DailyMetric } from "./types";

export function isGoogleAdsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
      process.env.GOOGLE_ADS_CLIENT_ID &&
      process.env.GOOGLE_ADS_CLIENT_SECRET &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN &&
      process.env.GOOGLE_ADS_CUSTOMER_ID,
  );
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Google OAuth token refresh ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const json: { access_token: string } = await res.json();
  return json.access_token;
}

interface GaqlRow {
  campaign?: { id?: string; name?: string; status?: string };
  segments?: { date?: string };
  metrics?: { impressions?: string; clicks?: string; costMicros?: string; allConversions?: number };
}

async function runQuery(accessToken: string, query: string): Promise<GaqlRow[]> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
  const apiVersion = process.env.GOOGLE_ADS_API_VERSION || "v19";
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };
  if (loginCustomerId) headers["login-customer-id"] = loginCustomerId;

  const rows: GaqlRow[] = [];
  let pageToken: string | undefined;

  do {
    const res = await fetch(
      `https://googleads.googleapis.com/${apiVersion}/customers/${customerId}/googleAds:search`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ query, pageToken, pageSize: 10000 }),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error(`Google Ads API ${res.status}: ${(await res.text()).slice(0, 500)}`);
    }
    const json: { results?: GaqlRow[]; nextPageToken?: string } = await res.json();
    rows.push(...(json.results ?? []));
    pageToken = json.nextPageToken;
  } while (pageToken);

  return rows;
}

/** Fetches Google Ads campaign performance + lead conversions for the given date range. */
export async function fetchGoogleAdsSeries(start: string, end: string): Promise<ChannelSeries> {
  if (!isGoogleAdsConfigured()) {
    return {
      channel: "google",
      mode: "error",
      error: "Faltan variables de entorno de Google Ads (developer token / OAuth / customer id)",
      daily: [],
      campaigns: [],
    };
  }

  const accessToken = await getAccessToken();

  const performanceQuery = `
    SELECT campaign.id, campaign.name, campaign.status, segments.date,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM campaign
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND campaign.status != 'REMOVED'
  `;

  const leadsQuery = `
    SELECT campaign.id, segments.date, metrics.all_conversions
    FROM campaign
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND segments.conversion_action_category = 'LEAD'
      AND campaign.status != 'REMOVED'
  `;

  const [performanceRows, leadsRows] = await Promise.all([
    runQuery(accessToken, performanceQuery),
    runQuery(accessToken, leadsQuery),
  ]);

  const leadsByKey = new Map<string, number>();
  for (const row of leadsRows) {
    const key = `${row.campaign?.id}|${row.segments?.date}`;
    leadsByKey.set(key, (leadsByKey.get(key) ?? 0) + Number(row.metrics?.allConversions ?? 0));
  }

  const dailyMap = new Map<string, DailyMetric>();
  const campaignMap = new Map<string, CampaignMetric>();

  for (const row of performanceRows) {
    const date = row.segments?.date;
    const campaignId = row.campaign?.id;
    if (!date || !campaignId) continue;

    const impressions = Number(row.metrics?.impressions ?? 0);
    const clicks = Number(row.metrics?.clicks ?? 0);
    const spend = Number(row.metrics?.costMicros ?? 0) / 1_000_000;
    const leads = leadsByKey.get(`${campaignId}|${date}`) ?? 0;

    const day = dailyMap.get(date) ?? { date, impressions: 0, clicks: 0, spend: 0, leads: 0 };
    day.impressions += impressions;
    day.clicks += clicks;
    day.spend += spend;
    day.leads += leads;
    dailyMap.set(date, day);

    const camp = campaignMap.get(campaignId) ?? {
      id: campaignId,
      name: row.campaign?.name ?? campaignId,
      channel: "google" as const,
      status: row.campaign?.status ?? "",
      impressions: 0,
      clicks: 0,
      spend: 0,
      leads: 0,
    };
    camp.impressions += impressions;
    camp.clicks += clicks;
    camp.spend += spend;
    camp.leads += leads;
    campaignMap.set(campaignId, camp);
  }

  return {
    channel: "google",
    mode: "live",
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
    campaigns: [...campaignMap.values()].sort((a, b) => b.leads - a.leads),
  };
}
