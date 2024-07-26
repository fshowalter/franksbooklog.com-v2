import { PageTitle } from "src/components/PageTitle";

export function Header(): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Reading Log</PageTitle>
      <div className="spacer-y-2" />
      <q className="block px-gutter text-center text-subtle">
        It is what you read when you don&apos;t have to that determines what you
        will be when you can&apos;t help it.
      </q>
      <div className="spacer-y-4" />
    </>
  );
}
