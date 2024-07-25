export function buildGroupValues<T, S>(
  valueGrouper: (item: T, sortValue: S) => string,
) {
  return function groupValues(items: T[], sortValue: S): Map<string, T[]> {
    const groupedValues = new Map<string, T[]>();

    items.map((item) => {
      const group = valueGrouper(item, sortValue);
      let groupValue = groupedValues.get(group);

      if (!groupValue) {
        groupValue = [];
        groupedValues.set(group, groupValue);
      }
      groupValue.push(item);
    });

    return groupedValues;
  };
}
