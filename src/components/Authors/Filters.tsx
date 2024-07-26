import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";

import type { ActionType, Sort } from "./Authors.reducer";
import { Actions } from "./Authors.reducer";

export function Filters({
  dispatch,
  sortValue,
}: {
  dispatch: React.Dispatch<ActionType>;
  sortValue: Sort;
}) {
  return (
    <>
      <DebouncedInput
        label="Name"
        placeholder="Enter all or part of a name"
        onInputChange={(value) =>
          dispatch({ type: Actions.FILTER_NAME, value })
        }
      />
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
        <option value="name-asc">Name (A &rarr; Z)</option>
        <option value="name-desc">Name (Z &rarr; A)</option>
        <option value="review-count-desc">Review Count (Most First)</option>
        <option value="review-count-asc">Review Count (Fewest First)</option>
        <option value="work-count-desc">Work Count (Most First)</option>
        <option value="work-count-asc">Work Count (Fewest First)</option>
      </SelectField>
    </>
  );
}
