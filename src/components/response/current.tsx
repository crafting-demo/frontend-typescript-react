import { useState } from "react";

import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { Box } from "@mui/material";

import { generateUniqueID, PickColorByTopic } from "common";
import { Message, Action, ActionType } from "common/types";
import { ResponseTitle, TimelineDotRipple } from "components/common";
import { ResponseModal } from "components/response/modal";

interface CurrentTimelineParams {
  message?: Message;
}

export function CurrentTimeline(params: CurrentTimelineParams) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const { message } = params;

  const themeColor = message
    ? PickColorByTopic(message.meta.callee)
    : "inherit";

  return (
    <Box sx={{ width: "50%" }}>
      <ResponseTitle
        variant="h6"
        sx={{ textAlign: "right", paddingRight: "18px" }}
      >
        Current Request
      </ResponseTitle>

      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            {message ? (
              <>
                <Box
                  onClick={handleOpenModal()}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Read full JSON
                </Box>
                <ResponseModal
                  open={open}
                  onClose={handleCloseModal}
                  message={message}
                />
              </>
            ) : (
              <Box>Send a new message. Waiting ...</Box>
            )}
          </TimelineOppositeContent>

          <TimelineSeparator>
            {message ? (
              <TimelineDot variant="outlined" color="inherit" />
            ) : (
              <TimelineDotRipple variant="outlined" />
            )}

            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent sx={{ display: "none" }} />
        </TimelineItem>

        {message && (
          <>
            <TimelineItem>
              <TimelineOppositeContent>
                <Box sx={{ color: `${themeColor}.main` }}>
                  {message.meta.callee}
                </Box>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot variant="outlined" color={themeColor} />

                <TimelineConnector sx={{ bgcolor: `${themeColor}.main` }} />
              </TimelineSeparator>

              <TimelineContent sx={{ display: "none" }} />
            </TimelineItem>

            <TimelineItemActions actions={message.actions} />
          </>
        )}

        <TimelineItem>
          <KeyboardArrowDownIcon sx={{ marginRight: "-6px" }} />
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

interface TimelineItemActionsParams {
  actions: Action[];
}

function TimelineItemActions(params: TimelineItemActionsParams) {
  const { actions } = params;

  return (
    <>
      {actions.map((action) => {
        const dbTheme = action.status === "Passed" ? "success" : "error";
        const themeColor = action.payload.serviceName
          ? PickColorByTopic(action.payload.serviceName)
          : "inherit";

        switch (action.action) {
          case "Read":
            return (
              <TimelineItem key={generateUniqueID()}>
                <TimelineOppositeContent
                  sx={{
                    m: "auto 0",
                    paddingBottom: "40px",
                  }}
                >
                  <Box>Read - {action.payload.serviceName}</Box>
                  <Box
                    sx={{
                      color: `${dbTheme}.main`,
                      textTransform: "uppercase",
                    }}
                  >
                    {action.status}
                  </Box>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot variant="outlined" color={dbTheme} />

                  <TimelineConnector sx={{ bgcolor: `${dbTheme}.main` }} />
                </TimelineSeparator>

                <TimelineContent sx={{ display: "none" }} />
              </TimelineItem>
            );

          case ActionType.Write:
            return (
              <TimelineItem key={generateUniqueID()}>
                <TimelineOppositeContent
                  sx={{
                    m: "auto 0",
                    paddingBottom: "40px",
                  }}
                >
                  <Box>Write - {action.payload.serviceName}</Box>
                  <Box
                    sx={{
                      color: `${dbTheme}.main`,
                      textTransform: "uppercase",
                    }}
                  >
                    {action.status}
                  </Box>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot variant="outlined" color={dbTheme} />

                  <TimelineConnector sx={{ bgcolor: `${dbTheme}.main` }} />
                </TimelineSeparator>

                <TimelineContent sx={{ display: "none" }} />
              </TimelineItem>
            );

          case ActionType.Call:
            return (
              <Box key={generateUniqueID()}>
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Box sx={{ color: `${themeColor}.main` }}>
                      {action.payload.serviceName}
                    </Box>
                  </TimelineOppositeContent>

                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color={themeColor} />

                    <TimelineConnector
                      sx={{
                        bgcolor: `${themeColor}.main`,
                      }}
                    />
                  </TimelineSeparator>

                  <TimelineContent sx={{ display: "none" }} />
                </TimelineItem>

                <TimelineItemActions actions={action.payload.actions!} />
              </Box>
            );

          default:
            return <Box key={generateUniqueID()} />;
        }
      })}
    </>
  );
}
