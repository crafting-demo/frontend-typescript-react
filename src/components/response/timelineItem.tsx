import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Box } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

import { PickColorByTopic } from "common/helpers";
import { Message } from "common/types";

export function CustomTimelineItem(message: Message) {
  const {
    meta: { callee },
  } = message;

  const themeColor = PickColorByTopic(callee);

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: "auto 0", paddingTop: "40px" }}>
        {TimelineItemCallTime(message)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ bgcolor: `${themeColor}.main` }} />
        <TimelineDot variant="outlined" color={themeColor} />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          m: "auto 0",
          paddingTop: "40px",
        }}
      >
        {TimelineItemMessageBody(message)}
      </TimelineContent>
    </TimelineItem>
  );
}

export function TimelineItemCallTime(message: Message) {
  const {
    meta: { callTime },
  } = message;

  return (
    <Box>
      <ReactTimeAgo date={Date.parse(callTime)} />
    </Box>
  );
}

export function TimelineItemMessageBody(message: Message) {
  const {
    meta: { callee },
  } = message;

  return <Box>{callee}</Box>;
}
