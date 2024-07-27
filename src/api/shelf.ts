import type { UnreviewedWorkJson } from "./data/unreviewedWorksJson";
import { allUnreviewedWorksJson } from "./data/unreviewedWorksJson";

export interface ShelfWork extends UnreviewedWorkJson {}

interface Shelf {
  works: ShelfWork[];
  distinctAuthors: string[];
  distinctPublishedYears: string[];
  distinctKinds: string[];
}

function parseUnreviewedWorksJson(
  unreviewedWorksJson: UnreviewedWorkJson[],
): Shelf {
  const distinctAuthors = new Set<string>();
  const distinctPublishedYears = new Set<string>();
  const distinctKinds = new Set<string>();

  const works = unreviewedWorksJson.map((work) => {
    distinctKinds.add(work.kind);
    distinctPublishedYears.add(work.yearPublished);
    work.authors.forEach((author) => {
      distinctAuthors.add(author.name);
    });

    return {
      ...work,
    };
  });

  return {
    works,
    distinctKinds: Array.from(distinctKinds).toSorted(),
    distinctPublishedYears: Array.from(distinctPublishedYears).toSorted(),
    distinctAuthors: Array.from(distinctAuthors).toSorted(),
  };
}

export async function allShelfWorks(): Promise<Shelf> {
  const unreviewedWorksJson = await allUnreviewedWorksJson();
  const shelfWorks = parseUnreviewedWorksJson(unreviewedWorksJson);

  return shelfWorks;
}
