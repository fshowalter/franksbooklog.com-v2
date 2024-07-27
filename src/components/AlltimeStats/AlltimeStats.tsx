import type { AlltimeStats } from "src/api/alltimeStats";
import type { CoverImageData } from "src/api/covers";
import { DecadeDistribution } from "src/components/DecadeDistribution";
import { EditionDistribution } from "src/components/EditionDistribution";
import { KindDistribution } from "src/components/KindDistribution";
import { MostReadAuthors } from "src/components/MostReadAuthors";
import { PageTitle } from "src/components/PageTitle";
import { StatsNavigation } from "src/components/StatsNavigation";

import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";

type AlltimeStatsMostReadAuthorReading =
  AlltimeStats["mostReadAuthors"][number]["readings"][number];

interface MostReadAuthorReading extends AlltimeStatsMostReadAuthorReading {
  imageData: CoverImageData;
}

interface MostReadAuthor
  extends Omit<AlltimeStats["mostReadAuthors"][number], "readings"> {
  readings: MostReadAuthorReading[];
}

interface Stats extends Omit<AlltimeStats, "mostReadAuthors"> {
  mostReadAuthors: MostReadAuthor[];
}

export interface Props {
  stats: Stats;
  distinctStatYears: string[];
}

export function AlltimeStats({ stats, distinctStatYears }: Props): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">All-Time Stats</PageTitle>
          <p className="text-subtle">
            {`${(distinctStatYears.length - 1).toString()} Years in Review`}
          </p>
          <div className="spacer-y-6" />
          <StatsNavigation
            currentYear={"all"}
            linkFunc={(year: string) => {
              return `/readings/stats/${year}/`;
            }}
            years={distinctStatYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts
            workCount={stats.workCount}
            bookCount={stats.bookCount}
            reviewCount={stats.reviewCount}
          />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostReadAuthors values={stats.mostReadAuthors} />
        <GradeDistribution values={stats.gradeDistribution} />
        <DecadeDistribution values={stats.decadeDistribution} />
        <KindDistribution values={stats.kindDistribution} />
        <EditionDistribution values={stats.editionDistribution} />
      </div>
    </main>
  );
}
