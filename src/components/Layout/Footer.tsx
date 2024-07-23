import { NavListItems } from "./NavListItems";

export function Footer({ currentPath }: { currentPath: string }): JSX.Element {
  return (
    <footer
      className={
        "flex flex-col items-center gap-y-6 bg-[url('/assets/ripnotcomingsoon.avif')] px-pageMargin py-8 text-inverse"
      }
    >
      <ul className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 text-inverse tablet:gap-x-6 max:w-auto">
        <NavListItems
          activeClassName="text-inverse"
          currentPath={currentPath}
        />
      </ul>
      <p className="text-sm font-light leading-4">
        All images used in accordance with the{" "}
        <a
          href="http://www.copyright.gov/title17/92chap1.html#107"
          className="text-inherit"
        >
          Fair Use Law.
        </a>
      </p>
      <a href="#top" className="sr-only">
        To the top ↑
      </a>
    </footer>
  );
}
