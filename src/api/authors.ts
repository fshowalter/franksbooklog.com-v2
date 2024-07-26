import { allAuthorsJson, type AuthorJson } from "./data/authorsJson";

export interface Author extends AuthorJson {}

export async function allAuthors(): Promise<Author[]> {
  return await allAuthorsJson();
}
