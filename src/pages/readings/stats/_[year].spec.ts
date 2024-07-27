import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { allStatYears } from "src/api/yearStats";
import { describe, it } from "vitest";

import YearStats from "./[year].astro";

const statYears = await allStatYears();

describe("/readings/stats/:year", () => {
  it.for(statYears)(
    "matches snapshot for year %i",
    { timeout: 10000 },
    async (year, { expect }) => {
      const renderers = await loadRenderers([reactContainerRenderer()]);
      const container = await AstroContainer.create({ renderers });
      const result = await container.renderToString(
        YearStats as AstroComponentFactory,
        {
          props: { year: year },
        },
      );

      void expect(result).toMatchFileSnapshot(`__snapshots__/${year}.html`);
    },
  );
});
