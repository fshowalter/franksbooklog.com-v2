import { twj } from "src/utils/tailwindJoin";

export function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={twj(
        "flex flex-row items-center gap-x-4 px-gutter py-4 even:bg-subtle tablet:gap-x-6 tablet:px-6",
        className,
      )}
    >
      {children}
    </li>
  );
}
