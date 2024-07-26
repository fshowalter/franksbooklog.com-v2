import { useReducer } from "react";
import type { CoverImageData } from "src/api/covers";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";
import type { Sort } from "./Readings.reducer";
import { initState, reducer } from "./Readings.reducer";

export interface Props {
  values: ListItemValue[];
  distinctEditions: string[];
  distinctWorkYears: string[];
  distinctKinds: string[];
  distinctReadingYears: string[];
  initialSort: Sort;
  covers: Record<string, CoverImageData>;
}

export function Readings({
  values,
  distinctEditions,
  distinctKinds,
  distinctReadingYears,
  distinctWorkYears,
  initialSort,
  covers,
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
      header={<Header />}
      filters={
        <Filters
          dispatch={dispatch}
          distinctEditions={distinctEditions}
          distinctWorkYears={distinctWorkYears}
          distinctKinds={distinctKinds}
          distinctReadingYears={distinctReadingYears}
          sortValue={state.sortValue}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedValues={state.groupedValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          covers={covers}
        />
      }
    />
  );
}
