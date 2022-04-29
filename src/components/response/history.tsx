import { useEffect, useState } from "react";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

import { Consumer } from "common/kafka-client";
import { Message, ServiceType } from "common/types";
import { generateUniqueID } from "common/utils";

export function HistoryTimeline() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

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
    <Timeline>
      {messages
        .slice()
        .reverse()
        .map((msg) => (
          <TimelineItem key={generateUniqueID()}>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>
              <Box>{msg.meta.callee}</Box>
              <Box>
                <ReactTimeAgo date={Date.parse(msg.meta.callTime!)} />
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
}
