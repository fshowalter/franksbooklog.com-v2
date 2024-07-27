import type { AlltimeStats } from "src/api/alltimeStats";
import { StatsCallout } from "src/components/StatsCallout";

interface Props
  extends Pick<AlltimeStats, "bookCount" | "workCount" | "reviewCount"> {}

export function Callouts({
  bookCount,
  workCount,
  reviewCount,
}: Props): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Titles" value={workCount} />
      <StatsCallout label="Books" value={bookCount} />
      <StatsCallout label="Reviews" value={reviewCount} />
    </div>
  );
}
