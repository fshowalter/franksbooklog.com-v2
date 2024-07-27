import { PageTitle } from "src/components/PageTitle";

export function Header({ shelfCount }: { shelfCount: number }): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">The Shelf</PageTitle>
      <div className="spacer-y-2" />
      <q className="block px-gutter text-center text-subtle">
        Classic: A book which people praise and don’t read.
      </q>
      <div className="spacer-y-4" />
      <div className="px-gutter text-center text-subtle">
        <div className="spacer-y-4" />
        <p>
          My to-read list.{" "}
          <span className="text-emphasis">{shelfCount.toLocaleString()}</span>{" "}
          titles.
        </p>
      </div>
    </>
  );
}
