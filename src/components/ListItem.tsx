import { twJoin } from "tailwind-merge";

export function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={twJoin(
        "flex flex-row gap-x-4 px-gutter py-4 even:bg-subtle tablet:gap-x-6 tablet:px-6",
        className,
      )}
    >
      {children}
    </li>
  );
}
