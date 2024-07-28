import { twj } from "src/utils/tailwindJoin";

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <h1
      className={twj(
        "text-[2rem] font-normal leading-none desktop:text-[2.25rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
}
