import { type AlltimeStats, alltimeStats } from "src/api/alltimeStats";
import { getCovers } from "src/api/covers";
import { allStatYears } from "src/api/yearStats";
import { ListItemCoverImageConfig } from "src/components/ListItemCover";

import { type Props } from "./AlltimeStats";

export async function getProps(): Promise<Props> {
  const stats = await alltimeStats();
  const distinctStatYears = await allStatYears();

  const works: AlltimeStats["mostReadAuthors"][number]["readings"] = [];

  stats.mostReadAuthors.forEach((author) => {
    author.readings.forEach((reading) => {
      works.push(reading);
    });
  });

  const covers = await getCovers({ works, ...ListItemCoverImageConfig });

  return {
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
