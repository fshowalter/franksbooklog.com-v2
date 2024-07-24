import { NavListItems } from "./NavListItems";
import { SiteSearchForm } from "./SiteSearchForm";

export function Mast({ currentPath }: { currentPath: string }) {
  return (
    <header className="flex flex-col items-center gap-6 bg-default px-pageMargin py-6 text-center shadow-bottom desktop:sticky desktop:top-4 desktop:z-40 desktop:flex-row desktop:justify-between desktop:gap-8 desktop:py-8 desktop:text-left">
      <div className="items-inherit justify-items-inherit flex flex-col">
        <h1 className="whitespace-nowrap text-[1.5625rem] font-normal leading-8">
          <a className="text-default" href="/">
            Frank&apos;s Book Log
          </a>
        </h1>
        <p className="w-full text-sm italic leading-4 text-muted desktop:pl-px">
          Literature is a relative term.
        </p>
      </div>
      <div className="w-full max-w-prose desktop:order-4 desktop:w-44">
        <SiteSearchForm />
      </div>
      <nav className="w-full desktop:w-auto">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-accent tablet:gap-x-6 desktop:flex-nowrap desktop:justify-start">
          <NavListItems
            activeClassName="text-muted"
            currentPath={currentPath}
          />
        </ul>
      </nav>
    </header>
  );
}
