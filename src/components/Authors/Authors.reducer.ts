import {
  buildGroupValues,
  filterTools,
  sortNumber,
  sortString,
} from "src/utils";

import type { FilterableState } from "../../utils";
import type { ListItemValue } from "./List";

export enum Actions {
  FILTER_NAME = "FILTER_NAME",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
}

export type Sort =
  | "name-asc"
  | "name-desc"
  | "review-count-asc"
  | "review-count-desc"
  | "work-count-asc"
  | "work-count-desc";

const groupValues = buildGroupValues(groupForValue);
const { updateFilter } = filterTools(sortValues, groupValues);

function sortValues(values: ListItemValue[], sortOrder: Sort) {
  const sortMap: Record<Sort, (a: ListItemValue, b: ListItemValue) => number> =
    {
      "name-asc": (a, b) => sortString(a.sortName, b.sortName),
      "name-desc": (a, b) => sortString(a.sortName, b.sortName) * -1,
      "review-count-asc": (a, b) =>
        sortNumber(a.reviewedWorkCount, b.reviewedWorkCount),
      "review-count-desc": (a, b) =>
        sortNumber(a.reviewedWorkCount, b.reviewedWorkCount) * -1,
      "work-count-asc": (a, b) => sortNumber(a.workCount, b.workCount),
      "work-count-desc": (a, b) => sortNumber(a.workCount, b.workCount) * -1,
    };

  const comparer = sortMap[sortOrder];

  return values.sort(comparer);
}

function groupForValue(item: ListItemValue, sortValue: Sort): string {
  switch (sortValue) {
    case "name-asc":
    case "name-desc": {
      const letter = item.sortName.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return item.sortName.substring(0, 1).toLocaleUpperCase();
    }
    case "review-count-asc":
    case "review-count-desc": {
      return "";
    }
    case "work-count-asc":
    case "work-count-desc": {
      return "";
    }
    // no default
  }
}

type State = FilterableState<ListItemValue, Sort, Map<string, ListItemValue[]>>;

const SHOW_COUNT_DEFAULT = 100;

export function initState({
  values,
  initialSort,
}: {
  values: ListItemValue[];
  initialSort: Sort;
}): State {
  return {
    allValues: values,
    filteredValues: values,
    groupedValues: groupValues(
      values.slice(0, SHOW_COUNT_DEFAULT),
      initialSort,
    ),
    filters: {},
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: initialSort,
  };
}

interface FilterNameAction {
  type: Actions.FILTER_NAME;
  value: string;
}

interface SortAction {
  type: Actions.SORT;
  value: Sort;
}

interface ShowMoreAction {
  type: Actions.SHOW_MORE;
}

export type ActionType = FilterNameAction | SortAction | ShowMoreAction;

export function reducer(state: State, action: ActionType): State {
  let filteredValues;
  let groupedValues;

  switch (action.type) {
    case Actions.FILTER_NAME: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "name", (value) => {
        return regex.test(value.name);
      });
    }
    case Actions.SORT: {
      filteredValues = sortValues(state.filteredValues, action.value);
      groupedValues = groupValues(
        filteredValues.slice(0, state.showCount),
        action.value,
      );
      return {
        ...state,
        sortValue: action.value,
        filteredValues,
        groupedValues,
      };
    }
    case Actions.SHOW_MORE: {
      const showCount = state.showCount + SHOW_COUNT_DEFAULT;

      groupedValues = groupValues(
        state.filteredValues.slice(0, showCount),
        state.sortValue,
      );

      return {
        ...state,
        groupedValues,
        showCount,
      };
    }
    // no default
  }
}
