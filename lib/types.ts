export type Channel = "meta" | "google";

export type SourceMode = "live" | "mock" | "error";

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
}

export interface CampaignMetric {
  id: string;
  name: string;
  channel: Channel;
  status: string;
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
}

export interface ChannelSeries {
  channel: Channel;
  mode: SourceMode;
  error?: string;
  daily: DailyMetric[];
  campaigns: CampaignMetric[];
}

export interface DashboardResponse {
  range: {
    start: string;
    end: string;
    days: number;
  };
  generatedAt: string;
  channels: ChannelSeries[];
}
