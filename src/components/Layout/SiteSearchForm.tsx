export function SiteSearchForm() {
  return (
    <form
      action="https://www.google.com/search"
      acceptCharset="UTF-8"
      method="get"
      role="search"
      className="mx-auto w-full max-w-[512px] overflow-hidden rounded shadow-all"
    >
      <label htmlFor="search" className="flex overflow-hidden">
        <span className="sr-only">Search</span>
        <input
          type="text"
          name="q"
          id="search"
          placeholder="Search..."
          className="min-w-0 grow border-0 bg-subtle px-4 py-2 text-base font-light leading-6 text-default"
        />
        <input type="hidden" name="q" value="site:www.franksbooklog.com" />
        <button
          type="submit"
          value="Search"
          aria-label="Search"
          className="border-0 border-l border-default bg-subtle px-3 py-1"
        >
          <svg className="size-4 fill-subtle" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
            />
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}
