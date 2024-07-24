/**
 * Takes an array of words and returns a new array that includes (if needed) commas and a conjunction.
 * @param array The array to parse.
 */

export function toSentenceArray<T extends string | JSX.Element>(
  array: readonly T[],
): T[] {
  const words = array.filter(Boolean);

  if (words.length < 2) {
    return words;
  }

  const lastWord = words.pop();

  if (!lastWord) {
    return words;
  }

  const lastWords = [" and ", lastWord];
  if (words.length === 1) {
    return [...words, ...lastWords] as T[];
  }

  return [
    ...words.reduce<T[]>((prev, curr) => prev.concat(curr, ", " as T), []),
    ...lastWords,
  ] as T[];
}
