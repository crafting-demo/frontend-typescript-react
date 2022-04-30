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

import { generateUniqueID, pickColorByTopic } from "common";
import { Message, Action, ActionType } from "common/types";
import { ResponseTitle, TimelineDotRipple } from "components/common";
import { ContainedModal, FullScreenModal } from "components/modal";

interface CurrentTimelineParams {
  message?: Message;
}

export function CurrentTimeline(params: CurrentTimelineParams) {
  const [open, setOpen] = useState(false);
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenFullScreen = () => {
    setOpenFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setOpenFullScreen(false);
  };

  const { message } = params;

  const themeColor = message
    ? pickColorByTopic(message.meta.callee)
    : "inherit";

  return (
    <Box sx={{ width: "50%" }}>
      <ResponseTitle
        variant="h6"
        sx={{ textAlign: "right", paddingRight: "18px", paddingTop: "5px" }}
      >
        Current response
      </ResponseTitle>

      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            {message ? (
              <>
                <Box
                  onClick={handleOpenFullScreen}
                  sx={{
                    cursor: "pointer",
                    color: `${pickColorByTopic(message.meta.caller)}.main`,
                  }}
                >
                  {message.meta.caller}
                </Box>
                <FullScreenModal
                  open={openFullScreen}
                  onClose={handleCloseFullScreen}
                  message={message}
                />
              </>
            ) : (
              <Box>Send a new request ...</Box>
            )}
          </TimelineOppositeContent>

          <TimelineSeparator>
            {message ? (
              <>
                <TimelineDot
                  variant="outlined"
                  color={pickColorByTopic(message.meta.caller)}
                />
                <TimelineConnector
                  sx={{
                    bgcolor: `${pickColorByTopic(message.meta.caller)}.main`,
                  }}
                />
              </>
            ) : (
              <>
                <TimelineDotRipple variant="outlined" />
                <TimelineConnector />
              </>
            )}
          </TimelineSeparator>

          <TimelineContent sx={{ display: "none" }} />
        </TimelineItem>

        {message && (
          <>
            <TimelineItem>
              <TimelineOppositeContent>
                <Box
                  color="inherit"
                  onClick={handleOpenModal}
                  sx={{ color: `${themeColor}.main`, cursor: "pointer" }}
                >
                  {message.meta.callee}
                </Box>

                <ContainedModal
                  open={open}
                  onClose={handleCloseModal}
                  action={{
                    action: "Call",
                    payload: {
                      serviceName: message.meta.callee,
                    },
                    returnTime: message.meta.returnTime,
                    status: "Passed",
                  }}
                />
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
  const [open, setOpen] = useState(-1);

  const handleOpenModal = (i: number) => () => {
    setOpen(i);
  };

  const handleCloseModal = () => {
    setOpen(-1);
  };

  const { actions } = params;

  return (
    <>
      {actions.map((action, i) => {
        const themeColor = action.payload.serviceName
          ? pickColorByTopic(action.payload.serviceName)
          : "inherit";

        switch (action.action) {
          case ActionType.Read:
            return (
              <TimelineItem key={generateUniqueID()}>
                <TimelineOppositeContent>
                  <Box
                    color="inherit"
                    onClick={handleOpenModal(i)}
                    sx={{ cursor: "pointer" }}
                  >
                    {action.payload.serviceName}
                  </Box>

                  <ContainedModal
                    open={open === i}
                    onClose={handleCloseModal}
                    action={action}
                  />
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="inherit" />

                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ display: "none" }} />
              </TimelineItem>
            );

          case ActionType.Write:
            return (
              <TimelineItem key={generateUniqueID()}>
                <TimelineOppositeContent>
                  <Box
                    color="inherit"
                    onClick={handleOpenModal(i)}
                    sx={{ cursor: "pointer" }}
                  >
                    {action.payload.serviceName}
                  </Box>

                  <ContainedModal
                    open={open === i}
                    onClose={handleCloseModal}
                    action={action}
                  />
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="inherit" />

                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ display: "none" }} />
              </TimelineItem>
            );

          case ActionType.Call:
            return (
              <Box key={generateUniqueID()}>
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Box
                      color="inherit"
                      onClick={handleOpenModal(i)}
                      sx={{ color: `${themeColor}.main`, cursor: "pointer" }}
                    >
                      {action.payload.serviceName}
                    </Box>

                    <ContainedModal
                      open={open === i}
                      onClose={handleCloseModal}
                      action={action}
                    />
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
