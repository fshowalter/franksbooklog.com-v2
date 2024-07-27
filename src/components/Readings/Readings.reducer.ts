import type { FilterableState } from "src/utils";
import { filterTools, sortString } from "src/utils";

import type { ListItemValue } from "./List";

const SHOW_COUNT_DEFAULT = 100;

export type Sort = "progress-date-desc" | "progress-date-asc";

const { updateFilter, clearFilter } = filterTools(sortValues, groupValues);

function sortValues(values: ListItemValue[], sortOrder: Sort) {
  const sortMap: Record<Sort, (a: ListItemValue, b: ListItemValue) => number> =
    {
      "progress-date-desc": (a, b) => sortString(a.sequence, b.sequence) * -1,
      "progress-date-asc": (a, b) => sortString(a.sequence, b.sequence),
    };

  const comparer = sortMap[sortOrder];
  return values.sort(comparer);
}

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  timeZone: "UTC",
});

const monthGroupFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const dayGroupFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  weekday: "short",
  timeZone: "UTC",
});

function groupValues(
  values: ListItemValue[],
): Map<string, Map<string, ListItemValue[]>> {
  const groupedValues = new Map<string, Map<string, ListItemValue[]>>();

  values.map((value) => {
    const monthYearGroup = monthGroupFormatter.format(value.date);

    let groupValue = groupedValues.get(monthYearGroup);

    if (!groupValue) {
      groupValue = new Map<string, ListItemValue[]>();
      groupedValues.set(monthYearGroup, groupValue);
    }

    const dayGroup = dayGroupFormatter.format(value.date);

    let dayGroupValue = groupValue.get(dayGroup);

    if (!dayGroupValue) {
      dayGroupValue = [];
      groupValue.set(dayGroup, dayGroupValue);
    }

    dayGroupValue.push(value);
  });

  return groupedValues;
}

type State = FilterableState<
  ListItemValue,
  Sort,
  Map<string, Map<string, ListItemValue[]>>
>;

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
    filters: {},
    groupedValues: groupValues(values.slice(0, SHOW_COUNT_DEFAULT)),
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: initialSort,
  };
}

export enum Actions {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_KIND = "FILTER_KIND",
  FILTER_EDITION = "FILTER_EDITION",
  FILTER_PUBLISHED_YEAR = "FILTER_PUBLISHED_YEAR",
  FILTER_READING_YEAR = "FILTER_READING_YEAR",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
}

interface FilterTitleAction {
  type: Actions.FILTER_TITLE;
  value: string;
}

interface FilterKindAction {
  type: Actions.FILTER_KIND;
  value: string;
}

interface FilterEditionAction {
  type: Actions.FILTER_EDITION;
  value: string;
}

interface FilterPublishedYearAction {
  type: Actions.FILTER_PUBLISHED_YEAR;
  values: [string, string];
}

interface FilterReadingYearAction {
  type: Actions.FILTER_READING_YEAR;
  values: [string, string];
}

interface SortAction {
  type: Actions.SORT;
  value: Sort;
}

interface ShowMoreAction {
  type: Actions.SHOW_MORE;
}

export type ActionType =
  | FilterTitleAction
  | FilterPublishedYearAction
  | FilterReadingYearAction
  | FilterKindAction
  | FilterEditionAction
  | SortAction
  | ShowMoreAction;

export function reducer(state: State, action: ActionType): State {
  let groupedValues;
  let filteredValues;

  switch (action.type) {
    case Actions.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "title", (value) => {
        return regex.test(value.title);
      });
    }
    case Actions.FILTER_PUBLISHED_YEAR: {
      return updateFilter(state, "publishedYear", (value) => {
        const publishedYear = value.yearPublished;
        return (
          publishedYear >= action.values[0] && publishedYear <= action.values[1]
        );
      });
    }
    case Actions.FILTER_KIND: {
      return (
        clearFilter(action.value, state, "kind") ??
        updateFilter(state, "kind", (value) => {
          return value.kind === action.value;
        })
      );
    }
    case Actions.FILTER_EDITION: {
      return (
        clearFilter(action.value, state, "edition") ??
        updateFilter(state, "edition", (value) => {
          return value.edition === action.value;
        })
      );
    }
    case Actions.FILTER_READING_YEAR: {
      return updateFilter(state, "readingYear", (value) => {
        const readingYear = yearFormatter.format(value.date);
        return (
          readingYear >= action.values[0] && readingYear <= action.values[1]
        );
      });
    }
    case Actions.SORT: {
      filteredValues = sortValues(state.filteredValues, action.value);
      groupedValues = groupValues(filteredValues.slice(0, state.showCount));
      return {
        ...state,
        sortValue: action.value,
        filteredValues,
        groupedValues,
      };
    }
    case Actions.SHOW_MORE: {
      const showCount = state.showCount + SHOW_COUNT_DEFAULT;

      groupedValues = groupValues(state.filteredValues.slice(0, showCount));

      return {
        ...state,
        groupedValues,
        showCount,
      };
    }
    // no default
  }
}
