import { useState } from "react";

import { Close as CloseIcon } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Button, Modal } from "@mui/material";

import { generateUniqueID } from "common/helpers";
import { Message } from "common/types";
import { FullScreenModal } from "components/common";

import { CustomTimelineItem } from "./timelineItem";

interface ResponseBuilderParams {
  messages: Message[];
}

export function ResponseBuilder(params: ResponseBuilderParams) {
  const { messages } = params;

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Timeline position="alternate" sx={{ marginTop: "60px" }}>
      {messages.map((message) => (
        <Box key={generateUniqueID()}>
          <Box onClick={handleOpen} sx={{ cursor: "pointer" }}>
            {CustomTimelineItem(message)}
          </Box>

          <Modal open={open} onClose={handleClose}>
            <FullScreenModal>
              <Button
                disableElevation
                onClick={handleClose}
                variant="outlined"
                sx={{
                  float: "right",
                  top: "10px",
                  right: "10px",
                }}
              >
                <CloseIcon />
              </Button>
              <Box sx={{ padding: "30px" }}>
                <pre>{JSON.stringify(message, null, 2)}</pre>
              </Box>
            </FullScreenModal>
          </Modal>
        </Box>
      ))}

      {messages.length === 0 && (
        <TimelineItem>
          <TimelineOppositeContent
            color="text.secondary"
            sx={{ m: "auto 0", paddingTop: "40px" }}
          >
            Waiting
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot variant="outlined" color="grey" />
          </TimelineSeparator>
          <TimelineContent
            color="text.secondary"
            sx={{
              m: "auto 0",
              paddingTop: "40px",
            }}
          >
            No requests yet ...
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
