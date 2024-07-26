import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import type { Sort } from "./Authors.reducer";
import { initState, reducer } from "./Authors.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import type { ListItemValue } from "./List";
import { List } from "./List";

export interface Props {
  values: ListItemValue[];
  initialSort: Sort;
}

export function Authors({ values, initialSort }: Props): JSX.Element {
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
      header={<Header />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          groupedValues={state.groupedValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.filteredValues.length}
          dispatch={dispatch}
        />
      }
    />
  );
}
