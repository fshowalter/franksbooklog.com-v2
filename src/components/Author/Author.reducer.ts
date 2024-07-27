import {
  buildGroupValues,
  collator,
  filterTools,
  sortNumber,
  sortString,
} from "src/utils";

import type { FilterableState } from "../../utils";
import type { ListItemValue } from "./List";

export type Sort =
  | "year-published-desc"
  | "year-published-asc"
  | "title-asc"
  | "title-desc"
  | "grade-asc"
  | "grade-desc";

const groupValues = buildGroupValues(groupForValue);
const { updateFilter, clearFilter, applyFilters } = filterTools(
  sortValues,
  groupValues,
);

function sortValues(values: ListItemValue[], sortOrder: Sort) {
  const sortMap: Record<Sort, (a: ListItemValue, b: ListItemValue) => number> =
    {
      "year-published-desc": (a, b) =>
        sortString(a.yearPublished, b.yearPublished) * -1,
      "year-published-asc": (a, b) =>
        sortString(a.yearPublished, b.yearPublished),
      "title-asc": (a, b) => collator.compare(a.sortTitle, b.sortTitle),
      "title-desc": (a, b) => collator.compare(a.sortTitle, b.sortTitle) * -1,
      "grade-asc": (a, b) => sortNumber(a.gradeValue ?? -1, b.gradeValue ?? -1),
      "grade-desc": (a, b) =>
        sortNumber(a.gradeValue ?? -1, b.gradeValue ?? -1) * -1,
    };

  const comparer = sortMap[sortOrder];
  return values.sort(comparer);
}

function groupForValue(value: ListItemValue, sortValue: Sort): string {
  switch (sortValue) {
    case "year-published-asc":
    case "year-published-desc": {
      return value.yearPublished;
    }
    case "grade-asc":
    case "grade-desc": {
      return value.grade ?? "Unread";
    }
    case "title-asc":
    case "title-desc": {
      const letter = value.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return value.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

interface State
  extends FilterableState<ListItemValue, Sort, Map<string, ListItemValue[]>> {
  hideReviewed: boolean;
}

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
    hideReviewed: false,
  };
}

export enum Actions {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_KIND = "FILTER_KIND",
  FILTER_YEAR_PUBLISHED = "FILTER_YEAR_PUBLISHED",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
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

interface ToggleReviewedAction {
  type: Actions.TOGGLE_REVIEWED;
}

interface FilterYearPublishedAction {
  type: Actions.FILTER_YEAR_PUBLISHED;
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
  | ToggleReviewedAction
  | FilterYearPublishedAction
  | FilterKindAction
  | SortAction
  | ShowMoreAction;

export function reducer(state: State, action: ActionType): State {
  let filters;
  let filteredValues;
  let groupedValues;

  switch (action.type) {
    case Actions.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "title", (value) => {
        return regex.test(value.title);
      });
    }
    case Actions.FILTER_KIND: {
      return (
        clearFilter(action.value, state, "kind") ??
        updateFilter(state, "medium", (value) => {
          return value.kind === action.value;
        })
      );
    }
    case Actions.FILTER_YEAR_PUBLISHED: {
      return updateFilter(state, "yearPublished", (value) => {
        const yearPublished = value.yearPublished;
        return (
          yearPublished >= action.values[0] && yearPublished <= action.values[1]
        );
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
    case Actions.TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (item: ListItemValue) => {
            return !item.reviewed;
          },
        };
      }
      return {
        ...applyFilters(filters, state),
        hideReviewed: !state.hideReviewed,
      };
    }
    // no default
  }
}
