import { PageTitle } from "src/components/PageTitle";

export function Header({ reviewCount }: { reviewCount: number }): JSX.Element {
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
          reviews since 2022.
        </p>
        <div className="spacer-y-4" />
      </div>
    </>
  );
}
