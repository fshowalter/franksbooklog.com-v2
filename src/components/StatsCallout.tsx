export function StatsCallout({
  value,
  label,
}: {
  value: number;
  label: string;
}): JSX.Element {
  return (
    <div className="flex size-36 flex-col justify-center rounded-[50%] text-center shadow-all">
      <div className="text-[2rem] leading-8">{value.toLocaleString()}</div>{" "}
      <div className="text-subtle">{label}</div>
    </div>
  );
}
