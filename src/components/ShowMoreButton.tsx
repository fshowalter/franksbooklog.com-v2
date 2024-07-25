import { Button } from "./Button";

export function ShowMoreButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <Button onClick={onClick} className="gap-x-4">
      <svg
        width="24"
        height="24"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-accent"
      >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
      Show More...
    </Button>
  );
}
