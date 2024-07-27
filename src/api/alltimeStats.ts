import type { AlltimeStatsJson } from "./data/alltimeStatsJson";
import { alltimeStatsJson } from "./data/alltimeStatsJson";

export interface AlltimeStats extends AlltimeStatsJson {}

export async function alltimeStats(): Promise<AlltimeStats> {
  return await alltimeStatsJson();
}
