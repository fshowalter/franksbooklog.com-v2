import { twJoin } from "tailwind-merge";

export function Button({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twJoin(
        "relative flex w-full max-w-lg cursor-pointer justify-center whitespace-nowrap rounded-3xl bg-subtle px-4 py-2 text-base leading-6 text-default shadow-all hover:shadow-accent",
        className,
      )}
    >
      {children}
    </button>
  );
}
