import { useEffect, useState } from "react";

import { FilterNone as FilterNoneIcon } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

import { sortMessages, uniqueMessages } from "common/helpers";
import { Message, ServiceType } from "common/types";
import { Graph } from "components/graph";
import { Consumer } from "kafka";

export function TimelineBuilder() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [openGraph, setOpenGraph] = useState(-1);

  const handleChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleOpenGraph = (index: number) => () => {
    setOpenGraph(index);
  };

  const handleCloseGraph = () => {
    setOpenGraph(-1);
  };

  useEffect(() => {
    const consumer = new Consumer(ServiceType.React, handleChange);
    consumer.start();
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }
    const parsed = JSON.parse(message) as Message;
    setMessages([parsed, ...messages]);
  }, [message]);

  return (
    <Timeline>
      {messages
        .filter(uniqueMessages)
        .sort(sortMessages)
        .map((msg, i) => (
          <TimelineItem>
            <TimelineOppositeContent sx={{ display: "none" }} />

            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "primary.main" }} />
              <TimelineDot color="primary">
                <FilterNoneIcon />
              </TimelineDot>
            </TimelineSeparator>

            <TimelineContent
              sx={{
                py: 0,
                px: 2,
                paddingTop: "40px",
              }}
            >
              <Box onClick={handleOpenGraph(i)} sx={{ cursor: "pointer" }}>
                <Typography variant="h6" component="span">
                  {msg.meta.callee.split("-").slice(-2).join("/")}
                </Typography>
                <Typography>
                  {msg.meta.callTime && (
                    <ReactTimeAgo date={Date.parse(msg.meta.callTime)} />
                  )}
                </Typography>
              </Box>
              <Graph
                message={msg}
                open={openGraph === i}
                onClose={handleCloseGraph}
              />
            </TimelineContent>
          </TimelineItem>
        ))}

      {!messages.length && (
        <TimelineItem>
          <TimelineOppositeContent sx={{ display: "none" }} />

          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "primary.main" }} />
            <TimelineDot color="primary">
              <FilterNoneIcon />
            </TimelineDot>
          </TimelineSeparator>

          <TimelineContent sx={{ py: "14px", px: 2, marginBottom: "-10px" }}>
            <Typography variant="h6" component="span">
              No history
            </Typography>
            <Typography>Send a new request</Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
