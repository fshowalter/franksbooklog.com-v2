import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";
import { SelectOptions } from "src/components/SelectOptions";
import { YearInput } from "src/components/YearInput";

import type { ActionType, Sort } from "./Reviews.reducer";
import { Actions } from "./Reviews.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctPublishedYears,
  distinctReviewYears,
  distinctKinds,
}: {
  dispatch: React.Dispatch<ActionType>;
  sortValue: Sort;
  distinctReviewYears: readonly string[];
  distinctPublishedYears: readonly string[];
  distinctKinds: readonly string[];
}) {
  return (
    <>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: Actions.FILTER_TITLE, value })
        }
      />
      <YearInput
        label="Work Year"
        years={distinctPublishedYears}
        onYearChange={(values) =>
          dispatch({ type: Actions.FILTER_YEAR_PUBLISHED, values })
        }
      />
      <YearInput
        label="Review Year"
        years={distinctReviewYears}
        onYearChange={(values) =>
          dispatch({ type: Actions.FILTER_YEAR_REVIEWED, values })
        }
      />
      <SelectField
        label="Kind"
        onChange={(e) =>
          dispatch({
            type: Actions.FILTER_KIND,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctKinds} />
      </SelectField>
      <SelectField
        value={sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: Actions.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="author-asc">Author (A &rarr; Z)</option>
        <option value="author-desc">Author (Z &rarr; A)</option>
        <option value="review-date-desc">Review Date (Newest First)</option>
        <option value="review-date-asc">Review Date (Oldest First)</option>
        <option value="year-published-desc">Work Year (Newest First)</option>
        <option value="year-published-asc">Work Year (Oldest First)</option>
        <option value="title-asc">Title (A &rarr; Z)</option>
        <option value="title-desc">Title (Z &rarr; A)</option>
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
      </SelectField>
    </>
  );
}
