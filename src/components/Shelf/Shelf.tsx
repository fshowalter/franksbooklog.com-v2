import { useReducer } from "react";

import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";
import type { Sort } from "./Shelf.reducer";
import { initState, reducer } from "./Shelf.reducer";

export interface Props {
  values: ListItemValue[];
  distinctAuthors: readonly string[];
  distinctKinds: readonly string[];
  distinctPublishedYears: readonly string[];
  initialSort: Sort;
}

export function Shelf({
  values,
  distinctAuthors,
  distinctKinds,
  distinctPublishedYears,
  initialSort,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values,
      initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header shelfCount={values.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          distinctAuthors={distinctAuthors}
          distinctKinds={distinctKinds}
          distinctPublishedYears={distinctPublishedYears}
          sortValue={state.sortValue}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedValues={state.groupedValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
        />
      }
    />
  );
}
