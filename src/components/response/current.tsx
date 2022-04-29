import { Box } from "@mui/material";

import { Message } from "common/types";

interface CurrentTimelineParams {
  message?: Message;
}

export function CurrentTimeline(params: CurrentTimelineParams) {
  const { message } = params;

  return <Box>{message?.meta.callee}</Box>;
}
