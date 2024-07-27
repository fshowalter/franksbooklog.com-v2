import { PageTitle } from "src/components/PageTitle";

export function Header({
  workCount,
  shortStoryCount,
  bookCount,
  abandonedCount,
}: {
  workCount: number;
  shortStoryCount: number;
  bookCount: number;
  abandonedCount: number;
}): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Reading Log</PageTitle>
      <div className="spacer-y-2" />
      <q className="block px-gutter text-center text-subtle">
        It is what you read when you don&apos;t have to that determines what you
        will be when you can&apos;t help it.
      </q>
      <div className="spacer-y-4" />
      <div className="text-subtle">
        <div className="spacer-y-4" />
        <p className="px-gutter">
          I&apos;ve read{" "}
          <span className="text-emphasis">{workCount.toLocaleString()}</span>{" "}
          titles comprising{" "}
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
          <a className="text-accent underline" href="/readings/stats/">
            reading stats
          </a>
          .
        </p>
      </div>
    </>
  );
}
