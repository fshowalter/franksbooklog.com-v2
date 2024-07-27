import type { YearStats } from "src/api/yearStats";
import { StatsCallout } from "src/components/StatsCallout";

interface Props extends Pick<YearStats, "bookCount" | "workCount"> {}

export function Callouts({ bookCount, workCount }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Titles" value={workCount} />
      <StatsCallout label="Books" value={bookCount} />
    </div>
  );
}
