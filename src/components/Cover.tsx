import React from "react";
import type { CoverImageData } from "src/api/covers";
import { toSentenceArray } from "src/utils";
import { twMerge } from "tailwind-merge";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  authors: { name: string }[];
  imageData: CoverImageData | undefined;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
  className?: string;
}

export function Cover({
  title,
  authors,
  imageData,
  loading = "lazy",
  decoding = "async",
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <img
      {...imageData}
      alt={`A cover of ${title} by ${toSentenceArray(
        authors.map((a) => a.name),
      ).join("")}`}
      {...rest}
      className={twMerge("aspect-[0.66666667]", className)}
      loading={loading}
      decoding={decoding}
    />
  );
}
