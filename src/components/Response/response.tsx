import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Consumer } from "common/kafka-client";
import { Topic } from "common/types";

export function Response() {
  const [messages, setMessages] = useState<string[]>();

  const handleConsumeMessages = (message: string) => {
    const msg = JSON.stringify(message, null, 4);
    if (!messages) {
      setMessages([msg]);
      return;
    }
    setMessages([msg, ...messages]);
  };

  useEffect(() => {
    const consumer = new Consumer(Topic.React);
    consumer.start(handleConsumeMessages);
  }, [messages]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "50px 0",
      }}
    >
      <Box>
        {messages && (
          <>
            {messages.forEach((message) => (
              <Box>{message}</Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
