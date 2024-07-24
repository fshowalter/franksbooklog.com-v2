import { graphql } from "gatsby";
import { BarGradient } from "../BarGradient";
import { Box, IBoxProps } from "../Box";
import { DateIcon } from "../DateIcon";
import { gridAreaComponent, gridComponent } from "../Grid";
import { RenderedMarkdown } from "../RenderedMarkdown";
import {
  gridAreas,
  gridStyle,
  timelineEntryStyle,
  timelineGridStyle,
} from "./ReadingHistoryEntry.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

function Date({
  reading,
}: {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}) {
  return (
    <>
      <Box as="span" color="default" display="inline-block">
        {reading.date}
      </Box>{" "}
    </>
  );
}

function Edition({
  reading,
}: {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}) {
  if (!reading.edition) {
    return null;
  }
  return (
    <Box as="span" fontWeight="light" color="muted">
      <span>via</span> <span>{reading.edition}</span>
    </Box>
  );
}

function EditionNotes({
  reading,
}: {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}) {
  if (!reading.editionNotes) {
    return null;
  }
  return (
    <Box
      as="span"
      fontWeight="light"
      color="subtle"
      fontSize="small"
      lineHeight={1}
    >
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={reading.editionNotes}
        fontSize="small"
        lineHeight={1}
        as="span"
      />
      )
    </Box>
  );
}

// function summaryText(reading: Queries.ReviewReadingHistoryEntryFragment) {
//   if reading.readingTime === 1 {
//     return reading.abandoned
//     ? "Abandoned after 1 day"
//     : reading.isAudiobook
//     ? "Listened to in 1 day"
//     : "Read in 1 day";
//   }

//   const summary = reading.abandoned
//     ? "Abandoned after"
//     : reading.isAudiobook
//     ? "Listened to over"
//     : "Read over";

//   return summary;
// }

function Details({
  reading,
}: {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}) {
  if (reading.readingTime === 1) {
    return null;
  }

  const summaryText = reading.abandoned
    ? "Abandoned after"
    : reading.isAudiobook
      ? "Listened to over"
      : "Read over";

  return (
    <Box as="details" fontWeight="light" color="subtle">
      <Box as="summary">
        {summaryText} {reading.readingTime} Days
      </Box>
      <Box as="ol" width="full" className={timelineGridStyle}>
        {reading.timeline.map((entry) => {
          let progressValue = null;
          const progressNumber = entry.progress.split("%", 1)[0];

          if (progressNumber === "Finished") {
            progressValue = 100;
          }

          if (!isNaN(Number(progressNumber))) {
            progressValue = parseInt(progressNumber);
          }

          return (
            <Box as="li" key={entry.date} className={timelineEntryStyle}>
              <Box lineHeight={40} whiteSpace="nowrap" paddingX="gutter">
                {entry.date}
              </Box>
              <Box width="full" height={40}>
                {progressValue && (
                  <BarGradient value={progressValue} maxValue={100} />
                )}
              </Box>
              <Box lineHeight={40} textAlign="right" paddingX="gutter">
                {entry.progress}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function ReadingNote({
  reading,
}: {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}) {
  if (!reading.readingNotes) {
    return null;
  }
  return (
    <Box paddingBottom={24}>
      <RenderedMarkdown
        fontSize="default"
        lineHeight="default"
        // eslint-disable-next-line react/no-danger
        text={reading.readingNotes.linkedHtml}
      />
    </Box>
  );
}

interface IIReadingHistoryEntryProps extends IBoxProps {
  reading: Queries.ReviewReadingHistoryEntryFragment;
}

export function ReadingHistoryEntry({ reading }: IIReadingHistoryEntryProps) {
  return (
    <Grid backgroundColor="zebra" display="block" paddingX="gutter">
      <GridArea name="icon">
        <DateIcon />{" "}
      </GridArea>
      <GridArea name="date">
        <Date reading={reading} />
        <Edition reading={reading} /> <EditionNotes reading={reading} />
      </GridArea>
      <GridArea name="details">
        <Details reading={reading} />
      </GridArea>
      <GridArea name="viewingNote">
        <ReadingNote reading={reading} />
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment ReviewReadingHistoryEntry on ReviewedWorksJsonReading {
    date(formatString: "ddd MMM DD, YYYY")
    edition
    editionNotes
    isAudiobook
    readingTime
    abandoned
    readingNotes {
      linkedHtml
    }
    sequence
    timeline {
      date(formatString: "DD MMM, YYYY")
      progress
    }
  }
`;
