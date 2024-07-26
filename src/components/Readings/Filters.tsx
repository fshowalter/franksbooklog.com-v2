import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";
import { SelectOptions } from "src/components/SelectOptions";
import { YearInput } from "src/components/YearInput";

import type { ActionType, Sort } from "./Readings.reducer";
import { Actions } from "./Readings.reducer";

export function Filters({
  dispatch,
  distinctWorkYears,
  distinctReadingYears,
  distinctKinds,
  distinctEditions,
  sortValue,
}: {
  dispatch: React.Dispatch<ActionType>;
  distinctWorkYears: readonly string[];
  distinctReadingYears: readonly string[];
  distinctKinds: readonly string[];
  distinctEditions: readonly string[];
  sortValue: Sort;
}): JSX.Element {
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
        years={distinctWorkYears}
        onYearChange={(values) =>
          dispatch({ type: Actions.FILTER_PUBLISHED_YEAR, values })
        }
      />
      <YearInput
        label="Reading Year"
        years={distinctReadingYears}
        onYearChange={(values) =>
          dispatch({ type: Actions.FILTER_READING_YEAR, values })
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
        label="Edition"
        onChange={(e) =>
          dispatch({
            type: Actions.FILTER_EDITION,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctEditions} />
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
        <option value="progress-date-desc">Reading Date (Newest First)</option>
        <option value="progress-date-asc">Reading Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
