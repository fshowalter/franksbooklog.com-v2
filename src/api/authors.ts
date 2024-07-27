import { allAuthorsJson, type AuthorJson } from "./data/authorsJson";

export interface Author extends AuthorJson {}

export async function allAuthors(): Promise<Author[]> {
  return await allAuthorsJson();
}

interface AuthorDetails {
  author: Author;
  distinctKinds: string[];
  distinctPublishedYears: string[];
}

export async function getAuthorDetails(slug: string): Promise<AuthorDetails> {
  const authors = await allAuthorsJson();
  const distinctKinds = new Set<string>();
  const distinctPublishedYears = new Set<string>();

  const author = authors.find((value) => value.slug === slug)!;

  author.works.forEach((work) => {
    distinctKinds.add(work.kind);
    distinctPublishedYears.add(work.yearPublished);
  });

  return {
    author,
    distinctKinds: Array.from(distinctKinds).toSorted(),
    distinctPublishedYears: Array.from(distinctPublishedYears).toSorted(),
  };
}
