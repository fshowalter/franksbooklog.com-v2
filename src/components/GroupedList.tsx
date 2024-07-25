import { ListInfo } from "./ListInfo";
import { ShowMoreButton } from "./ShowMoreButton";

export function GroupedList<T>({
  groupedValues,
  visibleCount,
  totalCount,
  onShowMore,
  children,
  className,
  ...rest
}: {
  groupedValues: Map<string, Iterable<T>>;
  visibleCount: number;
  totalCount: number;
  onShowMore: () => void;
  children: (item: T) => React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <>
      <ListInfo visibleCount={visibleCount} totalCount={totalCount} />

      <ol className={className} {...rest}>
        {[...groupedValues].map((groupedValue, index) => {
          const [group, groupValues] = groupedValue;

          return (
            <GroupingListItem groupText={group} key={group} zIndex={index + 1}>
              <ol>{[...groupValues].map(children)}</ol>
            </GroupingListItem>
          );
        })}
      </ol>
      <div className="flex flex-col items-center px-pageMargin">
        {totalCount > visibleCount && (
          <>
            <div className="h-8 min-h-8" />
            <ShowMoreButton onClick={onShowMore} />
            <div className="h-8 min-h-8" />
          </>
        )}
      </div>
    </>
  );
}

function GroupingListItem({
  groupText,
  children,
  zIndex,
}: {
  groupText: string;
  children: React.ReactNode;
  zIndex: number;
}) {
  return (
    <li className="block">
      <div
        style={{ zIndex: zIndex }}
        className="sticky top-8 bg-default pt-0 text-md desktop:top-[calc(var(--header-offset)_+_40px)]"
      >
        <div className="bg-canvas px-gutter py-2 tablet:px-6">{groupText}</div>
      </div>
      <div className="h-0 min-h-0 tablet:h-4 tablet:min-h-4" />
      {children}
      <div className="h-0 min-h-0 tablet:h-4 tablet:min-h-4" />
    </li>
  );
}
