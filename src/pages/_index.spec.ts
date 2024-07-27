import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { describe, it } from "vitest";

import Index from "./index.astro";

describe("/", () => {
  it("matches snapshot", { timeout: 40000 }, async ({ expect }) => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(
      Index as AstroComponentFactory,
      {},
    );

    void expect(result).toMatchFileSnapshot(`__snapshots__/index.html`);
  });
});
