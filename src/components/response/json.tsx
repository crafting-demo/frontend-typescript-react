import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { generateUniqueID } from "common/helpers";
import { Consumer } from "common/kafka-client";
import { Message, Topic } from "common/types";

export function ResponseBuilderJSON() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reactMessage, setReactMessage] = useState("");

  const handleChangeReactMessage = (message: string) => {
    setReactMessage(message);
  };

  useEffect(() => {
    const consumerReact = new Consumer(Topic.React);
    consumerReact.start(handleChangeReactMessage);
  }, []);

  useEffect(() => {
    if (!reactMessage) {
      return;
    }
    const msg = JSON.parse(reactMessage) as Message;
    setMessages(messages.concat(msg));
  }, [reactMessage]);

  return (
    <Box>
      {messages.map((message) => (
        <Box key={generateUniqueID()}>{JSON.stringify(message)}</Box>
      ))}
    </Box>
  );
}
