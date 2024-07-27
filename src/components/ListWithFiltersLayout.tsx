import { Fieldset } from "./Fieldset";

export function ListWithFiltersLayout({
  header,
  filters,
  list,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  list: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <main className="flex w-full max-w-prose flex-col items-stretch gap-x-20 desktop:max-w-full desktop:flex-row desktop:px-pageMargin">
        <div className="flex basis-96 flex-col items-center px-gutter pt-8 desktop:px-0">
          <div className="flex flex-col items-center">{header}</div>
          <div className="desktop:sticky desktop:top-[var(--header-offset)]">
            <div className="spacer-y-8" />
            <Fieldset legend="Filter & Sort" className="desktop:self-start">
              {filters}
            </Fieldset>
            <div className="spacer-y-8" />
          </div>
        </div>
        <div className="flex grow flex-col">
          <div className="h-0 min-h-0 desktop:h-8 desktop:min-h-8" />
          {list}
          <div className="spacer-y-6" />
        </div>
      </main>
    </div>
  );
}
