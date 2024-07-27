export interface FilterableState<T, S, G> {
  filters: Record<string, (item: T) => boolean>;
  filteredValues: T[];
  allValues: T[];
  sortValue: S;
  showCount: number;
  groupedValues: G;
}

export function filterTools<T, S, G>(
  sorter: (items: T[], sortOrder: S) => T[],
  grouper: (items: T[], sortOrder: S) => G,
) {
  const applyFilters = buildApplyFilters(sorter, grouper);

  return {
    updateFilter: <State extends FilterableState<T, S, G>>(
      currentState: State,
      key: string,
      handler: (item: T) => boolean,
    ): State => {
      const filters = {
        ...currentState.filters,
        [key]: handler,
      };

      return applyFilters(filters, currentState);
    },
    clearFilter: <State extends FilterableState<T, S, G>>(
      value: string,
      currentState: State,
      key: string,
    ): State | null => {
      if (value != "All") {
        return null;
      }

      const filters = {
        ...currentState.filters,
      };

      delete filters[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete

      return applyFilters(filters, currentState);
    },
    applyFilters,
  };
}

function buildApplyFilters<T, S, G>(
  sorter: (values: T[], sortOrder: S) => T[],
  grouper: (values: T[], sortOrder: S) => G,
) {
  return function applyFilters<State extends FilterableState<T, S, G>>(
    newFilters: Record<string, (value: T) => boolean>,
    currentState: State,
  ): State {
    const filteredValues = sorter(
      filterValues({
        values: currentState.allValues,
        filters: newFilters,
      }),
      currentState.sortValue,
    );

    const groupedValues = grouper(
      filteredValues.slice(0, currentState.showCount),
      currentState.sortValue,
    );

    return {
      ...currentState,
      filters: newFilters,
      filteredValues,
      groupedValues,
    };
  };
}

function filterValues<T>({
  values,
  filters,
}: {
  values: readonly T[];
  filters: Record<string, (arg0: T) => boolean>;
}): T[] {
  return values.filter((value) => {
    return Object.values(filters).every((filter) => {
      return filter(value);
    });
  });
}
