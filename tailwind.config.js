const BACKDROP_WIDTH = "960px";
const PROSE_CONTENT_WIDTH = "36rem";
const POSTER_WIDTH = "200px";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundColor: {
      default: "var(--bg-default)",
      subtle: "var(--bg-subtle)",
      canvas: "var(--bg-canvas)",
      inverse: "var(--bg-inverse)",
      stripe: "var(--bg-stripe)",
      unset: "unset",
    },
    borderColor: {
      default: "var(--border-default)",
    },
    colors: {
      accent: "var(--fg-accent)",
      border: "var(--border-default)",
      "border-accent": "var(--border-accent)",
      default: "var(--fg-default)",
      muted: "var(--fg-muted)",
      inverse: "var(--fg-inverse)",
      subtle: "var(--fg-subtle)",
      inherit: "inherit",
      emphasis: "var(--fg-emphasis)",
      progress: "var(--fg-progress)",
    },
    screens: {
      tablet: "510px",
      desktop: "1112px",
    },
    extend: {
      boxShadow: {
        all: "0 0 0 1px var(--border-default)",
        bottom: "0px 1px var(--border-default)",
      },
      brightness: {
        dark: "0.8",
      },
      contrast: {
        dark: "1.2",
      },
      flexBasis: {
        md: "28rem",
      },
      fontSize: {
        "2.5xl": "1.625rem",
        md: ["1.125rem", "1.5rem"],
      },
      letterSpacing: {
        "0.25px": "0.015625rem",
        "0.3px": "0.01875rem",
        "0.5px": "0.03125rem",
        "0.75px": "0.046875rem",
        "1px": "0.0625rem",
      },
      margin: {
        gutter: "var(--gutter-width)",
      },
      maxWidth: {
        canvas: `clamp(${BACKDROP_WIDTH}, 95vw, 1112px)`,
        prose: PROSE_CONTENT_WIDTH,
        popout: `calc((var(--gutter-width) * 2) + ${PROSE_CONTENT_WIDTH})`,
        poster: POSTER_WIDTH,
        unset: "unset",
      },
      padding: {
        pageMargin: "var(--page-margin-width)",
        gutter: "var(--gutter-width)",
        ch: "1ch",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          /**
           *
           * @param {string} value
           * @returns
           */
          "spacer-y": (value) => {
            return {
              height: value,
              minHeight: value,
            };
          },
        },
        { values: theme("spacing") },
      );
    }),
  ],
};
