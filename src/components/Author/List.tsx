import type { Author } from "src/api/authors";
import type { CoverImageData } from "src/api/covers";
import { GroupedList } from "src/components/GroupedList";

import { toSentenceArray } from "../../utils";
import { Box } from "../Box";
import { Grade } from "../Grade";
import { ListItem } from "../ListItem";
import { ListItemCover } from "../ListItemCover";
import { ListItemTitle } from "../ListItemTitle";
import { Spacer } from "../Spacer";
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
    | "includedInSlugs"
  > {
  imageData: CoverImageData;
  otherAuthors: {
    name: string;
  };
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
        title={value.title}
      />
      <Box
        flexGrow={1}
        width={{ tablet: "full" }}
        paddingRight={{ default: "gutter", desktop: 16 }}
      >
        <Box>
          <ListItemTitle
            title={item.title}
            slug={item.reviewed ? item.slug : null}
          />
          <Authors authors={item.authors} pageAuthorSlug={pageAuthorSlug} />
          <Spacer axis="vertical" size={8} />
          <YearAndKind year={item.yearPublished} kind={item.kind} />
          <Spacer axis="vertical" size={8} />
          <Grade grade={item.grade} height={16} />
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
    </ListItem>
  );
}

function Authors({
  pageAuthorSlug,
  authors,
}: {
  pageAuthorSlug: string;
  authors: readonly Queries.AuthorListItemAuthorsFragment[];
}) {
  if (authors.length === 1) {
    return null;
  }

  const otherAuthors = authors.filter((author) => {
    return author.slug !== pageAuthorSlug;
  });

  return (
    <>
      <Spacer axis="vertical" size={4} />
      <Box color="muted" fontSize="default" lineHeight={20}>
        (with {toSentenceArray(otherAuthors.map((author) => author.name))})
      </Box>
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
    <Box color="subtle" fontSize="small" letterSpacing={0.5} lineHeight={16}>
      <Box as="span">{kind} | </Box>
      {year}
    </Box>
  );
}
