import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { allReviews } from "src/api/reviews";
import { describe, it } from "vitest";

import Review from "./[slug].astro";

const { reviews } = await allReviews();

describe("/reviews/:slug", () => {
  it.for(reviews)(
    "matches snapshot for slug $slug",
    { timeout: 10000 },
    async (review, { expect }) => {
      const renderers = await loadRenderers([reactContainerRenderer()]);
      const container = await AstroContainer.create({ renderers });
      const result = await container.renderToString(
        Review as AstroComponentFactory,
        {
          props: { slug: review.slug },
        },
      );

      void expect(result).toMatchFileSnapshot(
        `__snapshots__/${review.slug}.html`,
      );
    },
  );
});
