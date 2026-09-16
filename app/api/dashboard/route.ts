import { NextRequest, NextResponse } from "next/server";
import { daysBetween, resolveRange } from "@/lib/date-range";
import { fetchMetaAdsSeries, isMetaConfigured } from "@/lib/meta-ads";
import { fetchGoogleAdsSeries, isGoogleAdsConfigured } from "@/lib/google-ads";
import { generateMockSeries } from "@/lib/mock-data";
import type { ChannelSeries, DashboardResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

async function loadChannel(
  channel: "meta" | "google",
  start: string,
  end: string,
): Promise<ChannelSeries> {
  const configured = channel === "meta" ? isMetaConfigured() : isGoogleAdsConfigured();

  if (!configured) {
    return generateMockSeries(channel, start, end);
  }

  try {
    return channel === "meta" ? await fetchMetaAdsSeries(start, end) : await fetchGoogleAdsSeries(start, end);
  } catch (err) {
    return {
      channel,
      mode: "error",
      error: err instanceof Error ? err.message : "Error desconocido",
      daily: [],
      campaigns: [],
    };
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const preset = searchParams.get("range") ?? "30d";
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const { start, end } = startParam && endParam ? { start: startParam, end: endParam } : resolveRange(preset);

  const [meta, google] = await Promise.all([loadChannel("meta", start, end), loadChannel("google", start, end)]);

  const body: DashboardResponse = {
    range: { start, end, days: daysBetween(start, end) },
    generatedAt: new Date().toISOString(),
    channels: [meta, google],
  };

  return NextResponse.json(body);
}
