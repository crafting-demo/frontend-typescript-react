import { useEffect, useState } from "react";

import {
  FilterNone as FilterNoneIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
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

import { sortMessages, uniqueKey, uniqueMessages } from "common/helpers";
import { ReactComponent as DjangoIcon } from "common/svgs/django.svg";
import { ReactComponent as ExpressIcon } from "common/svgs/express.svg";
import { ReactComponent as GinIcon } from "common/svgs/gin.svg";
import { ReactComponent as RailsIcon } from "common/svgs/rails.svg";
import { ReactComponent as SpringIcon } from "common/svgs/spring.svg";
import { Message, ServiceType } from "common/types";
import { Graph } from "components/graph";
import { Consumer } from "kafka";
import { colors } from "styles";

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
    <>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "30px",
          margin: "45px 0 25px 0",
          color: colors.black[100],
        }}
      >
        Backend Call History
      </Typography>

      <Timeline>
        <TimelineSeparator>
          <KeyboardArrowUpIcon color="primary" />
        </TimelineSeparator>

        {messages
          .filter(uniqueMessages)
          .sort(sortMessages)
          .map((msg, i) => (
            <TimelineItem key={uniqueKey()}>
              <TimelineOppositeContent sx={{ paddingTop: "45px" }}>
                <Typography>
                  {msg.meta.callTime && (
                    <ReactTimeAgo date={Date.parse(msg.meta.callTime)} />
                  )}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector
                  sx={{ bgcolor: "primary.main", minHeight: "25px" }}
                />
                <TimelineDot
                  sx={{
                    backgroundColor: "transparent",
                    padding: 0,
                    boxShadow: "none",
                  }}
                >
                  {msg.meta.callee === ServiceType.Gin && (
                    <GinIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "40px",
                      }}
                    />
                  )}
                  {msg.meta.callee === ServiceType.Express && (
                    <ExpressIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "40px",
                      }}
                    />
                  )}
                  {msg.meta.callee === ServiceType.Rails && (
                    <RailsIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "40px",
                      }}
                    />
                  )}
                  {msg.meta.callee === ServiceType.Spring && (
                    <SpringIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "40px",
                      }}
                    />
                  )}
                  {msg.meta.callee === ServiceType.Django && (
                    <DjangoIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "40px",
                      }}
                    />
                  )}
                </TimelineDot>
              </TimelineSeparator>

              <TimelineContent
                sx={{
                  py: 0,
                  px: 2,
                  paddingTop: "45px",
                }}
              >
                <Box onClick={handleOpenGraph(i)} sx={{ cursor: "pointer" }}>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ fontSize: "16px" }}
                  >
                    {msg.meta.callee
                      .split("-")
                      .slice(-2)
                      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                      .join("/")}
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
            <TimelineOppositeContent />

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
    </>
  );
}
