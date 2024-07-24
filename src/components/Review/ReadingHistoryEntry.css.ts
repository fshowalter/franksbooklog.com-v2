import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { backgroundColors } from "../../styles/colors.css";
import { gridTemplate, SPACER } from "../../styles/grid";
import { gutterWidth, relativeSize, size } from "../../styles/sizes.css";

export const mediumNotesTypography = style({
  fontSize: relativeSize[14],
});

export const timelineGridStyle = style({
  display: "grid",
  marginLeft: `calc(-1 * ${gutterWidth})`,
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
});

export const timelineEntryStyle = style({
  display: "contents",
});

globalStyle(`${timelineEntryStyle}:nth-of-type(odd) > div`, {
  backgroundColor: backgroundColors.subtle,
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[16]]: SPACER },
      ["icon", SPACER, "date"],
      ["icon", SPACER, "details"],
      { [size[16]]: SPACER },
      ["viewingNote", "viewingNote", "viewingNote"],
    ],
    columns: ["16px", "1ch", "1fr"],
  }),
});

const gridAreaStyles = {
  icon: {
    gridArea: "icon",
    marginTop: "4px",
  },
  date: {
    gridArea: "date",
  },
  medium: {
    gridArea: "medium",
  },
  mediumNotes: {
    gridArea: "mediumNotes",
  },
  details: {
    gridArea: "details",
  },
  viewingNote: {
    gridArea: "viewingNote",
  },
};

export type GridAreas =
  | "icon"
  | "date"
  | "medium"
  | "mediumNotes"
  | "details"
  | "viewingNote";

export const gridAreas = styleVariants(gridAreaStyles);
