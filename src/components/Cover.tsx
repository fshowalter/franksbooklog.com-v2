import React from "react";
import type { CoverImageData } from "src/api/covers";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageData: CoverImageData | undefined;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
}

export function Cover({
  imageData,
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props): JSX.Element {
  return (
    <img
      {...imageData}
      {...rest}
      loading={loading}
      decoding={decoding}
      style={{ aspectRatio: "0.66666667" }}
    />
  );
}
