import { useReducer } from "react";
import type { Author } from "src/api/authors";
import type { AvatarImageData } from "src/api/avatars";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import type { Sort } from "./Author.reducer";
import { initState, reducer } from "./Author.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";

export interface Props
  extends Pick<Author, "name" | "reviewedWorkCount" | "shelfWorkCount"> {
  values: ListItemValue[];
  distinctKinds: readonly string[];
  distinctPublishedYears: readonly string[];
  initialSort: Sort;
  avatarImageData: AvatarImageData;
}

export function Author({
  values,
  name,
  reviewedWorkCount,
  shelfWorkCount,
  distinctKinds,
  distinctPublishedYears,
  initialSort,
  avatarImageData,
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
      header={
        <Header
          name={name}
          reviewedWorkCount={reviewedWorkCount}
          shelfWorkCount={shelfWorkCount}
          avatarImageData={avatarImageData}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          hideReviewed={state.hideReviewed}
          distinctKinds={distinctKinds}
          distinctPublishedYears={distinctPublishedYears}
        />
      }
      list={
        <List
          groupedValues={state.groupedValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          dispatch={dispatch}
        />
      }
    />
  );
}
