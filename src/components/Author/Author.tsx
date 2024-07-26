import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Sort, initState, reducer } from "./Author.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export function Author({
  data,
  distinctKinds,
  distinctPublishedYears,
  initialSort,
}: {
  data: Queries.AuthorDataFragment;
  distinctKinds: readonly string[];
  distinctPublishedYears: readonly string[];
  initialSort: Sort;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...data.works],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header data={data} />}
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
          groupedItems={state.groupedItems}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
          dispatch={dispatch}
          data={data}
        />
      }
    />
  );
}

export const pageQuery = graphql`
  fragment AuthorData on AuthorsJson {
    ...AuthorHeader
    ...AuthorList
  }
`;
