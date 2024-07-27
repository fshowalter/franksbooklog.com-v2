import type { CoverImageData } from "src/api/covers";
import type { Review } from "src/api/reviews";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemCover } from "src/components/ListItemCover";
import { ListItemKindAndYear } from "src/components/ListItemKindAndYear";
import { ListItemTitle } from "src/components/ListItemTitle";
import { toSentenceArray } from "src/utils";

import type { ActionType } from "./Reviews.reducer";
import { Actions } from "./Reviews.reducer";

interface Author extends Pick<Review["authors"][0], "name" | "sortName"> {}

export interface ListItemValue
  extends Pick<
    Review,
    | "grade"
    | "slug"
    | "date"
    | "gradeValue"
    | "title"
    | "yearPublished"
    | "sortTitle"
    | "kind"
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
      {(value) => <ReviewsListItem value={value} key={value.slug} />}
    </GroupedList>
  );
}

function ReviewsListItem({ value }: { value: ListItemValue }): JSX.Element {
  return (
    <ListItem>
      <ListItemCover slug={value.slug} imageData={value.imageData} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={value.title} slug={value.slug} />
          <div className="spacer-y-1" />
          <Authors values={value.authors} />
          <div className="spacer-y-2" />
          <ListItemKindAndYear year={value.yearPublished} kind={value.kind} />
          <div className="spacer-y-2" />
          <Grade value={value.grade} height={16} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}

function Authors({ values }: { values: Author[] }) {
  return (
    <div className="text-base leading-5 text-muted">
      {toSentenceArray(values.map((value) => value.name))}
    </div>
  );
}
