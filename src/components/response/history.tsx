import { useEffect, useState } from "react";

import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

import { Consumer } from "common/kafka-client";
import { Message, ServiceType } from "common/types";
import { generateUniqueID, sortMessages, uniqueMessages } from "common/utils";
import { ResponseTitle } from "components/common";
import { ResponseModal } from "components/response/modal";
import { colors } from "styles";

export function HistoryTimeline() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(-1);

  const handleOpenModal = (i: number) => () => {
    setOpen(i);
  };

  const handleCloseModal = () => {
    setOpen(-1);
  };

  const handleChange = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    const consumer = new Consumer(ServiceType.React);
    consumer.start(handleChange);
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }
    const msg = JSON.parse(message) as Message;
    setMessages(messages.concat(msg));
  }, [message]);

  return (
    <Box sx={{ width: "50%" }}>
      <ResponseTitle variant="h6">History</ResponseTitle>

      <Timeline>
        <KeyboardArrowUpIcon sx={{ marginLeft: "-6px" }} />

        {messages
          .filter(uniqueMessages)
          .sort(sortMessages)
          .map((msg, i) => (
            <TimelineItem key={generateUniqueID()}>
              <TimelineOppositeContent sx={{ display: "none" }} />

              <TimelineSeparator>
                <TimelineConnector color="inherit" />
                <TimelineDot variant="outlined" color="inherit" />
              </TimelineSeparator>

              <TimelineContent
                sx={{
                  m: "auto 0",
                  marginBottom: "-13px",
                  paddingTop: "40px",
                  color:
                    Date.parse(new Date().toISOString()) -
                      Date.parse(msg.meta.callTime!) <
                    5000
                      ? colors.black[50]
                      : "inherit",
                }}
              >
                <Box
                  color="inherit"
                  onClick={handleOpenModal(i)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box>{msg.meta.callee}</Box>
                  <ReactTimeAgo date={Date.parse(msg.meta.callTime!)} />
                </Box>
              </TimelineContent>

              <ResponseModal
                open={open === i}
                onClose={handleCloseModal}
                message={msg}
              />
            </TimelineItem>
          ))}

        {messages.length === 0 && (
          <TimelineItem>
            <TimelineOppositeContent sx={{ display: "none" }} />

            <TimelineSeparator>
              <TimelineConnector color="grey" />
              <TimelineDot variant="outlined" color="grey" />
            </TimelineSeparator>

            <TimelineContent
              sx={{ m: "auto 0", marginBottom: "-13px", paddingTop: "40px" }}
            >
              <Box color="inherit">
                <Box>No message history</Box>
                <Box>so far.</Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    </Box>
  );
}
