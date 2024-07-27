export function StatHeading({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <h3 className="sticky top-[var(--header-offset)] z-30 bg-canvas px-gutter py-2 text-md font-normal">
      {children}
    </h3>
  );
}
