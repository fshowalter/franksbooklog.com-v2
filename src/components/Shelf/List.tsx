import type { CoverImageData } from "src/api/covers";
import type { ShelfWork } from "src/api/shelf";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemCover } from "src/components/ListItemCover";
import { ListItemTitle } from "src/components/ListItemTitle";
import { toSentenceArray } from "src/utils";

import type { ActionType } from "./Shelf.reducer";
import { Actions } from "./Shelf.reducer";

interface Author
  extends Pick<ShelfWork["authors"][number], "name" | "notes" | "sortName"> {}

export interface ListItemValue
  extends Pick<
    ShelfWork,
    "slug" | "title" | "yearPublished" | "sortTitle" | "kind"
  > {
  authors: Author[];
  imageData: CoverImageData;
}

export function List({
  groupedValues,
  totalCount,
  visibleCount,
  dispatch,
}: {
  groupedValues: Map<string, ListItemValue[]>;
  totalCount: number;
  visibleCount: number;
  dispatch: React.Dispatch<ActionType>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(value) => <ShelfListItem value={value} key={value.slug} />}
    </GroupedList>
  );
}

function ShelfListItem({ value }: { value: ListItemValue }): JSX.Element {
  return (
    <ListItem>
      <ListItemCover imageData={value.imageData} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={value.title} />
          <div className="spacer-y-1" />
          <Authors values={value.authors} />
          <div className="spacer-y-2" />
          <YearAndKind year={value.yearPublished} kind={value.kind} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}

function Authors({ values }: { values: ListItemValue["authors"] }) {
  return (
    <div className="text-base leading-5 text-muted">
      {toSentenceArray(values.map((author) => author.name))}
    </div>
  );
}

function YearAndKind({
  kind,
  year,
}: {
  kind: string;
  year: string;
}): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      <span>{kind} | </span>
      {year}
    </div>
  );
}
