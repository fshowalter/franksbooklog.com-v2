function NavListItem({
  to,
  children,
  activeClassName,
  currentPath,
}: {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  activeClassName: string;
}): JSX.Element {
  let className = "text-inherit";

  if (currentPath === to || `${currentPath}/` === to) {
    className = activeClassName;
  }

  return (
    <li className="block whitespace-nowrap tracking-0.5px">
      <a className={className} href={to}>
        {children}
      </a>
    </li>
  );
}

export function NavListItems({
  activeClassName,
  currentPath,
}: {
  activeClassName: string;
  currentPath: string;
}) {
  return (
    <>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/"
      >
        Home
      </NavListItem>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/how-i-grade/"
      >
        How I Grade
      </NavListItem>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/reviews/"
      >
        Reviews
      </NavListItem>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/readings/"
      >
        Reading Log
      </NavListItem>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/authors/"
      >
        Authors
      </NavListItem>
      <NavListItem
        activeClassName={activeClassName}
        currentPath={currentPath}
        to="/shelf/"
      >
        Shelf
      </NavListItem>
    </>
  );
}
