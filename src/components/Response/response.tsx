import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Consumer } from "common/kafka-client";
import { Container } from "components/common";
import { colors } from "styles/palette";

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
    const consumer = new Consumer();
    consumer.start(handleConsumeMessages);
  }, [messages]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "50px 0",
        backgroundColor: colors.red[100],
        minHeight: "500px",
      }}
    >
      <Container>
        {messages && (
          <>
            {messages.forEach((message) => (
              <Box>{message}</Box>
            ))}
          </>
        )}
      </Container>
    </Box>
  );
}
