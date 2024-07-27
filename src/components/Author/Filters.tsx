import { Button } from "src/components/Button";
import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";
import { SelectOptions } from "src/components/SelectOptions";
import { YearInput } from "src/components/YearInput";

import type { ActionType, Sort } from "./Author.reducer";
import { Actions } from "./Author.reducer";

export function Filters({
  dispatch,
  hideReviewed,
  distinctKinds,
  distinctPublishedYears,
  sortValue,
}: {
  dispatch: React.Dispatch<ActionType>;
  sortValue: Sort;
  hideReviewed: boolean;
  distinctKinds: readonly string[];
  distinctPublishedYears: readonly string[];
}) {
  return (
    <>
      <div className="flex flex-col justify-end">
        <Button onClick={() => dispatch({ type: Actions.TOGGLE_REVIEWED })}>
          {hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
        </Button>
      </div>

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
