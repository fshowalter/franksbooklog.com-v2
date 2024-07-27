import type { Author } from "src/api/authors";
import type { CoverImageData } from "src/api/covers";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemCover } from "src/components/ListItemCover";
import { ListItemTitle } from "src/components/ListItemTitle";
import { toSentenceArray } from "src/utils";

import type { ActionType } from "./Author.reducer";
import { Actions } from "./Author.reducer";

type AuthorWork = Author["works"][number];

export interface ListItemValue
  extends Pick<
    AuthorWork,
    | "title"
    | "yearPublished"
    | "kind"
    | "slug"
    | "sortTitle"
    | "grade"
    | "gradeValue"
    | "reviewed"
  > {
  imageData: CoverImageData;
  otherAuthors: {
    name: string;
  }[];
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
      {(value) => <WorkListItem value={value} key={value.slug} />}
    </GroupedList>
  );
}

function WorkListItem({ value }: { value: ListItemValue }): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemCover
        slug={value.reviewed ? value.slug : null}
        imageData={value.imageData}
      />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle
            title={value.title}
            slug={value.reviewed ? value.slug : null}
          />
          <OtherAuthors values={value.otherAuthors} />
          <div className="spacer-y-2" />
          <YearAndKind year={value.yearPublished} kind={value.kind} />
          <div className="spacer-y-2" />
          <Grade value={value.grade} height={16} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}

function OtherAuthors({ values }: { values: ListItemValue["otherAuthors"] }) {
  if (values.length === 0) {
    return null;
  }

  return (
    <>
      <div className="spacer-y-1" />
      <div className="text-base leading-5 text-muted">
        (with {toSentenceArray(values.map((value) => value.name))})
      </div>
    </>
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
