import { PageTitle } from "src/components/PageTitle";

export function Header({
  reviewCount,
  shortStoryCount,
  bookCount,
  abandonedCount,
}: {
  reviewCount: number;
  shortStoryCount: number;
  bookCount: number;
  abandonedCount: number;
}): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Reviews</PageTitle>
      <div className="spacer-y-2" />
      <q className="block px-1 text-center text-subtle">
        I intend to put up with nothing that I can put down.
      </q>
      <div className="spacer-y-4" />
      <div className="text-subtle">
        <div className="spacer-y-4" />
        <p className="px-gutter">
          I&apos;ve published{" "}
          <span className="text-emphasis">{reviewCount.toLocaleString()}</span>{" "}
          reviews comprising{" "}
          <span className="text-emphasis">
            {shortStoryCount.toLocaleString()}
          </span>{" "}
          short stories and{" "}
          <span className="text-emphasis">{bookCount.toLocaleString()}</span>{" "}
          books (
          <span className="text-emphasis">
            {abandonedCount.toLocaleString()}
          </span>{" "}
          abandoned) since 2022.
        </p>
        <div className="spacer-y-4" />
        <p className="text-center">
          More{" "}
          <a className="text-accent underline" href="/stats/">
            reading stats
          </a>
          .
        </p>
      </div>
    </>
  );
}
