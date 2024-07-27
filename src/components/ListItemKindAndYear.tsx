export function ListItemKindAndYear({
  kind,
  year,
}: {
  kind: string;
  year: string;
}): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      <span>{kind} | </span>
      {year}
    </div>
  );
}
