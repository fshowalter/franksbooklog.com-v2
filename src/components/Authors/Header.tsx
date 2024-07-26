import { PageTitle } from "src/components/PageTitle";

export function Header() {
  return (
    <>
      <PageTitle className="text-center">Authors</PageTitle>
      <div className="spacer-y-2" />
      <q className="block px-gutter text-center text-subtle">
        There is nothing to writing. All you do is sit down at a typewriter and
        bleed.
      </q>
    </>
  );
}
