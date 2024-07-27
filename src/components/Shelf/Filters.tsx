import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";
import { SelectOptions } from "src/components/SelectOptions";
import { YearInput } from "src/components/YearInput";

import type { ActionType, Sort } from "./Shelf.reducer";
import { Actions } from "./Shelf.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctPublishedYears,
  distinctAuthors,
  distinctKinds,
}: {
  dispatch: React.Dispatch<ActionType>;
  sortValue: string;
  distinctAuthors: readonly string[];
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
        label="Year Published"
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
        label="Author"
        onChange={(e) =>
          dispatch({
            type: Actions.FILTER_AUTHOR,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctAuthors} />
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
        <option value="year-published-desc">
          Year Published (Newest First)
        </option>
        <option value="year-published-asc">
          Year Published (Oldest First)
        </option>
        <option value="title-asc">Title (A &rarr; Z)</option>
        <option value="title-desc">Title (Z &rarr; A)</option>
      </SelectField>
    </>
  );
}
