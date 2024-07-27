import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it } from "vitest";

import * as FeedEndpoint from "./feed.xml.ts";

describe("/feed.xml", () => {
  it("matches snapshot", { timeout: 40000 }, async ({ expect }) => {
    const container = await AstroContainer.create();

    // @ts-expect-error astro signature is wrong
    const response = await container.renderToResponse(FeedEndpoint, {
      routeType: "endpoint",
    });

    const result = await response.text();

    void expect(result).toMatchFileSnapshot(`__snapshots__/feed.xml`);
  });
});
