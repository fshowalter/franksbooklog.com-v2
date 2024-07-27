function AllTimeLink({
  currentYear,
  linkFunc,
}: {
  currentYear: string;
  linkFunc: (year: string) => string;
}): JSX.Element {
  if (!currentYear || currentYear === "all") {
    return <li className="block text-muted">All-Time</li>;
  }

  return (
    <li className="block">
      <a className="text-accent" href={linkFunc("all")}>
        All-Time
      </a>
    </li>
  );
}

function YearLink({
  year,
  currentYear,
  linkFunc,
}: {
  year: string;
  currentYear: string;
  linkFunc: (y: string) => string;
}): JSX.Element | null {
  if (year === currentYear) {
    return <li className="block">{year}</li>;
  }

  return (
    <li className="block">
      <a className="text-accent" href={linkFunc(year)}>
        {year}
      </a>
    </li>
  );
}

export function StatsNavigation({
  currentYear,
  years,
  linkFunc,
}: {
  currentYear: string;
  years: readonly string[];
  linkFunc: (year: string) => string;
}): JSX.Element {
  return (
    <ul className="flex flex-wrap justify-center gap-4 text-md">
      <AllTimeLink currentYear={currentYear} linkFunc={linkFunc} />
      {[...years].reverse().map((year) => {
        return (
          <YearLink
            key={year}
            year={year}
            currentYear={currentYear}
            linkFunc={linkFunc}
          />
        );
      })}
    </ul>
  );
}
