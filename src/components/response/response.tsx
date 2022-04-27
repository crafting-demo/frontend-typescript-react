import { useEffect, useState } from "react";

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
import { Consumer } from "common/kafka-client";
import { Message, Topic } from "common/types";
import { FullScreenModal } from "components/common";

import { CustomTimelineItem } from "./timelineItem";

export function Response() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [reactMessage, setReactMessage] = useState("");
  const [goMessage, setGoMessage] = useState("");
  const [expressMessage, setExpressMessage] = useState("");
  const [railsMessage, setRailsMessage] = useState("");
  const [kotlinMessage, setKotlinMessage] = useState("");
  const [pythonMessage, setPythonMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeReactMessage = (message: string) => {
    setReactMessage(message);
  };

  const handleChangeGoMessage = (message: string) => {
    setGoMessage(message);
  };

  const handleChangeExpressMessage = (message: string) => {
    setExpressMessage(message);
  };

  const handleChangeRailsMessage = (message: string) => {
    setRailsMessage(message);
  };

  const handleChangeKotlinMessage = (message: string) => {
    setKotlinMessage(message);
  };

  const handleChangePythonMessage = (message: string) => {
    setPythonMessage(message);
  };

  useEffect(() => {
    const consumer = new Consumer(Topic.React);
    consumer.start(handleChangeReactMessage);
  }, []);

  useEffect(() => {
    const consumer = new Consumer(Topic.Go);
    consumer.start(handleChangeGoMessage);
  }, []);

  useEffect(() => {
    const consumer = new Consumer(Topic.Express);
    consumer.start(handleChangeExpressMessage);
  }, []);

  useEffect(() => {
    const consumer = new Consumer(Topic.Rails);
    consumer.start(handleChangeRailsMessage);
  }, []);

  useEffect(() => {
    const consumer = new Consumer(Topic.Kotlin);
    consumer.start(handleChangeKotlinMessage);
  }, []);

  useEffect(() => {
    const consumer = new Consumer(Topic.Python);
    consumer.start(handleChangePythonMessage);
  }, []);

  useEffect(() => {
    if (!reactMessage) {
      return;
    }
    const msg = JSON.parse(reactMessage) as Message;
    setMessages(messages.concat(msg));
  }, [reactMessage]);

  useEffect(() => {
    if (!goMessage) {
      return;
    }
    const msg = JSON.parse(goMessage) as Message;
    setMessages(messages.concat(msg));
  }, [goMessage]);

  useEffect(() => {
    if (!expressMessage) {
      return;
    }
    const msg = JSON.parse(expressMessage) as Message;
    setMessages(messages.concat(msg));
  }, [expressMessage]);

  useEffect(() => {
    if (!railsMessage) {
      return;
    }
    const msg = JSON.parse(railsMessage) as Message;
    setMessages(messages.concat(msg));
  }, [railsMessage]);

  useEffect(() => {
    if (!kotlinMessage) {
      return;
    }
    const msg = JSON.parse(kotlinMessage) as Message;
    setMessages(messages.concat(msg));
  }, [kotlinMessage]);

  useEffect(() => {
    if (!pythonMessage) {
      return;
    }
    const msg = JSON.parse(pythonMessage) as Message;
    setMessages(messages.concat(msg));
  }, [pythonMessage]);

  return (
    <Timeline position="alternate" sx={{ marginTop: "60px" }}>
      {messages
        .slice()
        .reverse()
        .map((message) => (
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
