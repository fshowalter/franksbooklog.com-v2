import type { ReviewWithContent } from "src/api/reviews";

import { ReadingHistoryListItem } from "./ReadingHistoryListItem";

interface Props {
  values: ReviewWithContent["readings"];
  className?: string;
}
export function ReadingHistory({ values, className }: Props) {
  return (
    <div className={className}>
      <h2 className="px-gutter text-md font-normal text-subtle shadow-bottom">
        Reading History
        <div className="spacer-y-2" />
      </h2>
      <ul>
        {values.map((value) => (
          <ReadingHistoryListItem key={value.sequence} value={value} />
        ))}
      </ul>
    </div>
  );
}
