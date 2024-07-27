import { getCovers } from "src/api/covers";
import { allStatYears, statsForYear, type YearStats } from "src/api/yearStats";
import { ListItemCoverImageConfig } from "src/components/ListItemCover";

import type { Props } from "./YearStats";

export async function getProps(year: string): Promise<Props> {
  const distinctStatYears = await allStatYears();

  const stats = await statsForYear(year);

  const works: YearStats["mostReadAuthors"][number]["readings"] = [];

  stats.mostReadAuthors.forEach((author) => {
    author.readings.forEach((reading) => {
      works.push(reading);
    });
  });

  const covers = await getCovers({ works, ...ListItemCoverImageConfig });

  return {
    year,
    stats: {
      ...stats,
      mostReadAuthors: stats.mostReadAuthors.map((author) => {
        return {
          ...author,
          readings: author.readings.map((reading) => {
            return {
              ...reading,
              imageData: covers[reading.slug],
            };
          }),
        };
      }),
    },
    distinctStatYears,
  };
}
