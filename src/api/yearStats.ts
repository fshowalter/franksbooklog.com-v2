import { allYearStatsJson, type YearStatsJson } from "./data/yearStatsJson";

export interface YearStats extends YearStatsJson {}

const statYears = new Set<string>();

export async function allStatYears() {
  if (statYears.size > 0) {
    return Array.from(statYears).toSorted();
  }

  const yearStats = await allYearStatsJson();

  yearStats.forEach((stats) => {
    statYears.add(stats.year);
  });

  return Array.from(statYears).toSorted();
}

export async function statsForYear(year: string): Promise<YearStats> {
  const yearStats = await allYearStatsJson();

  return yearStats.find((stats) => stats.year === year)!;
}
