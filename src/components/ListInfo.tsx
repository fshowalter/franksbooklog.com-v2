export function ListInfo({
  visibleCount,
  totalCount,
}: {
  visibleCount: number;
  totalCount: number;
}): JSX.Element {
  let showingText;

  if (visibleCount > totalCount) {
    showingText = `Showing ${totalCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  } else {
    showingText = `Showing 1-${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  }

  return (
    <div className="sticky top-0 z-40 bg-default px-gutter text-center leading-10 text-subtle desktop:top-[var(--header-offset)]">
      {showingText}
    </div>
  );
}
